/**
 * @file 事件钩子
 * @author svon.me@gmail.com
 */

export type HookFunction = (...args: any[]) => undefined | Boolean | Promise<boolean>;

const hook = function(hookFunctionList: HookFunction[]) {
  return async function(...args: any[]) {
    for (const callback of hookFunctionList) {
      if (callback && typeof callback === "function") {
        const status = await Promise.resolve(callback(...args));
        if (status) {
          continue;
        }
        break;
      }
    }
  };
}


export const before = function(...args: HookFunction[]) {
  return hook(args);
}

export const after = function(...args: HookFunction[]) {
  return hook(args.reverse());
}