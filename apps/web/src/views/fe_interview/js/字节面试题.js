//实现一个整数判断是否是回文字符串


//先转数组再转字符串对比通过数组倒转来判断是否是字符串相等
function isPalindrome1 (x) {
  let str = x.toString()
  return str === str.split('').reverse().join('')
}

//字符串转数组 然后使用双指针判断是否是回文
function isPalindrome2 (x) {
  let str = x.toString()
  let left = 0
  let right = str.length - 1
  //同时循环左边小于右边就会继续比较下去  左边从零开始右边从最大开始当左边大于右边的时候就停止循环 只要有一边不相等都会结束循环输出
  while (left < right) {
    if (str[left] !== str[right]) {
      return false
    }
    left++
    right--
  }
  return true
}


//给一个数组来判断这两个值得目标值并返回他们的下标  愈发体会到循环加条件判断就是构成了

function twoSum (nums, target) {
  for (let i = 0, i<nums.length, i++) {
    for (let j = 0, j<nums.length, j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}

// 补数存在证明目标值存在的数学逻辑：
// 如果我们有两个数 a 和 b，且 a + b = target
// 那么 b = target - a（这就是补数的定义）
// 当我们遍历到数字 a 时，计算 complement = target - a
// 如果之前遍历过的数字中存在值为 complement 的数字 b
// 那么就证明存在 a + b = target，因为：
// a + complement = a + (target - a) = target

// 举例说明：
// nums = [2, 7, 11, 15], target = 9
// 当 i=0 时，nums[0]=2，complement = 9-2 = 7，map中没有7，将(2,0)存入map
// 当 i=1 时，nums[1]=7，complement = 9-7 = 2，map中有2且索引为0
// 此时找到了 nums[0] + nums[1] = 2 + 7 = 9 = target
// 返回 [0, 1]

function twoSum(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    // 如果补数存在于map中，说明之前遍历过一个数字x
    // 使得 x + nums[i] = target（因为complement = target - nums[i]，所以x = complement）
    if (map.has(complement)) {
      return [map.get(complement), i]
    }
    // 为什么不先存后判断呢？
    // 因为如果先存储当前元素再判断，会导致一个问题：
    // 当数组中存在重复元素时，可能会找到同一个元素的两个不同位置
    // 但题目要求是找到两个不同的数字，而不是同一个数字的两个位置
    //
    // 例如：nums = [3, 3], target = 6
    // 如果先存储再判断：
    // i=0: 先存储(3,0)到map，然后计算complement=6-3=3，发现map中有3，返回[0,0]
    // 这样就错误地返回了同一个位置的索引
    //
    // 而先判断再存储的方式：
    // i=0: 计算complement=6-3=3，map中没有3，存储(3,0)
    // i=1: 计算complement=6-3=3，map中有3且索引为0，返回[0,1]
    // 这样确保了返回的是两个不同位置的索引
    map.set(nums[i], i)
  }
  return []
}  // 这个函数用于在数组中找到两个数，使它们的和等于目标值，并返回这两个数的索引
  // 使用哈希表（Map）来优化查找效率，时间复杂度为O(n)
  //如果设置一个map值
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    // 计算当前数字的补数（目标值减去当前数字）
    const complement = target - nums[i]
    // 检查哈希表中是否已经存在这个补数
    // 如果存在，说明找到了两个数的和等于目标值
    // 返回补数的索引（之前存储的）和当前数字的索引
    如果map有  总数减去当前循环的值就会 得到 当前值得下标  因为当前值和
    if (map.has(complement)) {
      return [map.get(complement), i]
    }
    // 将当前数字和它的索引存储到哈希表中，供后续查找使用
    map.set(nums[i], i)
  }
  // 如果没有找到符合条件的两个数，返回空数组
  return []
}
