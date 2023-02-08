/**
 * 接口统一返回结果
 */
 export class ApiResult<Data = object> {
  // 状态码
  code: number = 200;
  // 状态信息
  message: string = "";
  // 返回数据
  data: Data | undefined;
}

/**
 * 分页查询统一结果
 */
export class PageResult<Data = object> {
  results: Data[]; // 列表数据
  total: number;   // 总数量
  constructor(list: Data[] = [], total?: number) {
    this.results = list;
    this.total = total ? total : list.length;
  }
}