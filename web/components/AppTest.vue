<template>
    <div>
        <van-cell-group title="应用版本信息">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testVersionInfo" style="margin: 8px;">获取版本信息</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="应用启动">
            <van-row type="flex" justify="center">
                <van-button @click="testLaunchApp" style="margin: 8px;">通过名称启动应用</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testLaunch" style="margin: 8px;">通过包名启动应用</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="应用信息获取">
            <van-row type="flex" justify="center">
                <van-button @click="testGetPackageName" style="margin: 8px;">获取应用包名</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testGetAppName" style="margin: 8px;">获取应用名称</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="应用操作">
            <van-row type="flex" justify="center">
                <van-button @click="testOpenAppSetting" style="margin: 8px;">打开应用设置</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testUninstall" style="margin: 8px;">卸载应用（测试）</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="文件和 URL">
            <van-row type="flex" justify="center">
                <van-button @click="testViewFile" style="margin: 8px;">查看文件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testEditFile" style="margin: 8px;">编辑文件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testOpenUrl" style="margin: 8px;">打开网页</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="邮件和 Activity">
            <van-row type="flex" justify="center">
                <van-button @click="testSendEmail" style="margin: 8px;">发送邮件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testStartActivity" style="margin: 8px;">启动 Activity</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="Intent 和广播">
            <van-row type="flex" justify="center">
                <van-button @click="testIntent" style="margin: 8px;">构造 Intent</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testSendBroadcast" style="margin: 8px;">发送广播</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="Uri 操作">
            <van-row type="flex" justify="center">
                <van-button @click="testParseUri" style="margin: 8px;">解析 Uri</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testGetUriForFile" style="margin: 8px;">获取文件 Uri</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'AppTest',
    methods: {
        // ==================== 应用版本信息 ====================
        
        // 测试获取版本信息
        async testVersionInfo() {
            try {
                const versionCode = await richauto.app.getVersionCode();
                const versionName = await richauto.app.getVersionName();
                const ajVersionCode = await richauto.app.richauto.getVersionCode();
                const ajVersionName = await richauto.app.richauto.getVersionName();
                
                richauto.global.toastLog(`当前软件: ${versionName} (${versionCode})\nRichAuto: ${ajVersionName} (${ajVersionCode})`);
            } catch (err) {
                richauto.global.toastLog('获取版本信息失败: ' + err);
            }
        },
        
        // ==================== 应用启动 ====================
        
        // 测试通过名称启动应用
        async testLaunchApp() {
            try {
                const success = await richauto.app.launchApp('设置');
                richauto.global.toastLog(`启动应用${success ? '成功' : '失败'}`);
            } catch (err) {
                richauto.global.toastLog('启动应用失败: ' + err);
            }
        },
        
        // 测试通过包名启动应用
        async testLaunch() {
            try {
                // 启动系统设置
                const success = await richauto.app.launch('com.android.settings');
                richauto.global.toastLog(`启动应用${success ? '成功' : '失败'}`);
            } catch (err) {
                richauto.global.toastLog('启动应用失败: ' + err);
            }
        },
        
        // ==================== 应用信息获取 ====================
        
        // 测试获取应用包名
        async testGetPackageName() {
            try {
                const packageName = await richauto.app.getPackageName('设置');
                if (packageName) {
                    richauto.global.toastLog(`设置的包名: ${packageName}`);
                } else {
                    richauto.global.toastLog('未找到该应用');
                }
            } catch (err) {
                richauto.global.toastLog('获取包名失败: ' + err);
            }
        },
        
        // 测试获取应用名称
        async testGetAppName() {
            try {
                const appName = await richauto.app.getAppName('com.android.settings');
                if (appName) {
                    richauto.global.toastLog(`包名对应的应用: ${appName}`);
                } else {
                    richauto.global.toastLog('未找到该应用');
                }
            } catch (err) {
                richauto.global.toastLog('获取应用名称失败: ' + err);
            }
        },
        
        // ==================== 应用操作 ====================
        
        // 测试打开应用设置
        async testOpenAppSetting() {
            try {
                // 打开系统设置的应用设置页
                const success = await richauto.app.openAppSetting('com.android.settings');
                richauto.global.toastLog(`打开设置${success ? '成功' : '失败'}`);
            } catch (err) {
                richauto.global.toastLog('打开设置失败: ' + err);
            }
        },
        
        // 测试卸载应用
        async testUninstall() {
            try {
                richauto.global.toastLog('注意: 这将弹出卸载确认对话框');
                await richauto.global.sleep(1000);
                // 使用一个测试包名
                await richauto.app.uninstall('com.example.test');
            } catch (err) {
                richauto.global.toastLog('卸载操作失败: ' + err);
            }
        },
        
        // ==================== 文件和 URL ====================
        
        // 测试查看文件
        async testViewFile() {
            try {
                await richauto.app.viewFile('/sdcard/test.txt');
                richauto.global.toastLog('已尝试打开文件查看器');
            } catch (err) {
                richauto.global.toastLog('查看文件失败: ' + err);
            }
        },
        
        // 测试编辑文件
        async testEditFile() {
            try {
                await richauto.app.editFile('/sdcard/test.txt');
                richauto.global.toastLog('已尝试打开文件编辑器');
            } catch (err) {
                richauto.global.toastLog('编辑文件失败: ' + err);
            }
        },
        
        // 测试打开 URL
        async testOpenUrl() {
            try {
                await richauto.app.openUrl('https://www.richauto.org');
                richauto.global.toastLog('已打开浏览器');
            } catch (err) {
                richauto.global.toastLog('打开 URL 失败: ' + err);
            }
        },
        
        // ==================== 邮件和 Activity ====================
        
        // 测试发送邮件
        async testSendEmail() {
            try {
                await richauto.app.sendEmail({
                    email: 'test@example.com',
                    subject: '测试邮件',
                    text: '这是一封测试邮件'
                });
                richauto.global.toastLog('已打开邮件应用');
            } catch (err) {
                richauto.global.toastLog('发送邮件失败: ' + err);
            }
        },
        
        // 测试启动 Activity
        async testStartActivity() {
            try {
                // 启动 RichAuto 的日志界面
                await richauto.app.startActivity('console');
                richauto.global.toastLog('已启动日志界面');
            } catch (err) {
                richauto.global.toastLog('启动 Activity 失败: ' + err);
            }
        },
        
        // ==================== Intent 和广播 ====================
        
        // 测试构造 Intent
        async testIntent() {
            try {
                const intent = await richauto.app.intent({
                    action: 'VIEW',
                    data: 'https://www.richauto.org'
                });
                richauto.global.toastLog('Intent 构造成功');
            } catch (err) {
                richauto.global.toastLog('构造 Intent 失败: ' + err);
            }
        },
        
        // 测试发送广播
        async testSendBroadcast() {
            try {
                // 发送布局层次分析广播
                await richauto.app.sendBroadcast('inspect_layout_hierarchy');
                richauto.global.toastLog('已发送广播');
            } catch (err) {
                richauto.global.toastLog('发送广播失败: ' + err);
            }
        },
        
        // ==================== Uri 操作 ====================
        
        // 测试解析 Uri
        async testParseUri() {
            try {
                const uri = await richauto.app.parseUri('https://www.richauto.org');
                if (uri) {
                    richauto.global.toastLog(`解析的 Uri: ${uri}`);
                } else {
                    richauto.global.toastLog('Uri 解析失败');
                }
            } catch (err) {
                richauto.global.toastLog('解析 Uri 失败: ' + err);
            }
        },
        
        // 测试获取文件 Uri
        async testGetUriForFile() {
            try {
                const uri = await richauto.app.getUriForFile('/sdcard/test.txt');
                if (uri) {
                    richauto.global.toastLog(`文件 Uri: ${uri}`);
                } else {
                    richauto.global.toastLog('获取文件 Uri 失败');
                }
            } catch (err) {
                richauto.global.toastLog('获取文件 Uri 失败: ' + err);
            }
        }
    }
};
</script>

