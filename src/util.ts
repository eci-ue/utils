
import BigNumber from "bignumber.js";

export * from "./api";
export * from "./uuid";
export * from "./common";
export * from "./lazyload";
export * from "./debounce/index";

export const trim = function<T = string | object>(value: T): T {
  if (typeof value === "string") {
    return value.trim() as T;
  }
  if (Array.isArray(value)) {
    return value.map(trim) as T;
  }
  if (typeof value === "object") {
    const keys: string[] = Object.keys(value as object);
    for (const key of keys) {
      // @ts-ignore
      const item: T = value[key];
      // @ts-ignore
      value[key] = trim(item);
    }
  }
  return value;
};

export const fileSize = function(value: string | number) {
  if (typeof value === "string" || typeof value === "number") {
    const byte = 1024;
    const kb = new BigNumber(value).div(byte);
    const mb = new BigNumber(value).div(byte).div(byte);
    const gb = new BigNumber(value).div(byte).div(byte).div(byte);
    const t = new BigNumber(value).div(byte).div(byte).div(byte).div(byte);
    if (kb.toNumber() < byte) {
      const num = Number(kb.toFixed(2));
      return `${num < 1 ? 1 : num}KB`;
    } else if (mb.toNumber() < byte) {
      return `${Number(mb.toFixed(2))}MB`;
    } else if (gb.toNumber() < byte) {
      return `${Number(gb.toFixed(2))}GB`;
    } else {
      return `${Number(t.toFixed(2))}T`;
    }
  }
  return "0";
}