/**
 * @file 常用格式化方法
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
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