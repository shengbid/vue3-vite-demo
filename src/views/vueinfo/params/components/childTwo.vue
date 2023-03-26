<template>
  <div class="sun">
    孙子组件
    <div>来自最外层的数据:{{ name }}</div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const name = inject("parentName");
    return {
      name
    };
  }
};
</script>
<style>
.sun {
  padding: 12px;
  background-color: rgb(133, 116, 241);
}
</style>
