<script setup lang="ts">

import { $debounce, debounce } from "../src"

class Test {
  @$debounce()
  async click () {
    console.log("触发 click");
    return 1;
  }
}

const test = new Test();
const onClick = async function() {
  const value = await test.click();
  console.log("click 结果 = %s", value);
}
</script>

<template>
  <div>
    <button @click="onClick">test</button>
  </div>
</template>