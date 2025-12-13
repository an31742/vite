// 运行所有面经JS文件的测试脚本
console.log('=== 前端面经JS文件集合 ===\n');

const fs = require('fs');
const path = require('path');

// 获取当前目录下的所有JS文件（除了当前文件）
const jsFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== 'run-all.js')
  .sort((a, b) => {
    // 按数字顺序排序
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

console.log('可用的面经文件：');
jsFiles.forEach((file, index) => {
  console.log(`${index + 1}. ${file}`);
});

console.log('\n使用方法：');
console.log('1. 运行单个文件：node 01.js');
console.log('2. 运行所有文件：node run-all.js all');
console.log('3. 运行指定范围：node run-all.js 1-5');

// 如果传入参数，执行相应的文件
const args = process.argv.slice(2);
if (args.length > 0) {
  const param = args[0];
  
  if (param === 'all') {
    // 运行所有文件
    console.log('\n=== 开始运行所有面经文件 ===\n');
    jsFiles.forEach(file => {
      console.log(`\n--- 运行 ${file} ---`);
      try {
        require(path.join(__dirname, file));
      } catch (error) {
        console.error(`运行 ${file} 时出错:`, error.message);
      }
    });
  } else if (param.includes('-')) {
    // 运行指定范围
    const [start, end] = param.split('-').map(n => parseInt(n));
    console.log(`\n=== 运行面经文件 ${start} 到 ${end} ===\n`);
    
    for (let i = start; i <= end; i++) {
      const fileName = i < 10 ? `0${i}.js` : `${i}.js`;
      if (jsFiles.includes(fileName)) {
        console.log(`\n--- 运行 ${fileName} ---`);
        try {
          require(path.join(__dirname, fileName));
        } catch (error) {
          console.error(`运行 ${fileName} 时出错:`, error.message);
        }
      }
    }
  } else {
    // 运行单个文件
    const fileName = param.endsWith('.js') ? param : `${param}.js`;
    if (jsFiles.includes(fileName)) {
      console.log(`\n=== 运行 ${fileName} ===\n`);
      try {
        require(path.join(__dirname, fileName));
      } catch (error) {
        console.error(`运行 ${fileName} 时出错:`, error.message);
      }
    } else {
      console.log(`文件 ${fileName} 不存在`);
    }
  }
}