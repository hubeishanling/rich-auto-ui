/**
 * Keys 模块 - 封装 RichAuto 的按键模拟方法
 */

module.exports = {
    /**
     * 注册 keys 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 基于无障碍服务的按键模拟 ====================
        
        // 返回键
        jsBridge.handle('keys.back', function(event) {
            return back();
        });
        
        // Home键
        jsBridge.handle('keys.home', function(event) {
            return home();
        });
        
        // 电源键菜单
        jsBridge.handle('keys.powerDialog', function(event) {
            return powerDialog();
        });
        
        // 通知栏
        jsBridge.handle('keys.notifications', function(event) {
            return notifications();
        });
        
        // 快速设置
        jsBridge.handle('keys.quickSettings', function(event) {
            return quickSettings();
        });
        
        // 最近任务
        jsBridge.handle('keys.recents', function(event) {
            return recents();
        });
        
        // 分屏
        jsBridge.handle('keys.splitScreen', function(event) {
            return splitScreen();
        });
        
        // ==================== 基于 Root 权限的按键模拟 ====================
        
        // Root Home键
        jsBridge.handle('keys.Home', function(event) {
            return Home();
        });
        
        // Root 返回键
        jsBridge.handle('keys.Back', function(event) {
            return Back();
        });
        
        // Root 电源键
        jsBridge.handle('keys.Power', function(event) {
            return Power();
        });
        
        // Root 菜单键
        jsBridge.handle('keys.Menu', function(event) {
            return Menu();
        });
        
        // Root 音量上键
        jsBridge.handle('keys.VolumeUp', function(event) {
            return VolumeUp();
        });
        
        // Root 音量下键
        jsBridge.handle('keys.VolumeDown', function(event) {
            return VolumeDown();
        });
        
        // Root 照相键
        jsBridge.handle('keys.Camera', function(event) {
            return Camera();
        });
        
        // Root 上键
        jsBridge.handle('keys.Up', function(event) {
            return Up();
        });
        
        // Root 下键
        jsBridge.handle('keys.Down', function(event) {
            return Down();
        });
        
        // Root 左键
        jsBridge.handle('keys.Left', function(event) {
            return Left();
        });
        
        // Root 右键
        jsBridge.handle('keys.Right', function(event) {
            return Right();
        });
        
        // Root 确定键
        jsBridge.handle('keys.OK', function(event) {
            return OK();
        });
        
        // Root 输入文字
        jsBridge.handle('keys.Text', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return Text.apply(null, args);
        });
        
        // Root KeyCode
        jsBridge.handle('keys.KeyCode', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return KeyCode.apply(null, args);
        });
    }
};

