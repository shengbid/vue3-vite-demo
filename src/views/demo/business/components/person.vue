<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="form"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 17 }"
  >
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="12">
        <a-form-item label="联系人" name="name">
          <a-input v-model:value="form.name" />
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <a-form-item label="联系电话" name="phone">
          <a-input v-model:value="form.phone" />
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <a-form-item label="额度" name="amount">
          <a-input-number v-model:value="form.amount" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <a-form-item label="已用额度" name="usedAmount">
          <a-input-number v-model:value="form.usedAmount" style="width: 100%" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const formRef = ref(null);
    const form = ref({ ...props.formData });
    watch(
      () => props.formData,
      (newVal) => {
        form.value = { ...newVal };
      }
    );
    const rules = {
      name: [
        {
          required: true,
          message: "请输入联系人",
          trigger: "blur",
        },
      ],
      phone: [
        {
          required: true,
          message: "请输入联系电话",
          trigger: "blur",
        },
      ],
      amount: [
        {
          required: true,
          message: "请输入额度",
          trigger: "blur",
        },
      ],
      usedAmount: [
        {
          required: true,
          message: "请输入已用额度",
          trigger: "blur",
        },
      ],
    };

    const validateForm = () => {
      return formRef.value.validate();
    };
    return {
      formRef,
      form,
      rules,
      validateForm,
    };
  },
};
</script>

<style></style>
