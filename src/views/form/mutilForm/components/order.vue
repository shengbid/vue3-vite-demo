<template>
  <div class="order">
    <p>序号: {{ order + 1 }}</p>
    <a-button type="primary" @click="deleteTable">删除</a-button>
    <a-form-item
      label="名称"
      :name="['formList', order, 'name']"
      :rules="rules.name"
    >
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item
      label="年龄"
      :name="['formList', order, 'age']"
      :rules="rules.age"
    >
      <a-input-number v-model:value="form.age" style="width: 100%" />
    </a-form-item>
    <a-form-item
      label="日期"
      :name="['formList', order, 'date']"
      :rules="rules.date"
    >
      <a-date-picker
        v-model:value="form.date"
        value-format="YYYY-MM-DD"
        style="width: 100%"
      />
    </a-form-item>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    order: {
      // 表单序号
      type: Number,
      default: 0
    },
    form: {
      // 每一项表单
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const formRef = ref(null);
    const rules = {
      name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
      date: [{ required: true, message: "请选择日期", trigger: "change" }]
    };

    const deleteTable = () => {
      emit("deleteTable", props.order);
    };
    return {
      deleteTable,
      rules,
      formRef
    };
  }
};
</script>

<style>
.order {
  margin-top: 15px;
  background: wheat;
  padding: 12px;
}
</style>