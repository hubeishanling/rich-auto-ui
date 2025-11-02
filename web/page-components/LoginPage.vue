<template>
    <div class="login-page">
        <div class="login-title">用户登录</div>
        
        <div class="login-card">
            <van-cell-group :border="false">
                <van-field
                    v-model="loginForm.cardNo"
                    label="卡密"
                    placeholder="请输入卡密"
                    clearable
                />
                <van-field
                    v-model="loginForm.deviceId"
                    label="设备ID"
                    placeholder="留空将自动获取"
                    readonly
                    clearable
                />
                <van-cell center>
                    <template #title>
                        <van-checkbox v-model="loginForm.remember">记住卡密</van-checkbox>
                    </template>
                </van-cell>
            </van-cell-group>
            
            <div style="margin-top: 20px;">
                <van-button 
                    type="primary" 
                    block 
                    round 
                    size="large"
                    :loading="loading"
                    @click="handleLogin">
                    {{ loading ? '登录中...' : '登录' }}
                </van-button>
            </div>
        </div>

        <div class="app-version">{{ appName }} {{ appVersion }}</div>
    </div>
</template>

<script>
export default {
    props: {
        loginForm: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        appName: {
            type: String,
            default: 'AutoJS脚本管理器'
        },
        appVersion: {
            type: String,
            default: 'v1.0.0'
        }
    },
    methods: {
        handleLogin() {
            this.$emit('login');
        }
    }
};
</script>

<style scoped>
.login-page {
    padding: 20px 16px;
}

.login-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 30px;
}

.login-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    margin-bottom: 20px;
}

.app-version {
    text-align: center;
    color: #969799;
    font-size: 12px;
    padding: 30px 0;
}
</style>


