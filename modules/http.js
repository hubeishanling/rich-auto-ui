/**
 * HTTP 模块 - 封装 RichAuto 的 HTTP 请求方法
 */

module.exports = {
    /**
     * 注册 http 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== GET 请求 ====================
        
        // HTTP GET 请求 - 支持 1-3 个参数
        jsBridge.handle('http.get', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            try {
                var url = args[0];
                var options = args[1] || {};
                var callback = args[2];
                
                // 如果有回调函数，异步执行
                if (typeof callback === 'function') {
                    threads.start(function() {
                        try {
                            var response = http.get(url, options);
                            callback(response, null);
                        } catch (err) {
                            callback(null, err.message || String(err));
                        }
                    });
                    return null;
                } else {
                    // 同步执行
                    return http.get(url, options);
                }
            } catch (err) {
                console.error('HTTP GET 请求失败:', err);
                return {
                    error: err.message || String(err),
                    statusCode: -1
                };
            }
        });
        
        // ==================== POST 请求 ====================
        
        // HTTP POST 请求 - 支持 2-4 个参数
        jsBridge.handle('http.post', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            try {
                var url = args[0];
                var data = args[1];
                var options = args[2] || {};
                var callback = args[3];
                
                // 如果有回调函数，异步执行
                if (typeof callback === 'function') {
                    threads.start(function() {
                        try {
                            var response = http.post(url, data, options);
                            callback(response, null);
                        } catch (err) {
                            callback(null, err.message || String(err));
                        }
                    });
                    return null;
                } else {
                    // 同步执行
                    return http.post(url, data, options);
                }
            } catch (err) {
                console.error('HTTP POST 请求失败:', err);
                return {
                    error: err.message || String(err),
                    statusCode: -1
                };
            }
        });
        
        // ==================== POST JSON 请求 ====================
        
        // HTTP POST JSON 请求 - 支持 1-4 个参数
        jsBridge.handle('http.postJson', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            try {
                var url = args[0];
                var data = args[1] || {};
                var options = args[2] || {};
                var callback = args[3];
                
                // 如果有回调函数，异步执行
                if (typeof callback === 'function') {
                    threads.start(function() {
                        try {
                            var response = http.postJson(url, data, options);
                            callback(response, null);
                        } catch (err) {
                            callback(null, err.message || String(err));
                        }
                    });
                    return null;
                } else {
                    // 同步执行
                    return http.postJson(url, data, options);
                }
            } catch (err) {
                console.error('HTTP POST JSON 请求失败:', err);
                return {
                    error: err.message || String(err),
                    statusCode: -1
                };
            }
        });
        
        // ==================== POST Multipart 请求 ====================
        
        // HTTP POST Multipart 请求（文件上传）- 支持 2-4 个参数
        jsBridge.handle('http.postMultipart', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            try {
                var url = args[0];
                var files = args[1];
                var options = args[2] || {};
                var callback = args[3];
                
                // 处理文件参数
                var processedFiles = {};
                for (var key in files) {
                    if (files.hasOwnProperty(key)) {
                        var value = files[key];
                        // 如果是文件路径字符串，尝试打开文件
                        if (typeof value === 'string' && value.startsWith('/')) {
                            processedFiles[key] = open(value);
                        } else {
                            processedFiles[key] = value;
                        }
                    }
                }
                
                // 如果有回调函数，异步执行
                if (typeof callback === 'function') {
                    threads.start(function() {
                        try {
                            var response = http.postMultipart(url, processedFiles, options);
                            callback(response, null);
                        } catch (err) {
                            callback(null, err.message || String(err));
                        }
                    });
                    return null;
                } else {
                    // 同步执行
                    return http.postMultipart(url, processedFiles, options);
                }
            } catch (err) {
                console.error('HTTP POST Multipart 请求失败:', err);
                return {
                    error: err.message || String(err),
                    statusCode: -1
                };
            }
        });
        
        // ==================== 通用 REQUEST 请求 ====================
        
        // HTTP 通用请求 - 支持 1-3 个参数
        jsBridge.handle('http.request', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            try {
                var url = args[0];
                var options = args[1] || {};
                var callback = args[2];
                
                // 如果有回调函数，异步执行
                if (typeof callback === 'function') {
                    threads.start(function() {
                        try {
                            var response = http.request(url, options);
                            callback(response, null);
                        } catch (err) {
                            callback(null, err.message || String(err));
                        }
                    });
                    return null;
                } else {
                    // 同步执行
                    return http.request(url, options);
                }
            } catch (err) {
                console.error('HTTP REQUEST 请求失败:', err);
                return {
                    error: err.message || String(err),
                    statusCode: -1
                };
            }
        });
    }
};

