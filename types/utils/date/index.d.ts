/**
 * @file 常用时间方法
 * @author svon.me@gmail.com
 */
import { Dayjs } from "dayjs";
export declare const getOffset: () => number;
export declare const setOffset: (value?: number) => number;
export type DateValue = string | number | Date | Dayjs;
export declare enum Template {
    date = "YYYY-MM-DD",
    value = "YYYY-MM-DD HH:mm:ss"
}
export declare const toDate: (value: DateValue, template?: string) => Date;
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
export declare const format: (value: DateValue, formatDate?: boolean | string) => string;
/**
 * 用于向服务器提交数据时根据时区做一次处理
 * @param value 时间
 * @param formatDate 提交格式, 为 true 时等于 YYYY-MM-DD 默认为 YYYY-MM-DD hh:mm:ss
 * @returns string
 */
export declare const formatSubtract: (value: DateValue, formatDate?: boolean) => any;
export declare const disabledBeforeDate: (currentDate: DateValue, originDate?: DateValue, ignore?: DateValue[]) => boolean;
export declare const disabledAfterDate: (currentDate: DateValue, originDate?: DateValue, ignore?: DateValue[]) => boolean;
