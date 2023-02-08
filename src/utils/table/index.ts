import _ from "lodash-es";
import { ref, computed } from "vue";

import type { Ref, ComputedRef } from "vue";
import type { UseAsyncStateReturn } from "@vueuse/core";
import type { TableProps, TablePaginationConfig } from "ant-design-vue";

export interface UsePaginationData {
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

export const usePagination = function<T>(size: number = 10, useState?: UseAsyncStateReturn<T, true>): UsePagination & UseAsyncStateReturn<T, true> {
  const current = ref<number>(1);
  const pageSize = ref<number>(size);
  if (useState) {
    const { state, execute, ...data } = useState;
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
    const callback = function(delay?: number, ...args: any[]) {
      const query = {
        total: total.value,
        current: current.value,
        pageSize: pageSize.value,
      };
      return execute(delay, query, ...args);
    };
    const pagination = computed<TablePaginationConfig>(function() {
      return {
        current: current.value,
        total: total.value,
        pageSize: pageSize.value,
        size: "default",
        onChange: function(page: number, limint: number) {
          pageSize.value = limint;
          current.value = page;
          callback(50);
        }
      };
    });
    return { ...data, state, execute: callback, current, pageSize, pagination, total };
  } else {
    const total = ref<number>(0);
    const pagination = computed<TablePaginationConfig>(function() {
      return {
        current: current.value,
        total: total.value,
        pageSize: pageSize.value,
        size: "default",
      };
    });
    return { current, pageSize, total, pagination } as any;
  }
}

export const useSelection = function<T>()  {
  const selected = ref<T[]>([]);
  const selectedKeys = ref<Array<string | number>>([]);
  const onChange = function(selectedRowKeys: string[], selectedRows: T[]): void {
    selected.value = selectedRows as any;
    selectedKeys.value = selectedRowKeys;
  };

  const rowSelection: TableProps['rowSelection'] = {
    onChange: onChange as any,
    selectedRowKeys: selectedKeys as any,
    getCheckboxProps: function(record: T) {
      return {
        disabled: _.get<T, string>(record, "disabled") || false,
        name: _.get<T, string>(record, "key"),
      }
    },
  };

  const onClearSelected = function() {
    selected.value = [];
    selectedKeys.value = [];
  }

  return {
    selected,
    selectedKeys,
    rowSelection, 
    onClearSelected,
  };
};