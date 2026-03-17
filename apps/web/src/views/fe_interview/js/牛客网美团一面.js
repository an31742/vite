/**
 * 手写节流
*/
console.log("🚀 ~ 手写节流:")

/**
 *
 * @param {*} fn
 * @param {*} delay
 * @returns
 * 使用1一秒进行节流
 * throttle 是因为测试setTimeout循环触发有延迟 是宏任务有1ms的误差
 * throttle2 是因为测试setTimeout循环触发有延迟
 */
function throttle (fn, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

function throttle2 (fn, delay) {
  let lastTime = 0
  return function () {
    let args = arguments
    let contxt = this
    let currTime = Date.now()
    if (currTime - lastTime >= delay) {
      lastTime = currTime
      return fn.apply(contxt, args)
    }
  }
}



// const fn = throttle2(console.log, 1000);
const fn2 = throttle((v) => {
  console.log(v, Date.now())
}, 1000)
//使用for加setTimeOut调用有bug 只打印a1 a3
// for (let index = 1; index < 5; index++) {
//   setTimeout(() => {
//     fn2('a' + index);
//   }, 1000 * index); // 关键：第0次0ms、第1次1000ms、第2次2000ms
// }


/**
 *
 * @param {*} fn
 * @param {*} delay
 * @returns
 * 当使用1秒循环调用防抖可以
 */


function debounce (fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}


const fn3 = debounce(console.log, 1000)

// fn3('A') // 1秒后输出 'A'
// fn3('B') // 被忽略，不会输出
// fn3('C') // 被忽略，不会输3

for (let index = 1; index < 5; index++) {
  setTimeout(() => {
    fn3('a' + index);
  }, 1000 * index); // 关键：第0次0ms、第1次1000ms、第2次2000ms
}


/**
 *  v-if和v-show的区别
*/
console.log("🚀 ~ v-if和v-show的区别:")

//v-if 是并没有创建Dom v-show是创建了Dom 触发了css样式使用display:none隐藏


/**
 * 流式渲染是如何实现的
*/

console.log("🚀 ~ 流式渲染师如何实现的:")


//通过fetch 调用接口
// 前端通通过请求头（如Accept: text/event-stream）声明需要流式响应， 本项目是后端直接返回json
//  前端获取response.body作为ReadableStream，  然后用getReader()得到reader，（read()返回一个Promise 包含{ done: boolean, value: 返回值 } ）,
//  在 while循环中反复调用await reader.read()读取json数据流  value 是二进制数据
//  所以用 new TextDecoder('utf-8') 解码成字符串， 再通过split('\n\n')或者split('\n)分割成完整的json行，
// 再通过JSON.parse 获取json对象   这样能边收边渲染，提升体验。
//如果出现网络中断或者请求不完整通过设置一个变量buffer 作为缓冲区，等待下一个chunk到来拼接， 如果done为true 关闭加载状态展示全部数据


// 使用fetch 发送post请求 带body 获取response.body的ReadableStream 通过递归读取 循环读取流中每一个chunk

// 这是现代浏览器处理任意 HTTP 流式响应的通用方式，不限于 SSE。可以用于：
// SSE 格式的流
// NDJSON（每行一个 JSON）
// 纯文本流
// 自定义 chunked JSON（如 OpenAI 的 Chat Completions API）


//SSE返回的数据格式是什么
console.log('SSE返回的数据格式是什么');
// SSE 返回的数据格式是固定的纯文本格式  SSE 不是 JSON 格式，而是基于文本的事件流格式，但 data 字段内容可以是 JSON 字符串

// const eventSource = new EventSource('/api/stream');
// eventSource.onmessage = (event) => {
//   const data = JSON.parse(event.data);
//   console.log(data);
// };

// const response = await fetch('/api/stream');
// const reader = response.body.getReader();
// 手动循环读取

// 方式	API	请求方法	数据处理
// SSE	EventSource	只支持 GET	自动解析事件格式
// fetch	fetch	支持 GET/POST	手动处理 ReadableStream

// SSE 的返回数据是基于纯文本的流式事件格式（text/event-stream），必须 UTF-8 编码。数据不是 JSON 或二进制，而是以事件为单位的文本流，每个事件由键值对组成，用冒号分隔字段。 核心规则



//除了websocket和sse还有其他方式吗
console.log('除了websocket和sse还有其他方式吗');

// 方式	调用方式	请求方法	服务器行为	网络开销	返回数据类型	实时性
// 短轮询	axios/fetch + setInterval	GET/POST	立即返回	高	JSON	差
// 长轮询	axios/fetch + 递归调用	GET/POST	等待数据或超时	中	JSON	好
// WebSocket	new WebSocket	WS协议	双向实时通信	低	任意类型	优
// SSE	EventSource	GET	服务器推送	低	UTF-8纯文本	优
// fetch Stream	fetch + ReadableStream	GET/POST	流式响应	低	二进制/文本	优


// WebSocket：

// 协议：ws:// 或 wss://（加密）

// 双向通信，客户端和服务器都可主动发送

// fetch ReadableStream：

// 可处理任意流式数据（不仅是二进制）

// 常用于 AI 对话、文件下载进度等

// 选择建议：

// 简单推送 → SSE

// 双向交互 → WebSocket

// 自定义流 → fetch ReadableStream

// 兼容性优先 → 长轮询

// 相比其他SSE的优点

// 特性	短轮询	长轮询	SSE
// 网络开销	高	中	低
// 实时性	差	好	优延迟极低
// 服务器压力	大	中	小
// 自动重连	无需手动处理	无需手动处理	有
// 实现复杂度	简单	中等	简单



//简写
// 前端在请求的时候添加对应的流式请求头 text/event-stream
// fetch('https://api.example.com/stream-data', {
//   method: 'GET',
//   headers: {
//     'Accept': 'text/event-stream'  // 或其他自定义头，告诉后端用流式
//   }
// })
// .then(response => {
//   if (!response.ok) throw new Error('Network response was not ok');
//   return response.body;  // 获取ReadableStream
// })
// .then(stream => processStream(stream));  // 处理流

// async function processStream(stream) {
//   const reader = stream.getReader();
//   const decoder = new TextDecoder('utf-8');  // 用于解码二进制到文本

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) {
//       console.log('Stream complete');
//       break;
//     }
//     const chunkText = decoder.decode(value);  // 解码chunk
//     console.log('Received chunk:', chunkText);  // 或渲染到UI
//     // 示例：实时追加到DOM
//     document.getElementById('output').innerHTML += chunkText;
//   }
// }

//项目实际使用

/**
 * AI 流式对话核心实现
 */
function onAiConnect (FetchConfig) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream', // SSE 格式
    },
    signal: this.signal, // 支持中断
    body: JSON.stringify(FetchConfig.body),
  };

  _that.onToggleLoading(true);

  fetch(FetchConfig.url, requestOptions)
    .then((response) => {

      const reader = response.body.getReader(); // 获取流读取器

      // 递归读取流数据
      return reader.read().then(function processResult ({ done, value }) {
        if (done) {
          _that.onToggleLoading(false);
          observer.complete();
          return;
        }

        // 继续读取下一块数据
        return reader.read().then(processResult);
      });
    })
    .catch((error) => {
      _that.onToggleLoading(false);
      observer.error(error);
    });

}

// 使用缓冲区缓存不完整数据
let sessionChunk = '';

function onParseMessage(Uint8Array) {
  let aiValue = new TextDecoder('utf-8').decode(Uint8Array);

  // 拼接上次未完成的数据
  aiValue = sessionChunk + aiValue;

  // 尝试解析 JSON
  const aiValueArray = lodash.filter(
    lodash.split(aiValue, 'data:'),
    (item) => {
      try {
        JSON.parse(item);
        sessionChunk = ''; // 解析成功，清空缓冲区
        return true;
      } catch (error) {
        // 不完整的 JSON 缓存起来
        sessionChunk = `data: ${item}`;
        return false;
      }
    }
  );

  // 使用 aiValueArray，避免未使用变量警告
  if (aiValueArray.length > 0) {
    // 这里可以处理解析后的 JSON 数据
    console.log('Parsed JSON array:', aiValueArray);
  }
}


//http2和http1的区别
console.log('http2和http1的区别');

// 特性	HTTP/1.1	HTTP/2
// 协议格式	文本协议	二进制协议
// 连接复用	串行请求	多路复用
// 头部压缩	无压缩	HPACK 压缩
// 服务器推送	不支持	支持 Server Push
// 流控制	无	有流量控制


// http2的服务端推送是干什么的

// 1. 浏览器请求: GET /index.html
// 2. 服务器分析: HTML 中需要 style.css 和 app.js
// 3. 服务器推送: 主动发送 CSS 和 JS 文件
// 4. 浏览器解析: HTML 时发现需要的资源已在缓存中

// <!-- 浏览器请求这个 HTML -->
// <!DOCTYPE html>
// <html>
// <head>
//   <link rel="stylesheet" href="/style.css">  <!-- 服务器已推送 -->
//   <script src="/app.js"></script>            <!-- 服务器已推送 -->
// </head>
// </html>




// HTTP/1.1 流程:
// 1. 请求 HTML → 等待响应
// 2. 解析 HTML → 发现需要 CSS
// 3. 请求 CSS → 等待响应
// 4. 发现需要 JS → 请求 JS → 等待响应

// HTTP/2 推送流程:
// 1. 请求 HTML → 服务器同时推送 CSS、JS
// 2. 解析 HTML → CSS、JS 已在缓存，直接使用

// HTTP/2 服务端推送的核心价值是预判客户端需求，提前推送依赖资源，减少网络往返次数，尤其适合优化首屏加载速度

// requestAnimationFrame和setInterval的区别
console.log('requestAnimationFrame和setInterval的区别');
// 特性	setInterval	requestAnimationFrame
// 执行频率	固定间隔	与屏幕刷新率同步
// 性能优化	无	浏览器自动优化
// 后台运行	继续执行	暂停执行
// 丢帧处理	可能丢帧	自动跳帧

// setInterval: 定时任务、轮询、倒计时

// requestAnimationFrame: 动画、游戏循环、视觉效果

// 核心优势: requestAnimationFrame 专为动画优化，提供更流畅的视觉体验和更好的性能

// 前端如何知道页面触底了

// window.addEventListener('scroll', () => {
//   const scrollTop = document.documentElement.scrollTop;
//   const windowHeight = window.innerHeight;
//   const documentHeight = document.documentElement.scrollHeight;

//   if (scrollTop + windowHeight >= documentHeight - 10) {
//     console.log('触底了');
//     loadMore(); // 加载更多数据
//   }
// });


// 创建底部哨兵元素
// const sentinel = document.createElement('div');
// document.body.appendChild(sentinel);

// const observer = new IntersectionObserver((entries) => {
//   if (entries[0].isIntersecting) {
//     console.log('触底了');
//     loadMore();
//   }
// });

// observer.observe(sentinel);

// 滚动触底加载导致dom元素过多卡顿如何优化
console.log('滚动触底加载导致dom元素过多卡顿如何优化');

// 核心思路: 只渲染用户能看到的内容，其余内容用占位符或回收机制处理。