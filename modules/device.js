/**
 * Device 模块 - 封装 RichAuto 的设备相关方法
 */

module.exports = {
    /**
     * 注册 device 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 设备信息属性 ====================
        
        // 设备屏幕宽度
        jsBridge.handle('device.width', function(event) {
            return device.width;
        });
        
        // 设备屏幕高度
        jsBridge.handle('device.height', function(event) {
            return device.height;
        });
        
        // 修订版本号
        jsBridge.handle('device.buildId', function(event) {
            return device.buildId;
        });
        
        // 设备主板型号
        jsBridge.handle('device.broad', function(event) {
            return device.broad;
        });
        
        // 厂商品牌
        jsBridge.handle('device.brand', function(event) {
            return device.brand;
        });
        
        // 设备工业设计名称
        jsBridge.handle('device.device', function(event) {
            return device.device;
        });
        
        // 设备型号
        jsBridge.handle('device.model', function(event) {
            return device.model;
        });
        
        // 产品名称
        jsBridge.handle('device.product', function(event) {
            return device.product;
        });
        
        // Bootloader版本
        jsBridge.handle('device.bootloader', function(event) {
            return device.bootloader;
        });
        
        // 硬件名称
        jsBridge.handle('device.hardware', function(event) {
            return device.hardware;
        });
        
        // 构建唯一标识码
        jsBridge.handle('device.fingerprint', function(event) {
            return device.fingerprint;
        });
        
        // 硬件序列号
        jsBridge.handle('device.serial', function(event) {
            return device.serial;
        });
        
        // 安卓系统API版本
        jsBridge.handle('device.sdkInt', function(event) {
            return device.sdkInt;
        });
        
        // 内部版本控制值
        jsBridge.handle('device.incremental', function(event) {
            return device.incremental;
        });
        
        // Android系统版本号
        jsBridge.handle('device.release', function(event) {
            return device.release;
        });
        
        // 基础OS构建
        jsBridge.handle('device.baseOS', function(event) {
            return device.baseOS;
        });
        
        // 安全补丁级别
        jsBridge.handle('device.securityPatch', function(event) {
            return device.securityPatch;
        });
        
        // 开发代号
        jsBridge.handle('device.codename', function(event) {
            return device.codename;
        });
        
        // ==================== 设备信息获取 ====================
        
        // 获取IMEI
        jsBridge.handle('device.getIMEI', function(event) {
            return device.getIMEI();
        });
        
        // 获取Android ID
        jsBridge.handle('device.getAndroidId', function(event) {
            return device.getAndroidId();
        });
        
        // 获取Mac地址
        jsBridge.handle('device.getMacAddress', function(event) {
            return device.getMacAddress();
        });
        
        // ==================== 亮度控制 ====================
        
        // 获取当前亮度
        jsBridge.handle('device.getBrightness', function(event) {
            return device.getBrightness();
        });
        
        // 获取亮度模式
        jsBridge.handle('device.getBrightnessMode', function(event) {
            return device.getBrightnessMode();
        });
        
        // 设置亮度
        jsBridge.handle('device.setBrightness', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return device.setBrightness.apply(device, args);
        });
        
        // 设置亮度模式
        jsBridge.handle('device.setBrightnessMode', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return device.setBrightnessMode.apply(device, args);
        });
        
        // ==================== 音量控制 ====================
        
        // 获取媒体音量
        jsBridge.handle('device.getMusicVolume', function(event) {
            return device.getMusicVolume();
        });
        
        // 获取通知音量
        jsBridge.handle('device.getNotificationVolume', function(event) {
            return device.getNotificationVolume();
        });
        
        // 获取闹钟音量
        jsBridge.handle('device.getAlarmVolume', function(event) {
            return device.getAlarmVolume();
        });
        
        // 获取媒体音量最大值
        jsBridge.handle('device.getMusicMaxVolume', function(event) {
            return device.getMusicMaxVolume();
        });
        
        // 获取通知音量最大值
        jsBridge.handle('device.getNotificationMaxVolume', function(event) {
            return device.getNotificationMaxVolume();
        });
        
        // 获取闹钟音量最大值
        jsBridge.handle('device.getAlarmMaxVolume', function(event) {
            return device.getAlarmMaxVolume();
        });
        
        // 设置媒体音量
        jsBridge.handle('device.setMusicVolume', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return device.setMusicVolume.apply(device, args);
        });
        
        // 设置通知音量
        jsBridge.handle('device.setNotificationVolume', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return device.setNotificationVolume.apply(device, args);
        });
        
        // 设置闹钟音量
        jsBridge.handle('device.setAlarmVolume', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return device.setAlarmVolume.apply(device, args);
        });
        
        // ==================== 电池信息 ====================
        
        // 获取电量百分比
        jsBridge.handle('device.getBattery', function(event) {
            return device.getBattery();
        });
        
        // 是否正在充电
        jsBridge.handle('device.isCharging', function(event) {
            return device.isCharging();
        });
        
        // ==================== 内存信息 ====================
        
        // 获取总内存
        jsBridge.handle('device.getTotalMem', function(event) {
            return device.getTotalMem();
        });
        
        // 获取可用内存
        jsBridge.handle('device.getAvailMem', function(event) {
            return device.getAvailMem();
        });
        
        // ==================== 屏幕控制 ====================
        
        // 屏幕是否点亮
        jsBridge.handle('device.isScreenOn', function(event) {
            return device.isScreenOn();
        });
        
        // 唤醒设备
        jsBridge.handle('device.wakeUp', function(event) {
            return device.wakeUp();
        });
        
        // 如果需要则唤醒
        jsBridge.handle('device.wakeUpIfNeeded', function(event) {
            return device.wakeUpIfNeeded();
        });
        
        // 保持屏幕常亮
        jsBridge.handle('device.keepScreenOn', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return device.keepScreenOn.apply(device, args);
        });
        
        // 保持屏幕常亮但允许变暗
        jsBridge.handle('device.keepScreenDim', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return device.keepScreenDim.apply(device, args);
        });
        
        // 取消保持唤醒
        jsBridge.handle('device.cancelKeepingAwake', function(event) {
            return device.cancelKeepingAwake();
        });
        
        // ==================== 振动控制 ====================
        
        // 振动
        jsBridge.handle('device.vibrate', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return device.vibrate.apply(device, args);
        });
        
        // 取消振动
        jsBridge.handle('device.cancelVibration', function(event) {
            return device.cancelVibration();
        });
    }
};


