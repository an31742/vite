<template>
  <h2>下拉刷新</h2>
  <!-- 1. @touchstart="handleTouchStart"：
     • touchstart 事件：当用户手指首次接触屏幕时触发，相当于鼠标的 mousedown 事件。这个事件通常用于记录触摸开始时的位置或时间等信息。
     • 绑定的函数：handleTouchStart：当 touchstart 事件触发时，Vue.js 会调用 handleTouchStart
    函数。例如，用户按下屏幕时，该函数可以用来记录触摸的初始位置。
    2. @touchmove="handleTouchMove"：
     • touchmove 事件：当用户手指在屏幕上滑动时触发，相当于鼠标的 mousemove 事件。在手指移动的过程中，这个事件会连续触发。
     • 绑定的函数：handleTouchMove：在 touchmove 事件触发时，调用 handleTouchMove
    函数。这个函数通常用于计算用户滑动的距离或者跟踪手指的移动路径。例如，在下拉刷新中，它用于计算手指的移动距离，以调整下拉的视觉效果。 3. @touchend="handleTouchEnd"： • touchend 事件：当用户手指离开屏幕时触发，相当于鼠标的 mouseup 事件。这是触摸操作的结束标志。 •
    绑定的函数：handleTouchEnd：当触摸结束时，调用 handleTouchEnd 函数。通常用于在滑动操作结束后进行某些处理，比如触发刷新操作或者重置下拉的界面状态
    @touchend="handleTouchEnd"：
	•	touchend 事件：当用户手指离开屏幕时触发，相当于鼠标的 mouseup 事件。这是触摸操作的结束标志。
	•	绑定的函数：handleTouchEnd：当触摸结束时，调用 handleTouchEnd 函数。通常用于在滑动操作结束后进行某些处理，比如触发刷新操作或者重置下拉的界面状态
    -->
  <!-- touchstart 手指触摸屏幕开始触发    touchmove 手指触摸屏幕连续触发   touchend 手指触摸屏幕结束触发 -->
  <div class="pull-to-refresh" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <!-- 下拉刷新提示区域 -->
    <!-- 设置下拉加载提示区域 -->
    <!-- 刷新高度大于0那么就是开始下拉刷新  进入刷新中 -->
    <div class="refresh-header" :style="{ height: `${refreshHeight}px` }">
      <div v-if="isRefreshing">刷新中...</div>
      <div v-else-if="refreshHeight > 0">下拉刷新</div>
    </div>
    <!-- 列表内容区域 -->
    <div class="content">
      <div v-for="item in items" :key="item.id" class="item">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {
    // 内容加载数据
    const items = ref([])
    const refreshHeight = ref(0) // 下拉的高度
    const isRefreshing = ref(false) // 刷新状态
    const startY = ref(0) // 触摸开始的位置
    const maxPullDownHeight = 100 // 最大下拉高度
    const isPullingDown = ref(false) // 是否在下拉

    // 模拟加载数据
    const loadData = () => {
      items.value = Array.from({ length: 10 }, (_, index) => ({
        id: index,
        text: `Item ${index + 1}`,
      }))
    }

    // 处理触摸开始
    const handleTouchStart = (event) => {
      console.log("🚀 ~ handleTouchStart ~ event:", event)
      if (window.scrollY === 0) {
        //从顶部开始
        // 仅在页面滚动到顶部时记录触摸点
        startY.value = event.touches[0].clientY //当前的下拉刷新的
        // 开始进行下拉刷新
        isPullingDown.value = true
      }
    }

    // window.scrollY 是一个 JavaScript 属性，它返回当前页面垂直方向（Y 轴）上已经滚动的像素值。

    // 详细解释：

    // 	•	window.scrollY 表示页面从顶部向下滚动的距离（以像素为单位）。
    // 	•	当页面内容超过可视窗口时，用户可以上下滚动页面。window.scrollY 就会反映出页面已经滚动了多少距离。
    // 	•	如果页面没有滚动，window.scrollY 的值为 0。
    // 	•	这个属性是只读的，也就是说，不能直接通过修改 window.scrollY 来改变页面滚动位置，但可以使用其他方法（例如 window.scrollTo()）来控制页面滚动。

    // 应用场景：

    // 	1.	判断页面滚动位置：
    // 	•	可以通过 window.scrollY === 0 判断页面是否在顶部。
    // 	•	在实现一些滚动触发的效果（如显示/隐藏按钮、固定导航栏等）时非常有用。
    // 	2.	实现下拉刷新：
    // 	•	在实现下拉刷新功能时，你可以通过检查 window.scrollY 是否为 0 来确认用户是否在页面顶部开始下拉。只有当页面位于顶部时，才能触发下拉刷新操作。

    // 处理触摸移动
    const handleTouchMove = (event) => {
      console.log("🚀 ~ handleTouchMove ~ event:", event) // 如果下拉的距离消失就不进行下拉刷新
      if (!isPullingDown.value || isRefreshing.value) return
      // 当前下拉刷新的距离
      const currentY = event.touches[0].clientY
      //  当前的的距离和开始差值
      const diff = currentY - startY.value

      if (diff > 0) {
        // 仅在向下滑动时更新高度
        refreshHeight.value = Math.min(diff, maxPullDownHeight)
      }
    }

    // 处理触摸结束
    const handleTouchEnd = () => {
      if (!isPullingDown.value) return

      isPullingDown.value = false

      if (refreshHeight.value === maxPullDownHeight) {
        startRefresh()
      } else {
        refreshHeight.value = 0 // 未达到阈值时恢复初始状态
      }
    }

    // 执行刷新操作
    const startRefresh = () => {
      isRefreshing.value = true

      // 模拟刷新操作
      setTimeout(() => {
        isRefreshing.value = false
        refreshHeight.value = 0 // 刷新完成后重置下拉高度
        loadData() // 模拟重新加载数据
      }, 2000)
    }

    loadData() // 初始加载数据

    return {
      items,
      refreshHeight,
      isRefreshing,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    }
  },
}
</script>

<style scoped>
.pull-to-refresh {
  position: relative;
  overflow-y: auto;
  height: 100vh; /* 设置全屏高度 */
}

.refresh-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0f7fa;
  color: #00796b;
  font-size: 16px;
  transition: height 0.3s ease;
}

.content {
  padding: 20px;
}

.item {
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
