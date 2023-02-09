/**
 * @file 异步组件
 * @author svon.me@gmail.com
 */

import { defineAsyncComponent} from "vue";

import type { AsyncComponentLoader, Component } from "vue";

export const lazyload = function(value: AsyncComponentLoader, loading?: Component,  delay: number = 300): Component {
  if (loading) {
    return defineAsyncComponent({
      delay,
      loader: value,
      loadingComponent: loading
    });
  }
  return defineAsyncComponent({
    loader: value
  });
};