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


let downloadPrefix = "/download";

export const setfileDownloadUrl = function(value: string): void {
  downloadPrefix = value;
}

// 拼接文件下载地址
export const fileDownloadUrl = function(url?: string): string {
  if (url && /^https?:\/\//i.test(url)) {
    return url;
  }
  if (url && /^\/\//i.test(url)) {
    return url;
  }
  if (url) {
    return path.join(downloadPrefix, url);
  }
  return "";
}

// 触发浏览器下载
export const downloadFile = function(url?: string, name?: string): void {
  if (url) {
    // 多文件同时下载，最好和网页保持一个相同域名
    // 前端服务器使用 Nginx 部署，nginx 监听 /download 路径进行反代理
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