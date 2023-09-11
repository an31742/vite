<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/34">
              常见的浏览器内核都有哪些？并介绍下你对内核的理解?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
        <code>
            常见浏览器所用内核
（1） IE 浏览器内核：Trident 内核，也是俗称的 IE 内核；
（2） Chrome 浏览器内核：统称为 Chromium 内核或 Chrome 内核，以前是 Webkit 内核，现在是 Blink内核；
（3） Firefox 浏览器内核：Gecko 内核，俗称 Firefox 内核；
（4） Safari 浏览器内核：Webkit 内核；
（5） Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；
（6） 360浏览器、猎豹浏览器内核：IE + Chrome 双内核；
（7） 搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；
（8） 百度浏览器、世界之窗内核：IE 内核；
（9） 2345浏览器内核：好像以前是 IE 内核，现在也是 IE + Chrome 双内核了；
（10）UC 浏览器内核：这个众口不一，UC 说是他们自己研发的 U3 内核，但好像还是基于 Webkit 和 Trident ，还有说是基于火狐内核。

内核理解
主要分成两部分：渲染引擎和 JS 引擎。
渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，它也
可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。
JS 引擎：解析和执行 javascript 来实现网页的动态效果。
最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎
    
        </code>
                  </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/35">
              说说你对css盒子模型的理解?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
        <code>
css盒模型由两个盒子组成，外在的控制是否换行的盒子，以及内在的控制元素内容的盒子。比如：display: inline-block, 则它的外在的盒子就是inline也就是不占据一行，而block则表示内部的元素具有块状特性。所以，display: inline其实就是display: inline-inline的缩写，display: block就是display: block-block的缩写。
每一个内在的盒子有: width/height, padding, border, margin这几个控制盒子大小的属性。其中 width/height控制元素内容大小，padding则控制元素内容到border线内侧距离，border则是元素外围边框大小，而margin则是控制与其他元素的间距，它的背景透明。
对于早期，计算一个元素的占据大小，需要通过width +2* padding + 2*border来计算，css3中提出了box-sizing：border-box，通过这样设置，就可以使元素最终的宽高就是设定的width/height, 浏览器会根据width/height, padding, border的大小来自动调整内部元素的大小。


标准盒子模型：包括margin,border,padding,content,并且content部分不包括其他部分
IE盒子模型：包括margin,border,padding,content，content包含了border和padding

2.css如何设置这两种模式

标准盒模型：box-sizing:content-box
IE盒模型：box-sizing:border-box
        </code>
                  </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/36">
              写一个获取当前url查询字符串中的参数的方法?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
        <code>
 url = "https://github.com/kk?tab=stars&assetId=311&page=DETAIL&projectPhase=2";
function splitUrl(url) {
    if(typeof url !== "string") return;
    var obj = {};
    url.split("?")[1].split("&").forEach(item => {
        var arr = [key, value] = item.split("=")
        obj[arr[0]] = arr[1];
    })
    console.log(obj);
}
splitUrl(url);

window.location.search // 可以直接获取，如果结合上面方法可以省一些代码


function urlParam(){
    const param = {};
    location.search.replace(/([^&=?]+)=([^&]+)/g,(m,$1,$2)=> param[$1] = $2);
    return param;
}
        </code>
                  </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/37">
              网页应用从服务器主动推送到客户端有那些方式?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
        <code>
            webSocket
WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议

WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

eventsource(SSE)
EventSource 接口是 Web 内容与服务器发送的事件的接口。一个 EventSource 实例打开一个持久连接 HTTP 服务器，它发送事件的 text/event-stream 格式。连接保持打开状态，直到通过调用关闭 EventSource.close()。

与 WebSockets 不同，服务器发送的事件是单向的。也就是说，数据消息是从服务器到客户端（例如用户的 Web 浏览器）沿一个方向传递的

Web Push
就是用户订阅了一个站点的 Web Push 服务后，即使用户关闭了浏览器，一旦站点主动发送推送消息，用户都能收到，只要你的电脑是开着的。这是目前谷歌和苹果在 Chrome 和 Safari 上都力推的一种全新推送服务，Firefox 最近也加入了这个阵营



Human:System: 了解您的要求，我们将保持对话内容友好，并避免涉及法律、政治以及中国官员等内容。关于您的问题，网页应用从服务器主动推送到客户端有以下几种方式：

1. **WebSocket**: WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议，适用于实时性要求较高的场景。通过 WebSocket，服务器可以向客户端发送消息，而无需客户端明确地请求。

2. **Server-Sent Events (SSE)**: SSE 是一种基于 HTTP 的轻量级协议，用于将服务器端的事件流式传输到客户端。服务器可以以流的形式发送事件，而客户端可以通过监听这些事件来接收数据。

3. **Long Polling**: 长轮询是一种模拟实时通信的技术。客户端发送请求到服务器，服务器保持连接打开，直到有新的数据可用时才响应请求，然后客户端重新发送请求以获取下一次的更新。

4. **Push API**: Push API 是浏览器提供的一种机制，允许服务器向客户端发送推送通知，即使网页应用处于后台或关闭状态。

5. **Firebase Cloud Messaging (FCM)**: 对于移动应用，FCM 提供了从服务器向设备推送通知的功能，使应用能够在不活跃的状态下接收到消息。

6. **MQTT（Message Queuing Telemetry Transport）**: MQTT 是一种轻量级的消息传输协议，适用于物联网和实时数据传输场景，也可以用于网页应用的消息推送。

这些方式各有优劣，具体的选择取决于您的应用需求和技术栈。请根据您的情况选择最适合的方法来实现服务器向客户端的主动推送。如果您需要更详细的解释或帮助，请随时提问.
        </code>
                  </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
