/**
 * App 模块 - Web 端封装
 */

(function(window) {
    'use strict';
    
    // 确保命名空间存在
    window.__richauto_modules = window.__richauto_modules || {};
    
    // App 模块定义
    var appModule = {
        // ==================== 应用版本信息 ====================
        
        /**
         * 获取当前软件版本号
         * @returns {Promise<number>}
         */
        getVersionCode: function() {
            return $richauto.invoke('app.versionCode');
        },
        
        /**
         * 获取当前软件版本名称
         * @returns {Promise<string>}
         */
        getVersionName: function() {
            return $richauto.invoke('app.versionName');
        },
        
        /**
         * richauto 对象 - RichAuto 版本信息
         */
        richauto: {
            /**
             * 获取 RichAuto 版本号
             * @returns {Promise<number>}
             */
            getVersionCode: function() {
                return $richauto.invoke('app.richauto.versionCode');
            },
            
            /**
             * 获取 RichAuto 版本名称
             * @returns {Promise<string>}
             */
            getVersionName: function() {
                return $richauto.invoke('app.richauto.versionName');
            }
        },
        
        // ==================== 应用启动 ====================
        
        /**
         * 通过应用名称启动应用
         * @param {string} appName - 应用名称
         * @returns {Promise<boolean>}
         */
        launchApp: function(appName) {
            return $richauto.invoke('app.launchApp', appName);
        },
        
        /**
         * 通过包名启动应用
         * @param {string} packageName - 应用包名
         * @returns {Promise<boolean>}
         */
        launch: function(packageName) {
            return $richauto.invoke('app.launch', packageName);
        },
        
        /**
         * 通过包名启动应用（launchPackage）
         * @param {string} packageName - 应用包名
         * @returns {Promise<boolean>}
         */
        launchPackage: function(packageName) {
            return $richauto.invoke('app.launchPackage', packageName);
        },
        
        // ==================== 应用信息获取 ====================
        
        /**
         * 获取应用名称对应的包名
         * @param {string} appName - 应用名称
         * @returns {Promise<string|null>}
         */
        getPackageName: function(appName) {
            return $richauto.invoke('app.getPackageName', appName);
        },
        
        /**
         * 获取包名对应的应用名称
         * @param {string} packageName - 应用包名
         * @returns {Promise<string|null>}
         */
        getAppName: function(packageName) {
            return $richauto.invoke('app.getAppName', packageName);
        },
        
        // ==================== 应用操作 ====================
        
        /**
         * 打开应用的详情页（设置页）
         * @param {string} packageName - 应用包名
         * @returns {Promise<boolean>}
         */
        openAppSetting: function(packageName) {
            return $richauto.invoke('app.openAppSetting', packageName);
        },
        
        /**
         * 卸载应用
         * @param {string} packageName - 应用包名
         * @returns {Promise<void>}
         */
        uninstall: function(packageName) {
            return $richauto.invoke('app.uninstall', packageName);
        },
        
        // ==================== 文件操作 ====================
        
        /**
         * 用其他应用查看文件
         * @param {string} path - 文件路径
         * @returns {Promise<void>}
         */
        viewFile: function(path) {
            return $richauto.invoke('app.viewFile', path);
        },
        
        /**
         * 用其他应用编辑文件
         * @param {string} path - 文件路径
         * @returns {Promise<void>}
         */
        editFile: function(path) {
            return $richauto.invoke('app.editFile', path);
        },
        
        // ==================== URL 和邮件 ====================
        
        /**
         * 用浏览器打开 URL
         * @param {string} url - 网站的 URL
         * @returns {Promise<void>}
         */
        openUrl: function(url) {
            return $richauto.invoke('app.openUrl', url);
        },
        
        /**
         * 发送邮件
         * @param {Object} options - 邮件选项
         * @param {string|Array} [options.email] - 收件人邮箱地址
         * @param {string|Array} [options.cc] - 抄送邮箱地址
         * @param {string|Array} [options.bcc] - 密送邮箱地址
         * @param {string} [options.subject] - 邮件主题
         * @param {string} [options.text] - 邮件正文
         * @param {string} [options.attachment] - 附件路径
         * @returns {Promise<void>}
         */
        sendEmail: function(options) {
            return $richauto.invoke('app.sendEmail', options);
        },
        
        // ==================== Activity 和 Intent ====================
        
        /**
         * 启动 Activity
         * 支持两种重载：
         * 1. startActivity(name) - 启动 RichAuto 特定界面（'console', 'settings'）
         * 2. startActivity(options) - 根据选项启动 Activity
         * @returns {Promise<void>}
         */
        startActivity: function() {
            var args = ['app.startActivity'].concat(Array.prototype.slice.call(arguments));
            return $richauto.invoke.apply($richauto, args);
        },
        
        /**
         * 构造 Intent 对象
         * @param {Object} options - Intent 选项
         * @param {string} [options.action] - Intent Action
         * @param {string} [options.type] - MIME 类型
         * @param {string} [options.data] - Intent Data (Uri)
         * @param {Array} [options.category] - Intent 类别
         * @param {string} [options.packageName] - 目标包名
         * @param {string} [options.className] - 目标组件名称
         * @param {Object} [options.extras] - 额外信息
         * @param {Array} [options.flags] - Intent 标识
         * @param {boolean} [options.root] - 是否以 root 权限启动
         * @returns {Promise<any>}
         */
        intent: function(options) {
            return $richauto.invoke('app.intent', options);
        },
        
        /**
         * 将 Intent 转换为 Shell 命令参数
         * @param {Object} options - Intent 选项
         * @returns {Promise<string>}
         */
        intentToShell: function(options) {
            return $richauto.invoke('app.intentToShell', options);
        },
        
        // ==================== 广播和服务 ====================
        
        /**
         * 发送广播
         * 支持两种重载：
         * 1. sendBroadcast(name) - 发送特定名称的广播（'inspect_layout_hierarchy', 'inspect_layout_bounds'）
         * 2. sendBroadcast(options) - 根据选项发送广播
         * @returns {Promise<void>}
         */
        sendBroadcast: function() {
            var args = ['app.sendBroadcast'].concat(Array.prototype.slice.call(arguments));
            return $richauto.invoke.apply($richauto, args);
        },
        
        /**
         * 启动服务
         * @param {Object} options - Intent 选项
         * @returns {Promise<void>}
         */
        startService: function(options) {
            return $richauto.invoke('app.startService', options);
        },
        
        // ==================== Uri 操作 ====================
        
        /**
         * 解析 Uri 字符串
         * @param {string} uri - Uri 字符串
         * @returns {Promise<string|null>}
         */
        parseUri: function(uri) {
            return $richauto.invoke('app.parseUri', uri);
        },
        
        /**
         * 从文件路径创建 Uri
         * @param {string} path - 文件路径
         * @returns {Promise<string|null>}
         */
        getUriForFile: function(path) {
            return $richauto.invoke('app.getUriForFile', path);
        }
    };
    
    // 挂载到临时命名空间
    window.__richauto_modules.app = appModule;
    
})(window);

