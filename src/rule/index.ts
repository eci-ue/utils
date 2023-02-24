/**
 * @file 表单校验规则
 * @author svon.me@gmail.com
 * @description https://github.com/yiminghe/async-validator
 */

import * as _ from "lodash-es";
import type { RuleObject } from "ant-design-vue/lib/form/interface";

export type Transform = (value: any) => any;

export const text = function(message: string = "Please input", required:boolean = true, transform?: Transform): RuleObject[] {
  return [
    { 
      required, 
      message,
      trigger: ["blur"],
      transform: transform || toString
    }
  ];
}

export const integer = function(message: string = "Please input", required:boolean = true, transform?: Transform): RuleObject[] {
  return [
    { 
      type: "number",
      required, 
      message,
      trigger: ["blur"],
      transform: transform || toInteger
    }
  ];
}

export const number = function(message: string = "Please input", required:boolean = true, transform?: Transform): RuleObject[] {
  return [
    { 
      type: "number",
      required, 
      message,
      trigger: ["blur"],
      transform: transform || toNumber
    }
  ];
}

export const link = function(message: string = "Please input link", required:boolean = true, transform?: Transform): RuleObject[] {
  return [
    { 
      required, 
      message,
      type: "url",
      trigger: ["blur"],
      transform: transform || toString
    }
  ];
}

export const array = function(message: string = "Please select", required:boolean = true, transform?: Transform): RuleObject[] {
  return [
    { 
      required, 
      message,
      type: "array",
      trigger: ["blur"],
      min: 1,
      transform,
      validator(rule: RuleObject, value: any[]) {
        if (value && Array.isArray(value) && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject(message);
      },
    }
  ];
}

export const date = function(message: string = "Please input", required:boolean = true, transform?: Transform): RuleObject[] {
  return [
    { 
      type: "date",
      required, 
      message,
      trigger: ["blur"],
      transform: transform || toDate,
    }
  ];
}

export const noSpace = function(message: string = "不能包含空格", required: boolean = true, transform?: Transform): RuleObject[] {
  return [
    { 
      required, 
      message,
      transform,
      trigger: ["blur"],
      validator(rule: RuleObject, value: string) {
        if (/\s/g.test(value)) {
          return Promise.reject(message);
        }
        return Promise.resolve();
      },
    }
  ];
}

export const toString = function(value: string | number) {
  if(value || value === 0) {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }
  return value;
};

export const toNumber = function(value: string) {
  if (value && /^\d{1,}(\.\d{1,})?$/i.test(value)) {
    return _.toNumber(value);
  }
  return value;
}

export const toInteger = function(value: string) {
  if (value && /^\d+$/i.test(value)) {
    return _.toNumber(value);
  }
};

export const toDate = function(value: string) {
  if (value) {
    return new Date(value);
  }
  return null;
}


export const concat = function(...args: RuleObject[] | RuleObject[][]): RuleObject[] {
  return _.flattenDeep(args);
}