// 百图生科一面 JavaScript 面试题

// ============================================
// 面试官标准答案
// ============================================

/**
 * 1. 异步运行机制
 * 答案：JavaScript是单线程的，通过事件循环处理异步任务。
 * 执行顺序：同步代码 → 微任务(Promise.then) → 宏任务(setTimeout)
 *
 * 2. AI对话技术
 * 答案：使用Fetch发送请求，SSE(Server-Sent Events)接收流式响应。
 * Fetch负责发送，SSE负责实时接收服务器推送的数据流。
 *
 * 3. 会话中断表现
 * 答案：网络断开、服务器超时、连接异常关闭、用户关闭页面。
 * 处理方式：监听网络状态、心跳检测、自动重连、指数退避策略。
 *
 * 4. npm vs pnpm区别
 * 答案：npm扁平化存储，可能有幽灵依赖；pnpm使用硬链接，节省空间，严格依赖管理。
 * pnpm安装更快，占用空间更少，但可能存在兼容性问题。
 *
 * 5. 发布订阅模式
 * 答案：维护事件-回调映射表，subscribe添加回调，publish触发所有回调。
 * 核心是解耦，发布者和订阅者不直接通信。
 *
 * 6. 防抖函数
 * 答案：延迟执行，重复触发会重置计时器。
 * 应用场景：搜索输入、按钮点击、窗口resize等。
 */

// 百图生科一面 JavaScript 面试题

// ============================================
// 1. 异步运行机制
// ============================================

/**
 * JavaScript 异步运行机制详解
 * Event Loop、宏任务、微任务的执行顺序
 */

console.log("=== 异步运行机制演示 ===");
console.log("同步代码1");

setTimeout(() => console.log("宏任务: setTimeout"), 0);

Promise.resolve()
  .then(() => {
    console.log("微任务: Promise.then");
    return Promise.resolve();
  })
  .then(() => {
    console.log("微任务: 链式Promise");
  });

console.log("同步代码2");

// 执行顺序：同步代码1 → 同步代码2 → 微任务: Promise.then → 微任务: 链式Promise → 宏任务: setTimeout

// ============================================
// 2. AI对话技术：Fetch + SSE
// ============================================

/**
 * Server-Sent Events 实现AI流式对话
 * 用于实时接收服务器推送的数据流
 */
class AIStreamChat {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.eventSource = null;
  }

  // 建立SSE连接
  connect(onMessage, onError, onClose) {
    this.eventSource = new EventSource(this.endpoint);

    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    this.eventSource.onerror = (error) => {
      console.error("SSE连接错误:", error);
      onError(error);
    };

    this.eventSource.onopen = () => {
      console.log("SSE连接已建立");
    };
  }

  // 发送消息（通过Fetch）
  async sendMessage(message) {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("发送消息失败:", error);
      throw error;
    }
  }

  // 关闭连接
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

// ============================================
// 3. 会话中断处理机制
// ============================================

/**
 * 会话中断的表现：
 * - 网络连接断开
 * - 服务器响应超时
 * - WebSocket/SSE连接异常关闭
 * - 用户主动关闭页面
 */
class SessionManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.reconnectTimer = null;
    this.heartbeatTimer = null;
    this.maxReconnectAttempts = 5;
    this.currentAttempts = 0;
  }

  // 监听网络状态
  initNetworkListeners() {
    window.addEventListener("online", () => {
      this.isOnline = true;
      console.log("网络已恢复");
      this.handleReconnect();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      console.log("网络连接中断");
      this.handleDisconnect();
    });

    // 页面可见性变化
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        console.log("页面隐藏，暂停会话");
      } else {
        console.log("页面显示，恢复会话");
        this.checkConnection();
      }
    });
  }

  // 处理断开连接
  handleDisconnect() {
    clearInterval(this.heartbeatTimer);
    this.showDisconnectMessage();
  }

  // 处理重连
  handleReconnect() {
    if (this.currentAttempts < this.maxReconnectAttempts) {
      this.currentAttempts++;
      console.log(
        `尝试重连 ${this.currentAttempts}/${this.maxReconnectAttempts}`,
      );

      this.reconnectTimer = setTimeout(
        () => {
          this.attemptReconnect();
        },
        Math.pow(2, this.currentAttempts) * 1000,
      ); // 指数退避
    } else {
      console.log("重连失败，请刷新页面");
    }
  }

  // 尝试重连
  async attemptReconnect() {
    try {
      const response = await fetch("/api/health", { method: "GET" });
      if (response.ok) {
        this.currentAttempts = 0;
        console.log("重连成功");
        this.startHeartbeat();
      } else {
        this.handleReconnect();
      }
    } catch (error) {
      this.handleReconnect();
    }
  }

  // 心跳检测
  startHeartbeat() {
    this.heartbeatTimer = setInterval(async () => {
      try {
        await fetch("/api/ping", { method: "GET" });
      } catch (error) {
        console.log("心跳检测失败，连接可能中断");
        this.handleDisconnect();
      }
    }, 30000);
  }

  showDisconnectMessage() {
    // 显示断线提示
    console.log("连接已断开，正在尝试重连...");
  }

  checkConnection() {
    if (!this.isOnline) {
      this.handleReconnect();
    }
  }
}

// ============================================
// 4. npm vs pnpm 区别对比
// ============================================

/**
 * npm vs pnpm 详细对比
 *
 * 1. 依赖管理方式：
 *    npm: 扁平化 node_modules，可能存在依赖提升问题
 *    pnpm: 使用符号链接，严格的依赖隔离
 *
 * 2. 存储机制：
 *    npm: 每个项目独立存储依赖
 *    pnpm: 全局存储 + 硬链接，避免重复
 *
 * 3. 安装速度：
 *    npm: 相对较慢，需要重复下载
 *    pnpm: 更快，复用已下载的包
 *
 * 4. 磁盘空间：
 *    npm: 占用空间大，重复存储
 *    pnpm: 节省空间，通常节省50-90%
 *
 * 5. 幽灵依赖：
 *    npm: 可能访问未声明的依赖
 *    pnpm: 严格控制，避免幽灵依赖
 *
 * 6. 兼容性：
 *    npm: 兼容性最好
 *    pnpm: 可能存在某些包的兼容性问题
 */

const packageManagerComparison = {
  npm: {
    pros: ["兼容性最好", "生态成熟", "官方支持"],
    cons: ["安装慢", "占用空间大", "可能有幽灵依赖"],
  },
  pnpm: {
    pros: ["安装快", "节省空间", "严格依赖管理", "支持monorepo"],
    cons: ["某些包可能不兼容", "学习成本"],
  },
};

// ============================================
// 5. 手写发布订阅模式
// ============================================

class PubSub {
  constructor() {
    this.subscribers = {};
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);

    // 返回取消订阅函数
    return () => {
      this.unsubscribe(event, callback);
    };
  }

  // 发布事件
  publish(event, data) {
    if (!this.subscribers[event]) {
      return;
    }

    this.subscribers[event].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error("订阅者回调执行错误:", error);
      }
    });
  }

  // 取消订阅
  unsubscribe(event, callback) {
    if (!this.subscribers[event]) {
      return;
    }

    this.subscribers[event] = this.subscribers[event].filter(
      (subscriber) => subscriber !== callback,
    );
  }

  // 一次性订阅
  once(event, callback) {
    const onceCallback = (data) => {
      callback(data);
      this.unsubscribe(event, onceCallback);
    };

    this.subscribe(event, onceCallback);
  }

  // 清空所有订阅
  clear(event) {
    if (event) {
      delete this.subscribers[event];
    } else {
      this.subscribers = {};
    }
  }

  // 获取订阅者数量
  getSubscriberCount(event) {
    return this.subscribers[event] ? this.subscribers[event].length : 0;
  }
}

// ============================================
// 6. 手写防抖函数
// ============================================

/**
 * 防抖函数：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 * @param {Function} func 需要防抖的函数
 * @param {number} delay 延迟时间(毫秒)
 * @param {boolean} immediate 是否立即执行第一次
 * @returns {Function} 防抖后的函数
 */
function debounce(func, delay, immediate = false) {
  let timeoutId = null;
  let result;

  const debounced = function (...args) {
    const context = this;

    // 清除之前的定时器
    clearTimeout(timeoutId);

    if (immediate) {
      // 立即执行模式
      const callNow = !timeoutId;

      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);

      if (callNow) {
        result = func.apply(context, args);
      }
    } else {
      // 延迟执行模式
      timeoutId = setTimeout(() => {
        result = func.apply(context, args);
      }, delay);
    }

    return result;
  };

  // 取消防抖
  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  // 立即执行
  debounced.flush = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      result = func.apply(this, arguments);
    }
    return result;
  };

  return debounced;
}

// ============================================
// 使用示例和测试
// ============================================

console.log("=== 发布订阅模式测试 ===");
const pubsub = new PubSub();

// 订阅事件
const unsubscribe = pubsub.subscribe("userLogin", (user) => {
  console.log("用户登录:", user.name);
});

pubsub.subscribe("userLogin", (user) => {
  console.log("记录登录日志:", user.id);
});

// 发布事件
pubsub.publish("userLogin", { id: 1, name: "张三" });

// 一次性订阅
pubsub.once("userLogout", (user) => {
  console.log("用户登出:", user.name);
});

pubsub.publish("userLogout", { name: "张三" });
pubsub.publish("userLogout", { name: "李四" }); // 不会触发

console.log("=== 防抖函数测试 ===");
const searchHandler = debounce((query) => {
  console.log("执行搜索:", query);
}, 300);

// 模拟快速输入
searchHandler("a");
searchHandler("ab");
searchHandler("abc"); // 只有这次会执行

// 立即执行模式
const immediateHandler = debounce(
  (msg) => {
    console.log("立即执行:", msg);
  },
  300,
  true,
);

immediateHandler("第一次"); // 立即执行
immediateHandler("第二次"); // 不执行

export { AIStreamChat, SessionManager, PubSub, debounce };
