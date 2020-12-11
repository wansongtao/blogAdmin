/**
 * @description 自定义指令，处理照片错误事件
 */
export const imgErr = {
  inserted(el, options) {
    el.onerror = () => {
      el.src = options.value
    }
  }
}
