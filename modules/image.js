/**
 * Image 模块 - 封装 RichAuto 的图像处理方法
 */

module.exports = {
    /**
     * 注册 image 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 图片处理 ====================
        
        // 读取图片
        jsBridge.handle('image.read', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.read.apply(images, args);
        });
        
        // 加载网络图片
        jsBridge.handle('image.load', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.load.apply(images, args);
        });
        
        // 复制图片
        jsBridge.handle('image.copy', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.copy.apply(images, args);
        });
        
        // 保存图片
        jsBridge.handle('image.save', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.save.apply(images, args);
        });
        
        // Base64 转图片
        jsBridge.handle('image.fromBase64', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.fromBase64.apply(images, args);
        });
        
        // 图片转 Base64
        jsBridge.handle('image.toBase64', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.toBase64.apply(images, args);
        });
        
        // 字节数组转图片
        jsBridge.handle('image.fromBytes', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.fromBytes.apply(images, args);
        });
        
        // 图片转字节数组
        jsBridge.handle('image.toBytes', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.toBytes.apply(images, args);
        });
        
        // 剪切图片
        jsBridge.handle('image.clip', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.clip.apply(images, args);
        });
        
        // 调整图片大小
        jsBridge.handle('image.resize', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.resize.apply(images, args);
        });
        
        // 缩放图片
        jsBridge.handle('image.scale', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.scale.apply(images, args);
        });
        
        // 旋转图片
        jsBridge.handle('image.rotate', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.rotate.apply(images, args);
        });
        
        // 连接图片
        jsBridge.handle('image.concat', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.concat.apply(images, args);
        });
        
        // 灰度化
        jsBridge.handle('image.grayscale', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.grayscale.apply(images, args);
        });
        
        // 阈值化
        jsBridge.handle('image.threshold', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.threshold.apply(images, args);
        });
        
        // 自适应阈值化
        jsBridge.handle('image.adaptiveThreshold', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.adaptiveThreshold.apply(images, args);
        });
        
        // 颜色空间转换
        jsBridge.handle('image.cvtColor', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.cvtColor.apply(images, args);
        });
        
        // 范围二值化
        jsBridge.handle('image.inRange', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.inRange.apply(images, args);
        });
        
        // 区间二值化
        jsBridge.handle('image.interval', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.interval.apply(images, args);
        });
        
        // 模糊处理
        jsBridge.handle('image.blur', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.blur.apply(images, args);
        });
        
        // 中值滤波
        jsBridge.handle('image.medianBlur', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.medianBlur.apply(images, args);
        });
        
        // 高斯模糊
        jsBridge.handle('image.gaussianBlur', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.gaussianBlur.apply(images, args);
        });
        
        // Mat 转 Image
        jsBridge.handle('image.matToImage', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.matToImage.apply(images, args);
        });
        
        // ==================== 找图找色 ====================
        
        // 请求截图权限
        jsBridge.handle('image.requestScreenCapture', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.requestScreenCapture.apply(images, args);
        });
        
        // 截图
        jsBridge.handle('image.captureScreen', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.captureScreen.apply(images, args);
        });
        
        // 获取像素颜色
        jsBridge.handle('image.pixel', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.pixel.apply(images, args);
        });
        
        // 找色
        jsBridge.handle('image.findColor', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.findColor.apply(images, args);
        });
        
        // 区域找色
        jsBridge.handle('image.findColorInRegion', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.findColorInRegion.apply(images, args);
        });
        
        // 找完全相等的颜色
        jsBridge.handle('image.findColorEquals', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.findColorEquals.apply(images, args);
        });
        
        // 多点找色
        jsBridge.handle('image.findMultiColors', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.findMultiColors.apply(images, args);
        });
        
        // 检测颜色
        jsBridge.handle('image.detectsColor', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.detectsColor.apply(images, args);
        });
        
        // 找图
        jsBridge.handle('image.findImage', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.findImage.apply(images, args);
        });
        
        // 区域找图
        jsBridge.handle('image.findImageInRegion', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.findImageInRegion.apply(images, args);
        });
        
        // 模板匹配
        jsBridge.handle('image.matchTemplate', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return images.matchTemplate.apply(images, args);
        });
    }
};

