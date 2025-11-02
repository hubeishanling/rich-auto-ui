<div align="center">

# Rich AutoJS UI

**一个功能强大的 AutoJS6 现代化 UI 框架，涵盖了完整的登录、更新、设备数等一套商业流程，能够直接专注开发的框架**

基于 WebView + Vue.js 构建的移动端自动化脚本开发框架

[![GitHub](https://img.shields.io/badge/GitHub-rich--autojs--ui-blue?logo=github)](https://github.com/yangrui110/rich-atuojs-ui)
[![AutoJS6](https://img.shields.io/badge/AutoJS6-6.3%2B-green)](https://github.com/SuperMonster003/AutoJs6)
[![Vue.js](https://img.shields.io/badge/Vue.js-2.6-brightgreen?logo=vue.js)](https://vuejs.org/)
[![Vant UI](https://img.shields.io/badge/Vant-2.12-07c160)](https://vant-contrib.gitee.io/vant/v2/)

---

###  [完整文档地址](http://doc.sanguoyr.top)

---

[English](README_EN.md) | 简体中文

</div>

---

## 📖 项目简介

**Rich AutoJS UI** 是一个专为 [AutoJS6](https://github.com/SuperMonster003/AutoJs6) 设计的现代化 UI 开发框架，它将传统的 AutoJS 开发方式提升到全新高度。通过 WebView 技术结合 Vue.js 生态，让开发者可以使用现代前端技术栈构建美观、易用、功能强大的移动端自动化脚本界面。

### ✨ 核心特性

- **现代化 UI** - 基于 Vue.js 2.6 + Vant UI 2.12，提供精美的移动端用户体验
- **商业化流程** - 含登录、校验、更新、以及悬浮窗启动、停止脚本一整套流程代码
- **数据安全** - 插件打包加密、前后端加密通信
- **更新快速** - 对项目直接打包插件，方便更新。

### 🖼️ 界面预览

<div align="center">
  <img src="img/1.png" width="200" alt="主界面" />
  <img src="img/2.png" width="200" alt="功能测试" />
  <img src="img/3.png" width="200" alt="模块演示" />
  <img src="img/4.png" width="200" alt="业务功能" />
  <img src="img/5.png" width="200" alt="主界面" />
  <img src="img/6.png" width="200" alt="功能测试" />
  <img src="img/7.png" width="200" alt="模块演示" />
  <img src="img/8.png" width="200" alt="业务功能" />
  <img src="img/9.png" width="200" alt="业务功能" />
</div>

---

## 🚀 快速开始

### 环境要求

| 工具/环境 | 版本要求 | 说明 |
|---------|---------|------|
| VSCode | 最新版 | 代码编辑器 |
| AutoJS6 VSCode 插件 | 最新版 | 用于连接手机调试 |
| Android 设备 | 7.0+ | 测试设备 |
| 安卓包 | 项目的release中下载 | 下载 |


### 安装步骤

#### 方式一：克隆仓库（推荐）

```bash
# 克隆项目
git clone https://github.com/yangrui110/rich-atuojs-ui.git

# 进入项目目录
cd rich-atuojs-ui
```

#### 方式二：下载压缩包

直接从 [GitHub Releases](https://github.com/yangrui110/rich-atuojs-ui/releases) 下载最新版本的压缩包并解压。

### 开发运行

1. **下载项目release中的Autojs6包**
   - 在手机上打开 AutoJS6 应用
   - 进入设置 → 连接电脑 → 开启服务器
   - 记录显示的 IP 地址

2. **连接 VSCode**
   - 首先在vscode插件中搜索`Autojs6`，然后安装此插件。
   - 在 VSCode 中打开项目文件夹
   - 按 `F1` 打开命令面板
   - 输入 `Auto6: 建立设备连接` 并连接到手机

3. **准备config.js**
   - 想要走登录、更新这些流程的话可以去注册个测试账号， 在[闪灵脚本系统](http://www.sanguoyr.top/tenant-register)注册账号，并登录。进入，找到`开放脚本`->`通信密钥`,找到`config.js`按钮，生成`config.js`，然后复制到项目的`config.js`文件中就可以了
   - 如果只是看测试用例，可以把`web/index.html`中的`loadModule('/main.vue', options)`换成`loadModule('/main-test.vue', options)`就可以看测试用例

3. **运行项目**
   - 打开 `ui.js` 文件（主界面）或 `main.js`（悬浮窗模式）
   - 右键选择 `Run on Device` 或按 `F5`
   - 在手机上查看运行效果

### 项目打包

```bash
# 在 AutoJS6 中打开项目
# 点击菜单 → 打包应用 → 配置参数 → 开始打包
```

---

## 📚 技术架构

### 整体架构图

```
┌─────────────────────────────────────────────────────────┐
│                      WebView UI Layer                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │   Vue.js + Vant UI Components                   │   │
│  │   (web/components/*.vue)                        │   │
│  └──────────────────┬──────────────────────────────┘   │
│                     │ Call                              │
│  ┌──────────────────▼──────────────────────────────┐   │
│  │   Web Modules (web/modules/*.js)               │   │
│  │   - 封装 jsBridge 调用                          │   │
│  │   - 提供 Promise 接口                           │   │
│  └──────────────────┬──────────────────────────────┘   │
└────────────────────┼──────────────────────────────────┘
                      │ jsBridge
┌────────────────────▼──────────────────────────────────┐
│               AutoJS6 Native Layer                     │
│  ┌──────────────────────────────────────────────────┐ │
│  │   Module Register (modules/register.js)         │ │
│  │   - 统一注册所有模块                             │ │
│  └──────────────────┬───────────────────────────────┘ │
│                     │                                   │
│  ┌──────────────────▼───────────────────────────────┐ │
│  │   Native Modules (modules/*.js)                 │ │
│  │   - global, automator, device, http...          │ │
│  │   - 处理 jsBridge 请求                           │ │
│  │   - 调用 AutoJS6 原生 API                        │ │
│  └──────────────────┬───────────────────────────────┘ │
│                     │                                   │
│  ┌──────────────────▼───────────────────────────────┐ │
│  │   AutoJS6 Core APIs                             │ │
│  │   (app, device, http, files, floaty...)         │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### 通信流程

```javascript
// 1. Web 端发起调用
const result = await autojs.http.get('https://api.github.com/zen');

// 2. Web 模块封装为 jsBridge 调用
$autojs.invoke('http.get', { url: 'https://api.github.com/zen' })

// 3. jsBridge 传递到原生层

// 4. 原生模块处理请求
jsBridge.handle('http.get', function(event, url, options) {
    return http.get(url, options);
});

// 5. 返回结果到 Web 端
```

### 目录结构

```
rich-autojs-ui/
├── config.js                 # 全局配置文件（API、应用、悬浮窗等）
├── main.js                   # 主入口（悬浮窗模式）
├── ui.js                     # UI 入口（全屏界面）
├── plugin.json              # 插件配置
├── project.json             # 项目配置
│
├── modules/                 # 原生端模块（AutoJS6 端）
│   ├── register.js          # 模块注册器（统一注册所有模块）
│   ├── global.js            # 全局函数模块
│   ├── automator.js         # 自动化操作模块
│   ├── device.js            # 设备信息模块
│   ├── http.js              # HTTP 请求模块
│   ├── files.js             # 文件操作模块
│   ├── floaty.js            # 悬浮窗模块
│   ├── floaty-manager.js    # 悬浮窗管理器
│   ├── business.js          # 业务逻辑模块
│   └── utils/               # 工具类
│       ├── api-utils.js     # API 请求工具
│       ├── crypto-utils.js  # 加密工具
│       └── http-utils.js    # HTTP 工具
│
└── web/                     # Web 端（Vue.js）
    ├── index.html           # 主 HTML 页面
    ├── main.vue             # 主应用组件
    │
    ├── modules/             # Web 端模块封装
    │   ├── init.js          # 模块初始化器（动态加载所有模块）
    │   ├── global.js        # 全局函数 Web 封装
    │   ├── automator.js     # 自动化操作 Web 封装
    │   ├── device.js        # 设备信息 Web 封装
    │   ├── http.js          # HTTP 请求 Web 封装
    │   └── ...              # 其他模块封装
    │
    ├── components/          # Vue 测试组件
    │   ├── GlobalTest.vue   # 全局函数测试
    │   ├── AutomatorTest.vue # 自动化测试
    │   ├── HttpTest.vue     # HTTP 测试
    │   └── ...              # 其他测试组件
    │
    ├── page-components/     # 页面组件
    │   ├── HomePage.vue     # 首页
    │   ├── LoginPage.vue    # 登录页
    │   └── DrawerMenu.vue   # 侧边栏菜单
    │
    └── ext/                 # 外部依赖库
        ├── vue.min.js       # Vue.js 2.6
        ├── vant.min.js      # Vant UI 2.12
        └── vue2-sfc-loader.js # Vue SFC 加载器
```

---

## 🔧 功能模块

### 核心模块列表

| 模块名称 | 功能说明 | 主要方法 |
|---------|---------|---------|
| **global** | 全局函数 | `toast()`, `sleep()`, `random()`, `currentPackage()` |
| **automator** | 自动化操作 | `click()`, `longClick()`, `swipe()`, `input()`, `back()` |
| **device** | 设备信息 | `getIMEI()`, `getAndroidId()`, `getScreenWidth()` |
| **http** | 网络请求 | `get()`, `post()`, `postJson()`, `request()` |
| **files** | 文件操作 | `read()`, `write()`, `exists()`, `listDir()` |
| **storages** | 本地存储 | `put()`, `get()`, `remove()`, `clear()` |
| **floaty** | 悬浮窗 | `window()`, `rawWindow()`, `closeAll()` |
| **floatyManager** | 悬浮窗管理器 | `showControl()`, `hideControl()`, `showWebView()` |
| **app** | 应用管理 | `launch()`, `launchPackage()`, `getAppName()` |
| **image** | 图像处理 | `captureScreen()`, `findImage()`, `readImage()` |
| **ocr** | 文字识别 | `recognizeText()`, `detect()` |
| **color** | 颜色处理 | `detectsColor()`, `findColor()`, `rgb()` |
| **keys** | 按键操作 | `back()`, `home()`, `recents()`, `powerDialog()` |
| **engines** | 脚本引擎 | `execScript()`, `execScriptFile()`, `stopAll()` |
| **notice** | 通知管理 | `getNotifications()`, `send()` |
| **base64** | 编解码 | `encode()`, `decode()` |
| **uiselector** | UI 选择器 | `findOne()`, `find()`, `click()`, `setText()` |
| **business** | 业务逻辑 | `login()`, `getCardInfo()`, `uploadLogs()` |

### 模块使用示例

#### 1. Global 全局函数模块

```javascript
// 显示提示信息
autojs.global.toast('操作成功！');
autojs.global.toastLog('这条消息会同时显示和记录日志');

// 延迟执行
await autojs.global.sleep(2000); // 暂停 2 秒

// 生成随机数
const rand1 = await autojs.global.random(); // 0-1 之间
const rand2 = await autojs.global.random(1, 100); // 1-100 之间的整数

// 获取当前应用信息
const pkg = await autojs.global.currentPackage();
const activity = await autojs.global.currentActivity();

// 剪贴板操作
await autojs.global.setClip('复制的内容');
const content = await autojs.global.getClip();
```

#### 2. HTTP 网络请求模块

```javascript
// 简单 GET 请求
const response = await autojs.http.get('https://api.github.com/zen');
console.log('响应状态:', response.statusCode);
console.log('响应内容:', response.body);

// 带请求头的 GET 请求
const response2 = await autojs.http.get('https://api.example.com/data', {
    headers: {
        'User-Agent': 'MyApp/1.0',
        'Authorization': 'Bearer your-token'
    }
});

// POST 表单请求
const response3 = await autojs.http.post('https://api.example.com/login', {
    username: 'user123',
    password: 'pass456'
});

// POST JSON 请求
const response4 = await autojs.http.postJson('https://api.example.com/data', {
    name: 'Rich AutoJS UI',
    version: '1.0.0',
    features: ['automation', 'webview', 'vue']
});

// 响应对象结构
// {
//   statusCode: 200,
//   statusMessage: 'OK',
//   body: '响应体字符串',
//   bodyJson: { /* 自动解析的 JSON */ },
//   contentType: 'application/json'
// }
```

#### 3. Automator 自动化操作模块

```javascript
// 点击屏幕坐标
await autojs.automator.click(500, 1000);

// 长按
await autojs.automator.longClick(500, 1000);

// 滑动操作
await autojs.automator.swipe(
    100, 500,    // 起点 (x1, y1)
    100, 200,    // 终点 (x2, y2)
    300          // 持续时间 (ms)
);

// 输入文本
await autojs.automator.input('Hello AutoJS6');

// 按键操作
await autojs.automator.back();      // 返回键
await autojs.automator.home();      // Home 键
await autojs.automator.recents();   // 最近任务键

// 手势操作
await autojs.automator.gesture(
    1000,                            // 持续时间
    [0, 0], [100, 100], [200, 200]  // 手势路径点
);
```

#### 4. Floaty 悬浮窗模块

```javascript
// 创建 HTML 悬浮窗
const htmlWindow = await autojs.floaty.window(`
    <div style="padding: 20px; background: white; border-radius: 8px;">
        <h3>悬浮窗标题</h3>
        <button onclick="alert('点击了按钮')">点击我</button>
    </div>
`, {
    type: 'html',
    width: '350',
    height: '500'
});

// 创建 Vue 悬浮窗
const vueTemplate = `
<template>
    <div style="padding: 20px; background: white;">
        <h3>{{ title }}</h3>
        <van-button @click="handleClick">点击</van-button>
    </div>
</template>
`;

const vueScript = `
export default {
    data() {
        return {
            title: 'Vue 悬浮窗'
        }
    },
    methods: {
        handleClick() {
            alert('Vue 按钮被点击');
        }
    }
}
`;

const vueWindow = await autojs.floaty.window(vueTemplate, {
    type: 'vue',
    vueScript: vueScript,
    width: '300',
    height: '400'
});

// 控制悬浮窗
await vueWindow.setPosition(100, 100);  // 设置位置
await vueWindow.setSize(400, 600);      // 设置大小
await vueWindow.setAdjustEnabled(true); // 允许拖动
await vueWindow.close();                 // 关闭悬浮窗

// 关闭所有悬浮窗
await autojs.floaty.closeAll();
```

#### 5. Device 设备信息模块

```javascript
// 设备标识
const imei = await autojs.device.getIMEI();
const androidId = await autojs.device.getAndroidId();
const serial = await autojs.device.getSerial();

// 设备信息
const brand = await autojs.device.getBrand();        // 品牌 (如 Xiaomi)
const model = await autojs.device.getDeviceModel();  // 型号 (如 Mi 10)
const product = await autojs.device.getProduct();    // 产品名

// 屏幕信息
const width = await autojs.device.getScreenWidth();
const height = await autojs.device.getScreenHeight();
const density = await autojs.device.getScreenDensity();

// 系统信息
const sdkInt = await autojs.device.getSdkInt();      // SDK 版本号
const release = await autojs.device.getRelease();    // Android 版本 (如 11)

// 电池信息
const battery = await autojs.device.getBattery();    // 电量百分比

// MAC 地址
const mac = await autojs.device.getMacAddress();
```

#### 6. Files 文件操作模块

```javascript
// 读取文件
const content = await autojs.files.read('/sdcard/test.txt');
console.log('文件内容:', content);

// 写入文件
await autojs.files.write('/sdcard/test.txt', 'Hello World');

// 追加内容
await autojs.files.append('/sdcard/test.txt', '\nNew Line');

// 判断文件/目录是否存在
const exists = await autojs.files.exists('/sdcard/test.txt');

// 判断是否为文件/目录
const isFile = await autojs.files.isFile('/sdcard/test.txt');
const isDir = await autojs.files.isDir('/sdcard/myapp');

// 创建目录（如果不存在）
await autojs.files.ensureDir('/sdcard/myapp/data');

// 列出目录内容
const files = await autojs.files.listDir('/sdcard/Download');
files.forEach(file => console.log(file));

// 删除文件
await autojs.files.remove('/sdcard/test.txt');

// 复制文件
await autojs.files.copy('/sdcard/source.txt', '/sdcard/dest.txt');

// 移动文件
await autojs.files.move('/sdcard/old.txt', '/sdcard/new.txt');
```

#### 7. Storages 本地存储模块

```javascript
// 保存数据
await autojs.storages.put('username', 'john_doe');
await autojs.storages.put('age', 25);
await autojs.storages.put('config', {
    theme: 'dark',
    language: 'zh-CN',
    fontSize: 16
});

// 读取数据
const username = await autojs.storages.get('username');
const age = await autojs.storages.get('age');
const config = await autojs.storages.get('config');

// 带默认值的读取
const score = await autojs.storages.get('score', 0);

// 判断键是否存在
const hasUser = await autojs.storages.contains('username');

// 删除数据
await autojs.storages.remove('username');

// 清空所有数据
await autojs.storages.clear();

// 获取所有键
const keys = await autojs.storages.keys();
console.log('所有键:', keys);
```

#### 8. Business 业务逻辑模块

```javascript
// 用户登录
const loginResult = await autojs.business.login({
    cardNo: '卡号',
    deviceId: '设备ID'
});
if (loginResult.success) {
    console.log('登录成功，Token:', loginResult.token);
}

// 获取用户信息
const userInfo = await autojs.business.getCardInfo();
console.log('用户信息:', userInfo);

// 验证 Token
const verifyResult = await autojs.business.verifyToken();
if (verifyResult.success) {
    console.log('Token 有效');
}

// 用户登出
await autojs.business.logout();

// 获取游戏数据
const gameData = await autojs.business.getGameData('gameId');

// 上传日志
await autojs.business.uploadLogs('日志内容');

// 加载凭据
const credentials = await autojs.business.loadCredentials();
console.log('卡号:', credentials.cardNo);
console.log('设备ID:', credentials.deviceId);
```

---

## 💡 完整示例

### 示例 1: 自动化登录流程

```vue
<template>
    <div>
        <van-button @click="autoLogin" type="primary">
            自动登录测试
        </van-button>
    </div>
</template>

<script>
export default {
    methods: {
        async autoLogin() {
            try {
                // 1. 显示开始提示
                autojs.global.toastLog('开始自动登录...');
                
                // 2. 获取屏幕尺寸
                const width = await autojs.device.getScreenWidth();
                const height = await autojs.device.getScreenHeight();
                
                // 3. 点击用户名输入框 (假设在屏幕中上部)
                await autojs.automator.click(width / 2, height * 0.3);
                await autojs.global.sleep(500);
                
                // 4. 输入用户名
                await autojs.automator.input('test_user');
                await autojs.global.sleep(500);
                
                // 5. 点击密码输入框
                await autojs.automator.click(width / 2, height * 0.4);
                await autojs.global.sleep(500);
                
                // 6. 输入密码
                await autojs.automator.input('test_pass');
                await autojs.global.sleep(500);
                
                // 7. 点击登录按钮
                await autojs.automator.click(width / 2, height * 0.55);
                
                // 8. 等待登录完成
                await autojs.global.sleep(2000);
                
                autojs.global.toastLog('登录流程完成！');
                
            } catch (error) {
                autojs.global.toastLog('登录失败: ' + error);
                console.error('自动登录错误:', error);
            }
        }
    }
};
</script>
```

### 示例 2: 网络请求与数据处理

```vue
<template>
    <div style="padding: 20px;">
        <van-button @click="fetchData" type="primary" block>
            获取数据
        </van-button>
        
        <div v-if="data" style="margin-top: 20px;">
            <van-cell-group>
                <van-cell title="标题" :value="data.title" />
                <van-cell title="内容" :value="data.content" />
                <van-cell title="时间" :value="data.time" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: null
        };
    },
    methods: {
        async fetchData() {
            try {
                autojs.global.toastLog('正在获取数据...');
                
                // 发送 HTTP 请求
                const response = await autojs.http.postJson(
                    'https://api.example.com/data',
                    {
                        userId: '12345',
                        timestamp: Date.now()
                    }
                );
                
                if (response.statusCode === 200) {
                    // 解析响应数据
                    this.data = response.bodyJson;
                    
                    // 保存到本地存储
                    await autojs.storages.put('cached_data', this.data);
                    
                    autojs.global.toastLog('数据获取成功！');
                } else {
                    autojs.global.toastLog('请求失败: ' + response.statusCode);
                }
                
            } catch (error) {
                autojs.global.toastLog('获取数据失败: ' + error);
                console.error('网络请求错误:', error);
            }
        }
    },
    async mounted() {
        // 页面加载时尝试读取缓存
        const cached = await autojs.storages.get('cached_data');
        if (cached) {
            this.data = cached;
        }
    }
};
</script>
```

### 示例 3: 创建功能悬浮窗

```javascript
// 在 modules/business.js 或其他模块中
async function showFloatingControl() {
    const vueTemplate = `
    <template>
        <div style="padding: 15px; background: rgba(0,0,0,0.8); border-radius: 10px;">
            <div style="color: white; margin-bottom: 10px;">
                运行状态: {{ running ? '运行中' : '已停止' }}
            </div>
            <van-button 
                @click="toggleScript" 
                :type="running ? 'danger' : 'primary'"
                size="small"
            >
                {{ running ? '停止' : '启动' }}
            </van-button>
        </div>
    </template>
    `;
    
    const vueScript = `
    export default {
        data() {
            return {
                running: false
            }
        },
        methods: {
            async toggleScript() {
                if (this.running) {
                    // 停止脚本
                    await autojs.engines.stopAll();
                    this.running = false;
                    autojs.global.toast('脚本已停止');
                } else {
                    // 启动脚本
                    await autojs.engines.execScriptFile('/sdcard/myscript.js');
                    this.running = true;
                    autojs.global.toast('脚本已启动');
                }
            }
        }
    }
    `;
    
    const floatyWindow = await autojs.floaty.window(vueTemplate, {
        type: 'vue',
        vueScript: vueScript,
        width: '200',
        height: '120'
    });
    
    // 设置初始位置
    await floatyWindow.setPosition(50, 200);
    await floatyWindow.setAdjustEnabled(true); // 允许拖动
}
```

---

## ⚙️ 配置说明

### config.js 配置文件

```javascript
// API 配置
const API_CONFIG = {
    // 后端服务器地址（根据实际部署修改）
    BASE_URL: "http://www.example.com/prod-api/",
    
    // 客户端 ID
    CLIENT_ID: "your-client-id",
    
    // 租户 ID
    TENANT_ID: "your-tenant-id",
    
    // 加密配置
    ENCRYPTION: {
        ENABLED: true,                    // 是否启用加密
        HEADER_FLAG: "encrypt-key",       // 加密头标识
        PUBLIC_KEY: "RSA公钥...",         // RSA 公钥
        PRIVATE_KEY: "RSA私钥..."         // RSA 私钥
    },
    
    // API 端点
    ENDPOINTS: {
        LOGIN: "/open-api/script/login",
        LOGOUT: "/open-api/script/logout",
        CARD_INFO: "/open-api/script/card-info",
        // ... 更多端点
    }
};

// 应用配置
const APP_CONFIG = {
    APP_INFO: {
        NAME: "Rich AutoJS UI",
        VERSION: "1.0.0",
        DEVELOPER: "Your Company",
        UPDATE_DATE: "2025-11-02"
    },
    
    // 悬浮窗配置
    FLOATY_CONFIG: {
        TARGET_SCRIPT_PATH: "main.js",    // 目标脚本路径
        INITIAL_POSITION: {
            X: 50,
            Y: 200
        },
        WEBVIEW_SIZE: {
            WIDTH_PERCENT: 0.8,           // 80% 屏幕宽度
            HEIGHT_PERCENT: 0.7           // 70% 屏幕高度
        },
        WEBVIEW_PAGE: "web/index.html",
        WEBVIEW_TITLE: "配置页面"
    }
};
```

---

## 🧪 开发调试

### 调试技巧

1. **使用 toastLog 输出日志**
   ```javascript
   autojs.global.toastLog('这条消息会显示在屏幕和日志中');
   ```

2. **查看 WebView 控制台**
   - 在界面上找到"查看日志"按钮
   - 或在 VSCode 中查看 AutoJS6 的控制台输出

3. **使用测试组件**
   - 每个模块都有对应的测试组件（如 `HttpTest.vue`）
   - 在主界面切换标签页进行测试

4. **Chrome 远程调试**
   ```bash
   # 在 Chrome 中访问
   chrome://inspect
   
   # 然后找到你的 WebView 并点击 inspect
   ```

### 常见问题

#### 1. WebView 加载空白

**原因**: 模块加载失败或路径错误

**解决方案**:
- 检查 `web/modules/init.js` 中的模块路径
- 查看控制台是否有错误信息
- 确保所有依赖文件都存在

#### 2. jsBridge 调用失败

**原因**: 原生模块未正确注册

**解决方案**:
- 检查 `modules/register.js` 是否正确加载
- 确认在 `ui.js` 中调用了 `register.registerAll(jsBridge)`
- 检查模块的 `handle` 名称是否匹配

#### 3. 悬浮窗无法显示

**原因**: 缺少悬浮窗权限

**解决方案**:
```javascript
// 在启动悬浮窗前检查权限
if (!floaty.checkPermission()) {
    floaty.requestPermission();
}
```

#### 4. HTTP 请求超时

**原因**: 网络问题或服务器配置

**解决方案**:
- 检查网络连接
- 增加超时时间（在 `config.js` 中配置）
- 检查 API 地址是否正确

---

## 📦 模块开发

### 创建自定义模块

#### 1. 创建原生端模块

```javascript
// modules/mymodule.js
module.exports = {
    register: function(jsBridge) {
        // 注册方法
        jsBridge.handle('mymodule.myMethod', function(event, param1, param2) {
            // 实现你的逻辑
            console.log('调用 myMethod:', param1, param2);
            return { success: true, data: 'result' };
        });
        
        jsBridge.handle('mymodule.anotherMethod', function(event) {
            // 另一个方法
            return 'Hello from mymodule';
        });
    }
};
```

#### 2. 在注册器中注册

```javascript
// modules/register.js
var myModule = require('./mymodule.js');

module.exports = {
    registerAll: function(jsBridge) {
        // ... 其他模块注册
        
        // 注册自定义模块
        myModule.register(jsBridge);
    }
};
```

#### 3. 创建 Web 端封装

```javascript
// web/modules/mymodule.js
(function(window) {
    'use strict';
    
    // 确保命名空间存在
    if (!window.__autojs_modules) {
        window.__autojs_modules = {};
    }
    
    // 定义模块
    window.__autojs_modules.mymodule = {
        myMethod: function(param1, param2) {
            return $autojs.invoke('mymodule.myMethod', {
                param1: param1,
                param2: param2
            });
        },
        
        anotherMethod: function() {
            return $autojs.invoke('mymodule.anotherMethod', {});
        }
    };
    
    console.log('[MyModule] Web 模块已加载');
    
})(window);
```

#### 4. 在 init.js 中加载

```javascript
// web/modules/init.js
var moduleFiles = [
    // ... 其他模块
    'modules/mymodule.js'  // 添加你的模块
];
```

#### 5. 在 Vue 组件中使用

```vue
<template>
    <div>
        <van-button @click="testMyModule">测试自定义模块</van-button>
    </div>
</template>

<script>
export default {
    methods: {
        async testMyModule() {
            const result = await autojs.mymodule.myMethod('参数1', '参数2');
            console.log('结果:', result);
            
            const msg = await autojs.mymodule.anotherMethod();
            autojs.global.toast(msg);
        }
    }
};
</script>
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是新功能、bug 修复、文档改进还是问题反馈。

### 贡献方式

1. **Fork 项目**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **开启 Pull Request**

### 代码规范

- 使用 4 空格缩进
- 函数和变量使用驼峰命名
- 添加必要的注释
- 保持代码简洁易读

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源协议。

---

## 🙏 致谢

- [AutoJS6](https://github.com/SuperMonster003/AutoJs6) - 强大的 Android 自动化框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vant UI](https://vant-contrib.gitee.io/vant/v2/) - 轻量、可靠的移动端 Vue 组件库
- [vue2-sfc-loader](https://github.com/FranckFreiburger/vue3-sfc-loader) - Vue 单文件组件加载器

---

## 📞 联系方式

- **GitHub**: [yangrui110/rich-atuojs-ui](https://github.com/yangrui110/rich-atuojs-ui)
- **Issues**: [提交问题](https://github.com/yangrui110/rich-atuojs-ui/issues)
- **Pull Requests**: [贡献代码](https://github.com/yangrui110/rich-atuojs-ui/pulls)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！**

Made with ❤️ by Rich AutoJS UI Team

</div>
