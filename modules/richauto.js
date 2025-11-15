/**
 * RichAuto 本体应用模块 - 封装 AutoJS6 应用相关的属性和方法
 */

module.exports = {
    /**
     * 注册 richauto 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 语言设置 ====================
        
        // 获取语言对象
        jsBridge.handle('richauto.getLanguage', function(event) {
            try {
                var locale = richauto.getLanguage();
                // 返回语言对象的可序列化信息
                return {
                    languageTag: locale.toLanguageTag(),
                    displayName: locale.getDisplayName(),
                    language: locale.getLanguage(),
                    country: locale.getCountry()
                };
            } catch (e) {
                console.error('richauto.getLanguage 错误:', e);
                return null;
            }
        });
        
        // 获取语言标签
        jsBridge.handle('richauto.getLanguageTag', function(event) {
            try {
                return richauto.getLanguageTag();
            } catch (e) {
                console.error('richauto.getLanguageTag 错误:', e);
                return 'en-US';
            }
        });
        
        // ==================== Root 权限 ====================
        
        // 检查 Root 权限有效性
        jsBridge.handle('richauto.isRootAvailable', function(event) {
            try {
                return richauto.isRootAvailable();
            } catch (e) {
                console.error('richauto.isRootAvailable 错误:', e);
                return false;
            }
        });
        
        // 获取 Root 模式
        jsBridge.handle('richauto.getRootMode', function(event) {
            try {
                var mode = richauto.getRootMode();
                // 返回 RootMode 枚举值
                return String(mode);
            } catch (e) {
                console.error('richauto.getRootMode 错误:', e);
                return 'AUTO_DETECT';
            }
        });
        
        // 设置 Root 模式
        jsBridge.handle('richauto.setRootMode', function(event) {
            try {
                var args = Array.prototype.slice.call(arguments, 1);
                var rootMode = args[0];
                var isWriteIntoPreference = args[1] || false;
                
                // 转换参数
                if (typeof rootMode === 'string') {
                    if (rootMode === 'auto') {
                        rootMode = RootMode.AUTO_DETECT;
                    } else if (rootMode === 'root') {
                        rootMode = RootMode.FORCE_ROOT;
                    } else if (rootMode === 'non-root') {
                        rootMode = RootMode.FORCE_NON_ROOT;
                    }
                } else if (typeof rootMode === 'boolean') {
                    rootMode = rootMode ? RootMode.FORCE_ROOT : RootMode.FORCE_NON_ROOT;
                } else if (typeof rootMode === 'number') {
                    // 0: AUTO_DETECT, 1: FORCE_ROOT, 2: FORCE_NON_ROOT
                    if (rootMode === 1) {
                        rootMode = RootMode.FORCE_ROOT;
                    } else if (rootMode === 2) {
                        rootMode = RootMode.FORCE_NON_ROOT;
                    } else {
                        rootMode = RootMode.AUTO_DETECT;
                    }
                }
                
                richauto.setRootMode(rootMode, isWriteIntoPreference);
                return true;
            } catch (e) {
                console.error('richauto.setRootMode 错误:', e);
                return false;
            }
        });
        
        // ==================== 权限状态 ====================
        
        // 检查修改系统设置权限
        jsBridge.handle('richauto.canModifySystemSettings', function(event) {
            try {
                return richauto.canModifySystemSettings();
            } catch (e) {
                console.error('richauto.canModifySystemSettings 错误:', e);
                return false;
            }
        });
        
        // 检查修改安全设置权限
        jsBridge.handle('richauto.canWriteSecureSettings', function(event) {
            try {
                return richauto.canWriteSecureSettings();
            } catch (e) {
                console.error('richauto.canWriteSecureSettings 错误:', e);
                return false;
            }
        });
        
        // 检查显示在其他应用上层权限
        jsBridge.handle('richauto.canDisplayOverOtherApps', function(event) {
            try {
                return richauto.canDisplayOverOtherApps();
            } catch (e) {
                console.error('richauto.canDisplayOverOtherApps 错误:', e);
                return false;
            }
        });
        
        // ==================== 版本信息 ====================
        
        // 获取版本名称
        jsBridge.handle('richauto.versionName', function(event) {
            try {
                return richauto.versionName;
            } catch (e) {
                console.error('richauto.versionName 错误:', e);
                return '未知版本';
            }
        });
        
        // 获取版本号
        jsBridge.handle('richauto.versionCode', function(event) {
            try {
                return richauto.versionCode;
            } catch (e) {
                console.error('richauto.versionCode 错误:', e);
                return 0;
            }
        });
        
        // 获取版本日期
        jsBridge.handle('richauto.versionDate', function(event) {
            try {
                return richauto.versionDate;
            } catch (e) {
                console.error('richauto.versionDate 错误:', e);
                return '';
            }
        });
        
        // ==================== version 对象方法 ====================
        
        // version.name
        jsBridge.handle('richauto.version.name', function(event) {
            try {
                return richauto.version.name;
            } catch (e) {
                console.error('richauto.version.name 错误:', e);
                return '未知版本';
            }
        });
        
        // version.code
        jsBridge.handle('richauto.version.code', function(event) {
            try {
                return richauto.version.code;
            } catch (e) {
                console.error('richauto.version.code 错误:', e);
                return 0;
            }
        });
        
        // version.date
        jsBridge.handle('richauto.version.date', function(event) {
            try {
                return richauto.version.date;
            } catch (e) {
                console.error('richauto.version.date 错误:', e);
                return '';
            }
        });
        
        // version.isEqual
        jsBridge.handle('richauto.version.isEqual', function(event, otherVersion) {
            try {
                return richauto.version.isEqual(otherVersion);
            } catch (e) {
                console.error('richauto.version.isEqual 错误:', e);
                return false;
            }
        });
        
        // version.isHigherThan
        jsBridge.handle('richauto.version.isHigherThan', function(event, otherVersion) {
            try {
                return richauto.version.isHigherThan(otherVersion);
            } catch (e) {
                console.error('richauto.version.isHigherThan 错误:', e);
                return false;
            }
        });
        
        // version.isLowerThan
        jsBridge.handle('richauto.version.isLowerThan', function(event, otherVersion) {
            try {
                return richauto.version.isLowerThan(otherVersion);
            } catch (e) {
                console.error('richauto.version.isLowerThan 错误:', e);
                return false;
            }
        });
        
        // version.isAtLeast
        jsBridge.handle('richauto.version.isAtLeast', function(event) {
            try {
                var args = Array.prototype.slice.call(arguments, 1);
                return richauto.version.isAtLeast.apply(richauto.version, args);
            } catch (e) {
                console.error('richauto.version.isAtLeast 错误:', e);
                return false;
            }
        });
        
        // ==================== 主题颜色 ====================
        
        // themeColor.getColorPrimary
        jsBridge.handle('richauto.themeColor.getColorPrimary', function(event) {
            try {
                return richauto.themeColor.getColorPrimary();
            } catch (e) {
                console.error('richauto.themeColor.getColorPrimary 错误:', e);
                return 0;
            }
        });
        
        // themeColor.getColorPrimaryDark
        jsBridge.handle('richauto.themeColor.getColorPrimaryDark', function(event) {
            try {
                return richauto.themeColor.getColorPrimaryDark();
            } catch (e) {
                console.error('richauto.themeColor.getColorPrimaryDark 错误:', e);
                return 0;
            }
        });
        
        // themeColor.getColorAccent
        jsBridge.handle('richauto.themeColor.getColorAccent', function(event) {
            try {
                return richauto.themeColor.getColorAccent();
            } catch (e) {
                console.error('richauto.themeColor.getColorAccent 错误:', e);
                return 0;
            }
        });
        
        // ==================== R 资源对象 ====================
        
        // R.string - 获取字符串资源
        jsBridge.handle('richauto.R.string', function(event, name) {
            try {
                if (typeof R !== 'undefined' && R.string && R.string[name]) {
                    return context.getString(R.string[name]);
                }
                return null;
            } catch (e) {
                console.error('richauto.R.string 错误:', e);
                return null;
            }
        });
        
        // R.id - 获取 ID 资源
        jsBridge.handle('richauto.R.id', function(event, name) {
            try {
                if (typeof R !== 'undefined' && R.id && R.id[name]) {
                    return R.id[name];
                }
                return null;
            } catch (e) {
                console.error('richauto.R.id 错误:', e);
                return null;
            }
        });
        
        // R.drawable - 获取可绘制资源
        jsBridge.handle('richauto.R.drawable', function(event, name) {
            try {
                if (typeof R !== 'undefined' && R.drawable && R.drawable[name]) {
                    return R.drawable[name];
                }
                return null;
            } catch (e) {
                console.error('richauto.R.drawable 错误:', e);
                return null;
            }
        });
        
        // R.layout - 获取布局资源
        jsBridge.handle('richauto.R.layout', function(event, name) {
            try {
                if (typeof R !== 'undefined' && R.layout && R.layout[name]) {
                    return R.layout[name];
                }
                return null;
            } catch (e) {
                console.error('richauto.R.layout 错误:', e);
                return null;
            }
        });
    }
};

