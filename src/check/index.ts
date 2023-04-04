/**
 * @file 校验
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";

type Suffix = string | string[];

/**
 * 判断文件后缀是否符合规范
 * @param value  文件名称或文件后缀
 * @param suffix 后缀或者后缀别名
 * @returns boolean
 */
export const fileSuffix = async function(value: string, suffix: Suffix | (() => Suffix | Promise<Suffix>)): Promise<boolean> {
  const name = _.toLower(_.last(value.split(".")));
  let list: string[];
 if (Array.isArray(suffix)) {
    list = suffix.map(v => _.toLower(v));
  } else if (typeof suffix === "string"){
    list = [_.toLower(suffix)];
  } else if (typeof suffix === "function"){
    const data = await Promise.resolve(suffix());
    return fileSuffix(value, data);
  } else {
    return false;
  }
  return list.includes(name);
}