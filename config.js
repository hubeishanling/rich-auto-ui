/**
 * 应用配置管理模块
 * 
 * 本文件集中管理应用的所有配置项，包括：
 * - API配置：服务器地址、加密密钥、端点等
 * - 应用配置：应用信息、存储键名、悬浮窗配置等
 * 
 * 使用方法：
 * const config = require('./config.js');
 * console.log(config.BASE_URL);              // 快捷访问
 * console.log(config.FLOATY_CONFIG);         // 悬浮窗配置
 * console.log(config.API_CONFIG.CLIENT_ID);  // 完整路径访问
 */

// API配置
const API_CONFIG = {
    // 基础URL，实际部署时请修改为正确的服务器地址
    BASE_URL: "http://www.sanguoyr.top/prod-api/",
    CLIENT_ID: "f36c69cd4655566bbfac652e479cb931",
    
    // 加密配置
    ENCRYPTION: {
        // 是否启用加密
        ENABLED: true,
        // 加密头部标识
        HEADER_FLAG: "encrypt-key",
        PUBLIC_KEY: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4i+V7LlzsIbk2KcKEb3sb3a/gEbUn7FInsLD0l/KcgZPgw96REee/Y5JuppWnn/QbIY6zJmwOlhOENg2tKq4MxDV8GFvSDnW+O2u0DmAiXKdRsVd+ox1Gi3uu6R/9RiRptb7Zf7+ZSrX+dHSoi0Dh51KBaGEX1kZpVDCj016ViQIDAQAB",
        // RSA私钥（用于解密服务器响应）
        // 注意：这是前端解密用的私钥，对应后端配置中的响应加密公钥
        PRIVATE_KEY: "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMM8Oh8n8Co8CQ3nmsn2fH29+xJdBVPe9hg/fIBksMtKKh1Hh97ZL1sU2fg2wNDMe40iN/mBj260Q8Vn04wiSiCzNQCyI6zDnguRYXrV3gLKMNsxyJA7uQaFbkApCabkMU4rIu2G6Wm79wDJIYgQGeEh5ca93NiAV4gt7mzuPGkXAgMBAAECgYBKJuheaAFgUTARL2vLlIphCdS/+0OoQNFQkWBctaGufKs1NrNk0TGa0vccvtMKGvg8OQhwhCRxpBbvdclT+rwTNzlehXuZBo81CulVZgKxmLML0IUQJw7GVL0+GZlsEjMpNkQWm3ABVvCwO5IyfyqHDZ3OhAaJWTDuz4GRphgJBQJBAP3tymoeIU/Z4jlbBDkL9Y661ThIOsZI7ei/At3E3FSMGW1+GI7mPZDjTcUeknqUc3h1ua/bVcGgOOJqdgw8+EMCQQDE0+H8HqzW9DsYCmjRPYe5LyBFkVZzMQGVqMw58vxKjP80cuqvPgdVm9hy9oJSBy1Uek79wXGiV859p4GpeLidAkB+54VerXo2fwzZX0xn+jsZvvPqseZ1zGLiC/wxuz3mHzJiDz/UwuqH66GlXxcTnfdrf2Jyqepc32cueMhQa3QjAkALLBu/u94DtYlFLBIXDm8Ny+cBC+bkUvvMCvDMuUYo1SgHSh6YI+U2rsnyfJuZHF8uVGL3dGuG04UdDM0HWZrhAkEA84ZxxG2IqzftFwl9DpeBjKLDvheeDxtxzVPsWP1jvllwXQX5ioNIeeWTaN1tqk//mPSfYN9cYhGrI+R/NJrJKQ=="
    },
    
    // 租户ID
    TENANT_ID: "344269",
    
    // API端点
    ENDPOINTS: {
        LOGIN: "/open-api/script/login",
        LOGOUT: "/open-api/script/logout",
        CARD_INFO: "/open-api/script/card-info",
        VERIFY: "/open-api/script/verify",
        LATEST_VERSION: "/open-api/script/latest",
        PRE_CHECK: "/open-api/script/pre-check",
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
        NAME: "Rich AutoJS UI",
        VERSION: "1.0.0",
        DEVELOPER: "闪灵科技有限公司",
        UPDATE_DATE: "2025-10-31"
    },
    
    // 游戏ID配置
    GAME_ID: "1979562872183189505",  // 默认游戏ID，根据实际情况修改
    
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

