<template>
    <div>
        <van-cell-group title="创建悬浮窗">
            <van-row type="flex" justify="center">
                <van-button type="success" @click="testHtmlFloaty" style="margin: 8px;">HTML 悬浮窗</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="success" @click="testVueFloaty" style="margin: 8px;">Vue 悬浮窗</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="success" @click="testUrlFloaty" style="margin: 8px;">URL 悬浮窗</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="danger" @click="testCloseAll" style="margin: 8px;">关闭所有悬浮窗</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="悬浮窗控制" v-if="currentWindow">
            <van-row type="flex" justify="center">
                <van-button @click="testSetPosition" style="margin: 8px;">移动到屏幕中心</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testGetPosition" style="margin: 8px;">获取当前位置</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testSetSize" style="margin: 8px;">设置大小</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testGetSize" style="margin: 8px;">获取当前大小</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testSetAdjustEnabled" style="margin: 8px;">切换调整按钮</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testClose" style="margin: 8px;">关闭当前悬浮窗</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'FloatyTest',
    data() {
        return {
            currentWindow: null,
            adjustEnabled: true
        };
    },
    methods: {
        // ==================== 悬浮窗控制 ====================
        
        // 测试设置位置
        async testSetPosition() {
            if (!this.currentWindow) {
                richauto.global.toastLog('请先创建悬浮窗');
                return;
            }
            
            try {
                const width = await richauto.device.width;
                const height = await richauto.device.height;
                const x = width / 2 - 100;
                const y = height / 2 - 100;
                
                await this.currentWindow.setPosition(x, y);
                richauto.global.toastLog(`悬浮窗已移动到: (${Math.round(x)}, ${Math.round(y)})`);
            } catch (err) {
                richauto.global.toastLog('移动失败: ' + err);
            }
        },
        
        // 测试获取位置
        async testGetPosition() {
            if (!this.currentWindow) {
                richauto.global.toastLog('请先创建悬浮窗');
                return;
            }
            
            try {
                const x = await this.currentWindow.getX();
                const y = await this.currentWindow.getY();
                richauto.global.toastLog(`当前位置: (${x}, ${y})`);
            } catch (err) {
                richauto.global.toastLog('获取位置失败: ' + err);
            }
        },
        
        // 测试设置大小
        async testSetSize() {
            if (!this.currentWindow) {
                richauto.global.toastLog('请先创建悬浮窗');
                return;
            }
            
            try {
                await this.currentWindow.setSize(400, 300);
                richauto.global.toastLog('悬浮窗大小已设置为: 400x300');
            } catch (err) {
                richauto.global.toastLog('设置大小失败: ' + err);
            }
        },
        
        // 测试获取大小
        async testGetSize() {
            if (!this.currentWindow) {
                richauto.global.toastLog('请先创建悬浮窗');
                return;
            }
            
            try {
                const width = await this.currentWindow.getWidth();
                const height = await this.currentWindow.getHeight();
                richauto.global.toastLog(`当前大小: ${width}x${height}`);
            } catch (err) {
                richauto.global.toastLog('获取大小失败: ' + err);
            }
        },
        
        // 测试切换调整按钮
        async testSetAdjustEnabled() {
            if (!this.currentWindow) {
                richauto.global.toastLog('此功能仅适用于带调整功能的悬浮窗');
                return;
            }
            
            try {
                this.adjustEnabled = !this.adjustEnabled;
                await this.currentWindow.setAdjustEnabled(this.adjustEnabled);
                richauto.global.toastLog(`调整按钮已${this.adjustEnabled ? '启用' : '禁用'}`);
            } catch (err) {
                richauto.global.toastLog('切换失败: ' + err);
            }
        },
        
        // 测试关闭当前悬浮窗
        async testClose() {
            if (!this.currentWindow) {
                richauto.global.toastLog('没有可关闭的悬浮窗');
                return;
            }
            
            try {
                await this.currentWindow.close();
                this.currentWindow = null;
                richauto.global.toastLog('悬浮窗已关闭');
            } catch (err) {
                richauto.global.toastLog('关闭失败: ' + err);
            }
        },
        
        // 关闭所有悬浮窗
        async testCloseAll() {
            try {
                await richauto.floaty.closeAll();
                this.currentWindow = null;
                richauto.global.toastLog('所有悬浮窗已关闭');
            } catch (err) {
                richauto.global.toastLog('关闭失败: ' + err);
            }
        },
        
        // ==================== HTML/Vue 悬浮窗示例 ====================
        
        // 测试 HTML 悬浮窗
        async testHtmlFloaty() {
            try {
                richauto.global.toastLog('正在创建 HTML 悬浮窗...');
                
                // 使用数组 join 方法避免 Vue SFC 解析器对 script 标签的误解析
                const htmlContent = [
                    '<!DOCTYPE html>',
                    '<html>',
                    '<head>',
                    '<meta charset="UTF-8">',
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                    '<style>',
                    'body { margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }',
                    'h1 { margin: 0 0 10px 0; font-size: 24px; }',
                    'p { margin: 5px 0; font-size: 14px; opacity: 0.9; }',
                    '.time { font-size: 32px; font-weight: bold; margin: 20px 0; }',
                    'button { background: rgba(255,255,255,0.2); border: 2px solid white; color: white; padding: 10px 20px; border-radius: 20px; font-size: 16px; cursor: pointer; margin-top: 10px; }',
                    '</' + 'style>',  // 分割避免被识别
                    '</' + 'head>',
                    '<body>',
                    '<h1>🎨 HTML 悬浮窗</h1>',
                    '<p>这是一个使用 HTML 创建的悬浮窗</p>',
                    '<div class="time" id="time">00:00:00</div>',
                    '<button onclick="alert(\'你好，RichAuto!\')">点击我</button>',
                    '<' + 'script>',  // 分割避免被 Vue 解析器误解析
                    'function updateTime() {',
                    '  const now = new Date();',
                    '  const time = now.toLocaleTimeString("zh-CN");',
                    '  document.getElementById("time").textContent = time;',
                    '}',
                    'setInterval(updateTime, 1000);',
                    'updateTime();',
                    '</' + 'script>',  // 分割避免被识别为脚本结束标签
                    '</' + 'body>',
                    '</' + 'html>'
                ].join('');
                
                this.currentWindow = await richauto.floaty.window(htmlContent, {
                    type: 'html',
                    width: '350',
                    height: '500'
                });
                
                richauto.global.toastLog('HTML 悬浮窗创建成功！');
                
                // 设置初始位置
                await this.currentWindow.setPosition(50, 100);
                
            } catch (err) {
                richauto.global.toastLog('创建 HTML 悬浮窗失败: ' + err);
            }
        },
        
        // 测试 Vue 悬浮窗
        async testVueFloaty() {
            try {
                richauto.global.toastLog('正在创建 Vue 悬浮窗...');
                
                const vueTemplate = '<div style="padding: 20px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; text-align: center;">' +
                    '<h2>⚡ Vue 悬浮窗</h2>' +
                    '<p>计数器: {{ count }}</p>' +
                    '<button @click="increment" style="margin: 10px; padding: 10px 20px; background: white; color: #f5576c; border: none; border-radius: 20px; cursor: pointer;">' +
                    '点击 +1' +
                    '</button>' +
                    '<button @click="decrement" style="margin: 10px; padding: 10px 20px; background: white; color: #f5576c; border: none; border-radius: 20px; cursor: pointer;">' +
                    '点击 -1' +
                    '</button>' +
                    '<p style="margin-top: 20px; font-size: 12px;">{{ message }}</p>' +
                    '</div>';
                
                const vueScript = 'data() { return { count: 0, message: "这是一个 Vue 组件悬浮窗" } }, ' +
                    'methods: { increment() { this.count++; }, decrement() { this.count--; } }';
                
                this.currentWindow = await richauto.floaty.window(vueTemplate, {
                    type: 'vue',
                    vueScript: vueScript,
                    width: '350',
                    height: '450'
                });
                
                richauto.global.toastLog('Vue 悬浮窗创建成功！');
                
                // 设置初始位置
                await this.currentWindow.setPosition(50, 100);
                
            } catch (err) {
                richauto.global.toastLog('创建 Vue 悬浮窗失败: ' + err);
            }
        },
        
        // 测试 URL 悬浮窗
        async testUrlFloaty() {
            try {
                richauto.global.toastLog('正在创建 URL 悬浮窗...');
                
                // 可以加载任何网页
                const url = 'https://www.baidu.com';
                
                this.currentWindow = await richauto.floaty.window(url, {
                    type: 'html', // URL 也使用 html 类型
                    url: url,
                    width: '400',
                    height: '600'
                });
                
                richauto.global.toastLog('URL 悬浮窗创建成功！');
                
                // 设置初始位置
                await this.currentWindow.setPosition(30, 80);
                
            } catch (err) {
                richauto.global.toastLog('创建 URL 悬浮窗失败: ' + err);
            }
        }
    }
};
</script>

