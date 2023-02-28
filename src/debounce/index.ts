import { debounce } from "lodash-es";

/**
 * debounce 装饰器
 * @param delay   延迟时间
 * @param result  延迟期间重复执行默认返回的数据
 * @returns 
 */
const $debounce = function(delay: number = 600, result?: any) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    let time: any;
    const callback = descriptor.value;
    const delayApp = function() {
      clearTimeout(time);
      time = setTimeout(() => {
        clearTimeout(time);
        time = void 0;
      }, delay);
    };
    const app = debounce(function(...args: any[]) {
      delayApp();
      // @ts-ignore
      return callback.apply(this, args);
    }, delay, {
      leading: true,      // 延迟开始调用
      trailing: false,    // 延迟结束调用
    });
    descriptor.value = function(...args: any[]) {
      if (time) {
        delayApp();
        return result;
      }
      const value = app.apply(this, args);
      if (typeof value === "undefined") {
        return result;
      }
      return value;
    };
  };
}


export { debounce, $debounce };