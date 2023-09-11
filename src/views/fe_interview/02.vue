<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/4">
              html的元素有哪些（包含H5）？区分出行内元素、块级元素、空元素并在后面简要标注下作用？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
常用块级元素：
常用：div、p、ul、li、ol
结构：aside、footer、header、nav、section、main
文章：address、article、figure、figcaption、h1、h2、h3、h4、h5、h6、pre
表格：table、thead、tbody、tfoot、th、td、caption
表单：form
其他：canvas
常用行内元素：

常用：a、img、span
文本：em、i、strong、small
表单：button、input、label、option、progress、select、textarea
媒体：audio、video
             </code>
           </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/5"
              >CSS3有哪些新增的特性？</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
      <code>
        边框(borders):   
        border-radius 圆角
        box-shadow 盒阴影
        border-image 边框图像

        背景:
        background-size 背景图片的尺寸
        background_origin 背景图片的定位区域
        background-clip 背景图片的绘制区域
        渐变：
        linear-gradient 线性渐变
        radial-gradient 径向渐变
        文本效果;
        word-break
       word-wrap
       text-overflow
       text-shadow
       text-wrap
       text-outline
       text-justify
       转换：
       2D转换属性
       transform
       transform-origin
       2D转换方法
       translate(x,y)
       translateX(n)
       translateY(n)
       rotate(angle)
       scale(n)
       scaleX(n)
       scaleY(n)
       rotate(angle)
       matrix(n,n,n,n,n,n)
       3D转换：
      *3D转换属性：

      transform
      transform-origin
      transform-style
      3D转换方法
      translate3d(x,y,z)
      translateX(x)
      translateY(y)
      translateZ(z)
      scale3d(x,y,z)
      scaleX(x)
      scaleY(y)
      scaleZ(z)
      rotate3d(x,y,z,angle)
      rotateX(x)
      rotateY(y)
      rotateZ(z)
      perspective(n)
      过渡
      transition
      动画
      @Keyframes规则
      animation
      弹性盒子(flexbox)
      多媒体查询@media
      </code>
     </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/6">
              写一个方法去掉字符串中的空格</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
            <code>
var trim = function(str){
return str.replace(/\s*/g,"");
}
str.replace(/\s*/g,""); //去除字符串内所有的空格
str.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
str.replace(/^\s*/,""); //去除字符串内左侧的空格
str.replace(/(\s*$)/g,""); //去除字符串内右侧的空格





Regex: string.replace(/\s/g, '')
join: string.split(' ').join('')



//  下面是对split 和 join 的解释说明
split() 方法接受一个模式，通过搜索模式将字符串分割成一个有序的子串列表，将这些子串放入一个数组，并返回该数组
所以split需要传入一个空的字符串
const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');

console.log(words)
console.log(words[3]);
// Expected output: "fox"

const chars = str.split('');

console.log(chars)
console.log(chars[8]);
// Expected output: "k"

const strCopy = str.split();
console.log(strCopy);


const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');

console.log(words)
console.log(words[3]);
// Expected output: "fox"

const chars = str.split('');

console.log(chars)
console.log(chars[8]);
// Expected output: "k"

const strCopy = str.split();
console.log(strCopy);
// Expected output: Array ["The quick brown fox jumps over the lazy dog."]

Run ›
Reset
> Array ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."]
> "fox"
> Array ["T", "h", "e", " ", "q", "u", "i", "c", "k", " ", "b", "r", "o", "w", "n", " ", "f", "o", "x", " ", "j", "u", "m", "p", "s", " ", "o", "v", "e", "r", " ", "t", "h", "e", " ", "l", "a", "z", "y", " ", "d", "o", "g", "."]
> "k"
> Array ["The quick brown fox jumps over the lazy dog."]

"".split("") 是唯一一种字符串作为 separator 参数传入的生成空数组的方法  //[]


join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。如果数组只有一个元素，那么将返回该元素而不使用分隔符


const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));

> "Fire,Air,Water"
> "FireAirWater"
> "Fire-Air-Water"
            </code>
        </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    let str = "1  0 9 9  9 88";

    console.log(str.split(" ").join(""));

    var string = " 1 2 3445 6    ";
    console.log(string.split(" ").join("")); // 输出"1234456"
    const router = useRouter();

    const fe_interview = () => {
      router.push({
        path: "/fe_interview3+1",
        query: {
          id: 1,
        },
      });
    };
    const toLocalStorage = () => {
      router.push({
        path: "/toLocalStorage",
      });
    };

    return {
      string,
      str,
      toLocalStorage,
      fe_interview,
    };
  },
});
</script>

<style scoped></style>
