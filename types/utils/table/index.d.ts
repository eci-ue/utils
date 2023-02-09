import type { UsePagination, UseSelection } from "./props";
import type { UseAsyncStateReturn } from "@vueuse/core";
export declare const useSelection: <T>() => UseSelection<T>;
export declare const usePagination: <T>(size?: number, useState?: UseAsyncStateReturn<T, true>) => UsePagination & UseAsyncStateReturn<T, true>;
