/**
 *递归算法实现数组长度为5且元素的随机数在2-32间不重复的值
 * @param {*} arr
 * @param {*} length
 * @param {*} min
 * @param {*} max
 * @returns [1,2,3,4,5]
 */

// function buildArray(arr,length,min,max){
//   let num = Math.floor(Math.random()* (max-min+1)+min)

//   if (!arr.includes(num)) {
//     arr.push(num)
//   }
//   return arr.length === length ? arr : buildArray(arr,length,min,max)
// }

function buildArray(arr, length, min, max) {
  if (arr.length > length) {
    return arr;
  }
  let num = Math.floor(Math.random() * (max - min + 1) + min);
  if (!arr.includes(num)) {
    arr.push(num);
  }
  return buildArray(arr, length, min, max);
}

console.log(buildArray([], 5, 2, 32));

/**
 * 去掉字符串中多余的空格
 */

let str = "ab cdef g";

// 方法1：replace + 重新赋值
str = str.replace(/\s*/g, "");
console.log("🚀 ~ replace方法:", str);

// 方法2：split + join（修正）
let str2 = "ab cdef g";
str2 = str2.split(" ").join("");
console.log("🚀 ~ split+join方法:", str2);

/**
 * 翻转字符串
 */
function toggleCase(str) {
  let arr = [];
  for (let item of str) {
    if (item === item.toUpperCase()) {
      item = item.toLowerCase();
    } else {
      item = item.toUpperCase();
    }
    arr.push(item);
  }
  return arr.join("");
}

console.log("🚀 ~ toggleCase:", toggleCase("aBcD"));

/**
 * 字符串出现的次数
 */

//方法1 使用match找到对应的字符串 使用replace清空 循环计数加1
function strCount(str, target) {
  let count = 0;
  if (!target) {
    return count;
  }
  while (str.match(target)) {
    str = str.replace(target, "");
    count++;
  }

  return count;
}

console.log("🚀 ~ strCount:", strCount("abcdabcdabcd", "a"));

// "abcdabcdabcd".split(target).length - 1;
//方法2通过split 获取到数组因为以target分隔这样Length会多出来一个需要减去1
console.log(
  "🚀 ~  'abcdabcdabcd'.split(target).length - 1;:",
  "abcdabcdabcd".split('a').length - 1
);
