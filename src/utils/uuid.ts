/**
 * @file UUID 计算
 * @author svon.me@gmail.com
 */

import _ from "lodash-es";
import { v1 as uuidV1, v4 as uuidV4, v5 as uuidV5 } from "uuid";

// 生成唯一值
export const UUid = function (...args: any[]): string {
  function create(): string {
    if (args.length > 0) {
      if (args.length === 1 && _.isString(args[0])) {
        return uuidV5(args[0], uuidV5.URL);
      }
      const text = JSON.stringify(args);
      return uuidV5(text, uuidV5.URL);
    }
    if (Math.random() > 0.5) {
      return uuidV1();
    }
    return uuidV4();
  }
  const text = create();
  return text.replace(/-/g, "");
};