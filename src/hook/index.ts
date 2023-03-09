/**
 * @file 事件钩子
 * @author svon.me@gmail.com
 */

export type HookFunction = (...args: any[]) => void | undefined | Boolean | Promise<boolean>;

const hook = function(hookFunctionList: HookFunction[]) {
  const list: HookFunction[] = [];
  for (const item of hookFunctionList) {
    if (item && typeof item === "function") {
      list.push(item);
    }
    if (item && Array.isArray(item)) {
      list.push(function(...args: any[]): Promise<boolean> {
        const app = hook(item);
        return app(args);
      });
    }
  }

  return async function(...args: any[]): Promise<boolean> {
    let flag = true;
    for (const callback of list) {
      const status = await Promise.resolve(callback(...args));
      if (status || typeof status === "undefined") {
        continue;
      }
      flag = false;
      break;
    }
    return flag;
  };
}

export const run = function(hookFunctionList: HookFunction | HookFunction[] = [], args: any[] = []): Promise<boolean> {
  const app = hook(Array.isArray(hookFunctionList) ? hookFunctionList : [hookFunctionList]);
  return app(...args);
}


export const before = function(...args: HookFunction[]) {
  return hook(args);
}

export const after = function(...args: HookFunction[]) {
  return hook(args.reverse());
}