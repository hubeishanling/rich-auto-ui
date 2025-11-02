/**
 * API工具模块
 * 封装HTTP请求，提供统一的API调用接口
 */

var config = require('../../config.js');
var httpUtils = require('./http-utils.js');

var API_CONFIG = config.API_CONFIG;

module.exports = {
    /**
     * 发送GET请求
     */
    get: function(endpoint, additionalHeaders) {
        var options = { headers: additionalHeaders };
        var response = httpUtils.get(API_CONFIG.BASE_URL + endpoint, options);
        return this.handleApiError(response);
    },

    /**
     * 发送POST请求
     */
    post: function(endpoint, data, additionalHeaders) {
        var options = { headers: additionalHeaders };
        var response = httpUtils.post(API_CONFIG.BASE_URL + endpoint, data, options);
        return this.handleApiError(response);
    },

    /**
     * 统一的错误处理
     */
    handleApiError: function(response, context) {
        if (response.statusCode !== 200){
            throw new Error("请求失败，状态码：" + response.statusCode);
        }
        if(response.body){
            var result = JSON.parse(response.body);
            if (result.code === 401) {
                // token过期或无效
                console.warn('[ApiUtils] 认证失败，清除token');
                storages.create("auth").remove("cardToken");
                toast("登录已过期，请重新登录");
                throw new Error("登录已过期，请重新登录");
            } else if (result.code === 403) {
                // 权限不足
                toast("权限不足");
                throw new Error("权限不足");
            } else if (result.code >= 500) {
                // 服务器错误
                toast("错误:"+result.msg);
                throw new Error("错误:"+result.msg);
            }
        }
        return response;
    }
};

