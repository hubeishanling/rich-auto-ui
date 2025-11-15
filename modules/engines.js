/**
 * Engines 模块 - 封装 RichAuto 的脚本引擎方法
 */

module.exports = {
    /**
     * 注册 engines 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 脚本执行 ====================
        
        // 执行脚本字符串
        jsBridge.handle('engines.execScript', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var name = args[0];
            var script = args[1];
            var config = args[2] || {};
            
            var execution = engines.execScript(name, script, config);
            // 返回一个标识符，后续可以用来操作这个脚本
            return {
                id: execution.id || execution.toString()
            };
        });
        
        // 执行脚本文件
        jsBridge.handle('engines.execScriptFile', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var path = args[0];
            var config = args[1] || {};
            
            var execution = engines.execScriptFile(path, config);
            return {
                id: execution.id || execution.toString()
            };
        });
        
        // 执行录制文件
        jsBridge.handle('engines.execAutoFile', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var path = args[0];
            var config = args[1] || {};
            
            var execution = engines.execAutoFile(path, config);
            return {
                id: execution.id || execution.toString()
            };
        });
        
        // ==================== 脚本控制 ====================
        
        // 停止所有脚本
        jsBridge.handle('engines.stopAll', function(event) {
            return engines.stopAll();
        });
        
        // 停止所有脚本并显示提示
        jsBridge.handle('engines.stopAllAndToast', function(event) {
            return engines.stopAllAndToast();
        });
        
        // ==================== 脚本引擎信息 ====================
        
        // 获取当前脚本引擎
        jsBridge.handle('engines.myEngine', function(event) {
            var engine = engines.myEngine();
            return {
                cwd: engine.cwd(),
                id: engine.id || engine.toString(),
                execArgv: engine.execArgv
            };
        });
        
        // 获取所有正在运行的脚本引擎
        jsBridge.handle('engines.all', function(event) {
            var allEngines = engines.all();
            var result = [];
            for (var i = 0; i < allEngines.length; i++) {
                var engine = allEngines[i];
                result.push({
                    cwd: engine.cwd(),
                    id: engine.id || engine.toString()
                });
            }
            return result;
        });
        
        // ==================== ScriptEngine 方法 ====================
        
        // 停止脚本引擎
        jsBridge.handle('engines.ScriptEngine.forceStop', function(event) {
            var engineId = arguments[1];
            // 注意：这里需要通过某种方式找到对应的引擎实例
            // 简化实现：停止所有脚本
            return engines.stopAll();
        });
        
        // 获取脚本执行路径
        jsBridge.handle('engines.ScriptEngine.cwd', function(event) {
            return engines.myEngine().cwd();
        });
        
        // 获取脚本源对象
        jsBridge.handle('engines.ScriptEngine.getSource', function(event) {
            var source = engines.myEngine().getSource();
            return {
                name: source.getName ? source.getName() : 'unknown',
                path: source.getPath ? source.getPath() : null
            };
        });
        
        // 向脚本引擎发送事件
        jsBridge.handle('engines.ScriptEngine.emit', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var eventName = args[0];
            var eventArgs = args.slice(1);
            
            var engine = engines.myEngine();
            return engine.emit.apply(engine, [eventName].concat(eventArgs));
        });
    }
};



