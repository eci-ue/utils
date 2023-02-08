/**
 * @file table 常用方法
 * @author svon.me@gmail.com
 */

import type { Ref, ComputedRef } from "vue";
import type { UseAsyncStateReturn } from "@vueuse/core";
import type { TablePaginationConfig, TableProps } from "ant-design-vue";

export declare interface UsePaginationData {
  current: number;
  total: number;
  pageSize: number;
}

interface UsePagination {
  current: Ref<number>;
  total: Ref<number>;
  pageSize: Ref<number>;
  pagination: ComputedRef<TablePaginationConfig>;
}

interface UseSelection<T> {
  selected: Ref<T>;
  selectedKeys: Ref<Array<string | number>>;
  rowSelection: TableProps["rowSelection"];
  onClearSelected: () => void;
}

export declare const usePagination: <T>(size: number = 10, useState?: UseAsyncStateReturn<PageResult<T>, true>) => UsePagination & UseAsyncStateReturn<PageResult<T>, true>;

export declare const useSelection: <T>() => UseSelection<T>