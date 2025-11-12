/**
 * 业务模块 - 处理登录、用户信息、游戏管理等业务逻辑
 */

var config = require('../config.js');
var apiUtils = require('./utils/api-utils.js');
var httpUtils = require('./utils/http-utils.js');
var API_CONFIG = config.API_CONFIG;
var APP_CONFIG = config.APP_CONFIG;

module.exports = {
    /**
     * 注册业务模块的 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        console.log('[Business] 开始注册业务方法...');

        // ==================== 应用信息 ====================
        
        // 获取应用信息
        jsBridge.handle('getAppInfo', function(event) {
            try {
                return {
                    name: APP_CONFIG.APP_INFO.NAME,
                    version: APP_CONFIG.APP_INFO.VERSION,
                    developer: APP_CONFIG.APP_INFO.DEVELOPER
                };
            } catch (e) {
                console.error('[Business] getAppInfo 失败:', e);
                return { error: e.message };
            }
        });

        // ==================== 凭据管理 ====================
        
        // 加载保存的凭据
        jsBridge.handle('loadCredentials', function(event) {
            try {
                var loginStorage = storages.create("login");
                var cardNo = loginStorage.get("cardNo", "");
                var savedDeviceId = loginStorage.get("deviceId", "");
                
                var deviceId = savedDeviceId;
                if (!deviceId) {
                    deviceId = device.getAndroidId() || "";
                }
                
                return {
                    cardNo: cardNo,
                    deviceId: deviceId
                };
            } catch (e) {
                console.error('[Business] loadCredentials 失败:', e);
                return { error: e.message };
            }
        });

        // ==================== Token验证 ====================
        
        // 验证现有Token
        jsBridge.handle('verifyToken', function(event) {
            try {
                var authStorage = storages.create("auth");
                var cardToken = authStorage.get("cardToken", "");
                
                if (!cardToken) {
                    console.log('[Business] 没有保存的token');
                    return { success: false };
                }
                
                // 调用后端接口验证token（HTTP请求是阻塞的）
                console.log('[Business] 验证token...');
                var response = apiUtils.get(API_CONFIG.ENDPOINTS.CARD_INFO);
                
                if (response.statusCode === 200) {
                    var result = JSON.parse(response.body);
                    if (result.code === 200 && result.data) {
                        // token有效
                        result.data.loginTimeDisplay = new Date().toLocaleString('zh-CN');
                        result.data.expireTimeDisplay = result.data.expireTime || '-';
                        
                        return {
                            success: true,
                            userInfo: result.data
                        };
                    } else {
                        // token无效
                        authStorage.remove("cardToken");
                        return { success: false };
                    }
                } else {
                    // 请求失败
                    authStorage.remove("cardToken");
                    return { success: false };
                }
            } catch (e) {
                console.error('[Business] verifyToken 失败:', e);
                return { success: false, error: e.message };
            }
        });

        // ==================== 登录/登出 ====================
        
        // 用户登录
        jsBridge.handle('login', function(event, cardNo, deviceId, remember) {
            try {
                console.log('[Business] 登录请求:', cardNo, deviceId, remember);
                
                // 如果deviceId为空，使用设备AndroidId
                if (!deviceId || deviceId.trim() === '') {
                    deviceId = device.getAndroidId() || "";
                }
                
                // 构建登录请求数据
                var loginData = {
                    tenantId: API_CONFIG.TENANT_ID,
                    cardNo: cardNo,
                    deviceAndroidId: deviceId,
                    deviceWidth: device.width,
                    deviceHeight: device.height,
                    deviceBuildId: device.buildId,
                    deviceBroad: device.board,
                    deviceBrand: device.brand,
                    deviceName: device.product,
                    deviceModel: device.model,
                    deviceSdkInt: device.sdkInt,
                    deviceImei: device.getIMEI() || "",
                    deviceInfo: device.model + ' Android ' + device.release
                };
                
                console.log('[Business] 发送登录请求到:', API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGIN);
                
                // 调用登录API（HTTP请求是阻塞的，直接执行）
                var response = apiUtils.post(API_CONFIG.ENDPOINTS.LOGIN, loginData);
                
                
                if (response.statusCode === 200) {
                    var result = JSON.parse(response.body);
                    console.log('[Business] 登录响应:', JSON.stringify(result));
                    
                    if (result.code === 200 && result.data) {
                        // 登录成功
                        var userInfo = result.data;
                        userInfo.loginTimeDisplay = new Date().toLocaleString('zh-CN');
                        userInfo.expireTimeDisplay = userInfo.expireTime || '-';
                        
                        // 保存token
                        var authStorage = storages.create("auth");
                        authStorage.put("cardToken", userInfo.cardToken);
                        
                        // 保存凭据
                        if (remember) {
                            var loginStorage = storages.create("login");
                            loginStorage.put("cardNo", cardNo);
                            loginStorage.put("deviceId", deviceId);
                        }
                        
                        return {
                            success: true,
                            userInfo: userInfo
                        };
                    } else {
                        // 登录失败
                        return {
                            success: false,
                            message: result.msg || '登录失败'
                        };
                    }
                } else {
                    // HTTP错误
                    return {
                        success: false,
                        message: '网络请求失败: ' + response.statusCode
                    };
                }
            } catch (e) {
                console.error('[Business] login 失败:', e);
                return { 
                    success: false, 
                    message: e.message 
                };
            }
        });
        
        // 退出登录
        jsBridge.handle('logout', function(event) {
            try {
                var authStorage = storages.create("auth");
                authStorage.clear();
                
                var gameStorage = storages.create("game");
                gameStorage.clear();
                
                return { success: true };
            } catch (e) {
                console.error('[Business] logout 失败:', e);
                return { success: false, error: e.message };
            }
        });

        // ==================== 用户信息 ====================
        
        // 刷新用户信息
        jsBridge.handle('refreshUserInfo', function(event) {
            try {
                var authStorage = storages.create("auth");
                var cardToken = authStorage.get("cardToken", "");
                
                if (!cardToken) {
                    return { success: false, message: '未登录' };
                }
                
                // 调用后端接口刷新用户信息（HTTP请求是阻塞的）
                var response = apiUtils.get(API_CONFIG.ENDPOINTS.CARD_INFO);
                
                if (response.statusCode === 200) {
                    var result = JSON.parse(response.body);
                    if (result.code === 200 && result.data) {
                        result.data.loginTimeDisplay = new Date().toLocaleString('zh-CN');
                        result.data.expireTimeDisplay = result.data.expireTime || '-';
                        
                        return {
                            success: true,
                            userInfo: result.data
                        };
                    } else {
                        return {
                            success: false,
                            message: result.msg || '刷新失败'
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: '网络请求失败: ' + response.statusCode
                    };
                }
            } catch (e) {
                console.error('[Business] refreshUserInfo 失败:', e);
                return { 
                    success: false, 
                    message: e.message 
                };
            }
        });

        // ==================== 游戏管理 ====================
        
        // 获取游戏ID（从配置读取）
        jsBridge.handle('getSelectedGameId', function(event) {
            try {
                // 从配置文件读取游戏ID
                var gameId = config.GAME_ID;
                
                return { 
                    success: true, 
                    gameId: gameId 
                };
            } catch (e) {
                console.error('[Business] getSelectedGameId 失败:', e);
                return { success: false, error: e.message };
            }
        });
        
        // 计算文件MD5值的辅助函数
        function calculateFileMd5(filePath) {
            try {
                var MessageDigest = java.security.MessageDigest;
                var FileInputStream = java.io.FileInputStream;
                
                var md = MessageDigest.getInstance("MD5");
                var fis = new FileInputStream(filePath);
                var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 8192);
                var numRead = 0;
                
                while ((numRead = fis.read(buffer)) > 0) {
                    md.update(buffer, 0, numRead);
                }
                fis.close();
                
                var digest = md.digest();
                var sb = new java.lang.StringBuilder();
                for (var i = 0; i < digest.length; i++) {
                    var b = digest[i] & 0xFF;  // 转换为无符号字节
                    sb.append(java.lang.String.format("%02x", java.lang.Integer.valueOf(b)));
                }
                return sb.toString();
            } catch (e) {
                console.error('[Business] 计算MD5失败:', e);
                return null;
            }
        }

        // 更新脚本 - 带MD5校验和事务性的版本
        jsBridge.handle('updateScript', function(event) {
            var tempFilePath = null;
            try {
                // 从配置文件读取游戏ID
                var gameId = config.GAME_ID;
                console.log('[Business] 更新脚本，游戏ID:', gameId);
                
                if (!gameId) {
                    return { 
                        success: false, 
                        message: '游戏ID未配置' 
                    };
                }
                
                // 获取最新版本信息
                var url = config.BASE_URL + config.ENDPOINTS.LATEST_VERSION + '/' + gameId;
                console.log('[Business] 请求最新版本:', url);
                
                var response = httpUtils.get(url);
                
                if (response.statusCode !== 200) {
                    console.error('[Business] 获取最新版本失败:', response.statusMessage);
                    return { 
                        success: false, 
                        message: '获取最新版本失败: ' + response.statusMessage 
                    };
                }
                
                var result = JSON.parse(response.body);
                console.log('[Business] 最新版本响应:', JSON.stringify(result));
                
                if (result.code !== 200 || !result.data) {
                    return { 
                        success: false, 
                        message: result.msg || '获取最新版本失败' 
                    };
                }
                
                var versionInfo = result.data;
                var fileUrl = versionInfo.fileUrl;
                var version = versionInfo.version;
                var serverMd5 = versionInfo.fileMd5;
                var fileSize = versionInfo.fileSize;
                
                if (!fileUrl) {
                    return { 
                        success: false, 
                        message: '该游戏暂无可用脚本版本' 
                    };
                }
                
                if (!serverMd5) {
                    console.warn('[Business] 服务器未返回MD5值，跳过完整性校验');
                }
                
                console.log('[Business] 开始下载脚本文件: ' + fileUrl);
                console.log('[Business] 服务器MD5: ' + serverMd5 + ', 文件大小: ' + fileSize + ' 字节');
                
                // 显示下载提示
                toast('正在下载脚本文件...');
                
                // 下载文件（设置超时时间为300秒）
                var downloadResponse = http.get(fileUrl, {
                    timeout: 300000  // 300秒超时，适用于大文件下载
                });
                if (downloadResponse.statusCode !== 200) {
                    return { 
                        success: false, 
                        message: '下载文件失败: ' + downloadResponse.statusMessage 
                    };
                }
                
                var fileBytes = downloadResponse.body.bytes();
                toast('下载完成，正在校验文件...');
                
                // 验证文件大小
                if (fileSize && fileBytes.length !== fileSize) {
                    console.error('[Business] 文件大小不匹配，期望: ' + fileSize + ', 实际: ' + fileBytes.length);
                    return { 
                        success: false, 
                        message: '文件大小不匹配，下载可能不完整' 
                    };
                }
                
                // 第一步：下载到临时目录（外部存储的应用专属目录）
                // 获取外部存储的应用专属目录: /sdcard/Android/data/<包名>/files/
                var externalDir = context.getExternalFilesDir(null).getPath();
                var tempDir = files.join(externalDir, 'temp/');
                if (!files.exists(tempDir)) {
                    new java.io.File(tempDir).mkdirs();
                }
                
                // 动态获取包名
                var packageName = context.getPackageName();
                console.log('[Business] 应用包名:', packageName);
                
                var tempFileName = packageName + '.plugin_temp.apk';
                tempFilePath = files.join(tempDir, tempFileName);
                
                console.log('[Business] 写入临时文件:', tempFilePath);
                files.writeBytes(tempFilePath, fileBytes);
                
                // 第二步：计算MD5并校验
                if (serverMd5) {
                    console.log('[Business] 开始计算文件MD5...');
                    var localMd5 = calculateFileMd5(tempFilePath);
                    
                    if (!localMd5) {
                        // 清理临时文件
                        files.remove(tempFilePath);
                        return { 
                            success: false, 
                            message: 'MD5计算失败' 
                        };
                    }
                    
                    console.log('[Business] 本地MD5: ' + localMd5);
                    console.log('[Business] 服务器MD5: ' + serverMd5);
                    
                    if (localMd5.toLowerCase() !== serverMd5.toLowerCase()) {
                        // MD5不匹配，清理临时文件
                        files.remove(tempFilePath);
                        console.error('[Business] MD5校验失败');
                        return { 
                            success: false, 
                            message: 'MD5校验失败，文件可能已损坏' 
                        };
                    }
                    
                    console.log('[Business] MD5校验通过');
                    toast('校验通过，正在保存文件...');
                }
                
                // 第三步：移动到正式目录 (外部存储的应用专属目录)
                // /sdcard/Android/data/<包名>/files/project/plugins/
                var externalDir = context.getExternalFilesDir(null).getPath();
                var projectDir = files.join(externalDir, 'project', 'plugins/');
                if (!files.exists(projectDir)) {
                    new java.io.File(projectDir).mkdirs();
                }
                
                // 使用包名作为文件名
                var fileName = packageName + '.plugin.apk';
                var finalPath = files.join(projectDir, fileName);
                
                console.log('[Business] 插件文件名:', fileName);
                
                // 如果目标文件已存在，先删除旧版本
                if (files.exists(finalPath)) {
                    console.log('[Business] 删除旧版本文件:', finalPath);
                    files.remove(finalPath);
                }
                
                // 移动文件到正式目录
                console.log('[Business] 移动文件到正式目录:', finalPath);
                var moveSuccess = files.move(tempFilePath, finalPath);
                
                if (!moveSuccess) {
                    // 移动失败，清理临时文件
                    files.remove(tempFilePath);
                    return { 
                        success: false, 
                        message: '文件移动失败' 
                    };
                }
                
                // 清空临时文件引用（已成功移动）
                tempFilePath = null;
                
                console.log('[Business] 脚本文件已保存到:', finalPath);
                
                // 保存版本信息到storage
                var scriptStorage = storages.create("script_version");
                scriptStorage.put('plugin_version', version);
                scriptStorage.put('plugin_path', finalPath);
                scriptStorage.put('plugin_url', fileUrl);
                scriptStorage.put('plugin_md5', serverMd5 || '');
                scriptStorage.put('plugin_updateTime', Date.now());
                
                toast('脚本更新成功 v' + version);
                return { 
                    success: true, 
                    message: '脚本更新成功 v' + version,
                    version: version,
                    localPath: finalPath,
                    md5: serverMd5
                };
            } catch (e) {
                console.error('[Business] updateScript 失败:', e);
                
                // 出错时清理临时文件
                if (tempFilePath && files.exists(tempFilePath)) {
                    try {
                        files.remove(tempFilePath);
                        console.log('[Business] 已清理临时文件:', tempFilePath);
                    } catch (cleanupError) {
                        console.error('[Business] 清理临时文件失败:', cleanupError);
                    }
                }
                
                return { 
                    success: false, 
                    message: '更新失败: ' + e.message 
                };
            }
        });
        
        // 获取脚本版本信息
        jsBridge.handle('getScriptVersion', function(event) {
            try {
                var scriptStorage = storages.create("script_version");
                var version = scriptStorage.get('plugin_version', null);
                var localPath = scriptStorage.get('plugin_path', null);
                var updateTime = scriptStorage.get('plugin_updateTime', null);
                var md5 = scriptStorage.get('plugin_md5', null);
                
                return { 
                    success: true,
                    version: version,
                    localPath: localPath,
                    updateTime: updateTime,
                    md5: md5,
                    hasVersion: version !== null
                };
            } catch (e) {
                console.error('[Business] getScriptVersion 失败:', e);
                return { 
                    success: false, 
                    message: e.message 
                };
            }
        });
        
        // 验证本地脚本文件完整性
        jsBridge.handle('verifyScriptFile', function(event) {
            try {
                var scriptStorage = storages.create("script_version");
                var localPath = scriptStorage.get('plugin_path', null);
                var savedMd5 = scriptStorage.get('plugin_md5', null);
                
                if (!localPath || !savedMd5) {
                    return { 
                        success: false, 
                        message: '未找到脚本版本信息' 
                    };
                }
                
                if (!files.exists(localPath)) {
                    return { 
                        success: false, 
                        message: '脚本文件不存在: ' + localPath 
                    };
                }
                
                console.log('[Business] 开始验证文件完整性:', localPath);
                var localMd5 = calculateFileMd5(localPath);
                
                if (!localMd5) {
                    return { 
                        success: false, 
                        message: 'MD5计算失败' 
                    };
                }
                
                var isValid = localMd5.toLowerCase() === savedMd5.toLowerCase();
                console.log('[Business] MD5验证结果:', isValid);
                console.log('[Business] 本地MD5:', localMd5);
                console.log('[Business] 保存MD5:', savedMd5);
                
                return { 
                    success: true,
                    isValid: isValid,
                    localMd5: localMd5,
                    savedMd5: savedMd5,
                    message: isValid ? '文件完整性验证通过' : 'MD5不匹配，文件可能已损坏'
                };
            } catch (e) {
                console.error('[Business] verifyScriptFile 失败:', e);
                return { 
                    success: false, 
                    message: '验证失败: ' + e.message 
                };
            }
        });

        // ==================== 系统开关 ====================
        
        // 获取开关状态
        jsBridge.handle('getSwitchStates', function(event) {
            try {
                return {
                    accessibility: auto.service != null,
                    floaty: false // TODO: 从悬浮窗管理器获取状态
                };
            } catch (e) {
                console.error('[Business] getSwitchStates 失败:', e);
                return { accessibility: false, floaty: false };
            }
        });
        
        // 切换无障碍服务
        jsBridge.handle('toggleAccessibility', function(event) {
            try {
                if (auto.service == null) {
                    try {
                        app.startActivity({
                            action: "android.settings.ACCESSIBILITY_SETTINGS"
                        });
                        toast("请在设置中开启无障碍服务");
                    } catch (e) {
                        console.error('[Business] 打开无障碍设置失败:', e);
                    }
                } else {
                    toast("无障碍服务已开启");
                }
                
                return {
                    success: true,
                    enabled: auto.service != null
                };
            } catch (e) {
                console.error('[Business] toggleAccessibility 失败:', e);
                return { success: false, enabled: false };
            }
        });
        
        // 切换悬浮窗
        jsBridge.handle('toggleFloaty', function(event) {
            try {
                // TODO: 实现悬浮窗切换逻辑
                toast('悬浮窗功能开发中...');
                
                return {
                    success: true,
                    enabled: false
                };
            } catch (e) {
                console.error('[Business] toggleFloaty 失败:', e);
                return { success: false, enabled: false };
            }
        });
        
        // 显示关于
        jsBridge.handle('showAbout', function(event) {
            try {
                dialogs.alert('关于', 'AutoJS脚本管理器 v1.0.0\n\n开发者: Developer');
                return { success: true };
            } catch (e) {
                console.error('[Business] showAbout 失败:', e);
                return { success: false };
            }
        });

        console.log('[Business] 业务方法注册完成');
    }
};

