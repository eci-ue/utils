/**
 * @file 常用格式化方法
 * @author svon.me@gmail.com
 */
import BigNumber from "bignumber.js";
export declare const isZero: (value?: string | number | BigNumber) => boolean;
export declare const toFixed: (value?: string | number | BigNumber, fixed?: number) => string;
export declare const valueFormat: (value?: string | number, unit?: string, prefix?: string) => string;
export declare const toNumberCash: (value?: string | number, unit?: string, prefix?: string) => string;
