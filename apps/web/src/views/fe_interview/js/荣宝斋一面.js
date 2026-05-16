// 荣宝斋一面
// ●  做一下自我介绍
// ● 先讲一下青岳科技青岳科技都做了什么  都参与了设计了什么
// ● 公共图表是怎么封装的
// ● 如何设置根字体
// ● 详细讲讲如何通过 JS 动态设置 html 的 font-size，以及postcss-pxtorem 自动转换
// ● mock数据怎么管理
// ● 数据滚动组价是如何滚动的  是自己封装的还是用的第三方的
// ● 是页面滚动还是组件滚动
// ● 滚动组件原生的实现原理
// ● 哪些使用了mock数据
// ● 现在都使用了哪些mock数据  没有使用mock数据那是怎么联调的
// ●  接口文档是单独写的吗   都做了哪些数据校验
// ● 校验框架是自带的还是第三方
// ● 大屏是如何做适配的
// ● 媒体查询是自己写的还是第三方框架提供的  是否使用Tailwind CSS来写
// ● uniapp有没有做跨端使用  小程序 安卓 苹果
// ● 使用web-view 是整体跳转吗  还是局部跳转
// ● uniapp使用什么打包的  npm 整体打包还是官方的打包
// ● 低代码开发是如何设计的
// ● 低代码是用前端view 做设计 你们的交付对象是什么
// ● 后端是如何储存的  低代码中间布局是如何设计的
// ● 封装路由栈是如何处理弹窗的栈的管理 弹出的栈怎么判断底层的位置是哪个
// ● 穿梭框组织树虚拟滚动式怎么设计
// ● 虚拟列表是通用的吗 穿梭框的告诉固定死的吗
// ● 为什么ag-grid 不是使用别的组件
// ● ai主要负责哪部分 是前端有自己的语料库 支持前端的这种LM的编排或者说自主决
// ● sse 是单纯的接受数据吗  还是服务端发送也是你们做的
// ● sse中断应该如何处理
// ● sse和webSocket 有什么区别
// ● npm 和pnpm 的package 有哪些设置
// ● dependencies、devDependencies 有什么区别
// ● 如何进行版本管理的  版本号 ^ 和 ~ 有什么区别
// ● 浮动版本是如何做的  如何保证所有人环境版本一致
// ● package有同名的依赖优先走自己的本地还是workspace
// ● vite和webpack  rullup是干嘛的是否用过
// ● babel 是否用过 有什么用
// ● ref和reactive 有什么区别
// ● 为什么ref是.value 而reactive 不是.value  为什么ref要包一层
// ● 计算属性的原理是什么为什么有缓存
// ● watch 和 watchEffect 有什么区别
// ● ts类型都用到哪些
// ● 常见的类型推导都用了哪些
// ● 如何在函数把一个非必须属性变成必须属性
// ● 如何在一个对象里面判断所有的数据类型
// ● 如果页面卡顿有哪些排查思路
// ● 页面加载很慢有哪些排查思路
// ● 能否降薪 有什么要提问我的吗


好的，我们来逐题拆解。我会完全按照你要求的维度，从这次“荣宝斋一面”的题目中，挑选出最能体现深度、也最容易拉开分差的几道核心题进行源码级、架构级的剖析。

很多问题（如自我介绍、项目介绍等）属于软技能或项目概括，我会在回答中融入架构视角，但不做10维度展开。我们将火力集中在技术深度题上。

---

### ** 核心追问一：为什么ref是.value 而reactive 不是.value ？为什么ref要包一层？**

  这道题问得相当好，直接从API设计打到了JavaScript语言特性和Vue响应式系统的底层实现。

## 1. 本质

本质是“** 利用对象属性的getter / setter实现基本类型值的响应式包装 **”。

## 2. 为什么这样设计

  - ** 解决了什么问题 **：`reactive` 基于 `Proxy`，而 `Proxy` 只能代理对象。在JavaScript中，像 `let count = 0` 这样的基本类型值，是按值传递的，不是引用。如果不用一个对象包一层，`Proxy` 就无法拦截对 `count` 的修改。
- ** 不这样做会怎样 **：你将失去对基本类型数据的响应式能力。Vue 2 中通过 `Object.defineProperty` 也无法劫持基本类型，那时我们只能把数据全包在 `data` 函数返回的一个大对象里。Vue 3 通过 `ref` 做到了更细粒度的独立管理。
- ** Trade - off **：增加了 `.value` 的心智负担。换来的是对基本类型值的响应式支持，并且可以独立于组件实例存在，逻辑组合更灵活，这是实现 Composable API 的基础。

## 3. 底层原理

我们直接看源码简版实现：

```javascript
// 简化版 ref 实现
class RefImpl {
  constructor(value) {
    this._value = convert(value); // 如果是对象，内部会用reactive处理
    this._rawValue = value;
    this.__v_isRef = true;
  }

  get value() {
    // 核心：在这里进行依赖收集
    track(this, 'value');
    return this._value;
  }

  set value(newVal) {
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = convert(newVal);
      // 核心：在这里进行派发更新
      trigger(this, 'value');
    }
  }
}

function ref(value) {
  return new RefImpl(value);
}
```

  - `ref` 创建了一个 `RefImpl` 实例，这个实例本身就是一个对象。
- 当我们访问`.value` 时，触发这个对象的 `value` 属性的 getter，在里面进行 `track`（依赖收集）。
- 当我们修改`.value` 时，触发 setter，在里面比较新旧值，有变化就调用 `trigger`（派发更新）。

## 4. 执行流程

1. ** 声明 **：`const count = ref(0)` -> 创建`RefImpl` 实例。
2. ** 模板编译 **：模板 `{{ count }}` 会被编译成 `count.value`。
3. ** 渲染访问 **：组件初次渲染，读取`count.value` -> 触发 getter -> 调用`track`，把当前组件的 `render effect` 作为依赖收集起来。
4. ** 修改更新 **：`count.value = 1` -> 触发 setter -> 新旧值对比，有变化 -> 调用`trigger` -> 找到之前收集的`render effect` -> 重新执行，组件更新。

## 5. 高级回答模板（口语化，面试现场）

“面试官您好，这个问题其实直击了JS语言特性和Vue响应式系统的核心矛盾。

我们知道，Vue3的响应式根基是`Proxy`，这玩意儿是纯对象层面的拦截，对基本类型的值比如数字、字符串，它无能为力。所以Vue团队就得想办法。

`ref`的本质，就是在基本类型外面包了一层对象，把它变成一个对象属性，让`Proxy`能工作了。`.value`，其实就是这个对象上的一个属性访问器。

您把它理解成一个箱子，`count`这个基本值被装进了箱子。我们操作`count.value`，就是在对这个箱子进行存取。Vue的依赖收集（track）和派发更新（trigger）逻辑，就恰好写在了这个箱子的`.value`的getter和setter里。

这么设计主要两个原因：第一，解决基本类型响应式的硬伤；第二，也是更关键的，它让响应式引用可以脱离`this`单独存在。我们写Composable组合函数，能像搭积木一样组合逻辑，`ref`是关键先生。缺点就是脚本里得多写`.value`，模板里Vue做了自动解包，这点体验还算不错。这是框架设计上一个很经典的为了底层能力做上层包装的权衡。”

---

### ** 核心追问二：计算属性的原理是什么？为什么有缓存？**

## 1. 本质

本质是“** 一个具有惰性求值和结果缓存的`effect` **”。

## 2. 为什么这样设计

  - ** 解决了什么问题 **：避免不必要的重复计算，同时只在依赖变化时更新，提升性能。
- ** 不这样做会怎样 **：我们可以用方法（methods）来达到同样目的，但每次访问都会重新执行，效率低。我们也可以用`watch`，但需要手动维护一个中间状态，代码会变得冗长且容易出错。
- ** Trade - off **：牺牲了即时的内存占用（需要空间存依赖和结果），换取了计算性能的大幅提升。

## 3. 底层原理

计算属性内部创建了一个叫 `ComputedRefImpl` 的类，它内部管理两个核心标志和一个副作用函数。

- ** `_dirty`（脏标志）**：布尔值，决定是否需要重新计算。`true`表示数据脏了，需要重新算；`false`表示数据干净，直接用缓存。
- ** `_value`（缓存值）**：存上一次的计算结果。
- ** `effect` **：计算属性的核心逻辑被包装成一个`effect`，并用`lazy: true`（惰性）和`scheduler`（调度器）来控制。

** 核心代码逻辑概览 **：

```javascript
class ComputedRefImpl {
  constructor(getter) {
    this._dirty = true; // 首次需要计算
    this._value = undefined;
    // 创建一个 effect，但配置了惰性和自定义调度器
    this.effect = new ReactiveEffect(getter, () => {
      // 自定义调度器：当依赖项变化，不会立即执行getter
      // 而是把_dirty标记为true，并触发computed自身的依赖更新
      if (!this._dirty) {
        this._dirty = true;
        trigger(this, 'value');
      }
    });
  }

  get value() {
    // 核心：通过 _dirty 标志进行缓存判断
    if (this._dirty) {
      this._value = this.effect.run(); // 重新执行getter，计算新值
      this._dirty = false; // 计算后关掉脏标志
    }
    track(this, 'value'); // 收集computed自身的依赖
    return this._value;
  }
}
```

## 4. 执行流程

1. ** 初始化 **：创建 `computed` 实例，`_dirty = true`。
2. ** 初次读取 **：模板或脚本访问 `comp.value`。
- 进入 getter，发现 `_dirty` 为 `true`。
- 执行`this.effect.run()`，这会运行用户定义的getter函数，比如计算 `a + b`。在执行过程中，`a` 和 `b` 的依赖会把这个 `computed` 内部的 `effect` 收集起来。
- 得到结果，存入 `_value`。
- 将`_dirty` 设为 `false`。
- 返回`_value`。
3. ** 依赖变化 **：当 `a` 的值发生变化。
- `a` 的 setter 通知到依赖，找到了 `computed` 内部的 `effect`。
    - 但这次 ** 不会立即执行getter **，而是执行我们配置的`scheduler`调度器。
- 调度器里只做一件事：把 `_dirty` 重新设为 `true`，然后通知（`trigger`）那些依赖了当前 `computed` 值的模板或其他 `effect`。
4. ** 再次读取 **：组件重新渲染，再次访问 `comp.value`。
- 进入 getter，发现 `_dirty` 再次为 `true`。
- 再次执行`this.effect.run()`，得到新的计算结果。
- 将`_dirty` 设为 `false`，返回新值。

## 5. 高频追问与陷阱

  - ** 追问 **：为什么不用`watchEffect`加一个`ref`来模拟？
- ** 回答 **：`watchEffect`每次数据源变化都会立即执行回调，你得在回调里自己设置一个状态值并手动触发更新，代码啰嗦且无法做到惰性求值。`computed`把“值变化时标记为脏”和“访问时惰性求值”这两件事优雅地封装了。
- ** 陷阱 **：说“计算属性就是有返回值的watch”，这个理解太浅，没抓到“惰性”和“缓存”的核心。

---

### ** 核心追问三：大屏是如何做适配的？**

  结合你的项目经验，这道题是实战金矿。别只回答 `rem` 或 `vw/vh`，要从架构层面谈。

## 1. 本质

本质是“** 建立多源异构屏幕空间与统一设计坐标系的非线性映射关系 **”。

## 2. 为什么这样设计

  - ** 解决问题 **：一套代码，在不同分辨率和宽高比的屏幕上，都能完美、充满地展示，不变形、不溢出。
- ** Trade - off **：
    - ** 纯vw / vh / 百分比 **：简单，但宽高比变化时图表会严重拉伸变形。
    - ** scale缩放（主流方案）**：保持设计稿的完美像素，不拉伸，像图片一样等比缩放。代价是可能有极少空白或轻微截断，且极端拉伸比下字体小得看不清。
    - ** rem方案 **：通过动态改变根字体大小，配合`postcss-pxtorem`实现“等比例缩放”。本质上也容易在宽高比变化时导致部分内容溢出或留白，更适合移动端H5，对大屏的多变分辨率驾驭能力稍弱于scale方案。
    - ** 综合方案（最佳实践）**：采用 ** scale缩放为主，vw / vh辅助布局 **。你的大屏肯定也采用了类似策略。

## 3. 底层原理与执行流程（以scale方案为例）

1. ** 设计基准 **：你拿到一份设计稿，例如 ** 1920 * 1080 ** 的标准16: 9大屏。
2. ** DOM结构约定 **：
```html
    <div class="screen-wrapper"> <!-- 全屏容器，负责溢出处理 -->
      <div class="screen-content" id="scale-target"> <!-- 需要缩放的内容 -->
        <!-- 所有大屏内容按1920*1080像素写死 -->
      </div>
    </div>
    ```
3. ** JS核心逻辑（`resize`事件驱动）**：
```javascript
    function handleScreenAutoScale() {
      const designWidth = 1920;
      const designHeight = 1080;
      const target = document.getElementById('scale-target');

      // 1. 获取当前窗口的真实尺寸
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // 2. 计算宽高的缩放比例。哪个方向的比值小，就按哪个方向来缩放。
      //    这样可以保证整个画面一定能被装下，不产生滚动条。
      const scaleX = currentWidth / designWidth;
      const scaleY = currentHeight / designHeight;
      const finalScale = Math.min(scaleX, scaleY);

      // 3. 应用变换。使用CSS3 `transform` 进行中心缩放。
      target.style.transform = `scale(${ finalScale })`;
      target.style.transformOrigin = 'left top'; // 左上角为基准点进行缩放

      // 4. 若画面宽度或高度小于容器，处理居中或背景
      const wrapper = document.querySelector('.screen-wrapper');
      wrapper.style.width = currentWidth + 'px';
      wrapper.style.height = currentHeight + 'px';
      // 使用flex布局将缩放后的#scale-target居中
    }
    ```

## 4. 项目中的真实使用

“在我们之前的大屏项目里，最开始团队直接用了`vw/vh`和百分比，结果换了个宽屏，饼图全被拉扁了。

所以我主导切换到 ** 等比缩放方案 **。我们定了`1920 * 1080`的基准，整个大屏开发就像做一张固定大小的图，完全用px写死。所有图表库（如ECharts）和你的AG - Grid，都直接给px配置，根本不用管屏幕。

核心是那个`resize`里的JS逻辑，用`Math.min`算比例，保证不管客户屏幕是带鱼屏还是方屏，我们的画面永远完整显示，只是上下或左右加点过渡背景色。

后面还踩了 ** 缩放后鼠标事件偏移 ** 的坑，比如ECharts的tooltip错位。这是因为`transform: scale`改变了元素的视觉位置，但没有改变它在文档流中的布局。解决办法是在ECharts初始化时，不直接给原生DOM，而是传入一个用`css`反向抵消了缩放的包裹元素，或者用更简单的方法，直接把DOM容器的宽高设置成超大的设计尺寸，让CSS transform从根上处理一切，事件交给图表库自己处理。最终方案很稳，十几个分辨率下完美交付。”

## 5. 高频追问

  - ** 追问1 **：你刚才提到`rem`和`postcss-pxtorem`，和scale方案比如何？
- ** 回答 **：`rem`方案核心是动态改`<html>`的`font-size`。比如1920设计稿，我们约定`1rem = 100px`，那根字体就是`100 / 1920 * 当前屏幕宽`。所有尺寸都用rem。这会导致宽高比变化时，宽可能刚好，高却按比例撑破或者留白了。适合移动端纵向下滑的布局，不适合大屏这种要求绝对一屏展示的场景。

- ** 追问2 **：`postcss-pxtorem` 是怎么工作的？
- ** 回答 **：它是一个PostCSS插件，在构建阶段把CSS中的px值，按照配置的`rootValue`（比如100）转换成rem。比如你写`width: 200px`，它编译后变成`width: 2rem`。我们只需维护px的原稿，转换交给工具，非常工程化。

---

### ** 核心追问四：SSE和WebSocket有什么区别？SSE中断如何处理？**

  结合你的AI项目流式输出经验。

## 1. 本质

  - ** SSE **：本质是“** HTTP长连接下的单向流式文本传输协议 **”。
- ** WebSocket **：本质是“** 基于TCP的全双工通信协议 **”。

## 2. 项目落地与架构思维（以你的AI流式输出为例）

“在我们做markdown流式输出时，选择SSE是必然的。AI生成内容就是典型的 ** 服务端单向推送，客户端只收不发 ** 的场景。

如果上WebSocket，完全是杀鸡用牛刀，徒增开发成本。你需要在HTTP握手后还要做WS握手，有二进制帧解析开销，前后端都要维护复杂的心跳和会话状态。SSE直接基于HTTP，`Content-Type: text/event-stream`，服务器一行行`data: ...`往下写就行，浏览器原生`EventSource` API直接收，能自动重连，完全够用。”

## 3. 中断处理

这是关键。AI生成里，用户点了“停止生成”，前端必须中断后端。

- ** 客户端主动中断 **：
    “标准`EventSource` API有个硬伤，它不能主动关闭连接，只能`close()`掉，会触发后端的`close`事件。但此时后端可能还在疯狂往流里写数据，直到写失败才知道。

所以我们没有直接用`EventSource`，而是用 ** Fetch API结合ReadableStream ** 来做。
1.  前端发起`fetch`请求，拿到`response.body`，这是个`ReadableStream`。
2.  我们用`const reader = response.body.getReader()`创建读取器。
3.  循环调用`reader.read()`来读取分块的Uint8Array数据，手动解码成文本，再逐行解析`data:`消息，推给前端的markdown渲染器。
4.  当用户点击‘停止’时，我们直接调用`reader.cancel()`。这会立即在HTTP / 2连接的`stream`层面发送一个`RST_STREAM`帧给服务器，干净利落地告诉后端‘别发了’。后端捕获到这个异常，就能立刻停止模型推理，释放GPU资源。这比直接关`EventSource`优雅得多，资源回收更快。”

## 4. 与WebSocket核心区别（表格化思维）

| 维度 | SSE | WebSocket |
| : --- | : --- | : --- |
| ** 通信方向 ** | ** 单向 **：服务器 -> 客户端 | ** 全双工 **：双向通信 |
| ** 底层协议 ** | HTTP / 1.1 或 HTTP / 2 | 独立的WS协议，需HTTP升级 |
| ** 数据格式 ** | 纯文本，默认`text/event-stream` | 文本或二进制帧 |
| ** 实现复杂度 ** | 极低，浏览器原生`EventSource`支持 | 较高，需第三方库或自行处理帧 |
| ** 自动重连 ** | 内置支持 | 需手动实现 |
| ** 适用场景 ** | 股票行情推送、新闻流、AI流式生成、任务进度条 | 在线聊天、多人协作、实时游戏 |

## 5. 高频追问

  - ** 追问 **：你刚才说用Fetch API + Reader，能具体说说数据解码和缓冲区的处理吗？如果收到半个UTF - 8字符怎么办？
- ** 回答 **（展示细节深度）：“问得好。`reader.read()`出来的是个`Uint8Array`，我们用一个`TextDecoder`实例来处理流式解码，它有个`stream: true`的配置，专门处理跨块字符。它会自动把不完整的字节先存起来，等下次数据来了再拼起来解码。这确保了哪怕一个中文字符的3个字节被切在了两个`chunk`里，也不会出现乱码。”

---

### ** 剩余题目面试官视角评分与要点提示 **

- ** 封装路由栈管理弹窗 **：** P8级核心题 **。本质是 ** 在单页应用的路由栈之上，建立一套独立、可嵌套的模态层事务栈 **。要答出和路由的“平级”关系，通过`Promise`包裹弹窗组件实现`await dialog()`式的调用，以及如何通过z - index或路由别名判断“底层位置”。
- ** 穿梭框组件虚拟滚动 **：** 实战 + 源码题 **。回答既要讲通用虚拟列表的`startIndex/endIndex`计算和滚动偏移，更要讲 ** 在穿梭框这一左一右、数据频繁移动的场景下，如何做数据变更后的滚动位置保持和状态同步 **，这个难点才是区分度。
- ** 低代码平台设计 **：** 架构题 **。不要讲你怎么用组件，要讲 ** Schema设计 **（如页面Schema包含组件Schema数组）、** 渲染器 **（如何将JSON Schema递归渲染成Vue组件）、** 物料中心 ** 和 ** 后端存储方案 **（如存JSON字符串，或拆成页面、版本、区块等多张表）。
- ** TypeScript类型工具 **：** 基础但必须精通 **。把非必填变必填是`Required<T>`，内部原理是 `-?` 映射修饰符。判断对象数据类型通常用 ** 可辨识联合类型 ** 配合`switch`或 `if/else` 做类型收窄。
- ** 页面卡顿与加载慢排查 **：** 性能优化全景题 **。回答必须有条理。卡顿看 ** CPU **（Performance面板找Long Task、RAIL模型）、** 内存 **（Memory面板查堆快照、泄漏）。加载慢看 ** 网络 **（Network瀑布图）、** 资源 **（webpack - bundle - analyzer）、** 首屏 **（FCP / LCP，SSR / SSG优化）。结合你的AG - Grid，必须提到 ** 按需渲染 ** 和 ** 数据聚合 **。
- ** npm / pnpm / 版本管理 **：** 工程化 **。`.npmrc`锁定registry。`dependencies` vs `devDependencies`。版本号`^`允许兼容小版本，`~`只允许补丁版本。保证环境一致靠`package-lock.json` / `pnpm-lock.yaml`。Workspace同名包优先找本地的，这是pnpm monorepo的优势。这些基础但必问，答错直接减大分。

最后“能否降薪”等是HR面或压力测试，不必过度技术化解读，展现诚意和期望即可。关于我的提问，建议你准备两个有质量的问题反问面试官，例如：“我注意到咱们用了低代码和AI，请问目前这两个方向的技术闭环程度和瓶颈分别在哪里？” 这既能展示你的思考，又能探知团队水平。