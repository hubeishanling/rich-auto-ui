/**
 * OCR 模块 - 封装 RichAuto 的光学字符识别方法
 */

module.exports = {
    /**
     * 注册 ocr 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 基础属性和方法 ====================
        
        // 获取 OCR 模式
        jsBridge.handle('ocr.getMode', function(event) {
            return ocr.mode;
        });
        
        // 设置 OCR 模式
        jsBridge.handle('ocr.setMode', function(event, mode) {
            ocr.mode = mode;
            return true;
        });
        
        // 切换 OCR 模式（tap 方法）
        jsBridge.handle('ocr.tap', function(event, mode) {
            ocr.tap(mode);
            return true;
        });
        
        // 获取 OCR 摘要
        jsBridge.handle('ocr.summary', function(event) {
            return ocr.summary();
        });
        
        // ==================== recognizeText 方法 ====================
        
        // recognizeText - 通用入口，根据参数动态调用
        jsBridge.handle('ocr.recognizeText', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.recognizeText.apply(ocr, args);
        });
        
        // ==================== detect 方法 ====================
        
        // detect - 通用入口，根据参数动态调用
        jsBridge.handle('ocr.detect', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.detect.apply(ocr, args);
        });
        
        // ==================== ocr() 直接调用 ====================
        
        // ocr() - recognizeText 的别名
        jsBridge.handle('ocr.invoke', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.apply(null, args);
        });
        
        // ==================== MLKit 引擎 ====================
        
        // mlkit.recognizeText
        jsBridge.handle('ocr.mlkit.recognizeText', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.mlkit.recognizeText.apply(ocr.mlkit, args);
        });
        
        // mlkit.detect
        jsBridge.handle('ocr.mlkit.detect', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.mlkit.detect.apply(ocr.mlkit, args);
        });
        
        // mlkit() - recognizeText 的别名
        jsBridge.handle('ocr.mlkit.invoke', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.mlkit.apply(ocr, args);
        });
        
        // ==================== Paddle 引擎 ====================
        
        // paddle.recognizeText
        jsBridge.handle('ocr.paddle.recognizeText', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.paddle.recognizeText.apply(ocr.paddle, args);
        });
        
        // paddle.detect
        jsBridge.handle('ocr.paddle.detect', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.paddle.detect.apply(ocr.paddle, args);
        });
        
        // paddle() - recognizeText 的别名
        jsBridge.handle('ocr.paddle.invoke', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return ocr.paddle.apply(ocr, args);
        });
    }
};

