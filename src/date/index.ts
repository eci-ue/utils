/**
 * @file 常用时间方法
 * @author svon.me@gmail.com
 */
// @ts-ignore
import dayjs from "dayjs";
import BigNumber from "bignumber.js";
// @ts-ignore
import utc from "dayjs/plugin/utc";

import type { Dayjs } from "dayjs";

dayjs.extend(utc);

let Offset = 0;
export const getOffset = () => Offset;
export const setOffset = (value: number = 0) => Offset = value;

export type DateValue = string | number | Date | Dayjs;

export enum Template {
  date = "YYYY-MM-DD",
  value = "YYYY-MM-DD HH:mm:ss"
}

export const toDate = function(value: DateValue, template?: string): Date {
  if (dayjs.isDayjs(value)) {
    // @ts-ignore
    return value.toDate();
  }
  // 将 10 位时间戳转换成 13 位时间戳
  if (/^\d{10}$/.test(String(value))) {
    const time = new BigNumber(value as string).times(1000).toNumber();
    return toDate(time);
  }
  // 将 13 位时间戳转换成 Date 类型数据
  if (/^\d{13}$/.test(String(value))) {
    return dayjs.utc(value as string).toDate();
  }
  return dayjs.utc(value, template).toDate();
}

/**
 * 显示（格式化）
 * @param value  时间
 * @param format 格式化格式
 */
export const __format = function(value?: DateValue | null | undefined, template: string | Template = Template.value): string {
  if (typeof value === "object" && dayjs.isDayjs(value)) {
    // @ts-ignore
    return typeof template === "string" ? value.format(template) : value.format(Template.value);
  }
  const date = dayjs(toDate(value || new Date()));
  return __format(date, typeof template === "string" ? template : Template.value);
}

/**
 * 时间格式胡
 * @param value 时间
 * 为 true 时等于 YYYY-MM-DD
 * 为 字符串类型时为指定格式
 * 默认为 YYYY-MM-DD hh:mm:ss
 * @param formatDate
 */
export const _format = function(value: DateValue, formatDate?: boolean | string) {
  let template: string;
  if (typeof formatDate === "boolean" && formatDate) {
    template = Template.date;
  } else if (typeof formatDate === "string" && formatDate) {
    template = formatDate;
  } else {
    template = Template.value;
  }
  return {
    template,
    timezone: Offset,
    date: dayjs.utc(toDate(value, template)),
  }
}

/**
 * 时间格式胡
 * @param value 时间
 * 时间格式
 * 为 true 时等于 YYYY-MM-DD
 * 为 false 时不进行时区处理
 * 为 字符串类型时为指定格式
 * 默认为 YYYY-MM-DD hh:mm:ss
 * @param formatDate 
 * @returns string
 */
export const format = function(value: DateValue, formatDate?: boolean | string): string {
  if (typeof formatDate === "boolean" && formatDate === false) {
    return __format(value);
  }
  const data = _format(value, formatDate);
  if (formatDate) {
    // 只需要年月日数据时不进行时区转换
    return data.date.format(data.template);
  }
  return data.date.add(data.timezone, "m").format(data.template);
}

/**
 * 用于向服务器提交数据时根据时区做一次处理
 * @param value 时间
 * @param formatDate 提交格式, 为 true 时等于 YYYY-MM-DD 默认为 YYYY-MM-DD hh:mm:ss
 * @returns string
 */
export const formatSubtract = function(value: DateValue, formatDate?: boolean) {
  const data = _format(value, formatDate);
  if (formatDate) {
    // 只需要年月日数据时不进行时区转换
    return data.date.format(data.template);  
  }
  return data.date.subtract(data.timezone, "m").format(data.template);
}

// 禁用之前的日期
export const disabledBeforeDate = function(currentDate: DateValue, originDate?: DateValue, ignore: DateValue[] = []): boolean {
  const current = toDate(currentDate);
  if (ignore && ignore.length > 0) {
    let status = false;
    for(const value of ignore) {
      // 判断日期比较是否相同
      if (dayjs(toDate(value)).isSame(current, "day")) {
        status = true;
        break;
      }
    }
    if (status) {
      return false; // false 表示不禁用
    }
  }
  if (originDate) {
    return dayjs(toDate(originDate)).isAfter(current, "day");
  }
  return dayjs().isAfter(current, "day");
}

export const disabledAfterDate = function(currentDate: DateValue, originDate?: DateValue, ignore: DateValue[] = []): boolean {
  const current = toDate(currentDate);
  if (ignore && ignore.length > 0) {
    let status = false;
    for(const value of ignore) {
      // 判断日期比较是否相同
      if (dayjs(toDate(value)).isSame(current, "day")) {
        status = true;
        break;
      }
    }
    if (status) {
      return false; // false 表示不禁用
    }
  }
  if (originDate) {
    return dayjs(toDate(originDate)).isBefore(current, "day");
  }
  return dayjs().isBefore(current, "day");
}