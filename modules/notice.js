/**
 * Notice 模块 - 封装 RichAuto 的消息通知方法
 */

module.exports = {
    /**
     * 注册 notice 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 基本通知方法 ====================
        
        // 发送通知 - 支持多种参数形式
        jsBridge.handle('notice.send', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            // notice 支持多种重载形式
            return notice.apply(null, args);
        });
        
        // ==================== 通知状态检查 ====================
        
        // 检测通知是否启用
        jsBridge.handle('notice.isEnabled', function(event) {
            return notice.isEnabled();
        });
        
        // 确保通知已启用
        jsBridge.handle('notice.ensureEnabled', function(event) {
            return notice.ensureEnabled();
        });
        
        // ==================== 通知设置 ====================
        
        // 跳转到通知设置页面
        jsBridge.handle('notice.launchSettings', function(event) {
            return notice.launchSettings();
        });
        
        // ==================== 通知管理 ====================
        
        // 取消通知
        jsBridge.handle('notice.cancel', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return notice.cancel.apply(notice, args);
        });
        
        // ==================== 通知构建器 ====================
        
        // 获取通知构建器
        jsBridge.handle('notice.getBuilder', function(event) {
            return notice.getBuilder();
        });
        
        // ==================== 通知配置 ====================
        
        // 配置通知默认行为
        jsBridge.handle('notice.config', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return notice.config.apply(notice, args);
        });
        
        // ==================== 通知渠道管理 ====================
        
        // 创建通知渠道
        jsBridge.handle('notice.channel.create', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return notice.channel.create.apply(notice.channel, args);
        });
        
        // 检查渠道是否存在
        jsBridge.handle('notice.channel.contains', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return notice.channel.contains.apply(notice.channel, args);
        });
        
        // 删除渠道
        jsBridge.handle('notice.channel.remove', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return notice.channel.remove.apply(notice.channel, args);
        });
        
        // 获取渠道
        jsBridge.handle('notice.channel.get', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var channel = notice.channel.get.apply(notice.channel, args);
            if (channel === null) {
                return null;
            }
            // 返回渠道信息对象
            return {
                id: channel.getId(),
                name: channel.getName(),
                description: channel.getDescription(),
                importance: channel.getImportance()
            };
        });
        
        // 获取所有渠道
        jsBridge.handle('notice.channel.getAll', function(event) {
            var channels = notice.channel.getAll();
            // 转换为可序列化的对象数组
            return channels.map(function(channel) {
                return {
                    id: channel.getId(),
                    name: channel.getName(),
                    description: channel.getDescription(),
                    importance: channel.getImportance()
                };
            });
        });
    }
};


