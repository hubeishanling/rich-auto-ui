// API配置
const API_CONFIG = {
    // 基础URL，实际部署时请修改为正确的服务器地址
    BASE_URL: "http://www.sanguoyr.top/prod-api",
    CLIENT_ID: "f36c69cd4655566bbfac652e479cb931",
    
    // 加密配置
    ENCRYPTION: {
        // 是否启用加密
        ENABLED: true,
        // 加密头部标识
        HEADER_FLAG: "encrypt-key",
        PUBLIC_KEY: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDnsoDGl6TWsVSLov1EgTiVE3+GeXMKNASQ190VdoGx0HukhnuT6q8fv+zlByjSqwZI1NCdLUKRa/LvQIxjbsAeCpbwP31OGnKQtcjSwBbDe34wREdcdzp8hy8rHeZe4AUvZ0CLYJS/hJqKq7/8zjmgHI4XGetkO23eFRdZIXX45QIDAQAB",
        // RSA私钥（用于解密服务器响应）
        // 注意：这是前端解密用的私钥，对应后端配置中的响应加密公钥
        PRIVATE_KEY: "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANTzfr/fP+G4Cp27oqC+H3Y29c3nk4zLMpMXhvtqSMCiozqo64+nFXWTahu1Ld1I7jFNQHkZsTi4ASeJux5RerO0/F6VfbcwSe0PFEXxggZw6stKAWhGQp3o76/Dp1ILvrWOsFb1RCblCJIw/ZPVigqgFsejAukEcEnKeYFgdGNNAgMBAAECgYAhdv51MqU8WIq6jPEap6YUEsEAEaNbXdddzDW3LtWuCCD0p/UUxyIVLwxevFMv0jU0ZDp8jXAPRMNRrlBMjGtmpsQ7viimkQc+wEYkGzpbRrNM3NAGEitKrt/ZRUyiHWOIxsqu8H3rA5NiMCZDwouMGmoRfnkuCzLmMhz5dvCKtQJBAPiQKRcOvpVpbstQ8miA8IuMNg0fUqcv389kfAZclTX4hI+SFVkVnbyIQUJTzYrsXZYgbs3p/O6Rh9TeVImKU28CQQDbUpGnMFa+381+xpK2QcZzyNTrCFeJaff8slkSFLBOgyYGz/bPybqcZgYGig9AN9iwOZyad+MaS8tnmFobGKcDAkBlKb8ffEfC5atLIoHWWIwOL52cD6CDHO/5J4t2x12PHrtM94aqwCp3nfj5dsQUA4k/XanbMp1Xt3FSCL7dT6gPAkAWa/6QBRUZNnAfwdVF5LuRIrsBvDyWw8qifuk0PAE6RZYhpCkrXQhC7Ps4t+yPOCZi/cDQ2ejRy2XkFWNA2ehZAkEA4vgG40y8g843MEQt+BwA2/Fxu3uwfG8aBeY9XlwSPKlOGAgZoHer9RD2Yjr4kC36gLy4CljfnIckLZqTJ6wI2A=="
    },
    
    // 租户ID
    TENANT_ID: "027048",
    
    // API端点
    ENDPOINTS: {
        LOGIN: "/open-api/script/login",
        LOGOUT: "/open-api/script/logout",
        CARD_INFO: "/open-api/script/card-info",
        VERIFY: "/open-api/script/verify",
        LATEST_VERSION: "/open-api/script/latest",
        GAME_DATA: "/open-api/script/game-data",
        LOGS_UPLOAD: "/open-api/script/logs/upload",
		PRE_CHECK: "/open-api/script/pre-check"
    },
    
    // HTTP请求配置
    REQUEST_CONFIG: {
        TIMEOUT: 30000,
        MAX_RETRIES: 3
    }
};

// 应用配置
const APP_CONFIG = {
    // 应用信息
    APP_INFO: {
        NAME: "Rich Auto UI",
        VERSION: "1.0.0",
        DEVELOPER: "闪灵科技有限公司",
        UPDATE_DATE: "2025-10-31"
    },
    
    // 游戏ID配置
    GAME_ID: "1989585815337754626",  // 默认游戏ID，根据实际情况修改
    
    // 存储键名
    STORAGE_KEYS: {
        AUTH: "auth",
        LOGIN: "login",
        CARD_TOKEN: "cardToken",
        CARD_NO: "cardNo",
        DEVICE_ID: "deviceId",
        REMEMBER: "remember"
    },
    
    // 悬浮窗配置
    FLOATY_CONFIG: {
        // 目标脚本路径（悬浮窗启动/停止的脚本）
        // 插件模式：相对于内存中的模块路径，如 "main.js" 或 "modules/business.js"
        // 开发模式：相对于项目根目录的文件路径
        TARGET_SCRIPT_PATH: "main.js",
        
        // 悬浮窗初始位置（单位：像素）
        INITIAL_POSITION: {
            X: 50,      // 距离屏幕左边的距离
            Y: 200      // 距离屏幕顶部的距离
        },
        
        // 悬浮 WebView 配置窗口大小（相对屏幕的百分比 0.0-1.0）
        WEBVIEW_SIZE: {
            WIDTH_PERCENT: 0.8,   // 80% 屏幕宽度
            HEIGHT_PERCENT: 0.7   // 70% 屏幕高度
        },
        
        // 悬浮 WebView 页面路径
        // 点击配置按钮时显示的页面
        WEBVIEW_PAGE: "web/index.html",
        
        // 悬浮 WebView 窗口标题
        WEBVIEW_TITLE: "配置页面"
    }
};

// 导出配置
module.exports = {
    API_CONFIG: API_CONFIG,
    APP_CONFIG: APP_CONFIG,
    
    // 便捷访问
    get BASE_URL() { return API_CONFIG.BASE_URL; },
    get CLIENT_ID() { return API_CONFIG.CLIENT_ID; },
    get TENANT_ID() { return API_CONFIG.TENANT_ID; },
    get ENDPOINTS() { return API_CONFIG.ENDPOINTS; },
    get APP_NAME() { return APP_CONFIG.APP_INFO.NAME; },
    get APP_VERSION() { return APP_CONFIG.APP_INFO.VERSION; },
    get GAME_ID() { return APP_CONFIG.GAME_ID; },
    get STORAGE_KEYS() { return APP_CONFIG.STORAGE_KEYS; },
    get FLOATY_CONFIG() { return APP_CONFIG.FLOATY_CONFIG; }
};
