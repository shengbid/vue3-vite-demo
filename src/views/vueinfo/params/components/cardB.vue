<template>
  <div>
    <a-card title="兄弟B组件" style="width: 300px">
      <a-button type="primary" @click="toCardB">传递数据给A</a-button>
    </a-card>
  </div>
</template>

<script>
import Bus from "@/Bus";

export default {
  setup() {
    const toCardB = () => {
      Bus.emit("time", new Date().getTime());
    };
    return {
      toCardB,
    };
  },
};
</script>
