<template>
  <div>
    第二层组件
    <div>最外层数据:{{ name }}</div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const name = inject("parentName");
    return {
      name,
    };
  },
};
</script>
