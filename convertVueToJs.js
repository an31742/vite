/**
 * Vue文件转JS文件工具
 * 用于将fe_interview目录下的.vue文件转换为.js文件
 */

const fs = require('fs');
const path = require('path');

// 获取所有.vue文件
function getVueFiles(dir) {
  const files = fs.readdirSync(dir);
  const vueFiles = files.filter(file => path.extname(file) === '.vue');
  return vueFiles.map(file => path.join(dir, file));
}

// 解析Vue文件内容
function parseVueFile(content) {
  const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
  const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
  const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  
  return {
    template: templateMatch ? templateMatch[1].trim() : '',
    script: scriptMatch ? scriptMatch[1].trim() : '',
    style: styleMatch ? styleMatch[1].trim() : ''
  };
}

// 转换为JS内容
function convertToJS(parsedContent, fileName) {
  // 提取原始文件名编号
  const fileNumber = path.basename(fileName, '.vue');
  
  return `
import { createApp } from 'vue';
import { ElCard } from 'element-plus';
import 'element-plus/theme-chalk/el-card.css';

// 创建容器元素
const container = document.createElement('div');
container.id = 'interview-${fileNumber}';
document.body.appendChild(container);

// 动态创建样式
const style = document.createElement('style');
style.textContent = \`
  .main {
    padding: 20px;
  }
  .box-card {
    margin-bottom: 20px;
  }
  .card-header {
    font-weight: bold;
  }
  .text.item {
    line-height: 1.6;
  }
  ${parsedContent.style}
\`;
document.head.appendChild(style);

// 创建应用
const app = createApp({
  template: \`
    <div class="main">
      ${parsedContent.template.replace(/^[\s\S]*?<div class="main">([\s\S]*)<\/div>[\s\S]*$/, '$1')}
    </div>
  \`,
  setup() {
    ${extractSetupFunction(parsedContent.script)}
  }
});

// 注册Element Plus组件
app.component('ElCard', ElCard);

// 挂载应用
app.mount('#interview-${fileNumber}');

// 提取setup函数
function extractSetupFunction(scriptContent) {
  const setupMatch = scriptContent.match(/setup\(\)\s*{([\s\S]*?)return\s*{/);
  if (setupMatch) {
    const returnMatch = scriptContent.match(/return\s*{([\s\S]*?)};/);
    const returnContent = returnMatch ? returnMatch[1] : '';
    
    return \`
      \${setupMatch[1]}
      return {
        \${returnContent}
      };
    \`;
  }
  return '{}';
}
  `.trim();
}

// 主转换函数
function convertVueToJS(vueFilePath) {
  try {
    // 读取Vue文件内容
    const content = fs.readFileSync(vueFilePath, 'utf-8');
    
    // 解析内容
    const parsed = parseVueFile(content);
    
    // 转换为JS
    const jsContent = convertToJS(parsed, path.basename(vueFilePath));
    
    // 生成新的文件路径
    const jsFilePath = vueFilePath.replace('.vue', '.js');
    
    // 写入JS文件
    fs.writeFileSync(jsFilePath, jsContent, 'utf-8');
    
    console.log(\`成功转换: \${vueFilePath} -> \${jsFilePath}\`);
    
    return jsFilePath;
  } catch (error) {
    console.error(\`转换失败: \${vueFilePath}\`, error);
    return null;
  }
}

// 批量转换函数
function batchConvert(directory) {
  const vueFiles = getVueFiles(directory);
  const convertedFiles = [];
  
  console.log(\`找到 \${vueFiles.length} 个Vue文件，开始转换...\`);
  
  vueFiles.forEach(filePath => {
    const jsFile = convertVueToJS(filePath);
    if (jsFile) {
      convertedFiles.push(jsFile);
    }
  });
  
  console.log(\`转换完成，共转换 \${convertedFiles.length} 个文件\`);
  return convertedFiles;
}

// 如果直接运行此脚本，则执行批量转换
if (require.main === module) {
  const directory = path.resolve(__dirname, 'src/views/fe_interview');
  batchConvert(directory);
}

module.exports = {
  convertVueToJS,
  batchConvert
};