/**
 * Files 模块 - 封装 RichAuto 的文件处理方法
 */

module.exports = {
    /**
     * 注册 files 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 文件类型判断 ====================
        
        // 判断是否是文件
        jsBridge.handle('files.isFile', function(event, path) {
            return files.isFile(path);
        });
        
        // 判断是否是文件夹
        jsBridge.handle('files.isDir', function(event, path) {
            return files.isDir(path);
        });
        
        // 判断是否是空文件夹
        jsBridge.handle('files.isEmptyDir', function(event, path) {
            return files.isEmptyDir(path);
        });
        
        // ==================== 路径操作 ====================
        
        // 连接路径
        jsBridge.handle('files.join', function(event, parent, child) {
            return files.join(parent, child);
        });
        
        // 获取文件名
        jsBridge.handle('files.getName', function(event, path) {
            return files.getName(path);
        });
        
        // 获取不含扩展名的文件名
        jsBridge.handle('files.getNameWithoutExtension', function(event, path) {
            return files.getNameWithoutExtension(path);
        });
        
        // 获取扩展名
        jsBridge.handle('files.getExtension', function(event, path) {
            return files.getExtension(path);
        });
        
        // 获取 SD 卡路径
        jsBridge.handle('files.getSdcardPath', function(event) {
            return files.getSdcardPath();
        });
        
        // 获取当前工作目录
        jsBridge.handle('files.cwd', function(event) {
            return files.cwd();
        });
        
        // 获取相对路径对应的绝对路径
        jsBridge.handle('files.path', function(event, relativePath) {
            return files.path(relativePath);
        });
        
        // ==================== 文件创建与存在性检查 ====================
        
        // 创建文件或文件夹
        jsBridge.handle('files.create', function(event, path) {
            return files.create(path);
        });
        
        // 创建文件或文件夹（含父目录）
        jsBridge.handle('files.createWithDirs', function(event, path) {
            return files.createWithDirs(path);
        });
        
        // 检查文件是否存在
        jsBridge.handle('files.exists', function(event, path) {
            return files.exists(path);
        });
        
        // 确保目录存在
        jsBridge.handle('files.ensureDir', function(event, path) {
            files.ensureDir(path);
            return true;
        });
        
        // ==================== 文件读取 ====================
        
        // 读取文本文件
        jsBridge.handle('files.read', function(event, path, encoding) {
            return files.read(path, encoding);
        });
        
        // 读取字节数组
        jsBridge.handle('files.readBytes', function(event, path) {
            var bytes = files.readBytes(path);
            // 将字节数组转换为数组，以便 JSON 序列化
            var arr = [];
            for (var i = 0; i < bytes.length; i++) {
                arr.push(bytes[i]);
            }
            return arr;
        });
        
        // ==================== 文件写入 ====================
        
        // 写入文本文件
        jsBridge.handle('files.write', function(event, path, text, encoding) {
            files.write(path, text, encoding);
            return true;
        });
        
        // 写入字节数组
        jsBridge.handle('files.writeBytes', function(event, path, bytes) {
            // 将数组转换为 Java 字节数组
            var javaBytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, bytes.length);
            for (var i = 0; i < bytes.length; i++) {
                javaBytes[i] = bytes[i];
            }
            files.writeBytes(path, javaBytes);
            return true;
        });
        
        // 追加文本
        jsBridge.handle('files.append', function(event, path, text, encoding) {
            files.append(path, text, encoding);
            return true;
        });
        
        // 追加字节数组
        jsBridge.handle('files.appendBytes', function(event, path, bytes) {
            // 将数组转换为 Java 字节数组
            var javaBytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, bytes.length);
            for (var i = 0; i < bytes.length; i++) {
                javaBytes[i] = bytes[i];
            }
            files.appendBytes(path, javaBytes);
            return true;
        });
        
        // ==================== 文件操作 ====================
        
        // 复制文件
        jsBridge.handle('files.copy', function(event, fromPath, toPath) {
            return files.copy(fromPath, toPath);
        });
        
        // 移动文件
        jsBridge.handle('files.move', function(event, fromPath, toPath) {
            return files.move(fromPath, toPath);
        });
        
        // 重命名文件
        jsBridge.handle('files.rename', function(event, path, newName) {
            return files.rename(path, newName);
        });
        
        // 重命名文件（不含扩展名）
        jsBridge.handle('files.renameWithoutExtension', function(event, path, newName) {
            return files.renameWithoutExtension(path, newName);
        });
        
        // 删除文件或空文件夹
        jsBridge.handle('files.remove', function(event, path) {
            return files.remove(path);
        });
        
        // 删除文件夹及其内容
        jsBridge.handle('files.removeDir', function(event, path) {
            return files.removeDir(path);
        });
        
        // ==================== 目录列表 ====================
        
        // 列出目录内容
        jsBridge.handle('files.listDir', function(event, path, filter) {
            var list = files.listDir(path);
            // 将 Java 数组转换为 JavaScript 数组
            var arr = [];
            for (var i = 0; i < list.length; i++) {
                arr.push(list[i]);
            }
            return arr;
        });
    }
};


