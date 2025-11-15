/**
 * Color 模块 - 封装 RichAuto 的颜色处理方法
 */

module.exports = {
    /**
     * 注册 color 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 颜色转换 ====================
        
        // 转换为颜色整数
        jsBridge.handle('color.toInt', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toInt.apply(colors, args);
        });
        
        // 转换为颜色代码
        jsBridge.handle('color.toHex', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toHex.apply(colors, args);
        });
        
        // 转换为完整颜色代码
        jsBridge.handle('color.toFullHex', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toFullHex.apply(colors, args);
        });
        
        // 转换为字符串
        jsBridge.handle('color.toString', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toString.apply(colors, args);
        });
        
        // 获取颜色摘要
        jsBridge.handle('color.summary', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.summary.apply(colors, args);
        });
        
        // ==================== 颜色分量获取 ====================
        
        // 获取 Alpha 分量
        jsBridge.handle('color.alpha', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.alpha.apply(colors, args);
        });
        
        // 获取 Red 分量
        jsBridge.handle('color.red', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.red.apply(colors, args);
        });
        
        // 获取 Green 分量
        jsBridge.handle('color.green', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.green.apply(colors, args);
        });
        
        // 获取 Blue 分量
        jsBridge.handle('color.blue', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.blue.apply(colors, args);
        });
        
        // ==================== 颜色分量设置 ====================
        
        // 设置 Alpha 分量
        jsBridge.handle('color.setAlpha', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.setAlpha.apply(colors, args);
        });
        
        // 设置 Red 分量
        jsBridge.handle('color.setRed', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.setRed.apply(colors, args);
        });
        
        // 设置 Green 分量
        jsBridge.handle('color.setGreen', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.setGreen.apply(colors, args);
        });
        
        // 设置 Blue 分量
        jsBridge.handle('color.setBlue', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.setBlue.apply(colors, args);
        });
        
        // ==================== 颜色合成 ====================
        
        // RGB
        jsBridge.handle('color.rgb', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.rgb.apply(colors, args);
        });
        
        // ARGB
        jsBridge.handle('color.argb', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.argb.apply(colors, args);
        });
        
        // RGBA
        jsBridge.handle('color.rgba', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.rgba.apply(colors, args);
        });
        
        // HSV
        jsBridge.handle('color.hsv', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.hsv.apply(colors, args);
        });
        
        // HSVA
        jsBridge.handle('color.hsva', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.hsva.apply(colors, args);
        });
        
        // HSL
        jsBridge.handle('color.hsl', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.hsl.apply(colors, args);
        });
        
        // HSLA
        jsBridge.handle('color.hsla', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.hsla.apply(colors, args);
        });
        
        // ==================== 颜色分解 ====================
        
        // 转换为 RGB 数组
        jsBridge.handle('color.toRgb', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toRgb.apply(colors, args);
        });
        
        // 转换为 RGBA 数组
        jsBridge.handle('color.toRgba', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toRgba.apply(colors, args);
        });
        
        // 转换为 ARGB 数组
        jsBridge.handle('color.toArgb', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toArgb.apply(colors, args);
        });
        
        // 转换为 HSV 数组
        jsBridge.handle('color.toHsv', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toHsv.apply(colors, args);
        });
        
        // 转换为 HSVA 数组
        jsBridge.handle('color.toHsva', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toHsva.apply(colors, args);
        });
        
        // 转换为 HSL 数组
        jsBridge.handle('color.toHsl', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toHsl.apply(colors, args);
        });
        
        // 转换为 HSLA 数组
        jsBridge.handle('color.toHsla', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.toHsla.apply(colors, args);
        });
        
        // ==================== 颜色比较 ====================
        
        // 判断颜色相似
        jsBridge.handle('color.isSimilar', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.isSimilar.apply(colors, args);
        });
        
        // 判断颜色相等
        jsBridge.handle('color.isEqual', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.isEqual.apply(colors, args);
        });
        
        // ==================== 颜色工具 ====================
        
        // 获取亮度
        jsBridge.handle('color.luminance', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return colors.luminance.apply(colors, args);
        });
        
        // ==================== 颜色常量 ====================
        
        jsBridge.handle('color.BLACK', function(event) {
            return colors.BLACK;
        });
        
        jsBridge.handle('color.WHITE', function(event) {
            return colors.WHITE;
        });
        
        jsBridge.handle('color.RED', function(event) {
            return colors.RED;
        });
        
        jsBridge.handle('color.GREEN', function(event) {
            return colors.GREEN;
        });
        
        jsBridge.handle('color.BLUE', function(event) {
            return colors.BLUE;
        });
        
        jsBridge.handle('color.YELLOW', function(event) {
            return colors.YELLOW;
        });
        
        jsBridge.handle('color.CYAN', function(event) {
            return colors.CYAN;
        });
        
        jsBridge.handle('color.MAGENTA', function(event) {
            return colors.MAGENTA;
        });
        
        jsBridge.handle('color.ORANGE', function(event) {
            return colors.ORANGE;
        });
        
        jsBridge.handle('color.GRAY', function(event) {
            return colors.GRAY;
        });
        
        jsBridge.handle('color.TRANSPARENT', function(event) {
            return colors.TRANSPARENT;
        });
    }
};

