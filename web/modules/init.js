/**
 * RichAuto 模块初始化
 * 动态加载所有模块并初始化
 */

(function(window) {
    'use strict';
    
    // 模块配置列表
    var moduleFiles = [
        'modules/global.js',
        'modules/automator.js',
        'modules/uiselector.js',
        'modules/richauto.js',
        'modules/app.js',
        'modules/color.js',
        'modules/image.js',
        'modules/ocr.js',
        'modules/keys.js',
        'modules/device.js',
        'modules/storages.js',
        'modules/files.js',
        'modules/engines.js',
        'modules/notice.js',
        'modules/floaty.js',
        'modules/floaty-manager.js',
        'modules/http.js',
        'modules/base64.js'
        // TODO: 后续添加更多模块
        // 'modules/ui.js'
    ];
    
    // 加载进度跟踪
    var loadedCount = 0;
    var totalCount = moduleFiles.length;
    
    /**
     * 初始化进度显示
     */
    function initProgress() {
        var progressDetail = document.getElementById('loading-detail');
        if (progressDetail) {
            progressDetail.textContent = '0 / ' + totalCount;
        }
    }
    
    /**
     * 更新加载进度
     */
    function updateProgress() {
        loadedCount++;
        var progressBar = document.getElementById('loading-progress-bar');
        var progressDetail = document.getElementById('loading-detail');
        
        if (progressBar) {
            var percent = (loadedCount / totalCount) * 100;
            progressBar.style.width = percent + '%';
        }
        
        if (progressDetail) {
            progressDetail.textContent = loadedCount + ' / ' + totalCount;
        }
    }
    
    /**
     * 隐藏加载动画
     */
    function hideLoading() {
        var overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            // 动画结束后移除元素
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 300);
        }
    }
    
    /**
     * 动态加载脚本文件
     * @param {string} url - 脚本路径
     * @returns {Promise}
     */
    function loadScript(url) {
        return new Promise(function(resolve, reject) {
            console.log('$richauto ==null?',$richauto )
            // 检测是否在 RichAuto WebView 环境中（插件模式或开发模式）
            if (typeof $richauto !== 'undefined') {
                // 使用 jsBridge 加载脚本内容
                $richauto.invoke('fetch', { path: url })
                    .then(function(content) {
                        if (!content) {
                            throw new Error('Empty content for: ' + url);
                        }
                        
                        try {
                            // 使用 eval 执行脚本内容
                            // 添加 sourceURL 以便调试
                            eval(content + '\n//# sourceURL=' + url);
                            console.log('模块已加载: ' + url);
                            updateProgress(); // 更新进度
                            resolve();
                        } catch (e) {
                            console.error('模块执行失败: ' + url, e);
                            reject(e);
                        }
                    })
                    .catch(function(error) {
                        console.error('模块加载失败: ' + url, error);
                        reject(new Error('Failed to load script: ' + url));
                    });
            } else {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                
                script.onload = function() {
                    console.log('模块已加载: ' + url);
                    updateProgress(); // 更新进度
                    resolve();
                };
                
                script.onerror = function() {
                    console.error('模块加载失败: ' + url);
                    reject(new Error('Failed to load script: ' + url));
                };
                
                document.head.appendChild(script);
            }
        });
    }
    
    /**
     * 按顺序加载所有模块（安全但较慢）
     */
    function loadAllModulesSequential() {
        // 使用 reduce 来实现按顺序加载
        return moduleFiles.reduce(function(promise, file) {
            return promise.then(function() {
                return loadScript(file);
            });
        }, Promise.resolve());
    }
    
    /**
     * 并行加载所有模块（快速但可能有依赖问题）
     * 如果模块之间没有依赖关系，可以大幅提升加载速度
     */
    function loadAllModulesParallel() {
        // 并行加载所有模块
        return Promise.all(moduleFiles.map(function(file) {
            return loadScript(file);
        }));
    }
    
    /**
     * 加载所有模块
     * @param {boolean} parallel - 是否并行加载，默认 false（顺序加载更安全）
     */
    function loadAllModules(parallel) {
        // 默认使用顺序加载以确保模块依赖关系正确
        if (parallel === undefined) {
            parallel = false;
        }
        
        return parallel ? loadAllModulesParallel() : loadAllModulesSequential();
    }
    
    /**
     * 初始化 richauto 对象
     */
    function initAutoJS() {
        // 确保所有模块都已加载
        if (!window.__richauto_modules) {
            console.error('RichAuto 模块未加载！');
            return;
        }
        
        // 先从 richauto 模块中获取本体应用的方法
        var richautoAppModule = window.__richauto_modules.richauto || {};
        
        // 组合所有模块到 richauto 对象
        window.richauto = {
            // global、automator、uiselector、app、color、image、ocr、keys、device、storages 和 files 作为子模块
            global: window.__richauto_modules.global || {},
            automator: window.__richauto_modules.automator || {},
            uiselector: window.__richauto_modules.uiselector || {},
            app: window.__richauto_modules.app || {},
            color: window.__richauto_modules.color || {},
            image: window.__richauto_modules.image || {},
            ocr: window.__richauto_modules.ocr || {},
            keys: window.__richauto_modules.keys || {},
            device: window.__richauto_modules.device || {},
            storages: window.__richauto_modules.storages || {},
            files: window.__richauto_modules.files || {},
            engines: window.__richauto_modules.engines || {},
            notice: window.__richauto_modules.notice || {},
            floaty: window.__richauto_modules.floaty || {},
            floatyManager: window.__richauto_modules.floatyManager || {},
            http: window.__richauto_modules.http || {},
            base64: window.__richauto_modules.base64 || {}
            
            // 模块会自动添加，无需手动维护
        };
        
        // 将 richauto 本体应用的方法直接挂载到 window.richauto 上
        for (var key in richautoAppModule) {
            if (richautoAppModule.hasOwnProperty(key)) {
                window.richauto[key] = richautoAppModule[key];
            }
        }
        
        // 清理临时命名空间（可选）
        // delete window.__richauto_modules;
        
        console.log('RichAuto 模块初始化完成');
        
        // 标记 richauto 已就绪
        window.__richauto_ready = true;
        
        // 触发自定义事件，通知模块加载完成
        if (typeof Event === 'function') {
            window.dispatchEvent(new Event('richauto-ready'));
        }
    }
    
    // 初始化进度显示
    initProgress();
    
    // 暴露 hideLoading 到全局，以便 Vue 应用加载完成后调用
    window.__hideLoading = hideLoading;
    
    // 开始加载模块
    // 使用顺序加载以确保模块依赖关系正确（如果需要更快速度，可以改为 true 使用并行加载）
    loadAllModules(false)
        .then(function() {
            initAutoJS();
            // 不在这里隐藏加载动画，等 Vue 应用完全加载后再隐藏
        })
        .catch(function(error) {
            console.error('模块加载失败:', error);
            hideLoading(); // 失败时才隐藏加载动画
        });
    
})(window);
