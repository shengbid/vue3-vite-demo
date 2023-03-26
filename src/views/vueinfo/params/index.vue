<template>
  <div class="box">
    <h3>跨层级组件参数传递,祖孙组件传值</h3>
    <a-button @click="editName">修改最外层组件parentname值</a-button>
    <div class="child">
      <Child :title="title" :age="age" @click="clickChild" />
    </div>

    <div>
      <h3>兄弟组件传参</h3>
      <div class="card-a">
        <CardA />
      </div>
      <div class="card-b">
        <CardB />
      </div>
    </div>
  </div>
</template>

<script setup>
import Child from "./components/child.vue";
import { ref, provide } from "vue";
import CardA from "./components/cardA.vue";
import CardB from "./components/cardB.vue";
import moment from "moment";

const title = ref("父组件传递的title");
const age = ref(17);
const parentName = ref("parentName");

provide("parentName", parentName);

const clickChild = val => {
  console.log(val);
  parentName.value = "父组件值改变了,parentName: " + moment().second();
};
const editName = () => {
  parentName.value = "parentName: " + moment().second();
};
</script>
<style lang="less">
.box {
  width: 500px;
  background-color: orange;
  padding: 24px;
  .child {
    background-color: greenyellow;
    padding: 24px;
  }
  .card-a {
    background-color: royalblue;
    padding: 24px;
  }
  .card-b {
    background-color: palevioletred;
    padding: 24px;
  }
}
</style>