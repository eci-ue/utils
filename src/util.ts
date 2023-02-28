
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
}