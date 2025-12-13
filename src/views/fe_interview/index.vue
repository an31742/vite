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
            <p class="file-description">{{ file.description }}</p>
            <div class="file-actions">
              <el-button
                size="small"
                type="primary"
                @click="runJSFile(file.name)"
              >
                运行代码
              </el-button>
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
      <div class="output-container">
        <div class="output-section">
          <h3>{{ currentFile }} 运行结果：</h3>
          <pre class="output-content">{{ currentOutput }}</pre>
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

    const jsFiles = reactive([
      {
        name: "01.js",
        description: "CSS样式导入、布局、递归算法",
        expanded: false,
      },
      {
        name: "02.js",
        description: "HTML元素、CSS3特性、字符串处理",
        expanded: false,
      },
      {
        name: "03.js",
        description: "HTML全局属性、元素隐藏、字符串操作",
        expanded: false,
      },
      {
        name: "04.js",
        description: "HTML5离线存储、CSS选择器、命名转换",
        expanded: false,
      },
      {
        name: "05.js",
        description: "超链接target属性、CSS3伪类、字符串大小写切换",
        expanded: false,
      },
      {
        name: "06.js",
        description: "label标签、CSS三角形、去除制表符和换行符",
        expanded: false,
      },
      {
        name: "07.js",
        description: "iframe框架、BFC规范、字符串统计",
        expanded: false,
      },
      {
        name: "08.js",
        description: "HTML5离线存储、清除浮动、字符串加密",
        expanded: false,
      },
      {
        name: "09.js",
        description: "多标签页通信、优雅降级和渐进增强、数据类型判断",
        expanded: false,
      },
      {
        name: "010.js",
        description: "viewport设置、px/em/rem对比、回调函数",
        expanded: false,
      },
    ]);

    const toggleFile = (fileName) => {
      const file = jsFiles.find((f) => f.name === fileName);
      if (file) {
        file.expanded = !file.expanded;
      }
    };

    const runJSFile = async (fileName) => {
      try {
        currentFile.value = fileName;
        currentOutput.value = "正在加载...";

        // 直接显示运行说明和代码内容
        const fileInfo = getFileInfo(fileName);
        const runInstructions = `▶️ 运行 ${fileName}

📝 文件说明：
${fileInfo.description}

💻 运行方法：

1. 终端运行：
   node src/views/fe_interview/js/${fileName}

2. VS Code Code Runner：
   - 打开文件 src/views/fe_interview/js/${fileName}
   - 按 Ctrl+Alt+N 或点击右上角播放按钮

3. 浏览器控制台（部分代码）：
   - 按 F12 打开开发者工具
   - 在 Console 中粘贴代码运行

🔍 主要学习内容：
${fileInfo.topics.map((topic) => `• ${topic}`).join("\n")}

🎯 难度级别：${fileInfo.difficulty}

点击“查看代码”按钮可以查看完整的源代码。`;

        currentOutput.value = runInstructions;
        ElMessage.success(`${fileName} 说明已加载`);
      } catch (error) {
        currentOutput.value = `加载 ${fileName} 时出错: ${error.message}`;
        ElMessage.error("加载失败");
      }
    };

    const viewCode = async (fileName) => {
      try {
        currentFile.value = fileName;
        currentOutput.value = "正在加载代码...";

        // 使用 import.meta.glob 批量导入

        const modules = import.meta.glob("./js/*.js", { as: "raw" });
        const moduleKey = `./js/${fileName}`;

        if (modules[moduleKey]) {
          const codeContent = await modules[moduleKey]();
          currentOutput.value = codeContent;
          console.log("🚀 ~ viewCode ~ codeContent:", codeContent)
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

    // 获取文件信息
    const getFileInfo = (fileName) => {
      const fileMap = {
        "01.js": {
          description: "CSS样式导入、布局、递归算法",
          topics: [
            "link和@import的区别",
            "圣杯布局和双飞翼布局",
            "递归算法实现",
            "随机数生成",
          ],
          difficulty: "初级",
        },
        "02.js": {
          description: "HTML元素、CSS3特性、字符串处理",
          topics: [
            "HTML元素分类",
            "CSS3新增特性",
            "字符串空格处理",
            "split和join方法",
          ],
          difficulty: "初级",
        },
        "03.js": {
          description: "HTML全局属性、元素隐藏、字符串操作",
          topics: [
            "HTML全局属性",
            "元素隐藏方法",
            "字符串操作",
            "substring方法",
          ],
          difficulty: "初级",
        },
        "04.js": {
          description: "HTML5离线存储、CSS选择器、命名转换",
          topics: [
            "离线存储原理",
            "CSS选择器类型",
            "下划线转驼峰命名",
            "正则表达式",
          ],
          difficulty: "中级",
        },
        "05.js": {
          description: "超链接target属性、CSS3伪类、字符串大小写切换",
          topics: [
            "target属性详解",
            "CSS3新增伪类",
            "字符串处理",
            "大小写转换",
          ],
          difficulty: "初级",
        },
        "06.js": {
          description: "label标签、CSS三角形、去除制表符和换行符",
          topics: [
            "label标签作用",
            "CSS绘制三角形",
            "正则处理特殊字符",
            "字符处理",
          ],
          difficulty: "中级",
        },
        "07.js": {
          description: "iframe框架、BFC规范、字符串统计",
          topics: ["iframe优缺点", "BFC规范理解", "字符串统计", "正则匹配"],
          difficulty: "中级",
        },
        "08.js": {
          description: "HTML5离线存储、清除浮动、字符串加密",
          topics: ["离线存储详解", "浮动清除方法", "字符串加密", "Base64编码"],
          difficulty: "中级",
        },
        "09.js": {
          description: "多标签页通信、优雅降级和渐进增强、数据类型判断",
          topics: [
            "标签页通信方式",
            "开发策略",
            "数据类型检测",
            "toString方法",
          ],
          difficulty: "高级",
        },
        "010.js": {
          description: "viewport设置、px/em/rem对比、回调函数",
          topics: [
            "移动端viewport配置",
            "CSS单位对比",
            "回调函数应用",
            "异步编程",
          ],
          difficulty: "中级",
        },
      };
      return (
        fileMap[fileName] || {
          description: "未知文件",
          topics: [],
          difficulty: "未知",
        }
      );
    };

    // 获取代码预览
    const getCodePreview = (fileName) => {
      return `// 文件位置: src/views/fe_interview/js/${fileName}
// 请在终端中运行: node src/views/fe_interview/js/${fileName}

此处显示代码预览。

要查看完整代码，请直接打开文件：
src/views/fe_interview/js/${fileName}

或者在 VS Code 中使用 Ctrl+P 快速打开文件。`;
    };

    return {
      jsFiles,
      currentOutput,
      currentFile,
      toggleFile,
      runJSFile,
      viewCode,
      getFileInfo,
      getCodePreview,
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
</style>
