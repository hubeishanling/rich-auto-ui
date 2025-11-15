/**
 * App 模块 - 封装 RichAuto 的通用应用方法
 */

module.exports = {
    /**
     * 注册 app 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 应用版本信息 ====================
        
        // 获取当前软件版本号
        jsBridge.handle('app.versionCode', function(event) {
            return app.versionCode;
        });
        
        // 获取当前软件版本名称
        jsBridge.handle('app.versionName', function(event) {
            return app.versionName;
        });
        
        // 获取 RichAuto 版本号
        jsBridge.handle('app.richauto.versionCode', function(event) {
            return app.autojs.versionCode;
        });
        
        // 获取 RichAuto 版本名称
        jsBridge.handle('app.richauto.versionName', function(event) {
            return app.autojs.versionName;
        });
        
        // ==================== 应用启动 ====================
        
        // 通过应用名称启动应用
        jsBridge.handle('app.launchApp', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return launchApp.apply(null, args);
        });
        
        // 通过包名启动应用
        jsBridge.handle('app.launch', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return launch.apply(null, args);
        });
        
        // 通过包名启动应用（launchPackage）
        jsBridge.handle('app.launchPackage', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            // launchPackage 相当于 launch
            if (typeof app.launchPackage === 'function') {
                return app.launchPackage.apply(app, args);
            } else {
                return launch.apply(null, args);
            }
        });
        
        // ==================== 应用信息获取 ====================
        
        // 获取应用包名
        jsBridge.handle('app.getPackageName', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return getPackageName.apply(null, args);
        });
        
        // 获取应用名称
        jsBridge.handle('app.getAppName', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return getAppName.apply(null, args);
        });
        
        // ==================== 应用操作 ====================
        
        // 打开应用设置页
        jsBridge.handle('app.openAppSetting', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return openAppSetting.apply(null, args);
        });
        
        // 卸载应用
        jsBridge.handle('app.uninstall', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.uninstall.apply(app, args);
        });
        
        // ==================== 文件操作 ====================
        
        // 查看文件
        jsBridge.handle('app.viewFile', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.viewFile.apply(app, args);
        });
        
        // 编辑文件
        jsBridge.handle('app.editFile', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.editFile.apply(app, args);
        });
        
        // ==================== URL 和邮件 ====================
        
        // 打开 URL
        jsBridge.handle('app.openUrl', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.openUrl.apply(app, args);
        });
        
        // 发送邮件
        jsBridge.handle('app.sendEmail', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.sendEmail.apply(app, args);
        });
        
        // ==================== Activity 和 Intent ====================
        
        // 启动 Activity（支持两种重载）
        jsBridge.handle('app.startActivity', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.startActivity.apply(app, args);
        });
        
        // 构造 Intent
        jsBridge.handle('app.intent', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.intent.apply(app, args);
        });
        
        // Intent 转 Shell 命令
        jsBridge.handle('app.intentToShell', function(event) {
            if (typeof app.intentToShell !== 'function') {
                throw new Error('app.intentToShell 不可用，此功能需要 RichAuto v4.1.0 或更高版本');
            }
            var args = Array.prototype.slice.call(arguments, 1);
            return app.intentToShell.apply(app, args);
        });
        
        // ==================== 广播和服务 ====================
        
        // 发送广播
        jsBridge.handle('app.sendBroadcast', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.sendBroadcast.apply(app, args);
        });
        
        // 启动服务
        jsBridge.handle('app.startService', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return app.startService.apply(app, args);
        });
        
        // ==================== Uri 操作 ====================
        
        // 解析 Uri
        jsBridge.handle('app.parseUri', function(event) {
            if (typeof app.parseUri !== 'function') {
                throw new Error('app.parseUri 不可用，此功能需要 RichAuto v4.1.0 或更高版本');
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var uri = app.parseUri.apply(app, args);
            // 将 Uri 对象转换为字符串返回
            return uri ? uri.toString() : null;
        });
        
        // 获取文件 Uri
        jsBridge.handle('app.getUriForFile', function(event) {
            if (typeof app.getUriForFile !== 'function') {
                throw new Error('app.getUriForFile 不可用，此功能需要 RichAuto v4.1.0 或更高版本');
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var uri = app.getUriForFile.apply(app, args);
            // 将 Uri 对象转换为字符串返回
            return uri ? uri.toString() : null;
        });
    }
};

