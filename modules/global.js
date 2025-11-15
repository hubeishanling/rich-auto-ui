/**
 * Global 模块 - 封装 RichAuto 的全局方法
 */

module.exports = {
    /**
     * 注册 global 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 基础方法 ====================
        
        // 睡眠
        jsBridge.handle('global.sleep', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return sleep.apply(null, args);
        });

        // 显示 Toast
        jsBridge.handle('global.toast', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return toast.apply(null, args);
        });

        // 显示 Toast 并打印日志
        jsBridge.handle('global.toastLog', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return toastLog.apply(null, args);
        });

        // 随机数
        jsBridge.handle('global.random', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return random.apply(null, args);
        });

        // ==================== 等待方法 ====================
        
        // 等待条件满足
        jsBridge.handle('global.wait', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return wait.apply(null, args);
        });

        // 等待指定 Activity
        jsBridge.handle('global.waitForActivity', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return waitForActivity.apply(null, args);
        });

        // 等待指定包名
        jsBridge.handle('global.waitForPackage', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return waitForPackage.apply(null, args);
        });

        // ==================== 脚本控制 ====================
        
        // 退出脚本
        jsBridge.handle('global.exit', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return exit.apply(null, args);
        });

        // 停止脚本
        jsBridge.handle('global.stop', function(event) {
            return stop();
        });

        // 检测脚本是否已停止
        jsBridge.handle('global.isStopped', function(event) {
            return isStopped();
        });

        // 检测脚本是否正在运行
        jsBridge.handle('global.isRunning', function(event) {
            return isRunning();
        });

        // 检测脚本是否正在关闭（已弃用）
        jsBridge.handle('global.isShuttingDown', function(event) {
            return isShuttingDown();
        });

        // 检测脚本是否未停止（已弃用）
        jsBridge.handle('global.notStopped', function(event) {
            return notStopped();
        });

        // ==================== 版本要求 ====================
        
        // 要求最低 API 级别
        jsBridge.handle('global.requiresApi', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return requiresApi.apply(null, args);
        });

        // 要求最低 RichAuto 版本
        jsBridge.handle('global.requiresAutojsVersion', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return requiresAutojsVersion.apply(null, args);
        });

        // ==================== Java 互操作 ====================
        
        // 导入 Java 包
        jsBridge.handle('global.importPackage', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return importPackage.apply(null, args);
        });

        // 导入 Java 类
        jsBridge.handle('global.importClass', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return importClass.apply(null, args);
        });

        // ==================== 系统信息 ====================
        
        // 获取当前包名
        jsBridge.handle('global.currentPackage', function(event) {
            return currentPackage();
        });

        // 获取当前 Activity
        jsBridge.handle('global.currentActivity', function(event) {
            return currentActivity();
        });

        // ==================== 剪贴板 ====================
        
        // 设置剪贴板内容
        jsBridge.handle('global.setClip', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return setClip.apply(null, args);
        });

        // 获取剪贴板内容
        jsBridge.handle('global.getClip', function(event) {
            return getClip();
        });

        // ==================== 选择器相关 ====================
        
        // 构建选择器
        jsBridge.handle('global.selector', function(event) {
            return selector();
        });

        // 拾取选择器
        jsBridge.handle('global.pickup', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return pickup.apply(null, args);
        });

        // 控件探测
        jsBridge.handle('global.detect', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return detect.apply(null, args);
        });

        // 检查所有选择器是否存在
        jsBridge.handle('global.existsAll', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return existsAll.apply(null, args);
        });

        // 检查任一选择器是否存在
        jsBridge.handle('global.existsOne', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return existsOne.apply(null, args);
        });

        // ==================== 坐标标度 ====================
        
        // X 坐标标度
        jsBridge.handle('global.cX', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return cX.apply(null, args);
        });

        // Y 坐标标度
        jsBridge.handle('global.cY', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return cY.apply(null, args);
        });

        // 以 X 度量的 Y 坐标标度
        jsBridge.handle('global.cYx', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return cYx.apply(null, args);
        });

        // 以 Y 度量的 X 坐标标度
        jsBridge.handle('global.cXy', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return cXy.apply(null, args);
        });

        // ==================== 类型判断 ====================
        
        // 获取对象种类
        jsBridge.handle('global.species', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return species.apply(null, args);
        });

        // 类型判断方法
        // 注意: species 是 AutoJS6 的全局对象，species.isXxx 是其扩展方法
        var typeCheckers = [
            'isArray', 'isArrayBuffer', 'isBigInt', 'isBoolean', 'isContinuation',
            'isDataView', 'isDate', 'isError', 'isFloat32Array', 'isFloat64Array',
            'isFunction', 'isHTMLDocument', 'isInt16Array', 'isInt32Array', 'isInt8Array',
            'isJavaObject', 'isJavaPackage', 'isMap', 'isNamespace', 'isNull',
            'isNumber', 'isObject', 'isQName', 'isRegExp', 'isSet',
            'isString', 'isUint16Array', 'isUint32Array', 'isUint8Array', 'isUint8ClampedArray',
            'isUndefined', 'isWeakMap', 'isWeakSet', 'isWindow', 'isXML', 'isXMLList'
        ];

        for (var i = 0; i < typeCheckers.length; i++) {
            (function(method) {
                jsBridge.handle('global.' + method, function(event, o) {
                    // species 是 AutoJS6 全局对象，检查其子方法是否存在
                    if (typeof species !== 'undefined' && typeof species[method] === 'function') {
                        return species[method](o);
                    }
                    // 如果不存在，返回 false
                    return false;
                });
            })(typeCheckers[i]);
        }

        // ==================== 设备属性 ====================
        
        // 屏幕宽度
        jsBridge.handle('global.WIDTH', function(event) {
            return WIDTH;
        });

        // 屏幕高度
        jsBridge.handle('global.HEIGHT', function(event) {
            return HEIGHT;
        });
    }
};
