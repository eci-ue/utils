<h1 align="center">@ui/model</h1>

<div align="center">
  <h3>基于 Ant Design 而封装的弹框</h3>
  <p>简单配置，快速开发</p>
</div>

## 功能

- 使用简单，无需配置 Dom 结构
- 无需使用变量控制 Model 的显示与隐藏

## 安装

```
pnpm install @ui/model --registry http://npm.jslion.xyz/
```

**使用**

```
import { confirm } from "@ui/model";
```

## 案例

**字符**
```
<script setup lang="ts">
import { confirm } from "@ui/model";
import { Button } from "ant-design-vue";

const onClick = function() {
  confirm("hello World", "提示");
}
</script>

<template>
  <div>
    <Button @click="onClick">提示</Button>
  </div>
</template>
```


**组件**

[参考@ui/form](https://github.com/eci-ui/form#readme)

## 参数配置

```
import { confirm } from "@ui/model";
confirm: <Value = string, T = object, Props = object>(value: Value, config?: string | ModalFuncProps, props?: Props) => Promise<T | Confirm>;
```

名称 | 类型 | 是否必填 | 描述
-- | -- | -- | -- 
value | string、Component | 是 | 弹框内容
config | string、ModalFuncProps | 否 | Antd Model Props 配置, 为 String 时默认为 title
props | Object | 否 | 当 value 为 Component 时有效, 以 Props 时传给该组件



**iframe**

```
import { iframe } from "@ui/model";
import { Button } from "ant-design-vue";

const onClick = function() {
  // 以全屏方式展示
  iframe("url");
}