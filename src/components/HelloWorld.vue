<script setup>
import "../styles/index.css";
import "../styles/common.less";

import {
  ref,
  reactive,
  readonly,
  computed,
  watch,
  onBeforeMount,
  onMounted,
} from "vue";

defineProps({
  msg: String,
});
const text = ref(null);
onBeforeMount(() => {
  console.log("onBeforeMount", text.value);
});
onMounted(() => {
  console.log("onMount", text.value);
});

const count = ref(0);
const count2 = ref(1);
const sum = computed(() => {
  return count.value + count2.value;
});

// watch([count, count2], (newVal, oldVal) => {
//   console.log(newVal, oldVal);
// });
const color = "red";
const form = reactive({
  date: "2022-09-16",
});
const list = [
  { name: "第一条", count: 1 },
  { name: "第二条", count: 2 },
];
const read = readonly({ a: 1 });

const clickForm = () => {
  form.date = "2022-09-26";
};
</script>

<template>
  <h1 class="text" ref="text">{{ msg }}</h1>

  <p class="word">标题{{ form.date }}</p>

  <div v-for="item in list" :key="item.name">
    名字: {{ item.name }} 数量: {{ item.count }}
  </div>
  <input v-model="count" />
  <input v-model="count2" />
  <div>computed: {{ sum }}</div>
  <button @click="clickForm">点击改变form</button>
  <button type="button" @click="count++">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #0d9457;
}
.text {
  color: v-bind(color);
}
</style>
