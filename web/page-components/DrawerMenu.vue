<template>
    <van-popup
        :value="visible"
        @input="$emit('update:visible', $event)"
        position="left"
        :style="{ width: '75%', height: '100%' }">
        
        <div class="drawer-header">
            <div class="drawer-title">{{ appName }}</div>
            <div class="drawer-version">{{ appVersion }}</div>
        </div>

        <van-cell-group :border="false">
            <van-cell 
                title="无障碍服务" 
                icon="shield-o"
                @click="$emit('toggle-accessibility')">
                <template #right-icon>
                    <van-switch 
                        :value="accessibilityEnabled" 
                        size="20"
                        @input="$emit('toggle-accessibility')"
                        @click.stop />
                </template>
            </van-cell>
            
            <van-cell 
                title="浮动窗口" 
                icon="eye-o"
                @click="$emit('toggle-floaty')">
                <template #right-icon>
                    <van-switch 
                        :value="floatyEnabled" 
                        size="20"
                        @input="$emit('toggle-floaty')"
                        @click.stop />
                </template>
            </van-cell>
            
            <van-cell 
                title="关于" 
                icon="info-o"
                is-link
                @click="$emit('show-about')" />
        </van-cell-group>

        <div class="drawer-footer">
            © 2024 {{ developer }}
        </div>
    </van-popup>
</template>

<script>
export default {
    props: {
        visible: {
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
        },
        developer: {
            type: String,
            default: 'Developer'
        },
        accessibilityEnabled: {
            type: Boolean,
            default: false
        },
        floatyEnabled: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
.drawer-header {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    padding: 40px 20px 30px;
    text-align: center;
    color: white;
}

.drawer-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
}

.drawer-version {
    font-size: 14px;
    opacity: 0.85;
}

.drawer-footer {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
    color: #969799;
    font-size: 12px;
    padding: 0 20px;
}
</style>


