/**
 * @file 常用格式化方法
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import * as path from "../path";
import BigNumber from "bignumber.js";

export const isZero = function(value?: string | number | BigNumber): boolean {
  if (value === 0 || value === "0") {
    return true;
  }
  return false;
}

export const toFixed = function(value: string | number | BigNumber = 0, fixed: number = 2): string {
  if (isZero(value) || _.isNull(value) || _.isNaN(value) || _.isUndefined(value)) {
    value = 0;
  } else if (BigNumber.isBigNumber(value)) {
    value = value.toString();
  }
  const number = new BigNumber(value);
  if (number.isNaN()) {
    const temp = 0;
    return temp.toFixed(fixed);
  }
  return number.toFixed(fixed);
}

export const valueFormat = function (value: string | number = "", unit = "", prefix = ""): string {
  if (prefix && unit) {
    return `${prefix}${value} ${unit}`;
  } else if (prefix) {
    return `${prefix}${value}`;
  } else if (unit) {
    return `${value} ${unit}`;
  }
  return String(value);
};


// 千分位计数
export const toNumberCash = function (value: string | number = 0, unit = "", prefix = ""): string {
  const data = toFixed(value, 2);
  const text = data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return valueFormat(text, unit, prefix);
};


export const setfileDownloadUrl = function(): void {}

// 拼接文件下载地址
export const fileDownloadUrl = function(url?: string): string {
  if (url && /^https?:\/\//i.test(url)) {
    return url;
  }
  if (url && /^\/\//i.test(url)) {
    return url;
  }
  // 拼接 Blob 地址
  if (url && /^\/?driveg\//i.test(url)) {
    return "https://ecigdpr.blob.core.windows.net/ecigdpr" + path.join("/", url);
  }
  // 拼接 OSS 地址
  if (url) {
    return path.join("/download", url);
  }
  return "";
}

// 触发浏览器下载
export const downloadFile = function(url?: string, name?: string): void {
  const body = document.querySelector("body");
  if (body && url) {
    // 使用 iframe 方式下载文件
    const res = document.createElement("iframe");
    res.src = url;
    res.style.display = "none";
    body.appendChild(res);
  } else if (url) {
    // 使用 a 标签并模拟点击
    const a = document.createElement("a");
    // initEvent 已不推荐使用
    // 后期如遇到问题请参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event
    const event = document.createEvent("MouseEvents");
    event.initEvent("click", false, false);
    a.href = url;
    if (name) {
      a.download = name;
    }
    a.dispatchEvent(event);
  }
}


export const useReload = function() {
  return function() {
    window.location.reload();
  }
}