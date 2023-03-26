<template>
  <div>
    home
    <a-button @click="editName">修改parentname</a-button>
    <Child :title="title" :age="age" @click="clickChild" />

    <div>
      <CardA />
      <CardB />
    </div>
  </div>
</template>

<script setup>
import Child from "./components/child.vue";
import { ref, provide } from "vue";
import CardA from "./components/cardA.vue";
import CardB from "./components/cardB.vue";

const title = ref("父组件传递的title");
const age = ref(17);
const parentName = ref("parentName");

provide("parentName", parentName);

const clickChild = (val) => {
  console.log(val);
};
const editName = () => {
  parentName.value = "parentName" + new Date();
};
</script>
