<template>
  <el-container>
    <ElAside width="300px">
      <div class="sidebar-header">
        <h3>前端面经集合</h3>
        <p>JavaScript & Markdown</p>
        <div v-if="isIndexing" class="indexing-status">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>正在建立全文索引...</span>
        </div>
        <el-input
          v-model="searchQuery"
          placeholder="搜索面经内容或标题..."
          prefix-icon="Search"
          clearable
          class="search-input"
        />
      </div>
      <div class="file-list-container">
        <el-tabs v-model="activeTab" class="file-tabs">
          <el-tab-pane label="JS 面经" name="js">
            <div class="js-files-list">
              <div
                v-for="file in filteredJsFiles"
                :key="file.name"
                class="file-item"
              >
                <div class="file-header" @click="toggleFile(file)">
                  <span class="file-icon">📜</span>
                  <span class="file-name">{{ file.name }}</span>
                  <span class="toggle-icon">{{
                    file.expanded ? "▼" : "▶"
                  }}</span>
                </div>
                <div v-if="file.expanded" class="file-content">
                  <div class="file-actions">
                    <el-button
                      size="small"
                      type="primary"
                      @click="viewCode(file.name, 'js')"
                    >
                      查看代码
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="MD 面经" name="md">
            <div class="md-files-list">
              <div
                v-for="file in filteredMdFiles"
                :key="file.name"
                class="file-item"
              >
                <div class="file-header" @click="toggleFile(file)">
                  <span class="file-icon">📝</span>
                  <span class="file-name">{{ file.name }}</span>
                  <span class="toggle-icon">{{
                    file.expanded ? "▼" : "▶"
                  }}</span>
                </div>
                <div v-if="file.expanded" class="file-content">
                  <div class="file-actions">
                    <el-button
                      size="small"
                      type="success"
                      @click="viewCode(file.name, 'md')"
                    >
                      查看文档
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </ElAside>
    <el-main>
      <div class="main-header">
        <router-link to="/home" style="float: right">返回首页</router-link>
        <h2>前端面经学习</h2>
      </div>
      <div v-if="currentOutput" class="output-container">
        <div class="output-section">
          <h3>{{ currentFile }} 运行结果：</h3>
          <pre class="output-content">{{ currentOutput }}</pre>
        </div>
      </div>
      <div v-else class="welcome-section">
        <div class="welcome-icon">📚</div>
        <h3>选择一个 JS 文件查看代码</h3>
        <p>点击左侧文件列表中的"查看代码"按钮来显示代码内容</p>
        <div class="welcome-tips">
          <div class="tip-item">
            <span class="tip-icon">💡</span>
            <span>包含前端面试常见知识点</span>
          </div>
          <div class="tip-item">
            <span class="tip-icon">🚀</span>
            <span>可直接运行的 JavaScript 代码</span>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { Search, Loading } from "@element-plus/icons-vue";

const currentOutput = ref("");
const currentFile = ref("");
const jsFiles = ref<any[]>([]);
const mdFiles = ref<any[]>([]);
const searchQuery = ref("");
const activeTab = ref("js");
const isIndexing = ref(false);
const fileIndex = reactive<Record<string, string>>({});

const loadFileList = async () => {
  const jsFileList = [
    "开源中国一面.js",
    "开源中国二面.js",
    "手写面试题.js",
    "滴滴一面.js",
    "牛客网哈罗一面.js",
    "牛客网美团一面.js",
    "牛客网美团一面2.js",
    "百图生科.js",
    "联想一面.js",
    "联想消费者团队一面.js",
    "联想消费者团队二面.js",
    "车晓科技一面.js",
    "铁科院.js",
    "字节面试题.js",
  ].map((fileName) => ({
    name: fileName,
    expanded: false,
    type: "js",
  }));

  const mdFileList = [
    "京东一面.md",
    "开源中国一面.md",
    "开源中国二面.md",
    "手写面试题.md",
    "滴滴一面.md",
    "牛客网哈罗一面.md",
    "牛客网美团一面.md",
    "牛客网美团一面2.md",
    "百图生科.md",
    "联想一面.md",
    "联想消费者团队一面.md",
    "联想消费者团队二面.md",
    "荣宝斋一面.md",
    "车晓科技一面.md",
    "铁科院.md",
    "字节面试题.md",
  ].map((fileName) => ({
    name: fileName,
    expanded: false,
    type: "md",
  }));

  jsFiles.value = jsFileList.sort((a, b) => a.name.localeCompare(b.name));
  mdFiles.value = mdFileList.sort((a, b) => a.name.localeCompare(b.name));

  // 异步建立索引
  startIndexing();
};

const startIndexing = async () => {
  isIndexing.value = true;
  try {
    const indexTasks = mdFiles.value.map(async (file) => {
      try {
        const response = await fetch(`/src/views/fe_interview/md/${file.name}`);
        if (response.ok) {
          const content = await response.text();
          fileIndex[`md_${file.name}`] = content.toLowerCase();
        }
      } catch (e) {
        console.warn(`索引文件 ${file.name} 失败:`, e);
      }
    });

    const jsTasks = jsFiles.value.map(async (file) => {
      try {
        const response = await fetch(`/src/views/fe_interview/js/${file.name}`);
        if (response.ok) {
          const content = await response.text();
          fileIndex[`js_${file.name}`] = content.toLowerCase();
        }
      } catch (e) {
        console.warn(`索引文件 ${file.name} 失败:`, e);
      }
    });

    await Promise.all([...indexTasks, ...jsTasks]);
  } finally {
    isIndexing.value = false;
  }
};

loadFileList();

const filteredJsFiles = computed(() => {
  if (!searchQuery.value) return jsFiles.value;
  const query = searchQuery.value.toLowerCase();
  return jsFiles.value.filter((file) => {
    const nameMatch = file.name.toLowerCase().includes(query);
    const contentMatch = fileIndex[`js_${file.name}`]?.includes(query);
    return nameMatch || contentMatch;
  });
});

const filteredMdFiles = computed(() => {
  if (!searchQuery.value) return mdFiles.value;
  const query = searchQuery.value.toLowerCase();
  return mdFiles.value.filter((file) => {
    const nameMatch = file.name.toLowerCase().includes(query);
    const contentMatch = fileIndex[`md_${file.name}`]?.includes(query);
    return nameMatch || contentMatch;
  });
});

const toggleFile = (file: any) => {
  file.expanded = !file.expanded;
};

const viewCode = async (fileName: string, type: string) => {
  try {
    currentFile.value = fileName;
    currentOutput.value = "正在加载内容...";

    const basePath =
      type === "js"
        ? "/src/views/fe_interview/js"
        : "/src/views/fe_interview/md";
    const response = await fetch(`${basePath}/${fileName}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    currentOutput.value = content;
    //@ts-ignore
    ElMessage.success("内容已加载");
  } catch (error: any) {
    console.error("加载失败:", error);
    currentOutput.value = `加载失败: ${error.message}`;
    //@ts-ignore
    ElMessage.error("加载失败");
  }
};
</script>

<style scoped>
.el-aside {
  background-color: #f5f7fa;
  color: #333;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #e4e7ed;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 20px;
}

.sidebar-header h3 {
  margin: 0 0 5px 0;
  color: #409eff;
}

.sidebar-header p {
  margin: 0 0 15px 0;
  color: #909399;
  font-size: 12px;
}

.search-input {
  margin-bottom: 10px;
}

.indexing-status {
  font-size: 12px;
  color: #409eff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.file-list-container {
  height: calc(100vh - 160px);
  overflow-y: auto;
}

.file-tabs :deep(.el-tabs__nav-scroll) {
  padding: 0 15px;
}

.js-files-list,
.md-files-list {
  padding: 10px;
}

.file-item {
  margin-bottom: 10px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  overflow: hidden;
}

.file-header {
  padding: 12px;
  background-color: #fafafa;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.file-header:hover {
  background-color: #f0f9ff;
}

.file-icon {
  margin-right: 8px;
  font-size: 16px;
}

.file-name {
  flex: 1;
  font-weight: 500;
  color: #303133;
}

.toggle-icon {
  color: #909399;
  font-size: 12px;
}

.file-content {
  padding: 15px;
  background-color: #ffffff;
  border-top: 1px solid #e4e7ed;
}

.file-description {
  margin: 0 0 15px 0;
  color: #606266;
  font-size: 13px;
  line-height: 1.4;
}

.file-actions {
  display: flex;
  gap: 8px;
}

.batch-actions {
  padding: 20px;
  border-top: 1px solid #e4e7ed;
  margin-top: 20px;
}

.main-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.main-header h2 {
  margin: 0;
  color: #303133;
}

.output-container {
  height: calc(100vh - 120px);
  overflow-y: auto;
}

.output-section {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 20px;
}

.output-section h3 {
  margin: 0 0 15px 0;
  color: #409eff;
}

.output-content {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 6px;
  font-family: "Consolas", "Monaco", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.welcome-section {
  text-align: center;
  padding: 40px 20px;
}

.welcome-section h3 {
  color: #303133;
  margin-bottom: 10px;
}

.welcome-section > p {
  color: #606266;
  margin-bottom: 40px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.feature-item {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: left;
}

.feature-item h4 {
  margin: 0 0 10px 0;
  color: #409eff;
  font-size: 16px;
}

.feature-item p {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.4;
}

/* 滚动条样式 */
.el-aside::-webkit-scrollbar,
.output-container::-webkit-scrollbar {
  width: 6px;
}

.el-aside::-webkit-scrollbar-track,
.output-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.el-aside::-webkit-scrollbar-thumb,
.output-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.el-aside::-webkit-scrollbar-thumb:hover,
.output-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  color: #64748b;
}

.welcome-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.8;
}

.welcome-section h3 {
  color: #334155;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
}

.welcome-section p {
  color: #64748b;
  font-size: 16px;
  margin-bottom: 32px;
}

.welcome-tips {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.tip-icon {
  font-size: 20px;
}
</style>
