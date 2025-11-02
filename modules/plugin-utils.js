/**
 * 插件工具模块 - 处理插件模式和开发模式的兼容性
 */

module.exports = {
    /**
     * 检测是否运行在插件模式下
     * @returns {boolean} 是否为插件模式
     */
    isPluginMode: function() {
        return typeof $registry !== 'undefined' && $registry !== null;
    },
    
    /**
     * 读取文本资源（兼容插件和开发模式）
     * @param {string} relativePath - 相对路径，如 'web/index.html'
     * @returns {string|null} 文本内容
     */
    readTextResource: function(relativePath) {
        if (this.isPluginMode()) {
            // 插件模式：从加密的 registry 读取
            try {
                var content = $registry.getDecryptedScript(relativePath);
                if (content !== null) {
                    console.log('[Plugin] 从内存读取: ' + relativePath);
                    return content;
                }
            } catch (e) {
                console.error('[Plugin] 读取失败: ' + relativePath, e);
            }
        }
        
        // 开发模式：从文件系统读取
        try {
            var fullPath = files.path(relativePath);
            if (files.exists(fullPath)) {
                console.log('[Dev] 从文件系统读取: ' + fullPath);
                return files.read(fullPath);
            }
        } catch (e) {
            console.error('[Dev] 读取失败: ' + relativePath, e);
        }
        
        return null;
    },
    
    /**
     * @param {string} relativePath - 相对路径
     * @returns {Image|null} 图片对象
    */
    readResourceAsImage: function(relativePath) {
        let bytes = this.readBinaryResource(relativePath);
        if (bytes) {
            return images.fromBytes(bytes);
        }
        return null;
    },
    /**
     * 读取二进制资源（如图片、字体）
     * @param {string} relativePath - 相对路径
     * @returns {ByteArray|null} 字节数组
     */
    readBinaryResource: function(relativePath) {
        if (this.isPluginMode()) {
            // 插件模式：从加密的 registry 读取
            try {
                var bytes = $registry.getDecryptedBytes(relativePath);
                if (bytes !== null) {
                    console.log('[Plugin] 从内存读取二进制: ' + relativePath);
                    return bytes;
                }
            } catch (e) {
                console.error('[Plugin] 读取二进制失败: ' + relativePath, e);
            }
        }
        
        // 开发模式：从文件系统读取
        try {
            var fullPath = files.path(relativePath);
            if (files.exists(fullPath)) {
                console.log('[Dev] 从文件系统读取二进制: ' + fullPath);
                return files.readBytes(fullPath);
            }
        } catch (e) {
            console.error('[Dev] 读取二进制失败: ' + relativePath, e);
        }
        
        return null;
    },
    
    /**
     * 将二进制数据转换为 Base64 Data URI
     * @param {ByteArray} bytes - 字节数组
     * @param {string} mimeType - MIME类型，如 'image/png'
     * @returns {string} Data URI
     */
    toDataUri: function(bytes, mimeType) {
        if (!bytes) return null;
        
        try {
            // 使用 Android 的 Base64 编码
            var base64 = android.util.Base64.encodeToString(
                bytes, 
                android.util.Base64.NO_WRAP
            );
            return 'data:' + mimeType + ';base64,' + base64;
        } catch (e) {
            console.error('Base64编码失败:', e);
            return null;
        }
    },
    
    /**
     * 根据文件扩展名获取 MIME 类型
     * @param {string} filename - 文件名或路径
     * @returns {string} MIME类型
     */
    getMimeType: function(filename) {
        var ext = filename.split('.').pop().toLowerCase();
        
        var mimeTypes = {
            // 图片
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'webp': 'image/webp',
            'ico': 'image/x-icon',
            
            // 文本/脚本
            'html': 'text/html',
            'htm': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'json': 'application/json',
            'vue': 'text/plain',
            'txt': 'text/plain',
            'md': 'text/markdown',
            
            // 字体
            'ttf': 'font/ttf',
            'otf': 'font/otf',
            'woff': 'font/woff',
            'woff2': 'font/woff2',
            'eot': 'application/vnd.ms-fontobject'
        };
        
        return mimeTypes[ext] || 'application/octet-stream';
    },
    
    /**
     * 检查是否为二进制文件
     * @param {string} filename - 文件名或路径
     * @returns {boolean}
     */
    isBinaryFile: function(filename) {
        var ext = filename.split('.').pop().toLowerCase();
        var binaryExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'ico', 'ttf', 'otf', 'woff', 'woff2', 'eot'];
        return binaryExts.indexOf(ext) !== -1;
    },
    
    /**
     * 智能读取资源（自动判断文本/二进制）
     * @param {string} relativePath - 相对路径
     * @param {boolean} asDataUri - 如果是二进制文件，是否返回 Data URI（默认 false）
     * @returns {string|ByteArray|null}
     */
    readResource: function(relativePath, asDataUri) {
        if (this.isBinaryFile(relativePath)) {
            var bytes = this.readBinaryResource(relativePath);
            if (asDataUri && bytes) {
                var mimeType = this.getMimeType(relativePath);
                return this.toDataUri(bytes, mimeType);
            }
            return bytes;
        } else {
            return this.readTextResource(relativePath);
        }
    },
    
    /**
     * 获取工作目录路径（仅开发模式有效）
     * @returns {string}
     */
    getCwd: function() {
        if (this.isPluginMode()) {
            return 'memory://';
        }
        return files.cwd();
    },
    
    /**
     * 获取脚本列表（仅插件模式）
     * @returns {Array<string>}
     */
    getScriptPaths: function() {
        if (this.isPluginMode() && typeof $registry.getScriptPaths === 'function') {
            try {
                var paths = $registry.getScriptPaths();
                // 转换 Java 数组为 JS 数组
                var arr = [];
                for (var i = 0; i < paths.length; i++) {
                    arr.push(String(paths[i]));
                }
                return arr;
            } catch (e) {
                console.error('获取脚本列表失败:', e);
            }
        }
        return [];
    },
    
    /**
     * 打印调试信息
     */
    printDebugInfo: function() {
        console.log('===== 插件工具调试信息 =====');
        console.log('运行模式:', this.isPluginMode() ? '插件模式' : '开发模式');
        console.log('工作目录:', this.getCwd());
        
        if (this.isPluginMode()) {
            console.log('可用脚本数:', this.getScriptPaths().length);
            console.log('脚本列表:', JSON.stringify(this.getScriptPaths(), null, 2));
        }
        
        console.log('============================');
    },
    
    /**
     * 初始化 WebView（通用方法）
     * @param {WebView} webview - WebView 对象
     * @param {Object} moduleRegister - 模块注册器对象
     * @param {string} htmlPath - HTML 文件路径（必填，如 'web/index.html'）
     * @param {Object} options - 可选配置
     * @param {boolean} options.enableConsoleLog - 是否启用控制台日志监听（默认 true）
     * @param {boolean} options.disableCache - 是否禁用缓存（默认 true）
     */
    initWebView: function(webview, moduleRegister, htmlPath, options) {
        var self = this;
        options = options || {};
        var enableConsoleLog = options.enableConsoleLog !== false;
        var disableCache = options.disableCache !== false;
        
        // 0. 配置 WebView 缓存设置
        if (disableCache) {
            try {
                var settings = webview.getSettings();
                // 禁用所有缓存
                settings.setCacheMode(android.webkit.WebSettings.LOAD_NO_CACHE);
                // 禁用应用缓存
                settings.setAppCacheEnabled(false);
                // 清除缓存
                webview.clearCache(true);
                console.log('[WebView] 缓存已禁用');
            } catch (e) {
                console.error('[WebView] 禁用缓存失败:', e);
            }
        }
        
        // 1. 设置 WebViewClient 来拦截资源请求（插件模式）
        if (self.isPluginMode()) {
            try {
                var PluginWebViewClient = org.autojs.autojs.core.plugin.PluginWebViewClient;
                var webViewClient = new PluginWebViewClient($registry, "web/", context);
                webview.setWebViewClient(webViewClient);
                console.log('[Plugin] 已设置 PluginWebViewClient，支持加载加密资源');
            } catch (e) {
                console.error('[Plugin] 设置 PluginWebViewClient 失败:', e);
            }
        }
        
        // 2. 根据运行模式加载 WebView 内容
        if (self.isPluginMode()) {
            // 插件模式：从内存加载 HTML
            console.log('[Plugin] 从内存加载 WebView 内容...');
            var htmlContent = self.readTextResource(htmlPath);
            if (htmlContent) {
                // 读取 init.js 并内联到 HTML 中
                // 因为 <script src> 标签不会触发 jsBridge fetch handler
                var initJs = self.readTextResource('web/modules/init.js');
                if (initJs) {
                    // 替换 <script src="modules/init.js"></script> 为内联脚本
                    htmlContent = htmlContent.replace(
                        '<script src="modules/init.js"></script>',
                        '<script>\n' + initJs + '\n</script>'
                    );
                    console.log('[Plugin] 已内联 init.js');
                } else {
                    console.warn('[Plugin] 无法读取 init.js，可能导致模块加载失败');
                }
                
                // 使用 memory:// 作为 baseURL，这样相对路径会被解析为 memory://web/xxx
                webview.loadDataWithBaseURL(
                    'memory://web/',
                    htmlContent,
                    'text/html',
                    'UTF-8',
                    null
                );
                console.log('[Plugin] WebView 内容加载完成');
            } else {
                console.error('[Plugin] 无法读取 ' + htmlPath);
                toast('插件加载失败：无法读取HTML内容');
            }
        } else {
            // 开发模式：使用文件路径
            console.log('[Dev] 使用文件路径加载 WebView...');
            webview.loadUrl('file://' + files.path(htmlPath));
        }
        
        // 3. 注册所有模块的 handlers
        if (moduleRegister && moduleRegister.registerAll) {
            moduleRegister.registerAll(webview.jsBridge);
            console.log('[WebView] 模块 handlers 已注册');
        }
        
        // 4. 监听 WebView 的控制台消息
        if (enableConsoleLog) {
            webview.events.on('console_message', function(event, msg) {
                console.log(files.getName(msg.sourceId()) + ':' + msg.lineNumber() + ': ' + msg.message());
            });
            console.log('[WebView] 控制台消息监听已启用');
        }
        
        // 5. 处理读取本地文件的请求（兼容插件和开发模式）
        // 注意：这个 handler 主要用于 init.js 内部的动态加载
        // <script src> 标签的资源会被 PluginWebViewClient 拦截
        webview.jsBridge.handle('fetch', function(event, args) {
            var requestPath = args.path;
            console.log('[Fetch] 请求资源:', requestPath);
            
            // 移除前导斜杠（如果有）
            if (requestPath.startsWith('/')) {
                requestPath = requestPath.substring(1);
            }
            
            // 构建完整的相对路径
            var resourcePath = 'web/' + requestPath;
            
            // 检查是否为二进制文件（图片、字体等）
            if (self.isBinaryFile(requestPath)) {
                // 二进制文件：返回 Data URI
                console.log('[Fetch] 处理二进制资源:', requestPath);
                var dataUri = self.readResource(resourcePath, true);
                if (dataUri) {
                    console.log('[Fetch] 二进制资源加载成功 (Data URI)');
                    return dataUri;
                } else {
                    console.error('[Fetch] 二进制资源加载失败:', requestPath);
                    return null;
                }
            } else {
                // 文本文件：直接返回内容
                console.log('[Fetch] 处理文本资源:', requestPath);
                var content = self.readTextResource(resourcePath);
                if (content) {
                    console.log('[Fetch] 文本资源加载成功 (' + content.length + ' 字符)');
                    return content;
                } else {
                    console.error('[Fetch] 文本资源加载失败:', requestPath);
                    return null;
                }
            }
        });
        
        console.log('[WebView] 初始化完成');
    }
};

