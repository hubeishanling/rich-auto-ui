/**
 * Automator 模块 - 封装 RichAuto 的自动化方法
 */

module.exports = {
    /**
     * 注册 automator 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 基于坐标的触摸模拟 ====================
        
        // 设置屏幕度量
        jsBridge.handle('automator.setScreenMetrics', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return setScreenMetrics.apply(null, args);
        });
        
        // 点击坐标
        jsBridge.handle('automator.click', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return click.apply(null, args);
        });
        
        // 长按坐标
        jsBridge.handle('automator.longClick', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return longClick.apply(null, args);
        });
        
        // 按住
        jsBridge.handle('automator.press', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return press.apply(null, args);
        });
        
        // 滑动
        jsBridge.handle('automator.swipe', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return swipe.apply(null, args);
        });
        
        // 手势
        jsBridge.handle('automator.gesture', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return gesture.apply(null, args);
        });
        
        // 多手势
        jsBridge.handle('automator.gestures', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return gestures.apply(null, args);
        });
        
        // ==================== Root 权限简单命令 ====================
        
        // Root Tap
        jsBridge.handle('automator.Tap', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Tap.apply(null, args);
        });
        
        // Root Swipe
        jsBridge.handle('automator.Swipe', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Swipe.apply(null, args);
        });
        
        // ==================== 基于控件的操作 ====================
        
        // 启用无障碍服务
        jsBridge.handle('automator.auto', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return auto.apply(null, args);
        });
        
        // 等待无障碍服务
        jsBridge.handle('automator.auto.waitFor', function(event) {
            return auto.waitFor();
        });
        
        // 设置无障碍模式
        jsBridge.handle('automator.auto.setMode', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return auto.setMode.apply(auto, args);
        });
        
        // 设置无障碍标志
        jsBridge.handle('automator.auto.setFlags', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return auto.setFlags.apply(auto, args);
        });
        
        // 获取无障碍服务
        jsBridge.handle('automator.auto.service', function(event) {
            return auto.service;
        });
        
        // 获取所有窗口
        jsBridge.handle('automator.auto.windows', function(event) {
            return auto.windows;
        });
        
        // 获取根元素
        jsBridge.handle('automator.auto.root', function(event) {
            return auto.root;
        });
        
        // 获取活动窗口根元素
        jsBridge.handle('automator.auto.rootInActiveWindow', function(event) {
            return auto.rootInActiveWindow;
        });
        
        // 设置窗口过滤器
        jsBridge.handle('automator.auto.setWindowFilter', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return auto.setWindowFilter.apply(auto, args);
        });
        
        // 获取窗口根元素数组
        jsBridge.handle('automator.auto.windowRoots', function(event) {
            return auto.windowRoots;
        });
        
        // ==================== SimpleActionAutomator ====================
        
        // 点击文本
        jsBridge.handle('automator.clickText', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return click.apply(null, args);
        });
        
        // 长按文本
        jsBridge.handle('automator.longClickText', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return longClick.apply(null, args);
        });
        
        // 上滑
        jsBridge.handle('automator.scrollUp', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return scrollUp.apply(null, args);
        });
        
        // 下滑
        jsBridge.handle('automator.scrollDown', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return scrollDown.apply(null, args);
        });
        
        // 设置文本
        jsBridge.handle('automator.setText', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return setText.apply(null, args);
        });
        
        // 输入文本
        jsBridge.handle('automator.input', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return input.apply(null, args);
        });
        
        // ==================== RootAutomator ====================
        
        // 创建 RootAutomator 实例
        jsBridge.handle('automator.RootAutomator.create', function(event) {
            return 'RootAutomator instance created';
        });
        
        // RootAutomator.tap
        jsBridge.handle('automator.RootAutomator.tap', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return RootAutomator.tap.apply(RootAutomator, args);
        });
        
        // RootAutomator.swipe
        jsBridge.handle('automator.RootAutomator.swipe', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return RootAutomator.swipe.apply(RootAutomator, args);
        });
        
        // RootAutomator.press
        jsBridge.handle('automator.RootAutomator.press', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return RootAutomator.press.apply(RootAutomator, args);
        });
        
        // RootAutomator.longPress
        jsBridge.handle('automator.RootAutomator.longPress', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return RootAutomator.longPress.apply(RootAutomator, args);
        });
        
        // RootAutomator.touchDown
        jsBridge.handle('automator.RootAutomator.touchDown', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return RootAutomator.touchDown.apply(RootAutomator, args);
        });
        
        // RootAutomator.touchMove
        jsBridge.handle('automator.RootAutomator.touchMove', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return RootAutomator.touchMove.apply(RootAutomator, args);
        });
        
        // RootAutomator.touchUp
        jsBridge.handle('automator.RootAutomator.touchUp', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return RootAutomator.touchUp.apply(RootAutomator, args);
        });
        
        // RootAutomator.exit
        jsBridge.handle('automator.RootAutomator.exit', function(event) {
            return RootAutomator.exit();
        });
    }
};


