<template>
  <div>
    <h3>动态增减表单</h3>
    <a-button type="primary" @click="addTable">新增</a-button>
    <a-form
      ref="formRef"
      name="dynamic_form_item"
      :model="info"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 10 }"
    >
      <order
        @deleteTable="deleteTable"
        :order="i"
        v-for="(item, i) in formList"
        :form="item"
      />
    </a-form>
    <div class="submit" v-show="formList.length">
      <a-button type="primary" @click="submit">提交</a-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import Order from "./components/order.vue";
import { message } from "ant-design-vue";
export default {
  components: {
    Order
  },
  setup() {
    const info = reactive({
      formList: [] // 这个formList就是子组件里name的第一项,
    });
    const formRef = ref(null);
    const addTable = () => {
      info.formList.push({
        name: "",
        age: null,
        date: ""
      });
    };
    const deleteTable = key => {
      info.formList.splice(key, 1);
      console.log(key, info.formList);
    };
    const submit = () => {
      formRef.value.validateFields().then(() => {
        console.log(info.formList);
        message.success("success");
      });
    };
    return {
      info,
      ...toRefs(info),
      addTable,
      deleteTable,
      submit,
      formRef
    };
  }
};
</script>

<style>
.submit {
  text-align: right;
  margin-top: 20px;
}
</style>