import type { Ref, ComputedRef } from "vue";
import type { TablePaginationConfig, TableProps } from "ant-design-vue";
export interface UsePaginationData {
    current: number;
    total: number;
    pageSize: number;
}
export interface UsePagination {
    current: Ref<number>;
    total: Ref<number>;
    pageSize: Ref<number>;
    pagination: ComputedRef<TablePaginationConfig>;
}
export declare interface UsePaginationData {
    current: number;
    total: number;
    pageSize: number;
}
export interface UseSelection<T> {
    selected: Ref<T[]>;
    selectedKeys: Ref<Array<string | number>>;
    rowSelection: TableProps["rowSelection"];
    onClearSelected: () => void;
}
