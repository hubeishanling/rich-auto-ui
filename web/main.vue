<template>
    <div id="app-container">
        <!-- 头部导航栏 -->
        <div class="custom-nav-bar">
            <div class="nav-menu-btn" @click="showDrawer = true">☰</div>
            <div class="nav-title">{{ appName }}</div>
            <div class="nav-placeholder"></div>
        </div>

        <!-- 登录页面 -->
        <LoginPage
            v-show="currentPage === 'login'"
            :login-form="loginForm"
            :loading="loading"
            :app-name="appName"
            :app-version="appVersion"
            @login="performLogin"
        />

        <!-- 主页面 -->
        <HomePage
            v-show="currentPage === 'home'"
            :user-info="userInfo"
            :floaty-enabled="switches.floaty"
            @update:floaty-enabled="updateFloatyState"
            @logout="performLogout"
            @refresh-success="handleRefreshSuccess"
        />

        <!-- 侧边抽屉 -->
        <DrawerMenu
            :visible.sync="showDrawer"
            :app-name="appName"
            :app-version="appVersion"
            :developer="developer"
            :accessibility-enabled="switches.accessibility"
            :floaty-enabled="switches.floaty"
            @toggle-accessibility="toggleAccessibility"
            @toggle-floaty="toggleFloaty"
            @show-about="showAbout"
        />
    </div>
</template>

<script>
import LoginPage from './page-components/LoginPage.vue';
import HomePage from './page-components/HomePage.vue';
import DrawerMenu from './page-components/DrawerMenu.vue';

export default {
    components: {
        LoginPage,
        HomePage,
        DrawerMenu
    },
    data() {
        return {
            // 应用信息
            appName: 'AutoJS脚本管理器',
            appVersion: 'v1.0.0',
            developer: 'Developer',
            
            // 页面状态
            currentPage: 'login',
            loading: false,
            showDrawer: false,
            
            // 登录表单
            loginForm: {
                cardNo: '',
                deviceId: '',
                remember: false
            },
            
            // 用户信息
            userInfo: {},
            
            // 开关状态
            switches: {
                accessibility: false,
                floaty: false
            }
        };
    },
    
    
    mounted() {
        console.log('main.vue 已加载');
        this.initialize();
    },
    
    methods: {
        // 日志工具
        log(level, ...args) {
            if (window.richauto && window.richauto.log) {
                window.richauto.log[level](...args);
            } else {
                console[level](...args);
            }
        },
        
        // 调用 RichAuto 自定义方法
        async callAutoJS(method, ...params) {
            try {
                if (window.$richauto) {
                    // 直接传递参数，返回值已经是对象，不需要 JSON 处理
                    const result = await window.$richauto.invoke(method, ...params);
                    return result;
                } else {
                    throw new Error('RichAuto 未初始化');
                }
            } catch (error) {
                this.log('error', `调用 ${method} 失败:`, error);
                throw error;
            }
        },
        
        // 初始化
        async initialize() {
            try {
                // 获取应用信息
                const appInfo = await this.callAutoJS('getAppInfo');
                if (appInfo) {
                    this.appName = appInfo.name || this.appName;
                    this.appVersion = 'v' + (appInfo.version || '1.0.0');
                    this.developer = appInfo.developer || this.developer;
                }
                
                // 初始化悬浮窗管理器的动作回调
                this.initFloatyManager();
                
                // 加载记住的凭据
                const credentials = await this.callAutoJS('loadCredentials');
                if (credentials && credentials.cardNo) {
                    this.loginForm.cardNo = credentials.cardNo;
                    this.loginForm.remember = true;
                }
                if (credentials && credentials.deviceId) {
                    this.loginForm.deviceId = credentials.deviceId;
                }
                
                // 验证现有token
                const tokenValid = await this.callAutoJS('verifyToken');
                if (tokenValid && tokenValid.success) {
                    this.userInfo = tokenValid.userInfo;
                    this.currentPage = 'home';
                    this.$toast('自动登录成功');
                }
                
                // 更新开关状态
                await this.updateSwitchStates();
                
            } catch (e) {
                this.log('error', 'main.vue 初始化失败', e);
            }
        },
        
        // 登录
        async performLogin() {
            if (!this.loginForm.cardNo.trim()) {
                this.$toast('请输入卡密');
                return;
            }
            
            this.loading = true;
            
            try {
                const result = await this.callAutoJS('login',
                    this.loginForm.cardNo.trim(),
                    this.loginForm.deviceId.trim(),
                    this.loginForm.remember
                );
                
                if (result && result.success) {
                    this.userInfo = result.userInfo;
                    this.currentPage = 'home';
                    this.$toast('登录成功');
                } else {
                    this.$dialog.alert({
                        title: '登录失败',
                        message: (result && result.message) || '未知错误'
                    });
                }
            } catch (e) {
                this.$dialog.alert({
                    title: '登录失败',
                    message: e.message
                });
            } finally {
                this.loading = false;
            }
        },
        
        // 退出登录
        async performLogout() {
            try {
                await this.$dialog.confirm({
                    title: '提示',
                    message: '确定要退出登录吗？'
                });
                
                await this.callAutoJS('logout');
                this.userInfo = {};
                this.currentPage = 'login';
                this.$toast('已退出登录');
            } catch (e) {
                // 用户取消或错误
            }
        },
        
        // 刷新用户信息
        async refreshUserInfo() {
            this.$toast.loading({
                message: '刷新中...',
                forbidClick: true,
                duration: 0
            });
            
            try {
                const result = await this.callAutoJS('refreshUserInfo');
                if (result && result.success) {
                    this.userInfo = result.userInfo;
                    this.$toast.clear();
                    this.$toast('刷新成功');
                } else {
                    this.$toast.clear();
                    this.$toast('刷新失败: ' + (result && result.message));
                }
            } catch (e) {
                this.$toast.clear();
                this.$toast('刷新失败: ' + e.message);
            }
        },
        
        // 更新悬浮窗状态
        updateFloatyState(enabled) {
            this.switches.floaty = enabled;
        },
        
        // 处理刷新成功
        handleRefreshSuccess(userInfo) {
            this.userInfo = userInfo;
        },
        
        // 切换无障碍服务
        async toggleAccessibility() {
            try {
                const result = await this.callAutoJS('toggleAccessibility');
                this.switches.accessibility = result && result.enabled;
            } catch (e) {
                this.$toast('操作失败: ' + e.message);
            }
        },
        
        // 初始化悬浮窗管理器
        initFloatyManager() {
            try {
                // 注册悬浮窗动作处理器
                if (window.richauto && window.richauto.floatyManager) {
                    window.richauto.floatyManager.onAction((action) => {
                        this.handleFloatyAction(action);
                    });
                    this.log('debug', '悬浮窗管理器已初始化');
                }
            } catch (e) {
                this.log('error', '初始化悬浮窗管理器失败', e);
            }
        },
        
        // 处理悬浮窗动作
        async handleFloatyAction(action) {
            this.log('debug', '悬浮窗动作:', action);
            
            try {
                switch(action) {
                    case 'toggle':
                        // 启动/停止脚本
                        await this.callAutoJS('toggleScript');
                        this.$toast('脚本切换');
                        break;
                        
                    case 'log':
                        // 查看日志
                        await this.callAutoJS('showLog');
                        break;
                        
                    case 'config':
                        // 打开配置
                        this.showDrawer = false;
                        // 可以在这里显示配置页面或对话框
                        this.$toast('打开配置');
                        break;
                        
                    case 'close':
                        // 关闭悬浮窗
                        this.switches.floaty = false;
                        await this.updateFloatyStatus();
                        break;
                        
                    default:
                        this.log('warn', '未知的悬浮窗动作:', action);
                }
            } catch (e) {
                this.log('error', '处理悬浮窗动作失败', e);
                this.$toast('操作失败: ' + e.message);
            }
        },
        
        // 切换悬浮窗
        async toggleFloaty() {
            try {
                if (this.switches.floaty) {
                    // 关闭悬浮窗
                    if (window.richauto && window.richauto.floatyManager) {
                        await window.richauto.floatyManager.remove();
                        this.switches.floaty = false;
                        this.$toast('悬浮窗已关闭');
                    }
                } else {
                    // 打开悬浮窗
                    if (window.richauto && window.richauto.floatyManager) {
                        await window.richauto.floatyManager.create();
                        this.switches.floaty = true;
                        this.$toast('悬浮窗已打开');
                    }
                }
                
                // 更新状态到后端
                // await this.updateFloatyStatus();
            } catch (e) {
                this.$toast('操作失败: ' + e.message);
                this.log('error', '切换悬浮窗失败', e);
            }
        },
        
        // 更新悬浮窗状态到后端
        // async updateFloatyStatus() {
        //     try {
        //         await this.callAutoJS('setFloatyEnabled', this.switches.floaty);
        //     } catch (e) {
        //         this.log('error', '更新悬浮窗状态失败', e);
        //     }
        // },
        
        // 更新开关状态
        async updateSwitchStates() {
            try {
                const states = await this.callAutoJS('getSwitchStates');
                if (states) {
                    this.switches.accessibility = states.accessibility;
                    this.switches.floaty = states.floaty;
                }
            } catch (e) {
                this.log('error', '更新开关状态失败', e);
            }
        },
        
        // 显示关于
        async showAbout() {
            this.showDrawer = false;
            try {
                await this.callAutoJS('showAbout');
            } catch (e) {
                this.log('error', '显示关于失败', e);
            }
        }
    }
};
</script>

<style>
/* 全局样式 - 只包含基础重置和 Vant 主题 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f7f8fa;
    min-height: 100vh;
}

#app {
    min-height: 100vh;
}

/* Vant 主题色自定义 */
:root {
    --van-primary-color: #4CAF50;
    --van-success-color: #4CAF50;
    --van-button-primary-background: #4CAF50;
    --van-button-primary-border-color: #4CAF50;
}
</style>

<style scoped>
#app-container {
    min-height: 100vh;
    background: #f7f8fa;
}

/* 头部导航栏样式 */
.custom-nav-bar {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.nav-menu-btn {
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
}

.nav-title {
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}

.nav-placeholder {
    width: 40px;
}
</style>