/**
 * @file 表单校验规则
 * @author svon.me@gmail.com
 * @description https://github.com/yiminghe/async-validator
 */
import type { RuleObject } from "ant-design-vue/lib/form/interface";
export declare const text: (message?: string, required?: boolean) => RuleObject[];
export declare const integer: (message?: string, required?: boolean) => RuleObject[];
export declare const number: (message?: string, required?: boolean) => RuleObject[];
export declare const link: (message?: string, required?: boolean) => RuleObject[];
export declare const array: (message?: string, required?: boolean) => RuleObject[];
export declare const date: (message?: string, required?: boolean) => RuleObject[];
