/**
 * @file 封装数据请求
 * @author svon.me@gmail.com
 * @documentation https://www.npmjs.com/package/@js-lion/api
 */

import * as _ from "lodash-es";
import { computed, ref, toRaw } from "vue";
import { PageResult } from "../api";
import { useAsyncState } from "@vueuse/core";
import type { UseAsyncStateOptions, UseAsyncStateReturn } from "@vueuse/core";
import { TablePaginationConfig } from "ant-design-vue";

interface UseStateResult<Data, Params extends any[]> extends UseAsyncStateReturn<Data, Params, true>{
  setState: (value: Data | object) => void
}


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

export const data = function<T = any>(
  api: Promise<T> | ((...args: any[]) => T) | ((...args: any[]) => Promise<T>),
  initialState?: T, 
  options?: UseAsyncStateOptions<true>
): UseStateResult<T, any> {
  // @ts-ignore
  const value = useAsyncState<T>(api, (initialState || {}), options);
  const setState = function(state: T | object) {
    const data = toRaw(value.state.value);
    value.state.value = { ...data, ...state };
  };
  return { ...value, setState } as any;
};

export const dataExecute = function<T = any>(
  api: ((...args: any[]) => T) | ((...args: any[]) => Promise<T>),
  initialState?: T, 
  options: UseAsyncStateOptions<true> = {
    immediate: false,
    resetOnExecute: false
  }
): UseStateResult<T, any> {
  return data<T>(api, initialState, options);
}

export const list = function<T = any>(
  api: Promise<PageResult<T>> | ((...args: any[]) => PageResult<T>) | ((...args: any[]) => Promise<PageResult<T>>) | PageResult<T>, 
  initialState?: PageResult<T>, 
  options?: UseAsyncStateOptions<true>,
  tableId?: string
): UseAsyncStateReturn<PageResult<T>, any, true> {
  const value = initialState || new PageResult<T>();
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

export const listExecute = function<T = any>(
  api: ((...args: any[]) => PageResult<T>) | ((...args: any[]) => Promise<PageResult<T>>), 
  initialState?: PageResult<T>, 
  options: UseAsyncStateOptions<true> = {
    immediate: false,
    resetOnExecute: false
  }
): UseAsyncStateReturn<PageResult<T>, any, true> {
  return list(api, initialState, options);
}

export const paginationExecute = function<T = any>(
  api: ((...args: any[]) => PageResult<T>) | ((...args: any[]) => Promise<PageResult<T>>), 
  limit: number = 10,
) {
  let current = ref<number>(1);
  let pageSize = ref<number>(limit);

  const get = function(...args: any[]): Promise<PageResult<T>> {
    if (typeof api === "function") {
      const param = { current: current.value, pageSize: pageSize.value };
      return Promise.resolve(api(param, ...args));
    }
    return Promise.resolve(api);
  };
  const { state, execute, ...useValue } = listExecute<T>(get);

  const total = computed<number>({
    get: () => {
      // @ts-ignore
      return state.value.total || 0;
    },
    set: (value: number) => {
      // @ts-ignore
      state.value.total = value;
    }
  });

  const pagination = computed<TablePaginationConfig>(function() {
    return {
      current: current.value,
      total: total.value,
      pageSize: pageSize.value,
      size: "default",
      onChange: function(page: number, limint: number, ...args) {
        console.log(args);
        pageSize.value = limint;
        current.value = page;
        execute(50);
      }
    };
  });

  return { state, execute, ...useValue, current, pageSize, total, pagination };
}

export const pagination = function<T = any>(
  api: ((...args: any[]) => PageResult<T>) | ((...args: any[]) => Promise<PageResult<T>>), 
  limit: number = 10,
) {
  const value = paginationExecute(api, limit);
  value.execute(0);
  return value;
}