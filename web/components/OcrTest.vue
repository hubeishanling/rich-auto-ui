<template>
    <div>
        <van-cell-group title="OCR 基础功能">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="getMode" style="margin: 8px;">获取当前模式</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="setModeMLKit" style="margin: 8px;">切换到 MLKit</van-button>
                <van-button @click="setModePaddle" style="margin: 8px;">切换到 Paddle</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="getSummary" style="margin: 8px;">获取 OCR 摘要</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="屏幕截图 OCR">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="ocrScreen" style="margin: 8px;">识别屏幕文本</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="ocrScreenRegion" style="margin: 8px;">识别屏幕区域文本</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="detectScreen" style="margin: 8px;">检测屏幕文本（详细）</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="图像文件 OCR">
            <van-row type="flex" justify="center">
                <van-button @click="ocrImagePath" style="margin: 8px;">识别图像文件文本</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="detectImagePath" style="margin: 8px;">检测图像文件文本（详细）</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="特定引擎测试">
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testMLKit" style="margin: 8px;">测试 MLKit 引擎</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testPaddle" style="margin: 8px;">测试 Paddle 引擎</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="OCR 结果">
            <van-cell-group>
                <van-cell title="识别文本数量" :value="textResults.length.toString()" />
                <van-cell 
                    v-for="(text, index) in textResults" 
                    :key="'text-' + index"
                    :title="'文本 ' + (index + 1)"
                    :label="text"
                />
            </van-cell-group>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'OcrTest',
    data() {
        return {
            textResults: [],
            detailResults: []
        };
    },
    methods: {
        // ==================== OCR 基础功能 ====================
        
        // 获取当前模式
        async getMode() {
            try {
                const mode = await autojs.ocr.getMode();
                autojs.global.toastLog('当前 OCR 模式: ' + mode);
            } catch (err) {
                autojs.global.toastLog('获取模式失败: ' + err);
            }
        },
        
        // 切换到 MLKit 模式
        async setModeMLKit() {
            try {
                await autojs.ocr.setMode('mlkit');
                autojs.global.toastLog('已切换到 MLKit 模式');
            } catch (err) {
                autojs.global.toastLog('切换失败: ' + err);
            }
        },
        
        // 切换到 Paddle 模式
        async setModePaddle() {
            try {
                await autojs.ocr.setMode('paddle');
                autojs.global.toastLog('已切换到 Paddle 模式');
                autojs.global.toastLog('注意: 使用 Paddle 模式时请确保已开启"忽略电池优化"');
            } catch (err) {
                autojs.global.toastLog('切换失败: ' + err);
            }
        },
        
        // 获取 OCR 摘要
        async getSummary() {
            try {
                const summary = await autojs.ocr.summary();
                autojs.global.toastLog(summary);
                console.log(summary);
            } catch (err) {
                autojs.global.toastLog('获取摘要失败: ' + err);
            }
        },
        
        // ==================== 屏幕截图 OCR ====================
        
        // 识别整个屏幕的文本
        async ocrScreen() {
            try {
                autojs.global.toastLog('正在申请截图权限...');
                
                // 申请截图权限
                const granted = await autojs.image.requestScreenCapture();
                if (!granted) {
                    autojs.global.toastLog('截图权限申请失败');
                    return;
                }
                
                autojs.global.toastLog('截图权限已获取，2秒后开始识别...');
                await autojs.global.sleep(2000);
                
                // 执行 OCR 识别
                autojs.global.toastLog('正在识别屏幕文本...');
                const results = await autojs.ocr.recognizeText();
                
                this.textResults = results || [];
                autojs.global.toastLog(`识别完成，找到 ${this.textResults.length} 个文本`);
                
                // 显示前几个结果
                if (this.textResults.length > 0) {
                    const preview = this.textResults.slice(0, 3).join(', ');
                    console.log('识别结果预览: ' + preview);
                }
            } catch (err) {
                autojs.global.toastLog('OCR 识别失败: ' + err);
                console.error(err);
            }
        },
        
        // 识别屏幕区域的文本
        async ocrScreenRegion() {
            try {
                autojs.global.toastLog('正在申请截图权限...');
                
                // 申请截图权限
                const granted = await autojs.image.requestScreenCapture();
                if (!granted) {
                    autojs.global.toastLog('截图权限申请失败');
                    return;
                }
                
                autojs.global.toastLog('截图权限已获取，2秒后开始识别屏幕上半部分...');
                await autojs.global.sleep(2000);
                
                // 获取屏幕尺寸
                const width = await autojs.global.WIDTH;
                const height = await autojs.global.HEIGHT;
                
                // 定义区域：屏幕上半部分
                const region = [0, 0, width, height / 2];
                
                // 执行 OCR 识别
                autojs.global.toastLog('正在识别区域文本...');
                const results = await autojs.ocr.recognizeText(region);
                
                this.textResults = results || [];
                autojs.global.toastLog(`识别完成，找到 ${this.textResults.length} 个文本`);
                
                // 显示前几个结果
                if (this.textResults.length > 0) {
                    const preview = this.textResults.slice(0, 3).join(', ');
                    console.log('识别结果预览: ' + preview);
                }
            } catch (err) {
                autojs.global.toastLog('OCR 识别失败: ' + err);
                console.error(err);
            }
        },
        
        // 检测屏幕文本（返回详细结果）
        async detectScreen() {
            try {
                autojs.global.toastLog('正在申请截图权限...');
                
                // 申请截图权限
                const granted = await autojs.image.requestScreenCapture();
                if (!granted) {
                    autojs.global.toastLog('截图权限申请失败');
                    return;
                }
                
                autojs.global.toastLog('截图权限已获取，2秒后开始检测...');
                await autojs.global.sleep(2000);
                
                // 执行 OCR 检测
                autojs.global.toastLog('正在检测屏幕文本...');
                const results = await autojs.ocr.detect();
                
                this.detailResults = results || [];
                this.textResults = this.detailResults.map(r => r.text || r.label);
                
                autojs.global.toastLog(`检测完成，找到 ${this.detailResults.length} 个文本`);
                
                // 显示置信度信息
                if (this.detailResults.length > 0) {
                    const avgConfidence = this.detailResults.reduce((sum, r) => sum + (r.confidence || 0), 0) / this.detailResults.length;
                    console.log('平均置信度: ' + avgConfidence.toFixed(2));
                    
                    // 筛选高置信度结果
                    const highConfidence = this.detailResults.filter(r => r.confidence >= 0.8);
                    autojs.global.toastLog(`高置信度(>=0.8)结果: ${highConfidence.length} 个`);
                }
            } catch (err) {
                autojs.global.toastLog('OCR 检测失败: ' + err);
                console.error(err);
            }
        },
        
        // ==================== 图像文件 OCR ====================
        
        // 识别图像文件文本
        async ocrImagePath() {
            try {
                // 这里需要用户提供图像路径
                // 示例：使用 sdcard 中的图片
                const imagePath = '/sdcard/screenshot.png';
                
                autojs.global.toastLog('正在识别图像文件: ' + imagePath);
                const results = await autojs.ocr.recognizeText(imagePath);
                
                this.textResults = results || [];
                autojs.global.toastLog(`识别完成，找到 ${this.textResults.length} 个文本`);
                
                if (this.textResults.length > 0) {
                    const preview = this.textResults.slice(0, 3).join(', ');
                    console.log('识别结果预览: ' + preview);
                }
            } catch (err) {
                autojs.global.toastLog('图像文件识别失败: ' + err);
                console.error(err);
            }
        },
        
        // 检测图像文件文本（详细）
        async detectImagePath() {
            try {
                const imagePath = '/sdcard/Pictures/test.jpg';
                
                autojs.global.toastLog('正在检测图像文件: ' + imagePath);
                const results = await autojs.ocr.detect(imagePath);
                
                this.detailResults = results || [];
                this.textResults = this.detailResults.map(r => r.text || r.label);
                
                autojs.global.toastLog(`检测完成，找到 ${this.detailResults.length} 个文本`);
                
                if (this.detailResults.length > 0) {
                    const avgConfidence = this.detailResults.reduce((sum, r) => sum + (r.confidence || 0), 0) / this.detailResults.length;
                    console.log('平均置信度: ' + avgConfidence.toFixed(2));
                }
            } catch (err) {
                autojs.global.toastLog('图像文件检测失败: ' + err);
                console.error(err);
            }
        },
        
        // ==================== 特定引擎测试 ====================
        
        // 测试 MLKit 引擎
        async testMLKit() {
            try {
                autojs.global.toastLog('正在申请截图权限...');
                
                const granted = await autojs.image.requestScreenCapture();
                if (!granted) {
                    autojs.global.toastLog('截图权限申请失败');
                    return;
                }
                
                autojs.global.toastLog('使用 MLKit 引擎识别，2秒后开始...');
                await autojs.global.sleep(2000);
                
                // 直接使用 MLKit 引擎
                const results = await autojs.ocr.mlkit.recognizeText();
                
                this.textResults = results || [];
                autojs.global.toastLog(`MLKit 识别完成，找到 ${this.textResults.length} 个文本`);
            } catch (err) {
                autojs.global.toastLog('MLKit 识别失败: ' + err);
                console.error(err);
            }
        },
        
        // 测试 Paddle 引擎
        async testPaddle() {
            try {
                autojs.global.toastLog('正在申请截图权限...');
                
                const granted = await autojs.image.requestScreenCapture();
                if (!granted) {
                    autojs.global.toastLog('截图权限申请失败');
                    return;
                }
                
                autojs.global.toastLog('使用 Paddle 引擎识别，2秒后开始...');
                autojs.global.toastLog('注意: Paddle 引擎需要更多资源');
                await autojs.global.sleep(2000);
                
                // 直接使用 Paddle 引擎
                const results = await autojs.ocr.paddle.recognizeText();
                
                this.textResults = results || [];
                autojs.global.toastLog(`Paddle 识别完成，找到 ${this.textResults.length} 个文本`);
            } catch (err) {
                autojs.global.toastLog('Paddle 识别失败: ' + err);
                console.error(err);
            }
        }
    }
};
</script>

<style scoped>
.van-cell__label {
    max-width: 100%;
    word-break: break-all;
}
</style>

