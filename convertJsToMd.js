const fs = require('fs');
const path = require('path');

// 目标目录
const targetDir = path.join(__dirname, 'apps/web/src/views/fe_interview/js');

// 读取目录下所有 JS 文件
const jsFiles = fs.readdirSync(targetDir).filter(file => 
  file.endsWith('.js') && !file.includes('convert')
);

console.log(`📁 找到 ${jsFiles.length} 个 JS 文件:`);
jsFiles.forEach(file => console.log(`  - ${file}`));

// 转换函数
function convertJsToMd(jsContent, filename) {
  const mdTitle = filename.replace('.js', '');
  
  // 将注释转换为 Markdown 标题和段落
  let mdContent = `# ${mdTitle} - JavaScript 面试题\n\n`;
  mdContent += `## 📋 面试问题汇总\n\n`;
  
  // 解析 JS 内容为 Markdown
  const lines = jsContent.split('\n');
  let currentSection = '';
  let codeBlock = [];
  let inCodeBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 处理多行注释开始
    if (line.trim().startsWith('/**')) {
      inCodeBlock = true;
      codeBlock = [];
      continue;
    }
    
    // 处理多行注释结束
    if (line.trim().endsWith('*/') && inCodeBlock) {
      inCodeBlock = false;
      if (currentSection) {
        mdContent += `\n### ${currentSection}\n\n`;
      }
      
      // 将收集的注释内容转换为 Markdown
      const commentContent = codeBlock.join('\n');
      const formattedContent = formatCommentToMd(commentContent);
      mdContent += formattedContent + '\n';
      currentSection = '';
      continue;
    }
    
    // 收集多行注释内容
    if (inCodeBlock) {
      const cleanLine = line.replace(/^\s*\*\s?/, '');
      if (cleanLine) {
        codeBlock.push(cleanLine);
      }
      continue;
    }
    
    // 处理单行注释标题
    if (line.startsWith('//') && line.includes('一.') || line.includes('二.') || line.includes('三.')) {
      const title = line.replace(/^\/\/\s*/, '').trim();
      mdContent += `\n---\n\n## ${title}\n\n`;
      continue;
    }
    
    // 处理普通单行注释
    if (line.startsWith('//') && !line.startsWith('///')) {
      const comment = line.replace(/^\/\/\s*/, '').trim();
      if (comment) {
        mdContent += `${comment}\n\n`;
      }
      continue;
    }
    
    // 处理代码块
    if (line.includes('console.log') || line.includes('function') || 
        line.includes('const') || line.includes('let') || line.includes('var')) {
      if (!line.trim().startsWith('//')) {
        // 提取代码示例
        const code = line.trim();
        if (code && !code.startsWith('//')) {
          // 简单的代码示例展示
          if (code.includes('console.log')) {
            const match = code.match(/console\.log\((.*)\)/);
            if (match) {
              mdContent += `\`\`\`javascript\n${code}\n\`\`\`\n\n`;
            }
          }
        }
      }
    }
  }
  
  mdContent += `\n---\n\n*Generated from JavaScript interview notes*\n`;
  return mdContent;
}

// 格式化注释内容为 Markdown
function formatCommentToMd(content) {
  let formatted = content;
  
  // 转换表格样式的文本
  if (content.includes('┌') && content.includes('─') && content.includes('┐')) {
    formatted = '\n```\n' + content + '\n```\n';
  }
  
  // 转换代码示例
  formatted = formatted.replace(
    /```([\s\S]*?)```/g,
    '\n```javascript\n$1\n```\n'
  );
  
  // 加粗重点
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '**$1**');
  
  return formatted;
}

// 执行转换
jsFiles.forEach(file => {
  const jsPath = path.join(targetDir, file);
  const mdFile = file.replace('.js', '.md');
  const mdPath = path.join(targetDir, mdFile);
  
  try {
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    const mdContent = convertJsToMd(jsContent, file);
    
    fs.writeFileSync(mdPath, mdContent, 'utf-8');
    console.log(`✅ 已转换：${file} → ${mdFile}`);
  } catch (error) {
    console.error(`❌ 转换失败 ${file}:`, error.message);
  }
});

console.log('\n🎉 转换完成！');
