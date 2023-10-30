<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/106">
            说说你对<meta>标签的理解？</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>            
防止机器行为，确定是人为操作，比如登陆、发帖等。
保护服务器，比如12306买票的时候，各种抢购的时候

图形验证码
字符验证码 文字+混淆 如早期的7456这种结果的验证码
复杂字符验证码 复杂文字+混淆 如加入中文等本土化的增加识别难度
计算验证码 数字+运算符+混淆 如1+2=? 需要识别表达式增加识别难度
精确识别 文字+混淆文字 如选出 优贝在线 中的 贝字，或者选出所有的筷子，所有的红绿灯（12306）
滑动拼图验证 图像+滑块+图像凹槽 如常见的滑动拼图，提供商有易盾之类的
拼图验证 图像+打乱 需要用户去拼合完成。teamviewer 和 google
物理验证
手机短信验证码
手机语音验证码
k宝、将军令？

                        </code>
                        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/107">
            描述下你所了解的图片格式及使用场景</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>

                              当涉及到数字图像时，有许多不同的图像格式可供选择，每种格式都具有其特定的优点和适用场景。以下是一些常见的图像格式以及它们的主要用途：

1. **JPEG (Joint Photographic Experts Group)**：
   - **特点**：采用有损压缩技术，可以在保持相对高质量的情况下大幅减小文件大小。
   - **使用场景**：适用于存储照片和其他真实世界图像，如摄影作品、网页图像等。

2. **PNG (Portable Network Graphics)**：
   - **特点**：采用无损压缩技术，支持透明度，保留图像细节和质量，但文件大小可能比JPEG大。
   - **使用场景**：适用于需要保持高质量且带有透明背景的图像，如图标、标志、网页图像等。

3. **GIF (Graphics Interchange Format)**：
   - **特点**：支持动画，具有256色调色板，适用于简单的动画和简单的图形。
   - **使用场景**：常用于简单的动态图像、表情包等。

4. **BMP (Bitmap)**：
   - **特点**：不进行压缩，保留所有像素信息，文件大小大，但保持原始质量。
   - **使用场景**：主要在 Windows 平台中使用，用于存储图像的原始像素数据。

5. **TIFF (Tagged Image File Format)**：
   - **特点**：支持多层和无损压缩，适用于专业图像编辑和印刷领域。
   - **使用场景**：常用于高质量印刷、医学图像、摄影行业等。

6. **SVG (Scalable Vector Graphics)**：
   - **特点**：基于矢量图形，可以无损缩放，适用于需要保持图像清晰度的矢量图形。
   - **使用场景**：常用于图标、图表、矢量图等。

7. **RAW**：
   - **特点**：未经压缩的相机原始图像格式，保留了相机拍摄时的所有信息和细节。
   - **使用场景**：主要用于专业摄影领域，提供了更大的后期处理空间。

8. **WebP**：
   - **特点**：由谷歌开发，结合了JPEG和PNG的优点，支持无损和有损压缩，通常比JPEG文件更小。
   - **使用场景**：用于优化网页图像，提高页面加载速度。

每种图像格式都有其独特的优缺点，因此在选择图像格式时需要根据具体的使用场景和需求进行考虑。

                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/108">
            给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
说明：本题中，我们将空字符串定义为有效的回文串</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>



 回文字符串是指从左到右和从右到左读取时都相同的字符串。换句话说，它在逆序时仍然保持相同的顺序

 ```
 /**
 * @description: 判断字符串是否是回文字符串
 * @param {string} str
 * @return {boolean} 
 */
function isPalindrome(str) {
    if (str.length === 1) return true;
    str = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    for (let i = 0; i &lt; str.length; i++) {
        if (str[i] != str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

```
```
/**
 * @description: 判断字符串是否是回文字符串
 * @param {string} str 
 * @return {boolean} 
 */
function isPalindrome(str) {
    if (str.length === 1) return true;
    str = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const strReverse = str.split('').reverse().join('');
    return str == strReverse;
}

```



```

function isPalindrome(str) {
    if (str.length === 1) return true;
    str = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    let lp = 0,
        rp = str.length - 1;
    while (lp &lt;= rp) {
        // 这里lp再进行str[lp]运算,然后再自增
        if (str[lp++] != str[rp--]) {
            return false;
        }
    }
    return true;
}
```
                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/105">
            解释下CRLF是什么</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
               <code>
CRLF 是一个缩写，代表“Carriage Return Line Feed”，它是两个特殊字符的组合
Carriage Return (CR)：代表回车符，ASCII 码为 13。它的作用是将光标移动到当前行的开头。

Line Feed (LF)：代表换行符，ASCII 码为 10。它的作用是将光标移动到下一行的开头

在Windows系统中，文本文件的行结束符通常是CRLF（\r\n）。
在Unix/Linux系统中，文本文件的行结束符通常是LF（\n）。
在老式的Mac OS中，文本文件的行结束符通常是CR（\r）
               </code>
               </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped></style>
