/**
 * @file 封装数据请求
 * @author svon.me@gmail.com
 * @documentation https://www.npmjs.com/package/@js-lion/api
 */
import { PageResult } from "../api";
import type { UseAsyncStateOptions } from "@vueuse/core";
export declare const data: <T = any, Shallow extends boolean = true>(api: Promise<T> | ((...args: any[]) => Promise<T>), initialState?: T, options?: UseAsyncStateOptions<Shallow, any>) => {
    setState: <V = T>(state: V) => void;
    state: import("vue").Ref<T>;
    isReady: import("vue").Ref<boolean>;
    isLoading: import("vue").Ref<boolean>;
    error: import("vue").Ref<unknown>;
    execute: (delay?: number, ...args: any[]) => Promise<T>;
};
export declare const dataExecute: <T = any, Shallow extends boolean = true>(api: (...args: any[]) => Promise<T>, initialState?: T, options?: UseAsyncStateOptions<Shallow, any>) => {
    setState: <V = T>(state: V) => void;
    state: import("vue").Ref<T>;
    isReady: import("vue").Ref<boolean>;
    isLoading: import("vue").Ref<boolean>;
    error: import("vue").Ref<unknown>;
    execute: (delay?: number, ...args: any[]) => Promise<T>;
};
export declare const list: <T = any, Shallow extends boolean = true>(api: Promise<PageResult<T>> | ((...args: any[]) => Promise<PageResult<T>>), initialState?: PageResult<T>, options?: UseAsyncStateOptions<Shallow, any>, tableId?: string) => import("@vueuse/core").UseAsyncStateReturn<PageResult<T>, true>;
export declare const listExecute: <T = any, Shallow extends boolean = true>(api: (...args: any[]) => Promise<PageResult<T>>, initialState?: PageResult<T>, options?: UseAsyncStateOptions<Shallow, any>) => import("@vueuse/core").UseAsyncStateReturn<PageResult<T>, true>;
