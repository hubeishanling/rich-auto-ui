/**
 * Base64 模块 - 封装 RichAuto 的 Base64 编码解码方法
 */

module.exports = {
    /**
     * 注册 base64 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== Base64 编码 ====================
        
        /**
         * Base64 编码
         * 支持 1-2 个参数:
         * encode(data) - 使用默认编码 UTF-8
         * encode(data, encoding) - 使用指定编码
         */
        jsBridge.handle('base64.encode', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            try {
                var data = args[0];
                var encoding = args[1] || 'UTF-8';
                
                // 处理不同类型的输入数据
                var result;
                if (typeof data === 'string') {
                    // 字符串直接编码
                    result = base64.encode(data, encoding);
                } else if (Array.isArray(data)) {
                    // JavaScript 字节数组，需要转换为 Java 字节数组
                    var javaArr = util.java.array('byte', data.length);
                    for (var i = 0; i < data.length; i++) {
                        javaArr[i] = data[i];
                    }
                    result = base64.encode(javaArr, encoding);
                } else {
                    // 假设是 Java 字节数组或其他可编码对象
                    result = base64.encode(data, encoding);
                }
                
                return result;
            } catch (err) {
                console.error('Base64 编码失败:', err);
                return {
                    error: err.message || String(err)
                };
            }
        });
        
        // ==================== Base64 解码 ====================
        
        /**
         * Base64 解码
         * 支持 1-2 个参数:
         * decode(data) - 使用默认编码 UTF-8
         * decode(data, encoding) - 使用指定编码
         */
        jsBridge.handle('base64.decode', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            try {
                var data = args[0];
                var encoding = args[1] || 'UTF-8';
                
                // 处理不同类型的输入数据
                var result;
                if (typeof data === 'string') {
                    // 字符串直接解码
                    result = base64.decode(data, encoding);
                } else if (Array.isArray(data)) {
                    // JavaScript 字节数组，需要转换为 Java 字节数组
                    var javaArr = util.java.array('byte', data.length);
                    for (var i = 0; i < data.length; i++) {
                        javaArr[i] = data[i];
                    }
                    result = base64.decode(javaArr, encoding);
                } else {
                    // 假设是 Java 字节数组或其他可解码对象
                    result = base64.decode(data, encoding);
                }
                
                return result;
            } catch (err) {
                console.error('Base64 解码失败:', err);
                return {
                    error: err.message || String(err)
                };
            }
        });
    }
};

