<!-- 上拉加载   使用通义源码 和  豆包marsCode 都不行 使用chartGpt没问题-->
•	上拉加载（Load More）:
•	当用户滚动到底部时触发。
•	一般用于分页加载，当用户需要浏览更多内容时，自动加载下一页的内容。
<template>
  <h2>上拉加载</h2>
  <!-- 增加scroll事件 触发下拉加载时 当滚动条拉到一定距离就会触发 -->
  <!-- @scroll 是vue的事件 -->
  <!-- html的原生事件时onScroll -->
  <div class="list-container" @scroll="handleScroll">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
      </li>
    </ul>
    <!-- 加载指示器 -->
    <div v-if="isLoading" class="loading-indicator">加载中...</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"

export default {
  setup() {
    // 设置内容
    const items = ref([])
    //判断是否触发下拉加载
    const isLoading = ref(false)

    // 初始化加载的数据
    const loadMoreItems = () => {
      // 防止重复加载
      if (isLoading.value) return
      //   展示加载提示
      isLoading.value = true
      // 模拟异步加载数据  1.5秒以后添加数据 同时隐藏加载提示  模拟异步加载数据
      setTimeout(() => {
        // 这段代码的目的是生成一个包含 10 个新项目的数组，每个项目的名称是动态生成的，且基于已有项目数量继续递增编号
        // + i + 1：确保生成的新项目的编号是连续的，从现有项目的下一个编号开始。例如，假设 items.value.length 为 5，那么生成的第一个新项目编号将是 Item 6，第二个新项目是 Item 7，依次类推。
        const newItems = Array.from({ length: 10 }, (_, i) => `Item ${items.value.length + i + 1}`)
        items.value.push(...newItems)
        isLoading.value = false
      }, 1500)
    }
   // 当数据到底部时,触发事件
    const handleScroll = (event) => {
      // scrollTop + clientHeight 表示当前用户已经滚动过的距离加上当前可视区域的高度
      // scrollHeight 表示可视高度
      const bottomReached = event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight
      // 如果滚动高度大于可是高度  就加载数据
      if (bottomReached) {
        loadMoreItems()
      }
    }

    onMounted(() => {
      // 初始化时加载初始数据
      loadMoreItems()
    })

    return { items, isLoading, handleScroll }
  },
}
</script>

<style scoped>
.list-container {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.loading-indicator {
  text-align: center;
  padding: 10px;
}
</style>
