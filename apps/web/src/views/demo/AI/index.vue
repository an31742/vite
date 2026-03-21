<template>
  <div class="ai-chat">
    <div ref="chatContainer" class="chat-container">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message"
        :class="message.role"
      >
        <div class="message-content">
          <div
            v-if="message.role === 'assistant'"
            v-html="formatMessage(message.content)"
          ></div>
          <div v-else>{{ message.content }}</div>
        </div>
      </div>
      <div v-if="showLoading" class="loading">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>

    <div class="input-area">
      <el-input
        v-model="inputText"
        placeholder="输入你的问题..."
        @keyup.enter="sendMessage"
        :disabled="isStreaming"
      />
      <ElButton :loading="isStreaming" type="primary" @click="sendMessage"
        >发送</ElButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const messages = ref<Message[]>([]);
const inputText = ref("");
const isStreaming = ref(false);
const showLoading = ref(false);
const chatContainer = ref<HTMLElement>();
let sessionChunk = ""; // 缓冲区
let loadingTimer: any = null;

// 防抖显示 loading
const showLoadingWithDebounce = () => {
  if (loadingTimer) clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => {
    showLoading.value = true;
  }, 200);
};

const hideLoading = () => {
  if (loadingTimer) {
    clearTimeout(loadingTimer);
    loadingTimer = null;
  }
  showLoading.value = false;
};

// 链接识别和转换
const formatMessage = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(
    urlRegex,
    '<a href="$1" target="_blank" class="link">$1</a>',
  );
};

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

// 发送消息
const sendMessage = async () => {
  if (!inputText.value.trim() || isStreaming.value) return;
  //创建消息
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: inputText.value,
  };
  //添加展示消息
  messages.value.push(userMessage);
  //获取提问的内容
  const question = inputText.value;
  inputText.value = "";
  //在获取消息的时候禁用
  isStreaming.value = true;
  showLoadingWithDebounce();
  scrollToBottom();

  // 创建助手消息
  const assistantMessage: Message = {
    id: (Date.now() + 1).toString(),
    role: "assistant",
    content: "",
  };

  try {
    // 模拟 SSE 流式请求
    await streamResponse(question, assistantMessage);
  } catch (error) {
    console.error("Stream error:", error);
    assistantMessage.content = "抱歉，发生了错误，请稍后重试。";
  } finally {
    isStreaming.value = false;
    hideLoading();
    sessionChunk = "";
  }
};

// SSE 流式响应处理
const streamResponse = async (question: any, assistantMessage: any) => {
  // 模拟 SSE 流式请求

  //通过fetch 请求
  const response = await fetch("http://localhost:9527/api/ai/chat/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question }),
  });
  //获取到response.body?.getReader()
  const reader: any = response.body?.getReader();
  //通过new TextDecoder() 获取到解析二进制格式
  const decoder = new TextDecoder();

  hideLoading();

  messages.value.push(assistantMessage);
  //使用while循环获取数据
  while (true) {
    //使用reader read()读取流
    const { done, value } = await reader.read();
    if (done) break;
    //通过new TextDecoder() 获取到解析二进制格式
    const decoder = new TextDecoder();
    const chunk = decoder.decode(value);
    //通过split处理返回的流式块
    const lines = chunk.split("\n");
    console.log("🚀 ~ streamResponse ~ lines:", lines);

    for (const line of lines) {
      console.log("🚀 ~ streamResponse ~ line:", line);
      console.log(
        "🚀 ~ streamResponse ~ ine.startsWith('data: '):",
        line.startsWith("data: "),
      );
      if (line.startsWith("data: ")) {
        try {
          //通过json parse 处理数据转化为json对象
          const data = JSON.parse(line.slice(6)); //Q去掉data前缀
          console.log("🚀 ~ streamResponse ~ data:", data);

          // 处理错误消息
          if (data.error) {
            assistantMessage.content = `错误: ${data.error}`;
            return;
          }

          if (data.content) {
            assistantMessage.content += data.content;
            scrollToBottom();
          }

          if (data.done) return;
        } catch (e) {
          console.log("解析错误:", e, line);
        }
      }
    }
  }
};

onMounted(() => {
  // 初始欢迎消息
  messages.value.push({
    id: "0",
    role: "assistant",
    content: "你好！我是AI助手，有什么可以帮助你的吗？",
  });
});
</script>

<style scoped>
.ai-chat {
  display: flex;
  flex-direction: column;
  height: 600px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #fff;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  word-wrap: break-word;
  line-height: 1.5;
}

.message.user .message-content {
  background: #409eff;
  color: white;
}

.message.assistant .message-content {
  background: #f5f7fa;
  color: #303133;
}

.loading {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  align-self: flex-start;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #909399;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}
.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.input-area {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #e4e7ed;
}

.input-area .el-input {
  flex: 1;
}

:deep(.link) {
  color: #409eff;
  text-decoration: none;
}

:deep(.link:hover) {
  text-decoration: underline;
}

.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
</style>
