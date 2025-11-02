<template>
    <div class="info-card">
        <div class="info-card-title">用户信息</div>
        <div class="info-row">
            <span class="info-label">卡密</span>
            <span class="info-value">{{ userInfo.cardNo || '-' }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">剩余天数</span>
            <span class="info-value">{{ userInfo.remainingDays || 0 }} 天</span>
        </div>
        <div class="info-row">
            <span class="info-label">过期时间</span>
            <span class="info-value">{{ userInfo.expireTimeDisplay || '-' }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">登录时间</span>
            <span class="info-value">{{ userInfo.loginTimeDisplay || '-' }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">设备型号</span>
            <span class="info-value">{{ userInfo.deviceModel || '-' }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">系统版本</span>
            <span class="info-value">{{ userInfo.systemVersion || '-' }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">可绑定设备</span>
            <span class="info-value">{{ userInfo.deviceSize || 0 }} 台</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userInfo: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style scoped>
.info-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    margin-bottom: 16px;
}

.info-card-title {
    font-size: 16px;
    font-weight: bold;
    color: #323233;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid #4CAF50;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    color: #646566;
    font-size: 14px;
}

.info-value {
    color: #323233;
    font-size: 14px;
    font-weight: 500;
}
</style>


