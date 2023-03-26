<template>
  <div>
    <a-card title="兄弟A组件">
      <p>来自兄弟B的数据: 时间:{{ time }}</p>
    </a-card>
  </div>
</template>

<script>
import Bus from "@/Bus";
import { ref } from "vue";

export default {
  setup() {
    const time = ref("");

    Bus.on("time", val => {
      console.log(val, time.value);
      time.value = val;
    });
    return { time };
  }
};
</script>
