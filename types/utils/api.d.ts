/**
 * 接口统一返回结果
 */
export declare class ApiResult<Data = object> {
    code: number;
    message: string;
    data: Data | undefined;
}
/**
 * 分页查询统一结果
 */
export declare class PageResult<Data = object> {
    results: Data[];
    total: number;
    constructor(list?: Data[], total?: number);
}
