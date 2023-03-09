/**
 * @file 工具
 * @author svon.me@gmail.com
 */

import { before, after } from "./hook/index";

export type { HookFunction } from "./hook/index";

export * as date from "./date";

export * as table from "./table";

export * as path from "./path";

export * as rule from "./rule";

export * as useState from "./http";

export * as icon from "./icon";

export * as check from "./check";

export * from "./util"

export const hook = { before, after };