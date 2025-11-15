/**
 * Floaty 模块 - 封装 RichAuto 的悬浮窗方法
 */

module.exports = {
    /**
     * 注册 floaty 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // 存储悬浮窗实例的映射表
        var floatyInstances = {};
        var instanceCounter = 0;
        
        // ==================== 创建悬浮窗 ====================
        
        // 创建包含 WebView 的悬浮窗（仅支持 HTML/Vue）
        jsBridge.handle('floaty.window', function(event, layout, options) {
            try {
                options = options || {};
                var window;
                
                // 判断是否为 Vue 组件
                if (options.type === 'vue' || options.vueComponent) {
                    // 创建包含 Vue 组件的悬浮窗
                    var vueHtml = buildVueFloatyPage(layout, options);
                    
                    window = floaty.window(
                        <webview id="webview" w={options.width || '300'} h={options.height || '400'}/>
                    );
                    
                    setTimeout(function() {
                        try {
                            var webview = window.webview;
                            if (webview) {
                                webview.getSettings().setJavaScriptEnabled(true);
                                webview.getSettings().setDomStorageEnabled(true);
                                webview.loadDataWithBaseURL(null, vueHtml, 'text/html', 'UTF-8', null);
                                console.log('Vue 悬浮窗加载成功');
                            }
                        } catch (webError) {
                            console.error('加载 Vue 内容失败:', webError);
                        }
                    }, 100);
                    
                } else {
                    // HTML 内容或 URL（默认）
                    window = floaty.window(
                        <webview id="webview" w={options.width || '300'} h={options.height || '400'}/>
                    );
                    
                    // 延迟加载 HTML 内容
                    setTimeout(function() {
                        try {
                            var webview = window.webview;
                            if (webview) {
                                // 启用 JavaScript
                                webview.getSettings().setJavaScriptEnabled(true);
                                webview.getSettings().setDomStorageEnabled(true);
                                
                                // 加载 HTML 内容
                                if (options.url || (layout.startsWith('http://') || layout.startsWith('https://'))) {
                                    // 加载 URL
                                    webview.loadUrl(options.url || layout);
                                } else {
                                    // 加载 HTML 字符串
                                    webview.loadDataWithBaseURL(null, layout, 'text/html', 'UTF-8', null);
                                }
                                
                                console.log('WebView 悬浮窗加载成功');
                            }
                        } catch (webError) {
                            console.error('加载 WebView 内容失败:', webError);
                        }
                    }, 100);
                }
                
                // 生成唯一ID并存储实例
                var instanceId = 'floaty_' + (++instanceCounter);
                floatyInstances[instanceId] = window;
                
                return instanceId;
            } catch (e) {
                console.error('创建悬浮窗失败:', e);
                return null;
            }
        });
        
        // 构建 Vue 悬浮窗页面
        function buildVueFloatyPage(vueContent, options) {
            var html = '<!DOCTYPE html><html><head>' +
                '<meta charset="UTF-8">' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                '<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>' +
                (options.vantUrl ? '<link rel="stylesheet" href="' + options.vantUrl + '">' : '') +
                (options.vantJs ? '<script src="' + options.vantJs + '"></script>' : '') +
                '<style>body { margin: 0; padding: 0; } ' + (options.css || '') + '</style>' +
                '</head><body>' +
                '<div id="app">' + vueContent + '</div>' +
                '<script>' +
                'const { createApp } = Vue;' +
                'createApp({' +
                (options.vueScript || '') +
                '}).mount("#app");' +
                '</script>' +
                '</body></html>';
            return html;
        }
        
        // 关闭所有悬浮窗
        jsBridge.handle('floaty.closeAll', function(event) {
            try {
                floaty.closeAll();
                // 清空实例映射表
                floatyInstances = {};
                return true;
            } catch (e) {
                console.error('关闭所有悬浮窗失败:', e);
                return false;
            }
        });
        
        // ==================== FloatyWindow 方法 ====================
        
        // 设置是否启用调整功能
        jsBridge.handle('floaty.setAdjustEnabled', function(event, instanceId, enabled) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.setAdjustEnabled(enabled);
                return true;
            } catch (e) {
                console.error('设置调整功能失败:', e);
                return false;
            }
        });
        
        // 设置悬浮窗位置
        jsBridge.handle('floaty.setPosition', function(event, instanceId, x, y) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.setPosition(x, y);
                return true;
            } catch (e) {
                console.error('设置悬浮窗位置失败:', e);
                return false;
            }
        });
        
        // 获取悬浮窗 X 坐标
        jsBridge.handle('floaty.getX', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return 0;
            }
            try {
                return window.getX();
            } catch (e) {
                console.error('获取 X 坐标失败:', e);
                return 0;
            }
        });
        
        // 获取悬浮窗 Y 坐标
        jsBridge.handle('floaty.getY', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return 0;
            }
            try {
                return window.getY();
            } catch (e) {
                console.error('获取 Y 坐标失败:', e);
                return 0;
            }
        });
        
        // 设置悬浮窗大小
        jsBridge.handle('floaty.setSize', function(event, instanceId, width, height) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.setSize(width, height);
                return true;
            } catch (e) {
                console.error('设置悬浮窗大小失败:', e);
                return false;
            }
        });
        
        // 获取悬浮窗宽度
        jsBridge.handle('floaty.getWidth', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return 0;
            }
            try {
                return window.getWidth();
            } catch (e) {
                console.error('获取宽度失败:', e);
                return 0;
            }
        });
        
        // 获取悬浮窗高度
        jsBridge.handle('floaty.getHeight', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return 0;
            }
            try {
                return window.getHeight();
            } catch (e) {
                console.error('获取高度失败:', e);
                return 0;
            }
        });
        
        // 关闭悬浮窗
        jsBridge.handle('floaty.close', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.close();
                // 从映射表中删除
                delete floatyInstances[instanceId];
                return true;
            } catch (e) {
                console.error('关闭悬浮窗失败:', e);
                return false;
            }
        });
        
        // 设置悬浮窗关闭时退出脚本
        jsBridge.handle('floaty.exitOnClose', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.exitOnClose();
                return true;
            } catch (e) {
                console.error('设置 exitOnClose 失败:', e);
                return false;
            }
        });
        
    }
};

