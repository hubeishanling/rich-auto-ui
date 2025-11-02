'ui';
var moduleRegister = require('./modules/register.js');
var pluginUtils = require('./modules/plugin-utils.js');

// 打印调试信息
pluginUtils.printDebugInfo();

ui.layout(
    <vertical>
        <webview id="web" w="*" h="*"/>
    </vertical>,
);

ui.statusBarColor('#ffffff');

var web = ui['web'];

// 初始化 WebView（使用通用方法）
pluginUtils.initWebView(web, moduleRegister, 'web/index.html');


// images.requestScreenCapture();
// let img = images.captureScreen();
// ocr(img);


