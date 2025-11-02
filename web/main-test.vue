<template>
    <van-row>
        <van-nav-bar title="AutoJS6 UI 测试"/>

        <van-tabs v-model="activeTab">


            <van-tab title="Global 模块">
                <GlobalTest />
            </van-tab>

            <van-tab title="Automator 模块">
                <AutomatorTest />
            </van-tab>

            <van-tab title="UiSelector 模块">
                <UiSelectorTest />
            </van-tab>

            <van-tab title="Floaty 模块">
                <FloatyTest />
            </van-tab>

            <van-tab title="HTTP 模块">
                <HttpTest />
            </van-tab>

            <van-tab title="Base64 模块">
                <Base64Test />
            </van-tab>

            <van-tab title="本体应用 API">
                <AutojsAppTest />
            </van-tab>

            <van-tab title="App 模块">
                <AppTest />
            </van-tab>

            <van-tab title="Color 模块">
                <ColorTest />
            </van-tab>

            <van-tab title="Image 模块">
                <ImageTest />
            </van-tab>

            <van-tab title="OCR 模块">
                <OcrTest />
            </van-tab>

            <van-tab title="Keys 模块">
                <KeysTest />
            </van-tab>

            <van-tab title="Device 模块">
                <DeviceTest />
            </van-tab>

            <van-tab title="Storages 模块">
                <StoragesTest />
            </van-tab>

            <van-tab title="Files 模块">
                <FilesTest />
            </van-tab>

            <van-tab title="Engines 模块">
                <EnginesTest />
            </van-tab>

            <van-tab title="Notice 模块">
                <NoticeTest />
            </van-tab>

        </van-tabs>
    </van-row>
</template>
<script>
import GlobalTest from './components/GlobalTest.vue';
import AutomatorTest from './components/AutomatorTest.vue';
import UiSelectorTest from './components/UiSelectorTest.vue';
import FloatyTest from './components/FloatyTest.vue';
import HttpTest from './components/HttpTest.vue';
import Base64Test from './components/Base64Test.vue';
import AutojsAppTest from './components/AutojsAppTest.vue';
import AppTest from './components/AppTest.vue';
import ColorTest from './components/ColorTest.vue';
import ImageTest from './components/ImageTest.vue';
import OcrTest from './components/OcrTest.vue';
import KeysTest from './components/KeysTest.vue';
import DeviceTest from './components/DeviceTest.vue';
import StoragesTest from './components/StoragesTest.vue';
import FilesTest from './components/FilesTest.vue';
import EnginesTest from './components/EnginesTest.vue';
import NoticeTest from './components/NoticeTest.vue';

export default {
    components: {
        GlobalTest,
        AutomatorTest,
        UiSelectorTest,
        FloatyTest,
        HttpTest,
        Base64Test,
        AutojsAppTest,
        AppTest,
        ColorTest,
        ImageTest,
        OcrTest,
        KeysTest,
        DeviceTest,
        StoragesTest,
        FilesTest,
        EnginesTest,
        NoticeTest
    },
    data() {
        return {
            accessibilityServiceEnabled: false,
            activeTab: 0,
            appVersionName: '',
        };
    },
    created() {

    },
    methods: {

    },
};
</script>