<template>
    <div>
        <van-cell-group title="选择器基础操作">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testTextSelector" style="margin: 8px;">测试文本选择器</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testTextContains" style="margin: 8px;">测试文本包含选择器</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testIdSelector" style="margin: 8px;">测试 ID 选择器</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testDescSelector" style="margin: 8px;">测试描述选择器</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="组合选择器">
            <van-row type="flex" justify="center">
                <van-button @click="testChainSelector" style="margin: 8px;">测试链式选择器</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testClickableSelector" style="margin: 8px;">测试可点击选择器</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testScrollableSelector" style="margin: 8px;">测试可滚动选择器</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="查找方法">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testFindOnce" style="margin: 8px;">测试 findOnce</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testFind" style="margin: 8px;">测试 find</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testExists" style="margin: 8px;">测试 exists</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testFindOne" style="margin: 8px;">测试 findOne</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="行为方法">
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testClickAction" style="margin: 8px;">测试点击控件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testLongClickAction" style="margin: 8px;">测试长按控件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testSetTextAction" style="margin: 8px;">测试设置文本</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testScrollAction" style="margin: 8px;">测试滚动操作</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="高级功能">
            <van-row type="flex" justify="center">
                <van-button @click="testClassNameSelector" style="margin: 8px;">测试类名选择器</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testPackageNameSelector" style="margin: 8px;">测试包名选择器</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testBoundsSelector" style="margin: 8px;">测试边界选择器</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'UiSelectorTest',
    methods: {
        // ==================== 选择器基础操作 ====================
        
        // 测试文本选择器
        async testTextSelector() {
            try {
                richauto.global.toastLog('查找文本为"设置"的控件...');
                const exists = await richauto.uiselector.text('设置').exists();
                richauto.global.toastLog(`控件${exists ? '存在' : '不存在'}`);
                
                if (exists) {
                    const widget = await richauto.uiselector.text('设置').findOnce();
                    richauto.global.toastLog('找到控件: ' + JSON.stringify(widget));
                }
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试文本包含选择器
        async testTextContains() {
            try {
                richauto.global.toastLog('查找包含"设"的控件...');
                const exists = await richauto.uiselector.textContains('设').exists();
                richauto.global.toastLog(`控件${exists ? '存在' : '不存在'}`);
                
                if (exists) {
                    const widgets = await richauto.uiselector.textContains('设').find();
                    richauto.global.toastLog('找到 ' + widgets.length + ' 个控件');
                }
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试 ID 选择器
        async testIdSelector() {
            try {
                richauto.global.toastLog('查找指定 ID 的控件...');
                // 这里需要根据实际应用的 ID 来修改
                const exists = await richauto.uiselector.id('button1').exists();
                richauto.global.toastLog(`控件${exists ? '存在' : '不存在'}`);
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试描述选择器
        async testDescSelector() {
            try {
                richauto.global.toastLog('查找描述为"返回"的控件...');
                const exists = await richauto.uiselector.desc('返回').exists();
                richauto.global.toastLog(`控件${exists ? '存在' : '不存在'}`);
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // ==================== 组合选择器 ====================
        
        // 测试链式选择器
        async testChainSelector() {
            try {
                richauto.global.toastLog('使用链式选择器查找控件...');
                // 查找文本包含"设置"且可点击的控件
                const exists = await richauto.uiselector.textContains('设置').clickable(true).exists();
                richauto.global.toastLog(`控件${exists ? '存在' : '不存在'}`);
                
                if (exists) {
                    const widget = await richauto.uiselector.textContains('设置').clickable(true).findOnce();
                    richauto.global.toastLog('找到可点击的"设置"控件');
                }
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试可点击选择器
        async testClickableSelector() {
            try {
                richauto.global.toastLog('查找所有可点击的控件...');
                const widgets = await richauto.uiselector.clickable(true).find();
                richauto.global.toastLog('找到 ' + widgets.length + ' 个可点击控件');
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试可滚动选择器
        async testScrollableSelector() {
            try {
                richauto.global.toastLog('查找所有可滚动的控件...');
                const widgets = await richauto.uiselector.scrollable(true).find();
                richauto.global.toastLog('找到 ' + widgets.length + ' 个可滚动控件');
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // ==================== 查找方法 ====================
        
        // 测试 findOnce
        async testFindOnce() {
            try {
                richauto.global.toastLog('使用 findOnce 查找控件...');
                const widget = await richauto.uiselector.textContains('测试').findOnce();
                
                if (widget) {
                    richauto.global.toastLog('找到控件: ' + JSON.stringify(widget));
                } else {
                    richauto.global.toastLog('未找到控件');
                }
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试 find
        async testFind() {
            try {
                richauto.global.toastLog('使用 find 查找所有匹配控件...');
                const widgets = await richauto.uiselector.clickable(true).find();
                richauto.global.toastLog('找到 ' + widgets.length + ' 个控件');
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试 exists
        async testExists() {
            try {
                richauto.global.toastLog('检查控件是否存在...');
                const exists = await richauto.uiselector.text('设置').exists();
                richauto.global.toastLog(`控件${exists ? '存在' : '不存在'}`);
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试 findOne
        async testFindOne() {
            try {
                richauto.global.toastLog('使用 findOne 查找控件（等待 3 秒）...');
                const widget = await richauto.uiselector.text('设置').findOne(3000);
                
                if (widget) {
                    richauto.global.toastLog('找到控件');
                } else {
                    richauto.global.toastLog('超时未找到控件');
                }
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // ==================== 行为方法 ====================
        
        // 测试点击控件
        async testClickAction() {
            try {
                richauto.global.toastLog('尝试点击"设置"控件...');
                const success = await richauto.uiselector.text('设置').click();
                richauto.global.toastLog(`点击${success ? '成功' : '失败'}`);
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试长按控件
        async testLongClickAction() {
            try {
                richauto.global.toastLog('尝试长按"设置"控件...');
                const success = await richauto.uiselector.text('设置').longClick();
                richauto.global.toastLog(`长按${success ? '成功' : '失败'}`);
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试设置文本
        async testSetTextAction() {
            try {
                richauto.global.toastLog('尝试在可编辑控件中设置文本...');
                // 查找可编辑的控件并设置文本
                const success = await richauto.uiselector.editable(true).setText('Hello RichAuto');
                richauto.global.toastLog(`设置文本${success ? '成功' : '失败'}`);
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试滚动操作
        async testScrollAction() {
            try {
                richauto.global.toastLog('尝试滚动可滚动控件...');
                const success = await richauto.uiselector.scrollable(true).scrollForward();
                richauto.global.toastLog(`滚动${success ? '成功' : '失败'}`);
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // ==================== 高级功能 ====================
        
        // 测试类名选择器
        async testClassNameSelector() {
            try {
                richauto.global.toastLog('查找指定类名的控件...');
                // 常见的 Android 控件类名
                const exists = await richauto.uiselector.className('android.widget.Button').exists();
                richauto.global.toastLog(`Button 控件${exists ? '存在' : '不存在'}`);
                
                if (exists) {
                    const widgets = await richauto.uiselector.className('android.widget.Button').find();
                    richauto.global.toastLog('找到 ' + widgets.length + ' 个 Button 控件');
                }
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试包名选择器
        async testPackageNameSelector() {
            try {
                richauto.global.toastLog('查找指定包名的控件...');
                // 这里需要根据实际应用的包名来修改
                const exists = await richauto.uiselector.packageName('com.android.settings').exists();
                richauto.global.toastLog(`设置应用控件${exists ? '存在' : '不存在'}`);
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        },
        
        // 测试边界选择器
        async testBoundsSelector() {
            try {
                richauto.global.toastLog('查找指定区域内的控件...');
                // 查找屏幕左上角区域的控件
                const widgets = await richauto.uiselector.boundsInside(0, 0, 500, 500).find();
                richauto.global.toastLog('在指定区域找到 ' + widgets.length + ' 个控件');
            } catch (err) {
                richauto.global.toastLog('错误: ' + err);
            }
        }
    }
};
</script>

