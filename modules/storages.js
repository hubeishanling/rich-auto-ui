/**
 * Storages 模块 - 封装 RichAuto 的本地存储方法
 */

// 存储所有创建的 Storage 实例
var storageInstances = {};

module.exports = {
    /**
     * 注册 storages 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== Storages 全局方法 ====================
        
        // 创建或获取本地存储
        jsBridge.handle('storages.create', function(event, name) {
            try {
                var storage = storages.create(name);
                // 保存实例引用
                storageInstances[name] = storage;
                return {
                    success: true,
                    name: name
                };
            } catch (err) {
                return {
                    success: false,
                    error: String(err)
                };
            }
        });
        
        // 删除本地存储
        jsBridge.handle('storages.remove', function(event, name) {
            try {
                var result = storages.remove(name);
                // 清除实例引用
                delete storageInstances[name];
                return result;
            } catch (err) {
                return false;
            }
        });
        
        // ==================== Storage 实例方法 ====================
        
        // 存入数据
        jsBridge.handle('storage.put', function(event, storageName, key, value) {
            try {
                var storage = storageInstances[storageName];
                if (!storage) {
                    storage = storages.create(storageName);
                    storageInstances[storageName] = storage;
                }
                storage.put(key, value);
                return true;
            } catch (err) {
                return false;
            }
        });
        
        // 获取数据
        jsBridge.handle('storage.get', function(event, storageName, key, defaultValue) {
            try {
                var storage = storageInstances[storageName];
                if (!storage) {
                    storage = storages.create(storageName);
                    storageInstances[storageName] = storage;
                }
                var value = storage.get(key, defaultValue);
                return value;
            } catch (err) {
                return defaultValue;
            }
        });
        
        // 删除指定键
        jsBridge.handle('storage.remove', function(event, storageName, key) {
            try {
                var storage = storageInstances[storageName];
                if (!storage) {
                    storage = storages.create(storageName);
                    storageInstances[storageName] = storage;
                }
                storage.remove(key);
                return true;
            } catch (err) {
                return false;
            }
        });
        
        // 清空所有数据
        jsBridge.handle('storage.clear', function(event, storageName) {
            try {
                var storage = storageInstances[storageName];
                if (!storage) {
                    storage = storages.create(storageName);
                    storageInstances[storageName] = storage;
                }
                storage.clear();
                return true;
            } catch (err) {
                return false;
            }
        });
        
        // 检查键是否存在
        jsBridge.handle('storage.contains', function(event, storageName, key) {
            try {
                var storage = storageInstances[storageName];
                if (!storage) {
                    storage = storages.create(storageName);
                    storageInstances[storageName] = storage;
                }
                return storage.contains(key);
            } catch (err) {
                return false;
            }
        });
    }
};


