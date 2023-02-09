/**
 * @file 异步组件
 * @author svon.me@gmail.com
 */
import type { AsyncComponentLoader, Component } from "vue";
export declare const lazyload: (value: AsyncComponentLoader, loading?: Component, delay?: number) => Component;
