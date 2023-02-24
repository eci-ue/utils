/**
 * @file 校验
 * @author svon.me@gmail.com
 */

import * as _ from "lodash-es";
import * as Suffix from "./suffix";

export { Suffix };

/**
 * 判断文件后缀是否符合规范
 * @param value  文件名称或文件后缀
 * @param suffix 后缀或者后缀别名
 * @returns boolean
 */
export const fileSuffix = function(value: string, suffix: string | string[] | "Transdoc" | "MemoQ"): boolean {
  const name = _.toLower(_.last(value.split(".")));
  let list: string[];
  if (suffix === "Transdoc") {
    list = [...Suffix.Transdoc];
  } else if (suffix === "MemoQ") {
    list = [...Suffix.MemoQ];
  } else if (Array.isArray(suffix)) {
    list = suffix.map(v => _.toLower(v));
  } else if (typeof suffix === "string"){
    list = [_.toLower(suffix)];
  } else {
    return false;
  }
  return list.includes(name);
}