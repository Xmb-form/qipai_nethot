/**
 * Created by qiu_zheng on 2016/6/4.
 */
define(function(require, exports, module) {

    var w = {};

    w.callAppHandler = function(handlerName,param){ //调用APP接口
		alert(handlerName);
        //发两次消息确保消息能够100%发送成功
//      connectWebViewJavascriptBridge(function(bridge) {
//          window.WebViewJavascriptBridge.callHandler(handlerName, param);
//      });

          setupWebViewJavascriptBridge(function(bridge) {
              bridge.callHandler(handlerName, param);
          });

    };

    //注册消息，用于APP调用
    function registerAppHandler(bridge){


        bridge.registerHandler("getUrl", function(data, responseCallback) {
           //回调
		   
		   $("#getUrl img").attr("src",data);
		    alert(data);
		
            responseCallback(responseData);
        });


//      bridge.registerHandler("消息2", function(data, responseCallback) {
//          //回调
//          // ....
//          // ...
//          //
////          responseCallback(responseData);
//      });



    }

    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function() {
                    callback(WebViewJavascriptBridge)
                },
                false
            );
        }
    }
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
            console.log('JS got a message', message);
            var data = {
                'Javascript Responds': 'Wee!'
        };
            console.log('JS responding with', data);
            responseCallback(data);
        });

        registerAppHandler(bridge);

    });


    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }

        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }

    setupWebViewJavascriptBridge(function(bridge) {
        registerAppHandler(bridge);
    });

    module.exports = w;
});