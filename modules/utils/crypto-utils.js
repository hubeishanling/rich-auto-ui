/**
 * 加解密工具模块
 * 支持RSA和AES加解密，用于与后端API加密通信
 * 基于Java原生实现，兼容AutoJS6环境
 */

module.exports = {
    /**
     * Base64编码
     */
    encodeBase64: function(data) {
        try {
            var bytes = new java.lang.String(data).getBytes("UTF-8");
            var encoder = java.util.Base64.getEncoder();
            return encoder.encodeToString(bytes);
        } catch (e) {
            console.error('[CryptoUtils] Base64编码失败:', e);
            throw new Error('Base64编码失败: ' + e.message);
        }
    },
    
    /**
     * Base64解码
     */
    decodeBase64: function(encodedData) {
        try {
            var decoder = java.util.Base64.getDecoder();
            var bytes = decoder.decode(encodedData);
            return new java.lang.String(bytes, "UTF-8");
        } catch (e) {
            console.error('[CryptoUtils] Base64解码失败:', e);
            throw new Error('Base64解码失败: ' + e.message);
        }
    },
    
    /**
     * 生成随机AES密钥
     */
    generateAesKey: function(length) {
        // AES-256 需要32字节密钥
        length = length || 32;
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        var random = new java.security.SecureRandom();
        
        for (var i = 0; i < length; i++) {
            result += chars.charAt(random.nextInt(chars.length));
        }
        return result;
    },
    
    /**
     * AES加密
     */
    encryptAes: function(data, key) {
        try {
            console.log('[CryptoUtils] 开始AES加密，数据长度:', data.length, '密钥长度:', key.length);
            
            // 创建AES密钥（支持16/24/32字节，自动选择AES-128/192/256）
            var keyBytes = new java.lang.String(key).getBytes("UTF-8");
            var secretKey = new javax.crypto.spec.SecretKeySpec(keyBytes, "AES");
            
            // 创建加密器
            var cipher = javax.crypto.Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, secretKey);
            
            // 加密数据
            var dataBytes = new java.lang.String(data).getBytes("UTF-8");
            var encryptedBytes = cipher.doFinal(dataBytes);
            
            // Base64编码
            var encoder = java.util.Base64.getEncoder();
            var result = encoder.encodeToString(encryptedBytes);
            
            console.log('[CryptoUtils] AES加密完成，结果长度:', result.length);
            return result;
        } catch (e) {
            console.error('[CryptoUtils] AES加密失败:', e);
            throw new Error('AES加密失败: ' + e.message);
        }
    },
    
    /**
     * AES解密
     */
    decryptAes: function(encryptedData, key) {
        try {
            console.log('[CryptoUtils] 开始AES解密，数据长度:', encryptedData.length, '密钥长度:', key.length);
            
            // 创建AES密钥（支持16/24/32字节，自动选择AES-128/192/256）
            var keyBytes = new java.lang.String(key).getBytes("UTF-8");
            var secretKey = new javax.crypto.spec.SecretKeySpec(keyBytes, "AES");
            
            // 创建解密器
            var cipher = javax.crypto.Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(javax.crypto.Cipher.DECRYPT_MODE, secretKey);
            
            // Base64解码
            var decoder = java.util.Base64.getDecoder();
            var encryptedBytes = decoder.decode(encryptedData);
            
            // 解密数据
            var decryptedBytes = cipher.doFinal(encryptedBytes);
            var result = new java.lang.String(decryptedBytes, "UTF-8");
            
            console.log('[CryptoUtils] AES解密完成，结果长度:', result.length);
            return result;
        } catch (e) {
            console.error('[CryptoUtils] AES解密失败:', e);
            throw new Error('AES解密失败: ' + e.message);
        }
    },
    
    /**
     * RSA公钥加密
     */
    encryptRsa: function(data, publicKeyStr) {
        try {
            console.log('[CryptoUtils] 开始RSA加密，数据长度:', data.length);
            
            // 解码公钥
            var decoder = java.util.Base64.getDecoder();
            var publicKeyBytes = decoder.decode(publicKeyStr);
            var keySpec = new java.security.spec.X509EncodedKeySpec(publicKeyBytes);
            var keyFactory = java.security.KeyFactory.getInstance("RSA");
            var publicKey = keyFactory.generatePublic(keySpec);
            
            // 创建加密器
            var cipher = javax.crypto.Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, publicKey);
            
            // 加密数据
            var dataBytes = new java.lang.String(data).getBytes("UTF-8");
            var encryptedBytes = cipher.doFinal(dataBytes);
            
            // Base64编码
            var encoder = java.util.Base64.getEncoder();
            var result = encoder.encodeToString(encryptedBytes);
            
            console.log('[CryptoUtils] RSA加密完成，结果长度:', result.length);
            return result;
        } catch (e) {
            console.error('[CryptoUtils] RSA加密失败:', e);
            throw new Error('RSA加密失败: ' + e.message);
        }
    },
    
    /**
     * RSA私钥解密
     */
    decryptRsa: function(encryptedData, privateKeyStr) {
        try {
            console.log('[CryptoUtils] 开始RSA解密，数据长度:', encryptedData.length);
            
            // 解码私钥
            var decoder = java.util.Base64.getDecoder();
            var privateKeyBytes = decoder.decode(privateKeyStr);
            var keySpec = new java.security.spec.PKCS8EncodedKeySpec(privateKeyBytes);
            var keyFactory = java.security.KeyFactory.getInstance("RSA");
            var privateKey = keyFactory.generatePrivate(keySpec);
            
            // 创建解密器
            var cipher = javax.crypto.Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(javax.crypto.Cipher.DECRYPT_MODE, privateKey);
            
            // Base64解码
            var encryptedBytes = decoder.decode(encryptedData);
            
            // 解密数据
            var decryptedBytes = cipher.doFinal(encryptedBytes);
            var result = new java.lang.String(decryptedBytes, "UTF-8");
            
            console.log('[CryptoUtils] RSA解密完成，结果长度:', result.length);
            return result;
        } catch (e) {
            console.error('[CryptoUtils] RSA解密失败:', e);
            throw new Error('RSA解密失败: ' + e.message);
        }
    },
    
    /**
     * 加密请求数据（AES加密数据 + RSA加密AES密钥）
     */
    encryptRequestData: function(data, publicKey) {
        try {
            // 1. 生成随机AES密钥（32字节用于AES-256）
            var aesKey = this.generateAesKey(32);
            console.log('[CryptoUtils] 生成AES密钥:', aesKey);
            
            // 2. Base64编码AES密钥（重要！后端需要先Base64解码）
            var aesKeyBase64 = this.encodeBase64(aesKey);
            console.log('[CryptoUtils] Base64编码AES密钥完成');
            
            // 3. RSA公钥加密Base64编码后的AES密钥
            var encryptedKey = this.encryptRsa(aesKeyBase64, publicKey);
            console.log('[CryptoUtils] RSA加密AES密钥完成');
            
            // 4. 准备请求数据
            var dataStr = typeof data === 'string' ? data : JSON.stringify(data);
            
            // 5. AES加密请求数据
            var encryptedData = this.encryptAes(dataStr, aesKey);
            console.log('[CryptoUtils] AES加密请求数据完成');
            
            return {
                encryptedData: encryptedData,
                encryptHeader: encryptedKey
            };
        } catch (e) {
            console.error('[CryptoUtils] 加密请求数据失败:', e);
            throw e;
        }
    },
    
    /**
     * 解密响应数据（RSA解密AES密钥 + AES解密数据）
     */
    decryptResponseData: function(encryptedData, encryptedKey, privateKey) {
        try {
            console.log('[CryptoUtils] 开始解密响应数据');
            
            // 1. RSA私钥解密得到Base64编码的AES密钥
            var aesKeyBase64 = this.decryptRsa(encryptedKey, privateKey);
            console.log('[CryptoUtils] RSA解密AES密钥完成');
            
            // 2. Base64解码得到AES密钥
            var aesKey = this.decodeBase64(aesKeyBase64);
            console.log('[CryptoUtils] AES密钥Base64解码完成，密钥长度:', aesKey.length);
            
            // 3. AES解密响应数据
            var decryptedData = this.decryptAes(encryptedData, aesKey);
            console.log('[CryptoUtils] AES解密响应数据完成');
            
            return decryptedData;
        } catch (e) {
            console.error('[CryptoUtils] 解密响应数据失败:', e);
            throw e;
        }
    }
};

