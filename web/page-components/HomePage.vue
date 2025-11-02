<template>
    <div class="home-page">
        <!-- 欢迎区域 -->
        <div class="welcome-card">
            <div class="welcome-title">登录成功</div>
        </div>

        <!-- 用户信息 -->
        <UserInfoCard :user-info="userInfo" />

        <!-- 游戏脚本 -->
        <GameScriptCard
            :floaty-enabled="floatyEnabled"
            @update:floaty-enabled="$emit('update:floaty-enabled', $event)"
            @logout-success="$emit('logout')"
            @refresh-success="$emit('refresh-success', $event)"
        />
    </div>
</template>

<script>
import UserInfoCard from './UserInfoCard.vue';
import GameScriptCard from './GameScriptCard.vue';

export default {
    components: {
        UserInfoCard,
        GameScriptCard
    },
    props: {
        userInfo: {
            type: Object,
            default: () => ({})
        },
        floatyEnabled: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
.home-page {
    padding: 16px;
}

.welcome-card {
    background: white;
    border-radius: 12px;
    padding: 30px 20px;
    text-align: center;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    margin-bottom: 16px;
}

.welcome-title {
    font-size: 24px;
    font-weight: bold;
    color: #4CAF50;
}
</style>


