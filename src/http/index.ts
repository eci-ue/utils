/**
 * @file 封装数据请求
 * @author svon.me@gmail.com
 * @documentation https://www.npmjs.com/package/@js-lion/api
 */

import * as _ from "lodash-es";
import { toRaw } from "vue";
import { PageResult } from "../api";
import { useAsyncState } from "@vueuse/core";
import type { UseAsyncStateOptions } from "@vueuse/core";


const listNormalize = function<T>(list: T[], tableId: string = "id") {
  return _.map(list, function(item: T) {
    if (_.isObject(item)) {
      const children = _.get<T, string>(item, "children") as T[];
      const key: string | number = _.get<T, string>(item, tableId);
      if (children && Array.isArray(children) && children.length > 0) {
        _.set(item, "children", listNormalize(children, tableId));
      }
      return { key, ...item };
    }
    return item;
  });
};

export const data = function<T = any, Shallow extends boolean = true>(
  api: Promise<T> | ((...args: any[]) => Promise<T>), 
  initialState?: T, 
  options?: UseAsyncStateOptions<Shallow>
) {
  // @ts-ignore
  const value = useAsyncState<T>(api, initialState || {}, options);
  const setState = function<V = T>(state: V) {
    const data = toRaw(value.state.value);
    value.state.value = { ...data, ...state };
  };
  return { ...value, setState };
};

export const dataExecute = function<T = any, Shallow extends boolean = true>(
  api: (...args: any[]) => Promise<T>, 
  initialState?: T, 
  options: UseAsyncStateOptions<Shallow> = {
    immediate: false,
    resetOnExecute: false
  }
) {
  return data<T, Shallow>(api, initialState, options);
}

export const list = function<T = any, Shallow extends boolean = true>(
  api: Promise<PageResult<T>> | ((...args: any[]) => Promise<PageResult<T>>), 
  initialState?: PageResult<T>, 
  options?: UseAsyncStateOptions<Shallow>,
  tableId?: string
) {
  const value = initialState || {
    total: 0,
    results: []
  };
  const ajax = async function(...args: any[]) {
    let data: PageResult<T>;
    let temp: PageResult<T> | T[];
    if (typeof api === "function") {
      temp = await api(...args);
    } else {
      temp = await Promise.resolve(api);
    }
    if (Array.isArray(temp)) {
      data = new PageResult<T>(temp);
    } else {
      const omit = _.omit(temp, ["results", "total"]);
      data = new PageResult<T>(temp.results, temp.total);
      Object.assign(data, omit);
    }
    data.results = listNormalize(data.results, tableId);
    return data;
  };
  // @ts-ignore
  return useAsyncState<PageResult<T>>(ajax, value, options);
};

export const listExecute = function<T = any, Shallow extends boolean = true>(
  api: ((...args: any[]) => Promise<PageResult<T>>), 
  initialState?: PageResult<T>, 
  options: UseAsyncStateOptions<Shallow> = {
    immediate: false,
    resetOnExecute: false
  }
) {
  return list(api, initialState, options);
}