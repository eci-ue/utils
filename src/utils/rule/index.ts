/**
 * @file 表单校验规则
 * @author svon.me@gmail.com
 * @description https://github.com/yiminghe/async-validator
 */

import type { RuleObject } from "ant-design-vue/lib/form/interface";

export const text = function(message: string = "Please input", required:boolean = true): RuleObject[] {
  return [
    { 
      required, 
      message,
      trigger: ["blur"],
      transform (value: string | number) {
        if(value || value === 0) {
          return String(value);
        }
      }
    }
  ];
}

export const integer = function(message: string = "Please input", required: boolean = true): RuleObject[] {
  return [
    { 
      type: "number",
      required, 
      message,
      trigger: ["blur"],
      transform (value: string) {
        if (value && /^\d+$/i.test(value)) {
          return Number(value);
        }
      }
    }
  ];
}

export const number = function(message: string = "Please input", required: boolean = true): RuleObject[] {
  return [
    { 
      type: "number",
      required, 
      message,
      trigger: ["blur"],
      transform (value: string) {
        if (value && /^\d{1,}(\.\d{1,})?$/i.test(value)) {
          return Number(value);
        }
        return value;
      }
    }
  ];
}

export const link = function(message: string = "Please input link", required: boolean = true): RuleObject[] {
  return [
    { 
      required, 
      message,
      type: "url",
      trigger: ["blur"],
      transform (value: string | number) {
        if(value || value === 0) {
          return String(value);
        }
      }
    }
  ];
}

export const array = function(message: string = "Please select", required: boolean = true): RuleObject[] {
  return [
    { 
      required, 
      message,
      type: "array",
      trigger: ["blur"],
      min: 1,
      validator(rule: RuleObject, value: any[]) {
        if (value && Array.isArray(value) && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject(message);
      },
    }
  ];
}

export const date = function(message: string = "Please input", required: boolean = true): RuleObject[] {
  return [
    { 
      type: "date",
      required, 
      message,
      trigger: ["blur"],
      transform(value: string) {
        if (value) {
          return new Date(value);
        }
        return null;
      },
    }
  ];
}