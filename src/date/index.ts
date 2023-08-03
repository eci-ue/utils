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
export const setOffset = (value: number = 0) => {
  const tmp = Number(value);
  if (isNaN(tmp)) {
    Offset = 0;
  } else {
    Offset = tmp;
  }
};

export type DateValue = string | number | Date | Dayjs;

export enum Template {
  date = "YYYY-MM-DD",
  value = "YYYY-MM-DD HH:mm",
  YYYYMMDD = "YYYY-MM-DD",
  YYYYMMDDhhmm = "YYYY-MM-DD HH:mm",
  YYYYMMDDhhmmss = "YYYY-MM-DD HH:mm:ss",
}

export const toDate = function(value?: DateValue, template?: string): Date {
  if (!value) {
    return toDate(Date.now(), template);
  }
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
  if (/^\d+-\d+-\d+\s+\d+:\d+:\d+\s?$/.test(String(value))) {
    // 判断年月日 时分秒
    return dayjs.utc(value, Template.YYYYMMDDhhmmss).toDate();
  }
  if (/^\d+-\d+-\d+T\d+:\d+:\d+\s?$/i.test(String(value))) {
    // 判断年月日T时分秒
    return dayjs.utc(value, Template.YYYYMMDDhhmmss).toDate();
  }
  if (/^\d+-\d+-\d+\s?$/) {
    // 判断年月日
    return dayjs.utc(value, Template.YYYYMMDD).toDate();
  }
  return dayjs.utc(value, template).toDate();
}

/**
 * 显示（格式化）
 * @param value  时间
 * @param format 格式化格式
 */
export const __format = function(value?: DateValue | null | undefined, template: string | Template = Template.YYYYMMDDhhmmss): string {
  if (typeof value === "object" && dayjs.isDayjs(value)) {
    // @ts-ignore
    return typeof template === "string" ? value.format(template) : value.format(Template.YYYYMMDDhhmmss);
  }
  const date = dayjs(toDate(value || new Date()));
  return __format(date, template);
}

/**
 * 时间格式胡
 * @param value 时间
 * 为 true 时等于 YYYY-MM-DD
 * 为 字符串类型时为指定格式
 * 默认为 YYYY-MM-DD hh:mm
 * @param formatDate
 */
export const _format = function(value?: DateValue, formatDate?: boolean | string) {
  let template: string;
  if (formatDate && typeof formatDate === "boolean") {
    template = Template.YYYYMMDD; // 年月日
  } else if (typeof formatDate === "string" && formatDate.trim().length > 0) {
    template = formatDate;
  } else {
    template = Template.YYYYMMDDhhmm;
  }
  class DateUnit {
    template: string = template;
    timezone: number = Offset;
    date: Dayjs = dayjs.utc(toDate(value, Template.YYYYMMDDhhmmss));
    add (value?: number) {
      this.date = this.date.add(value || this.timezone, "m");
      return this;
    }
    subtract (value?: number) {
      this.date = this.date.subtract(value || this.timezone, "m");
      return this;
    }
    format (template?: string) {
      return this.date.format(template || this.template);
    }
  }
  return new DateUnit();
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
export const format = function(value?: DateValue, formatDate?: boolean | string): string {
  if (typeof formatDate === "boolean" && formatDate === false) {
    return __format(value);
  }
  const data = _format(value, formatDate);
  if (formatDate && typeof formatDate === "boolean") {
    // 只需要年月日数据时不进行时区转换
    return data.format();
  }
  return data.add().format();
}

/**
 * 用于向服务器提交数据时根据时区做一次处理
 * @param value 时间
 * @param formatDate 提交格式, 为 true 时等于 YYYY-MM-DD 默认为 YYYY-MM-DD hh:mm:ss
 * @returns string
 */
export const formatSubtract = function(value?: DateValue, formatDate?: boolean | string) {
  if (typeof formatDate === "boolean" && formatDate === false) {
    return __format(value);
  }

  const data = _format(value, formatDate);
  if (formatDate && typeof formatDate === "boolean") {
    // 只需要年月日数据时不进行时区转换
    return data.format();
  }
  return data.subtract().format(Template.YYYYMMDDhhmmss);
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
      if (dayjs(toDate(value, Template.YYYYMMDDhhmmss)).isSame(current, "day")) {
        status = true;
        break;
      }
    }
    if (status) {
      return false; // false 表示不禁用
    }
  }
  if (originDate) {
    return dayjs(toDate(originDate, Template.YYYYMMDDhhmmss)).isBefore(current, "day");
  }
  return dayjs().isBefore(current, "day");
}