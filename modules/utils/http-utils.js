/**
 * HTTP工具类
 * 统一处理认证头部、加密解密等
 */

var cryptoUtils = require('./crypto-utils.js');
var config = require('../../config.js');

module.exports = {
    /**
     * 获取认证头部
     */
    getAuthHeaders: function() {
        var headers = {};
        
        // 添加客户端ID
        headers['clientid'] = config.API_CONFIG.CLIENT_ID;
        
        // 添加JWT token
        try {
            var storage = storages.create("auth");
            var token = storage.get("cardToken", "");

            if (token) {
                headers['Authorization'] = 'Bearer ' + token;
            }
        } catch (e) {
            console.warn('[HttpUtils] 获取认证token失败:', e.message);
        }
        
        return headers;
    },
    
    /**
     * 合并请求头部
     */
    mergeHeaders: function(customHeaders) {
        var authHeaders = this.getAuthHeaders();
        var mergedHeaders = Object.assign({}, authHeaders, customHeaders || {});
        
        // 默认Content-Type
        if (!mergedHeaders['Content-Type']) {
            mergedHeaders['Content-Type'] = 'application/json';
        }
        
        return mergedHeaders;
    },
    
    /**
     * 发送GET请求
     */
    get: function(url, options) {
        options = options || {};
        
        try {
            var finalHeaders = this.mergeHeaders(options.headers);
            
            // 如果启用了加密，添加租户ID头部（确保服务端使用正确的密钥）
            var encryptionConfig = config.API_CONFIG.ENCRYPTION;
            if (encryptionConfig && encryptionConfig.ENABLED) {
                finalHeaders['tenantId'] = config.API_CONFIG.TENANT_ID;
            }
            
            var response = http.get(url, {
                headers: finalHeaders
            });
            
            // 处理响应解密
            return this.handleResponse(response, options);
        } catch (e) {
            console.error('[HttpUtils] GET请求失败:', e);
            throw e;
        }
    },
    
    /**
     * 发送POST请求
     */
    post: function(url, data, options) {
        options = options || {};
        
        try {
            var encryptionConfig = config.API_CONFIG.ENCRYPTION;
            var needEncrypt = encryptionConfig && encryptionConfig.ENABLED;
            
            var requestData = data;
            var finalHeaders = this.mergeHeaders(options.headers);
            
            // 处理请求加密
            if (needEncrypt) {
                console.log('[HttpUtils] 开始加密请求数据...');
                var encryptResult = cryptoUtils.encryptRequestData(data, encryptionConfig.PUBLIC_KEY);
                requestData = encryptResult.encryptedData;
                
                // 添加加密头部
                finalHeaders[encryptionConfig.HEADER_FLAG] = encryptResult.encryptHeader;
                finalHeaders['tenantId'] = config.API_CONFIG.TENANT_ID;
            }
            
            var response = http.postJson(url, requestData, {
                headers: finalHeaders
            });            
            // 处理响应解密
            return this.handleResponse(response, options);
        } catch (e) {
            console.error('[HttpUtils] POST请求失败:', e);
            throw e;
        }
    },
    
    /**
     * 处理响应（解密）
     */
    handleResponse: function(response, options) {
        try {
            var body = response.body.string();
            
            // 检查响应是否需要解密
            var encryptionConfig = config.API_CONFIG.ENCRYPTION;
            var needDecrypt = encryptionConfig && encryptionConfig.ENABLED;
            
            if (needDecrypt && response.headers && response.headers[encryptionConfig.HEADER_FLAG]) {
                console.log('[HttpUtils] 检测到加密响应，开始解密...');
                var encryptedKey = response.headers[encryptionConfig.HEADER_FLAG];
                var decryptedBody = cryptoUtils.decryptResponseData(
                    body,
                    encryptedKey,
                    encryptionConfig.PRIVATE_KEY
                );
                body = decryptedBody;
            }
            return {
                statusCode: response.statusCode,
                statusMessage: response.statusMessage,
                headers: response.headers,
                body: body
            };
        } catch (e) {
            console.error('[HttpUtils] 处理响应失败:', e);
            throw e;
        }
    }
};

