<template>
  <div>
    <a-space :size="20">
      <a-date-picker v-model:value="date1" />
    </a-space>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import moment from "moment";

export default {
  setup() {
    const dateInfo = reactive({
      date1: moment("2023-02-02"),
    });
    return {
      ...toRefs(dateInfo),
    };
  },
};
</script>
