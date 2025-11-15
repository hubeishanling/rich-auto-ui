/**
 * RichAuto 本体应用模块 - Web 端封装
 */

(function(window) {
    'use strict';
    
    // 确保命名空间存在
    window.__richauto_modules = window.__richauto_modules || {};
    
    // RichAuto 本体应用模块定义
    var richautoModule = {
        // ==================== 语言设置 ====================
        
        /**
         * 获取 AutoJs6 语言设置选项
         * @returns {Promise<Object>} 返回语言对象信息
         */
        getLanguage: function() {
            return $richauto.invoke('richauto.getLanguage');
        },
        
        /**
         * 获取 AutoJs6 语言标签
         * @returns {Promise<string>} 返回 IETF 语言标签，如 'en-US', 'zh-CN'
         */
        getLanguageTag: function() {
            return $richauto.invoke('richauto.getLanguageTag');
        },
        
        // ==================== Root 权限 ====================
        
        /**
         * 获取 AutoJs6 的 Root 权限有效性
         * @returns {Promise<boolean>}
         */
        isRootAvailable: function() {
            return $richauto.invoke('richauto.isRootAvailable');
        },
        
        /**
         * 获取 AutoJs6 的 Root 权限状态
         * @returns {Promise<string>} 返回 'AUTO_DETECT', 'FORCE_ROOT', 'FORCE_NON_ROOT'
         */
        getRootMode: function() {
            return $richauto.invoke('richauto.getRootMode');
        },
        
        /**
         * 设置 AutoJs6 的 Root 模式
         * @param {string|number|boolean} rootMode - Root 模式参数
         *   可以是: 'auto'/'root'/'non-root', 0/1/2, true/false
         * @param {boolean} [isWriteIntoPreference=false] - 是否写入应用设置
         * @returns {Promise<boolean>}
         */
        setRootMode: function(rootMode, isWriteIntoPreference) {
            return $richauto.invoke('richauto.setRootMode', rootMode, isWriteIntoPreference);
        },
        
        // ==================== 权限状态 ====================
        
        /**
         * 获取 AutoJs6 的修改系统设置权限状态
         * @returns {Promise<boolean>}
         */
        canModifySystemSettings: function() {
            return $richauto.invoke('richauto.canModifySystemSettings');
        },
        
        /**
         * 获取 AutoJs6 的修改安全设置权限状态
         * @returns {Promise<boolean>}
         */
        canWriteSecureSettings: function() {
            return $richauto.invoke('richauto.canWriteSecureSettings');
        },
        
        /**
         * 获取 AutoJs6 的显示在其他应用上层权限状态
         * @returns {Promise<boolean>}
         */
        canDisplayOverOtherApps: function() {
            return $richauto.invoke('richauto.canDisplayOverOtherApps');
        },
        
        // ==================== 版本信息属性 ====================
        
        /**
         * 获取版本名称
         * @type {Promise<string>}
         */
        get versionName() {
            return $richauto.invoke('richauto.versionName');
        },
        
        /**
         * 获取版本号
         * @type {Promise<number>}
         */
        get versionCode() {
            return $richauto.invoke('richauto.versionCode');
        },
        
        /**
         * 获取版本日期
         * @type {Promise<string>}
         */
        get versionDate() {
            return $richauto.invoke('richauto.versionDate');
        },
        
        // ==================== version 对象 ====================
        
        /**
         * version 对象 - 版本信息和比较方法
         */
        version: {
            /**
             * 获取版本名称
             * @type {Promise<string>}
             */
            get name() {
                return $richauto.invoke('richauto.version.name');
            },
            
            /**
             * 获取版本号
             * @type {Promise<number>}
             */
            get code() {
                return $richauto.invoke('richauto.version.code');
            },
            
            /**
             * 获取版本日期
             * @type {Promise<string>}
             */
            get date() {
                return $richauto.invoke('richauto.version.date');
            },
            
            /**
             * 返回 AutoJs6 版本是否与参数对应的版本号等同
             * @param {string} otherVersion - 待比较版本参数
             * @returns {Promise<boolean>}
             */
            isEqual: function(otherVersion) {
                return $richauto.invoke('richauto.version.isEqual', otherVersion);
            },
            
            /**
             * 返回 AutoJs6 版本是否高于待比较版本
             * @param {string} otherVersion - 待比较版本参数
             * @returns {Promise<boolean>}
             */
            isHigherThan: function(otherVersion) {
                return $richauto.invoke('richauto.version.isHigherThan', otherVersion);
            },
            
            /**
             * 返回 AutoJs6 版本是否低于待比较版本
             * @param {string} otherVersion - 待比较版本参数
             * @returns {Promise<boolean>}
             */
            isLowerThan: function(otherVersion) {
                return $richauto.invoke('richauto.version.isLowerThan', otherVersion);
            },
            
            /**
             * 返回 AutoJs6 版本是否不低于（即大于等于）参数对应的版本号
             * @param {string} otherVersion - 待比较版本参数
             * @param {boolean} [ignoreSuffix=false] - 是否忽略版本后缀
             * @returns {Promise<boolean>}
             */
            isAtLeast: function(otherVersion, ignoreSuffix) {
                return $richauto.invoke('richauto.version.isAtLeast', otherVersion, ignoreSuffix);
            }
        },
        
        // ==================== 主题颜色对象 ====================
        
        /**
         * themeColor 对象 - 主题颜色
         */
        themeColor: {
            /**
             * 获取 AutoJs6 主题色的主色色值
             * @returns {Promise<number>}
             */
            getColorPrimary: function() {
                return $richauto.invoke('richauto.themeColor.getColorPrimary');
            },
            
            /**
             * 获取 AutoJs6 主题色的深色主色色值
             * @returns {Promise<number>}
             */
            getColorPrimaryDark: function() {
                return $richauto.invoke('richauto.themeColor.getColorPrimaryDark');
            },
            
            /**
             * 获取 AutoJs6 主题色的强调色色值
             * @returns {Promise<number>}
             */
            getColorAccent: function() {
                return $richauto.invoke('richauto.themeColor.getColorAccent');
            }
        },
        
        // ==================== R 资源对象 ====================
        
        /**
         * R 对象 - 访问应用资源
         */
        R: {
            /**
             * 获取字符串资源
             * @param {string} name - 资源名称
             * @returns {Promise<string|null>}
             */
            string: function(name) {
                return $richauto.invoke('richauto.R.string', name);
            },
            
            /**
             * 获取 ID 资源
             * @param {string} name - 资源名称
             * @returns {Promise<number|null>}
             */
            id: function(name) {
                return $richauto.invoke('richauto.R.id', name);
            },
            
            /**
             * 获取可绘制资源
             * @param {string} name - 资源名称
             * @returns {Promise<number|null>}
             */
            drawable: function(name) {
                return $richauto.invoke('richauto.R.drawable', name);
            },
            
            /**
             * 获取布局资源
             * @param {string} name - 资源名称
             * @returns {Promise<number|null>}
             */
            layout: function(name) {
                return $richauto.invoke('richauto.R.layout', name);
            }
        }
    };
    
    // 挂载到临时命名空间
    window.__richauto_modules.richauto = richautoModule;
    
})(window);

