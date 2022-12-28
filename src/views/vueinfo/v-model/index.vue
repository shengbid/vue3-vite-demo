<template>
  <div>
    <h3>v-model实现</h3>
    <my-input
      v-model.capitalize="inputValue"
      v-model:titleValue.capitalize="title"
    />
    <div>inputValue: {{ inputValue }}</div>
    <div>titleValue: {{ title }}</div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import MyInput from "./components/child2.vue";
export default {
  components: {
    MyInput,
  },
  setup() {
    const value = reactive({
      inputValue: "",
      title: "",
    });

    return {
      ...toRefs(value),
    };
  },
};
</script>
