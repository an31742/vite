<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/55">
              你认为table的作用和优缺点是什么呢?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
          <code>
            表格（Table）的作用和优缺点：

作用：

数据展示: 表格是一种有效的方式来展示结构化的数据，适用于呈现大量的数据，使得用户可以轻松浏览和比较信息。

布局控制: 表格可以用于布局页面元素，比如创建网页布局中的栅格系统。这在响应式设计中很有用。

数据对比: 表格使用户可以在不同行或列之间进行数据比较，适用于比较不同项目的指标。

多维数据呈现: 对于多维数据，表格可以用于创建交叉表格，清楚地展示数据的交叉关系。

优点：

结构化数据展示: 表格适用于呈现有序的、结构化的数据，对于管理和展示大量数据很有帮助。

可访问性: 表格可以通过标签和标题提供可访问的信息，有助于屏幕阅读器等辅助技术的使用。

多用途性: 表格不仅仅适用于展示数据，还可以用于创建布局和页面结构。

缺点：

不适合小屏幕: 在小屏幕设备上，表格可能会导致排版问题，需要适当的响应式设计来解决。

可读性问题: 当表格包含大量数据时，可能会导致可读性下降，用户难以快速获取所需信息。

排版复杂性: 对于复杂的表格，排版和样式的设计可能较为繁琐，需要仔细调整。

综合考虑，表格在展示结构化数据和进行数据比较方面有其优势，但在响应式设计、排版和可读性方面可能存在一些挑战。在使用表格时，应根据具体情况权衡其优缺点，并采取适当的设计和布局措施以提高用户体验。


          </code>
          </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/56">
              CSS sprites的原理和优缺点分别是什么?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
              <code>
 CSS 图像合并（Image sprites） 技术，亦作 CSS 贴图定位、图像精灵（sprite），被运用于众多使用大量小图标的网页应用之上

它可取图像的一部分来使用， 利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位

访问页面时避免图片载入缓慢的现象，使得使用一个图像文件替代多个小文件成为可能

注意: 当使用 HTTP/2 时，使用多个小流量请求实际上可能更为带宽友好
优点
CSS Sprites能减少网页的http请求，从而大大的提高页面的性能
CSS Sprites能减少图片的字节
CSS Sprites解决了网页设计师在图片命名上的困扰，只需对一张集合的图片命名，不需要对每一个小图片进行命名，从而提高了网页制作效率
CSS Sprites只需要修改一张或少张图片的颜色或样式就能改变整个网页的风格
缺点
图片合并麻烦：图片合并时，需要把多张图片有序的合理的合并成一张图片，并留好足够的空间防止版块出现不必要的背景
图片适应性差：在高分辨的屏幕下自适应页面，若图片不够宽会出现背景断裂
图片定位繁琐：开发时需要通过工具测量计算每个背景单元的精确位置
可维护性差：页面背景需要少许改动，可能要修改部分或整张已合并的图片，进而要改动css。在避免改动图片的前提下，又只能（最好）往下追加图片，但这样增加了图片字节
              </code>
              </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/57">
              ypeof('abc')和typeof 'abc'都是string,
              那么typeof是操作符还是函数?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                  <code>
 typeof 是操作符，明确定义在MDN当中,作用是对后方表达式的返回做类型定义。
在后面添加括号其实是改变计算优先级，和四则运算中的括号可以等效理解。
简单举例

```
typeof 123 //"number"
typeof 123+'abc'// "numberabc"
typeof(123+'abc') // "string"
```
                  </code>
              </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/57">
              说说你对SVN和GIT的理解和区别</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                  <code>
                   

关于SVN（Subversion）和GIT，它们都是版本控制系统，用于跟踪和管理软件项目的变化。它们在软件开发中起到了非常重要的作用，有一些共同点和区别：

1. **SVN（Subversion）**：
   SVN是一个集中式版本控制系统，它使用集中式存储来管理代码版本。在SVN中，代码存储在一个中央仓库中，团队成员通过向中央仓库提交更新来共享代码。SVN使用基于文件的方法来追踪代码变化，每次提交会创建一个新的版本。开发者可以通过更新（checkout）获取最新版本，然后进行修改，最后提交（commit）变更。

2. **GIT**：
   Git是一个分布式版本控制系统，它的核心思想是每个开发者都有一份完整的代码仓库副本。每次提交都会在本地生成一个快照，并且开发者可以在本地创建分支、合并分支等。Git强调分布式和本地性，因此开发者可以在没有网络连接的情况下进行工作，只有在需要与他人协作时才需要进行远程同步。

**区别**：
- **集中式 vs. 分布式**：SVN是集中式的，代码存储在中央仓库中，而Git是分布式的，每个开发者都拥有完整的代码仓库。
- **操作性能**：由于Git的本地性质，许多操作（如提交、创建分支）通常比SVN更快。
- **分支和合并**：Git在处理分支和合并时更加灵活，因为每个分支都是一个完整的副本。SVN的分支合并相对较为繁琐。
- **历史记录**：Git的提交历史更加详细和灵活，因为每个提交都是一个完整的快照，而SVN的历史记录则以文件为单位。
- **网络依赖**：SVN在一定程度上依赖网络连接，因为代码存储在中央仓库中。Git可以在本地工作，并在需要时再同步远程仓库。

总的来说，SVN和Git各有优势，选择哪个取决于团队的需求和偏好。在分布式开发和灵活性方面，Git通常更受欢迎，而在一些传统的开发环境中，SVN可能仍然被使用。
                  </code>
              </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
