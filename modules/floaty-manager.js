/**
 * 悬浮窗管理模块 - 提供高级悬浮窗管理功能
 * 包含拖动、吸边、菜单展开等交互功能
 */

// 加载依赖模块
var config = require('../config.js');
var apiUtils = require('./utils/api-utils.js');

module.exports = {
    /**
     * 执行预检查（Token验证和版本MD5校验）
     * @returns {Object|null} 返回预检查数据对象，失败返回null
     */
    preCheck: function() {
        try {
            // ==================== 1. Token 验证 ====================
            console.log('预检查: 开始Token验证');
            
            var gameId = config.GAME_ID;
            var endpoint = config.API_CONFIG.ENDPOINTS.PRE_CHECK + '/' + gameId;
            
            var response = apiUtils.get(endpoint);
            var result = JSON.parse(response.body);
            
            // 检查响应代码
            if (result.code !== 200) {
                var errorMsg = result.msg || '预检查失败';
                console.error('预检查: 失败，消息 =', errorMsg);
                toast(errorMsg);
                return null;
            }
            
            var preCheckData = result.data;
            
            // 检查token有效性
            if (!preCheckData.tokenValid) {
                var msg = preCheckData.message || 'Token无效';
                console.error('预检查: Token验证失败 -', msg);
                toast(msg);
                return null;
            }
            
            console.log('预检查: Token验证成功');
            console.log('预检查: 卡号 =', preCheckData.cardNo);
            console.log('预检查: 剩余天数 =', preCheckData.remainingDays);
            console.log('预检查: 剩余小时 =', preCheckData.remainingHours);
            console.log('预检查: 剩余分钟 =', preCheckData.remainingMinutes);
            console.log('预检查: 最新版本 =', preCheckData.version);
            console.log('预检查: 文件MD5 =', preCheckData.fileMd5);
            
            // ==================== 2. 版本MD5校验 ====================
            // 获取本地存储的MD5值
            var versionStorage = storages.create("version");
            var localMd5 = versionStorage.get("fileMd5", "");
            
            console.log('预检查: 本地MD5 =', localMd5);
            console.log('预检查: 服务器MD5 =', preCheckData.fileMd5);
            
            // 如果本地有MD5值，且与服务器不一致，提示需要更新
            if (localMd5 && preCheckData.fileMd5 && localMd5 !== preCheckData.fileMd5) {
                var updateMsg = '检测到新版本 v' + preCheckData.version + '，请更新后再运行';
                console.warn('预检查: ' + updateMsg);
                console.warn('预检查: 本地MD5 = ' + localMd5);
                console.warn('预检查: 服务器MD5 = ' + preCheckData.fileMd5);
                toast(updateMsg);
                
                // 提示用户需要更新
                dialogs.alert('版本更新提示', updateMsg + '\n\n请打开APP手动更新到最新版本');
                
                return null;
            }
            
            // 如果本地没有MD5值，保存服务器的MD5（首次运行）
            if (!localMd5 && preCheckData.fileMd5) {
                console.log('预检查: 首次运行，保存服务器MD5 =', preCheckData.fileMd5);
                versionStorage.put("fileMd5", preCheckData.fileMd5);
                versionStorage.put("version", preCheckData.version);
            }
            
            toast(preCheckData.message || '验证成功');
            
            return preCheckData;
            
        } catch (e) {
            console.error('预检查: 执行失败', e);
            toast('预检查失败: ' + e.message);
            return null;
        }
    },
    
    /**
     * 注册 floaty-manager 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // 保存模块引用，方便在内部函数中调用
        var self = this;
        
        // 读取配置
        var floatyConfig = config.FLOATY_CONFIG;
        var API_CONFIG = config.API_CONFIG;
        
        console.log('悬浮窗: 加载配置 - 目标脚本路径:', floatyConfig.TARGET_SCRIPT_PATH);
        console.log('悬浮窗: 加载配置 - 初始位置:', JSON.stringify(floatyConfig.INITIAL_POSITION));
        console.log('悬浮窗: 加载配置 - WebView 窗口大小:', JSON.stringify(floatyConfig.WEBVIEW_SIZE));
        console.log('悬浮窗: 加载配置 - WebView 页面:', floatyConfig.WEBVIEW_PAGE);
        console.log('悬浮窗: 加载配置 - WebView 标题:', floatyConfig.WEBVIEW_TITLE);
        
        // 悬浮窗相关状态
        var floatyWindow = null;
        var isFloatyEnabled = false;
        var isFloatyExpanded = false;
        var floatyButtons = [];
        
        // 悬浮 WebView 窗口
        var floatyWebViewWindow = null;
        
        // 回调函数存储
        var getScriptStatusCallback = null;
        var onActionCallback = null;
        
        // 脚本执行管理
        var scriptExecution = null;      // 当前运行的脚本执行对象
        var isScriptRunning = false;     // 脚本运行状态
        var targetScriptPath = floatyConfig.TARGET_SCRIPT_PATH;     // 目标脚本路径（从配置读取）
        
        // ==================== 悬浮 WebView 窗口函数（前置声明）====================
        
        /**
         * 关闭悬浮 WebView 窗口
         */
        function closeFloatyWebView() {
            try {
                if (floatyWebViewWindow) {
                    floatyWebViewWindow.close();
                    floatyWebViewWindow = null;
                    console.log('悬浮窗: WebView 窗口已关闭');
                }
            } catch (e) {
                console.error('悬浮窗: 关闭 WebView 窗口失败', e.message);
            }
        }
        
        /**
         * 显示悬浮 WebView 配置窗口
         */
        function showFloatyWebView() {
            try {
                // 如果已经存在，先关闭
                if (floatyWebViewWindow) {
                    closeFloatyWebView();
                }
                
                console.log('悬浮窗: 创建悬浮 WebView 窗口');
                
                // 获取屏幕尺寸
                var screenWidth = context.getResources().getDisplayMetrics().widthPixels;
                var screenHeight = context.getResources().getDisplayMetrics().heightPixels;
                var density = context.getResources().getDisplayMetrics().density;
                
                // 计算窗口尺寸（从配置读取百分比）
                var windowWidth = Math.floor(screenWidth * floatyConfig.WEBVIEW_SIZE.WIDTH_PERCENT);
                var windowHeight = Math.floor(screenHeight * floatyConfig.WEBVIEW_SIZE.HEIGHT_PERCENT);
                
                // 创建悬浮窗布局
                floatyWebViewWindow = floaty.rawWindow(
                    <vertical bg="#ffffff" w={windowWidth + 'px'} h={windowHeight + 'px'}>
                        <horizontal bg="#4CAF50" h="48dp" gravity="center_vertical">
                            <text text={floatyConfig.WEBVIEW_TITLE} textColor="#ffffff" textSize="16sp" 
                                  layout_weight="1" paddingLeft="16dp"/>
                            <button id="closeBtn" text="✕" textSize="20sp" 
                                    textColor="#ffffff" bg="#4CAF50" w="48dp" h="48dp"/>
                        </horizontal>
                        <webview id="webview" w="*" h="*"/>
                    </vertical>
                );
                
                // 设置窗口位置（居中）
                var posX = Math.floor((screenWidth - windowWidth) / 2);
                var posY = Math.floor((screenHeight - windowHeight) / 2);
                floatyWebViewWindow.setPosition(posX, posY);
                
                // 延迟初始化以确保窗口已创建
                setTimeout(function() {
                    try {
                        // 设置关闭按钮点击事件
                        floatyWebViewWindow.closeBtn.click(function() {
                            closeFloatyWebView();
                        });
                        
                        // 初始化 WebView
                        var webview = floatyWebViewWindow.webview;
                        var pluginUtils = require('./plugin-utils.js');
                        var moduleRegister = require('./register.js');
                        
                        pluginUtils.initWebView(webview, moduleRegister, floatyConfig.WEBVIEW_PAGE);
                        
                        console.log('悬浮窗: WebView 初始化完成，页面:', floatyConfig.WEBVIEW_PAGE);
                    } catch (e) {
                        console.error('悬浮窗: WebView 初始化失败', e.message);
                    }
                }, 200);
                
                toast('配置窗口已打开');
                
            } catch (e) {
                console.error('悬浮窗: 创建悬浮 WebView 失败', e.message);
                toast('创建配置窗口失败: ' + e.message);
            }
        }
        
        // ==================== 状态管理 ====================
        
        // 设置脚本状态获取回调
        jsBridge.handle('floatyManager.setScriptStatusCallback', function(event, callbackName) {
            getScriptStatusCallback = callbackName;
            return true;
        });
        
        // 设置动作回调
        jsBridge.handle('floatyManager.setActionCallback', function(event, callbackName) {
            onActionCallback = callbackName;
            return true;
        });
        
        // 获取悬浮窗状态
        jsBridge.handle('floatyManager.getStatus', function(event) {
            return {
                isEnabled: isFloatyEnabled,
                isExpanded: isFloatyExpanded,
                isScriptRunning: isScriptRunning
            };
        });
        
        // 设置目标脚本路径（用于启动/停止）
        jsBridge.handle('floatyManager.setTargetScript', function(event, scriptPath) {
            targetScriptPath = scriptPath;
            console.log('悬浮窗: 设置目标脚本路径 =', scriptPath);
            return true;
        });
        
        // 启动脚本
        jsBridge.handle('floatyManager.startScript', function(event) {
            // 在子线程中执行，避免 NetworkOnMainThreadException
            threads.start(function() {
                startTargetScript();
            });
            return true; // 立即返回，不阻塞主线程
        });
        
        // 停止脚本
        jsBridge.handle('floatyManager.stopScript', function(event) {
            return stopTargetScript();
        });
        
        // ==================== 创建悬浮窗 ====================
        
        // 创建主悬浮窗
        jsBridge.handle('floatyManager.create', function(event) {
            try {
                if (floatyWindow) {
                    removeFloatyWindow();
                }
                
                // 创建主悬浮按钮
                floatyWindow = floaty.window(
                    <button text="⚡" textSize="18sp" textColor="#ffffff"
                            bg="#4CAF50" w="48dp" h="48dp"
                            id="mainButton"/>
                );
                
                // 延迟设置位置和事件
                setTimeout(function() {
                    try {
                        if (floatyWindow) {
                            floatyWindow.setPosition(
                                floatyConfig.INITIAL_POSITION.X, 
                                floatyConfig.INITIAL_POSITION.Y
                            );
                            
                            // 设置圆形背景
                            try {
                                var button = floatyWindow.mainButton;
                                var drawable = new android.graphics.drawable.GradientDrawable();
                                drawable.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                                drawable.setColor(android.graphics.Color.parseColor("#4CAF50"));
                                button.setBackground(drawable);
                                console.log('悬浮窗: 成功设置圆形背景');
                            } catch (e) {
                                console.warn('悬浮窗: 设置圆形背景失败', e.message);
                            }
                            
                            // 添加拖动功能
                            addDragFunctionality(floatyWindow);
                        }
                    } catch (e) {
                        console.error('悬浮窗: 设置悬浮窗属性失败', e.message);
                    }
                }, 200);
                
                isFloatyEnabled = true;
                isFloatyExpanded = false;
                toast("悬浮图标已显示");
                
                return true;
            } catch (e) {
                console.error('悬浮窗: 创建悬浮窗失败', e.message);
                toast("创建悬浮图标失败，可能需要悬浮窗权限");
                isFloatyEnabled = false;
                return false;
            }
        });
        
        // 移除悬浮窗
        jsBridge.handle('floatyManager.remove', function(event) {
            return removeFloatyWindow();
        });
        
        // 内部函数：移除浮动窗口
        function removeFloatyWindow() {
            try {
                // 先收起所有扩展按钮
                collapseFloatyMenu();
                
                // 关闭悬浮 WebView 窗口
                closeFloatyWebView();
                
                // 关闭主悬浮窗
                if (floatyWindow) {
                    floatyWindow.close();
                    floatyWindow = null;
                }
                
                isFloatyEnabled = false;
                isFloatyExpanded = false;
                toast("悬浮图标已关闭");
                return true;
            } catch (e) {
                console.error('悬浮窗: 关闭悬浮窗失败', e.message);
                return false;
            }
        }
        
        // ==================== 拖动功能 ====================
        
        // 内部函数：添加拖动功能到悬浮窗
        function addDragFunctionality(window) {
            try {
                var button = window.mainButton;
                var startX = 0, startY = 0;
                var windowX = 0, windowY = 0;
                var isDragging = false;
                var startTime = 0;
                
                // 监听触摸事件
                button.setOnTouchListener(function(view, event) {
                    try {
                        switch(event.getAction()) {
                            case android.view.MotionEvent.ACTION_DOWN:
                                // 记录开始位置和时间
                                startX = event.getRawX();
                                startY = event.getRawY();
                                windowX = window.getX();
                                windowY = window.getY();
                                isDragging = false;
                                startTime = Date.now();
                                return true;
                            
                            case android.view.MotionEvent.ACTION_MOVE:
                                // 计算移动距离
                                var deltaX = event.getRawX() - startX;
                                var deltaY = event.getRawY() - startY;
                                var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                                
                                // 如果移动距离超过阈值，开始拖动
                                if (distance > 10 && !isDragging) {
                                    isDragging = true;
                                    // 拖动开始时，先隐藏展开的悬浮菜单
                                    if (isFloatyExpanded) {
                                        collapseFloatyMenu();
                                    }
                                }
                                
                                if (isDragging) {
                                    // 更新悬浮窗位置
                                    var newX = windowX + deltaX;
                                    var newY = windowY + deltaY;
                                    
                                    // 获取屏幕尺寸限制位置
                                    var screenWidth = context.getResources().getDisplayMetrics().widthPixels;
                                    var screenHeight = context.getResources().getDisplayMetrics().heightPixels;
                                    var buttonWidth = button.getWidth();
                                    var buttonHeight = button.getHeight();
                                    
                                    // 限制在屏幕范围内
                                    var clampedX = Math.max(0, Math.min(newX, screenWidth - buttonWidth));
                                    var clampedY = Math.max(0, Math.min(newY, screenHeight - buttonHeight));
                                    
                                    window.setPosition(clampedX, clampedY);
                                }
                                return true;
                            
                            case android.view.MotionEvent.ACTION_UP:
                                var endTime = Date.now();
                                var touchDuration = endTime - startTime;
                                
                                // 如果没有拖动且触摸时间较短，触发点击事件
                                if (!isDragging && touchDuration < 300) {
                                    // 延迟一点执行点击，避免与拖动冲突
                                    setTimeout(function() {
                                        toggleFloatyMenu();
                                    }, 50);
                                } else if (isDragging) {
                                    // 拖动结束，添加吸边效果
                                    snapToEdge(window);
                                }
                                
                                isDragging = false;
                                return true;
                        }
                    } catch (e) {
                        console.error('悬浮窗: 拖动事件处理失败', e.message);
                    }
                    return false;
                });
                
                console.log('悬浮窗: 拖动功能添加成功');
            } catch (e) {
                console.error('悬浮窗: 添加拖动功能失败', e.message);
            }
        }
        
        // 内部函数：悬浮窗吸边效果
        function snapToEdge(window) {
            try {
                var screenWidth = context.getResources().getDisplayMetrics().widthPixels;
                var currentX = window.getX();
                var currentY = window.getY();
                var buttonWidth = 48 * context.getResources().getDisplayMetrics().density; // 48dp转px
                
                // 判断吸向左边还是右边
                var centerX = currentX + buttonWidth / 2;
                var targetX;
                
                if (centerX < screenWidth / 2) {
                    // 吸向左边
                    targetX = 0;
                } else {
                    // 吸向右边
                    targetX = screenWidth - buttonWidth;
                }
                
                // 平滑移动到边缘
                var animator = android.animation.ValueAnimator.ofFloat(currentX, targetX);
                animator.setDuration(200);
                animator.addUpdateListener(new android.animation.ValueAnimator.AnimatorUpdateListener({
                    onAnimationUpdate: function(animation) {
                        try {
                            var animatedValue = animation.getAnimatedValue();
                            window.setPosition(animatedValue, currentY);
                        } catch (e) {
                            console.error('悬浮窗: 动画更新失败', e.message);
                        }
                    }
                }));
                animator.start();
                
                console.log('悬浮窗: 悬浮窗吸边完成');
            } catch (e) {
                console.error('悬浮窗: 悬浮窗吸边失败', e.message);
            }
        }
        
        // ==================== 菜单展开/收起 ====================
        
        // 切换悬浮菜单
        jsBridge.handle('floatyManager.toggleMenu', function(event) {
            toggleFloatyMenu();
            return true;
        });
        
        // 展开悬浮菜单
        jsBridge.handle('floatyManager.expandMenu', function(event) {
            expandFloatyMenu();
            return true;
        });
        
        // 收起悬浮菜单
        jsBridge.handle('floatyManager.collapseMenu', function(event) {
            collapseFloatyMenu();
            return true;
        });
        
        // 内部函数：切换悬浮菜单的展开/收起
        function toggleFloatyMenu() {
            if (isFloatyExpanded) {
                collapseFloatyMenu();
            } else {
                expandFloatyMenu();
            }
        }
        
        // 内部函数：展开悬浮菜单
        function expandFloatyMenu() {
            try {
                // 清除现有的按钮
                collapseFloatyMenu();
                
                // 获取主按钮位置
                var mainX = floatyWindow.getX();
                var mainY = floatyWindow.getY();
                
                // 使用外部的 isScriptRunning 状态变量，不要创建局部变量
                console.log('悬浮窗: 当前脚本状态 =', isScriptRunning);
                
                // 创建功能按钮配置
                var buttons = [
                    {
                        text: isScriptRunning ? "⏹️" : "▶️",
                        color: isScriptRunning ? "#f44336" : "#FF9800",
                        action: "toggle"
                    },   // 启动/停止
                    { text: "📋", color: "#2196F3", action: "log" },      // 日志
                    { text: "⚙️", color: "#4CAF50", action: "config" },   // 配置
                    { text: "❌", color: "#666666", action: "close" }     // 关闭
                ];
                
                // 180度半圆分布参数
                var radius = 120; // 半径距离
                var startAngle = -90; // 起始角度：从上方开始
                var totalAngle = 180; // 总角度：180度半圆
                var angleStep = totalAngle / (buttons.length - 1);
                
                // 创建每个按钮（带扩散动画）
                buttons.forEach(function(btn, index) {
                    setTimeout(function() {
                        try {
                            // 计算按钮目标位置（180度半圆分布）
                            var angle = startAngle + index * angleStep;
                            var angleRad = angle * Math.PI / 180;
                            var targetOffsetX = Math.cos(angleRad) * radius;
                            var targetOffsetY = Math.sin(angleRad) * radius;
                            var targetX = mainX + targetOffsetX;
                            var targetY = mainY + targetOffsetY;
                            
                            // 创建按钮
                            var button = floaty.window(
                                <button text={btn.text} textSize="14sp" textColor="#ffffff"
                                        bg={btn.color} w="36dp" h="36dp"
                                        id="actionBtn" alpha="0"/>
                            );
                            
                            // 初始位置设置在主按钮中心
                            button.setPosition(mainX, mainY);
                            
                            // 设置圆形背景和动画
                            setTimeout(function() {
                                try {
                                    var actionButton = button.actionBtn;
                                    
                                    // 设置圆形背景
                                    var drawable = new android.graphics.drawable.GradientDrawable();
                                    drawable.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                                    drawable.setColor(android.graphics.Color.parseColor(btn.color));
                                    actionButton.setBackground(drawable);
                                    
                                    // 创建扩散动画（位置 + 透明度）
                                    var animator = android.animation.ValueAnimator.ofFloat(0, 1);
                                    animator.setDuration(300); // 动画持续300ms
                                    animator.setInterpolator(new android.view.animation.DecelerateInterpolator());
                                    
                                    animator.addUpdateListener(new android.animation.ValueAnimator.AnimatorUpdateListener({
                                        onAnimationUpdate: function(animation) {
                                            try {
                                                var progress = animation.getAnimatedValue();
                                                
                                                // 计算当前位置
                                                var currentX = mainX + targetOffsetX * progress;
                                                var currentY = mainY + targetOffsetY * progress;
                                                button.setPosition(currentX, currentY);
                                                
                                                // 设置透明度
                                                actionButton.setAlpha(progress);
                                            } catch (e) {
                                                console.warn('悬浮窗: 动画更新失败', e.message);
                                            }
                                        }
                                    }));
                                    
                                    animator.start();
                                    
                                } catch (e) {
                                    console.warn('悬浮窗: 设置功能按钮圆形背景或动画失败', e.message);
                                    // 失败时直接设置到目标位置
                                    button.setPosition(targetX, targetY);
                                    button.actionBtn.setAlpha(1);
                                }
                            }, 50);
                            
                            // 添加点击事件
                            button.actionBtn.click(function() {
                                // 根据不同的 action 处理
                                switch (btn.action) {
                                    case 'toggle':
                                        // 先关闭当前菜单
                                        collapseFloatyMenu();
                                        
                                        // 切换脚本运行状态（在子线程中执行以避免 NetworkOnMainThreadException）
                                        threads.start(function() {
                                            var success = false;
                                            if (isScriptRunning) {
                                                success = stopTargetScript();
                                            } else {
                                                success = startTargetScript();
                                            }
                                            
                                            // 延迟重新展开菜单以显示新状态
                                            setTimeout(function() {
                                                if (floatyWindow && success) {
                                                    // 使用 ui.run() 确保在主线程中执行 UI 操作
                                                    ui.run(function() {
                                                        expandFloatyMenu();
                                                    });
                                                } else if (!success) {
                                                    // 操作失败，收起菜单（也在主线程中执行）
                                                    ui.run(function() {
                                                        collapseFloatyMenu();
                                                    });
                                                }
                                            }, 300);
                                        });
                                        break;
                                        
                                    case 'log':
                                        collapseFloatyMenu();
                                        console.show()
                                        break;
                                        
                                    case 'config':
                                        collapseFloatyMenu();
                                        // 显示悬浮 WebView 配置窗口
                                        showFloatyWebView();
                                        break;
                                        
                                    case 'close':
                                        // 关闭悬浮窗 - 本地处理
                                        removeFloatyWindow();
                                        break;
                                        
                                    default:
                                        console.warn('悬浮窗: 未知的动作', btn.action);
                                        collapseFloatyMenu();
                                }
                            });
                            
                            floatyButtons.push(button);
                        } catch (e) {
                            console.warn('悬浮窗: 创建悬浮按钮失败', e.message);
                        }
                    }, 0);
                });
                
                isFloatyExpanded = true;
                
            } catch (e) {
                console.error('悬浮窗: 展开悬浮菜单失败', e.message);
            }
        }
        
        // 内部函数：收起悬浮菜单
        function collapseFloatyMenu() {
            try {
                floatyButtons.forEach(function(button) {
                    if (button) {
                        button.close();
                    }
                });
                floatyButtons = [];
                isFloatyExpanded = false;
            } catch (e) {
                console.warn('悬浮窗: 收起悬浮菜单失败', e.message);
            }
        }
        
        // ==================== 更新按钮状态 ====================
        
        // 更新脚本状态按钮
        jsBridge.handle('floatyManager.updateScriptButton', function(event, isRunning) {
            try {
                if (isFloatyExpanded && floatyButtons.length > 0) {
                    // 重新展开菜单以更新按钮状态
                    collapseFloatyMenu();
                    expandFloatyMenu();
                }
                return true;
            } catch (e) {
                console.error('悬浮窗: 更新脚本按钮失败', e.message);
                return false;
            }
        });
        
        // ==================== 脚本启动/停止功能 ====================
        
        /**
         * 启动目标脚本
         * 支持插件模式（内存模块）和开发模式（文件）
         */
        function startTargetScript() {
            if (isScriptRunning) {
                console.warn('悬浮窗: 脚本已在运行中');
                toast('脚本已在运行中');
                return false;
            }
            
            if (!targetScriptPath) {
                console.error('悬浮窗: 未设置目标脚本路径');
                toast('未设置目标脚本');
                return false;
            }
            
            try {

                // 执行预检查,检查token和版本以及设备数这些是否合规，不合规，不允许执行脚本
                var preCheckData = self.preCheck();
                if (!preCheckData) {
                    toast('预检查失败');
                    return false;
                }
                                
                // ==================== 3. 启动脚本 ====================
                
                // 检测是否为插件模式（内存模块）
                var isMemoryMode = typeof $registry !== 'undefined' && $registry !== null;
                
                if (isMemoryMode) {
                    // 插件模式：使用带内存模块的新引擎执行
                    console.log('悬浮窗: 插件模式 - 创建带内存模块的新引擎');
                    
                    try {
                        // 创建业务脚本，使用 __memory_require__ 加载内存模块
                        var businessScript = [
                            'console.log("业务引擎: 启动");',
                            'console.log("业务引擎: 加载模块 ' + targetScriptPath + '");',
                            '',
                            'try {',
                            '  // 使用 __memory_require__ 从内存加载模块',
                            '  var module = __memory_require__("' + targetScriptPath + '");',
                            '  console.log("业务引擎: 模块加载成功，类型 = " + typeof module);',
                            '  ',
                            '  // 根据模块导出的类型执行',
                            '  if (typeof module === "function") {',
                            '    console.log("业务引擎: 执行模块函数");',
                            '    module();',
                            '  } else if (module && typeof module.main === "function") {',
                            '    console.log("业务引擎: 执行 module.main()");',
                            '    module.main();',
                            '  } else if (module && typeof module.start === "function") {',
                            '    console.log("业务引擎: 执行 module.start()");',
                            '    module.start();',
                            '  } else if (module && typeof module.run === "function") {',
                            '    console.log("业务引擎: 执行 module.run()");',
                            '    module.run();',
                            '  } else {',
                            '    console.warn("业务引擎: 模块未导出可执行函数");',
                            '    console.warn("业务引擎: 模块内容 = " + JSON.stringify(Object.keys(module || {})));',
                            '  }',
                            '  ',
                            '  console.log("业务引擎: 执行完成");',
                            '} catch (e) {',
                            '  console.error("业务引擎: 执行失败");',
                            '  console.error("业务引擎: 错误信息 = " + e.message);',
                            '  console.error("业务引擎: 错误堆栈 = " + (e.stack || "无堆栈信息"));',
                            '  throw e;',
                            '}'
                        ].join('\n');
                        
                        // 使用 execScriptWithMemoryModules 执行脚本
                        // 该方法支持通过 __memory_require__ 加载内存中的多个模块
                        console.log('悬浮窗: 调用 runtime.engines.execScriptWithMemoryModules');
                        console.log('悬浮窗: 目标模块路径 =', targetScriptPath);
                        
                        // 提取脚本名称（从路径中获取，去掉 .js 扩展名）
                        var scriptName = targetScriptPath.replace(/\.js$/i, '').split('/').pop();
                        
                        scriptExecution = engines.execScriptWithMemoryModules(
                            '业务脚本 - ' + scriptName,
                            businessScript,
                            $registry
                        );
                        
                        console.log('悬浮窗: 业务引擎已创建，执行ID =', scriptExecution.id);
                        
                        // 等待一小段时间检查引擎是否立即失败
                        sleep(300);
                        
                        var engine = scriptExecution.getEngine();
                        if (!engine || engine.isDestroyed()) {
                            console.error('悬浮窗: 引擎初始化失败（引擎已销毁）');
                            toast('引擎初始化失败');
                            
                            // 重置状态
                            isScriptRunning = false;
                            scriptExecution = null;
                            
                            return false;
                        }
                        
                        console.log('悬浮窗: 引擎初始化成功');
                        
                    } catch (e) {
                        console.error('悬浮窗: 创建业务引擎失败', e.message);
                        console.error(e.stack || e);
                        toast('创建引擎失败: ' + e.message);
                        
                        // 重置状态
                        isScriptRunning = false;
                        scriptExecution = null;
                        
                        return false;
                    }
                } else {
                    // 开发模式：从文件系统加载
                    console.log('悬浮窗: 开发模式 - 从文件系统加载');
                    
                    var fullPath = files.path(targetScriptPath);
                    if (!files.exists(fullPath)) {
                        console.error('悬浮窗: 脚本文件不存在 =', fullPath);
                        toast('脚本文件不存在');
                        
                        // 重置状态
                        isScriptRunning = false;
                        scriptExecution = null;
                        
                        return false;
                    }
                    
                    scriptExecution = engines.execScriptFile(fullPath, {
                        path: [files.cwd()]
                    });
                    
                    // 等待一小段时间检查引擎是否立即失败
                    sleep(300);
                    
                    var engine = scriptExecution.getEngine();
                    if (!engine || engine.isDestroyed()) {
                        console.error('悬浮窗: 引擎初始化失败（引擎已销毁）');
                        toast('引擎初始化失败');
                        
                        // 重置状态
                        isScriptRunning = false;
                        scriptExecution = null;
                        
                        return false;
                    }
                }
                
                isScriptRunning = true;
                console.log('悬浮窗: 脚本启动成功，执行ID =', scriptExecution.id);
                toast('脚本已启动');
                
                // 监听脚本结束
                setTimeout(function() {
                    monitorScriptExecution();
                }, 1000);
                
                return true;
                
            } catch (e) {
                console.error('悬浮窗: 启动脚本失败', e.message);
                toast('启动失败: ' + e.message);
                isScriptRunning = false;
                scriptExecution = null;
                return false;
            }
        }
        
        /**
         * 停止目标脚本
         */
        function stopTargetScript() {
            if (!isScriptRunning || !scriptExecution) {
                console.warn('悬浮窗: 没有正在运行的脚本');
                toast('没有正在运行的脚本');
                return false;
            }
            
            try {
                console.log('悬浮窗: 停止脚本，执行ID =', scriptExecution.id);
                
                // 获取脚本引擎并强制停止
                var engine = scriptExecution.getEngine();
                if (engine) {
                    engine.forceStop();
                    console.log('悬浮窗: 脚本引擎已停止');
                } else {
                    console.warn('悬浮窗: 无法获取脚本引擎');
                }
                
                isScriptRunning = false;
                scriptExecution = null;
                toast('脚本已停止');
                
                return true;
                
            } catch (e) {
                console.error('悬浮窗: 停止脚本失败', e.message);
                toast('停止失败: ' + e.message);
                return false;
            }
        }
        
        /**
         * 监控脚本执行状态
         * 如果脚本自然结束，更新状态
         */
        function monitorScriptExecution() {
            if (!scriptExecution) return;
            
            try {
                var engine = scriptExecution.getEngine();
                if (engine && engine.isDestroyed()) {
                    console.log('悬浮窗: 检测到脚本已结束');
                    isScriptRunning = false;
                    scriptExecution = null;
                    
                    // 更新悬浮窗按钮状态
                    if (isFloatyExpanded && floatyButtons.length > 0) {
                        ui.run(function() {
                            console.log('悬浮窗: 更新按钮状态');
                            collapseFloatyMenu();
                            expandFloatyMenu();
                        });
                    }
                    
                    // 提示用户脚本已结束
                    toast('脚本已结束');
                } else if (isScriptRunning) {
                    // 继续监控
                    setTimeout(function() {
                        monitorScriptExecution();
                    }, 2000);
                }
            } catch (e) {
                console.warn('悬浮窗: 监控脚本状态失败', e.message);
                isScriptRunning = false;
                scriptExecution = null;
                
                // 更新悬浮窗按钮状态
                if (isFloatyExpanded && floatyButtons.length > 0) {
                    ui.run(function() {
                        collapseFloatyMenu();
                        expandFloatyMenu();
                    });
                }
            }
        }
        
        // ==================== 悬浮 WebView 窗口 Handler ====================
        
        // 注册 handler：显示悬浮 WebView
        jsBridge.handle('floatyManager.showWebView', function(event) {
            showFloatyWebView();
            return true;
        });
        
        // 注册 handler：关闭悬浮 WebView
        jsBridge.handle('floatyManager.closeWebView', function(event) {
            closeFloatyWebView();
            return true;
        });
    }
};

