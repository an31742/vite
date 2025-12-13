<template>
  <el-container>
    <el-aside width="250px">
      <div class="sidebar-header">
        <h3>前端面经集合</h3>
        <p>JavaScript 版本</p>
      </div>
      <div class="js-files-list">
        <div v-for="file in jsFiles" :key="file.name" class="file-item">
          <div class="file-header" @click="toggleFile(file.name)">
            <span class="file-icon">📄</span>
            <span class="file-name">{{ file.name }}</span>
            <span class="toggle-icon">{{ file.expanded ? "▼" : "▶" }}</span>
          </div>
          <div v-if="file.expanded" class="file-content">
            <div class="file-actions">
              <el-button size="small" @click="viewCode(file.name)">
                查看代码
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
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

<script>
import { defineComponent, ref, reactive } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    const currentOutput = ref("");
    const currentFile = ref("");
    const jsFiles = ref([]);
    const loadFileList = async () => {
      const modules = import.meta.glob("./js/*.js", { as: "raw" });
      const fileList = Object.keys(modules).map((path) => {
        const fileName = path.replace("./js/", "");
        return {
          name: fileName,
          expanded: false,
        };
      });
      jsFiles.value = fileList.sort((a, b) => a.name.localeCompare(b.name));
    };
    loadFileList();
    const toggleFile = (fileName) => {
      const file = jsFiles.value.find((f) => f.name === fileName);
      if (file) {
        file.expanded = !file.expanded;
      }
    };

    const viewCode = async (fileName) => {
      try {
        currentFile.value = fileName;
        currentOutput.value = "正在加载代码...";

        // 使用 import.meta.glob 批量导入

        const modules = import.meta.glob("./js/*.js", { as: "raw" });
        console.log("🚀 ~ viewCode ~ modules:", modules.name);
        const moduleKey = `./js/${fileName}`;

        if (modules[moduleKey]) {
          const codeContent = await modules[moduleKey]();
          currentOutput.value = codeContent;
          console.log("🚀 ~ viewCode ~ codeContent:", codeContent);
          ElMessage.success("代码已加载");
        } else {
          currentOutput.value = "// 文件未找到";
          ElMessage.error("文件未找到");
        }
      } catch (error) {
        currentOutput.value = `加载失败: ${error.message}`;
        ElMessage.error("加载失败");
      }
    };

    return {
      currentOutput,
      currentFile,
      toggleFile,
      viewCode,
      jsFiles
    };
  },
});
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
  margin: 0;
  color: #909399;
  font-size: 12px;
}

.js-files-list {
  padding: 0 10px;
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
