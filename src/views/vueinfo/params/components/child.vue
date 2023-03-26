<template>
  <div>
    <h3>子组件</h3>
    <p>title: {{ title }}</p>
    <p>age: {{ age }}</p>
    <a-button @click="click" type="primary">触发最外层组件事件</a-button>
    <ChildTwo />
  </div>
</template>

<script setup>
import ChildTwo from "./childTwo.vue";
import { defineProps, defineEmits } from "vue";

defineProps({
  title: String,
  age: Number
});

const emit = defineEmits(["click"]);

const click = () => {
  emit("click", { a: 1 });
};
</script>
