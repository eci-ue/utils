import * as _ from "lodash-es";
import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { UsePagination, UseSelection } from "./props";
import type { UseAsyncStateReturn } from "@vueuse/core";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { TableProps, TablePaginationConfig } from "ant-design-vue";

export const useSelection = function<T>(): UseSelection<T>  {
  const selected: any = ref<T[]>([]);
  const selectedKeys = ref<Array<string | number>>([]);
  const onChange: any = function(keys: string[], rows: T[]): void {
    selected.value = rows as any;
    selectedKeys.value = keys;
  };

  const rowSelection: TableProps['rowSelection'] = {
    onChange,
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

export const usePagination = function<T, Shallow extends boolean = true>(
  value: number | RouteLocationNormalizedLoaded = 10, 
  useState?: UseAsyncStateReturn<T, any, Shallow>
): UsePagination & UseAsyncStateReturn<T, any, Shallow> {
  let current: Ref<number>;
  let pageSize: Ref<number>;
  if (typeof value === "object") {
    const page = value.query?.page || 1;
    const limit = value.query?.limit || 10;
    current = ref<number>(Number(page));
    pageSize = ref<number>(Number(limit));
  } else {
    current = ref<number>(1);
    pageSize = ref<number>(value);
  }

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

