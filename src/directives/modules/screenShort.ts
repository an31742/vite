/***
 *
 * @param {string}
 * @param {string} target - 截取元素的 CSS 选择器
 * @param {string} fileName - 截图保存的文件名
 * @returns {void} - 点击元素时截取并保存到本地
 * @example v-screenShot="{ target: '#capture', fileName: 'custom-screenshot.png'
 */

import html2canvas from "html2canvas";
import type { Directive, DirectiveBinding } from "vue";
const screenShort = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    console.log("🚀 ~ mounted ~ el: HTMLElement, binding: DirectiveBinding:", el, binding);
    el.addEventListener("click", async () => {
      console.log("🚀 ~ el.addEventListener ~ binding.value?.target:", binding.value?.target);
      const target = binding.value?.target ? document.getElementById(binding.value.target) : el;
      console.log("🚀 ~ el.addEventListener ~ document.querySelector(binding.value.target):", document.querySelector(binding.value.target))
      console.log("🚀 ~ el.addEventListener ~ target:", target);

      if (target) {
        try {
          // 使用 html2canvas 截取元素截图
          const canvas = await html2canvas(target as HTMLElement);
          const dataURL = canvas.toDataURL("image/png");

          // 创建下载链接
          const link = document.createElement("a");
          link.href = dataURL;
          link.download = binding.value?.fileName || "screenshot.png";
          console.log("🚀 ~ el.addEventListener ~ link:", link)
          link.click();
        } catch (err) {
          console.error("截图失败:", err);
        }
      } else {
        console.error("未找到目标元素进行截图");
      }
    });
  }
};

export default screenShort;
