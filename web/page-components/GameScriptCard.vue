<template>
    <div class="info-card">
        
        <div class="button-group">
            <van-button 
                type="warning" 
                round 
                block
                size="large"
                @click="toggleFloaty">
                {{ floatyEnabled ? '关闭悬浮窗' : '打开悬浮窗' }}
            </van-button>
            <van-button 
                color="#9C27B0"
                round 
                block
                size="large"
                @click="updateScript">
                更新脚本
            </van-button>
        </div>
        
        <div class="button-group">
            <van-button 
                type="danger" 
                round 
                block
                size="large"
                @click="logout">
                退出登录
            </van-button>
            <van-button 
                color="#2196F3"
                round 
                block
                size="large"
                @click="refresh">
                刷新信息
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        floatyEnabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 调用 RichAuto 方法
        async callAutoJS(method, ...params) {
            try {
                if (window.$richauto) {
                    const result = await window.$richauto.invoke(method, ...params);
                    return result;
                } else {
                    throw new Error('RichAuto 未初始化');
                }
            } catch (error) {
                console.error(`调用 ${method} 失败:`, error);
                throw error;
            }
        },
        
        // 切换悬浮窗
        async toggleFloaty() {
            try {
                if (window.richauto && window.richauto.floatyManager) {
                    if (this.floatyEnabled) {
                        // 关闭悬浮窗
                        await window.richauto.floatyManager.remove();
                        this.$emit('update:floaty-enabled', false);
                        this.$toast('悬浮窗已关闭');
                    } else {
                        // 打开悬浮窗
                        await window.richauto.floatyManager.create();
                        this.$emit('update:floaty-enabled', true);
                        this.$toast('悬浮窗已打开');
                    }
                } else {
                    throw new Error('悬浮窗管理器未初始化');
                }
            } catch (e) {
                this.$toast('操作失败: ' + e.message);
                console.error('切换悬浮窗失败:', e);
            }
        },
        
        // 更新脚本
        async updateScript() {
            // 先显示 loading
            this.$toast.loading({
                message: '正在更新...',
                forbidClick: true,
                duration: 0
            });
            
            // // 使用 setTimeout 确保 loading 框先渲染
            await new Promise(resolve => setTimeout(resolve, 100));
            
            try {
                // 更新提示信息
                // this.$toast.loading({
                //     message: '正在下载脚本...\n请耐心等待',
                //     forbidClick: true,
                //     duration: 0
                // });
                
                const result = await this.callAutoJS('updateScript');
                
                this.$toast.clear();
                
                if (result && result.success) {
                    this.$toast.success({
                        message: result.message || '脚本更新成功',
                        duration: 2000
                    });
                } else {
                    this.$dialog.alert({
                        title: '更新失败',
                        message: (result && result.message) || '未知错误'
                    });
                }
            } catch (e) {
                this.$toast.clear();
                this.$dialog.alert({
                    title: '更新失败',
                    message: e.message || '更新过程中发生错误'
                });
            }
        },
        
        // 退出登录
        async logout() {
            try {
                await this.$dialog.confirm({
                    title: '提示',
                    message: '确定要退出登录吗？'
                });
                
                await this.callAutoJS('logout');
                this.$emit('logout-success');
            } catch (e) {
                // 用户取消或错误
                if (e !== 'cancel') {
                    this.$toast('退出失败: ' + e.message);
                }
            }
        },
        
        // 刷新信息
        async refresh() {
            this.$toast.loading({
                message: '刷新中...',
                forbidClick: true,
                duration: 0
            });
            
            try {
                const result = await this.callAutoJS('refreshUserInfo');
                
                this.$toast.clear();
                
                if (result && result.success) {
                    this.$emit('refresh-success', result.userInfo);
                    this.$toast.success('刷新成功');
                } else {
                    this.$toast.fail('刷新失败: ' + (result && result.message));
                }
            } catch (e) {
                this.$toast.clear();
                this.$toast.fail('刷新失败: ' + e.message);
            }
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

.button-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 16px;
}
</style>


