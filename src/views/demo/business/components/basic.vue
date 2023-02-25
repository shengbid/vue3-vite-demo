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
      <a-col class="gutter-row" :span="12" style="display: none">
        <a-form-item label="key" name="key">
          <a-input v-model:value="form.key" />
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <a-form-item label="机构名称" name="name">
          <a-input v-model:value="form.name" />
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <a-form-item label="总额度" name="amount">
          <a-input-number v-model:value="form.amount" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <a-form-item label="成立日期" name="establishDate">
          <a-date-picker
            v-model:value="form.establishDate"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <a-form-item label="机构类型" name="orgType">
          <a-select
            style="width: 100%"
            v-model:value="form.orgType"
            @change="changeOrgType"
          >
            <a-select-option value="person"> 个人 </a-select-option>
            <a-select-option value="company"> 机构 </a-select-option>
            <a-select-option value="all"> 不区分 </a-select-option>
          </a-select>
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
  setup(props, { emit }) {
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
          message: "请输入机构名称",
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
      establishDate: [
        {
          required: false,
          message: "请选择成立日期",
          trigger: "change",
        },
      ],
      orgType: [
        {
          required: true,
          message: "请选择机构类型",
          trigger: "change",
        },
      ],
    };
    // 机构类型选择
    const changeOrgType = (val) => {
      emit("changeOrgType", val);
    };
    const validateForm = () => {
      return formRef.value.validateFields();
      //   return new Promise((resolve, reject) => {
      //     formRef.value.validate((valid) => {
      //       if (valid) {
      //         console.log("basic", form);
      //         resolve(valid);
      //       } else {
      //         reject("err");
      //       }
      //     });
      //   });
    };
    return {
      formRef,
      form,
      changeOrgType,
      rules,
      validateForm,
    };
  },
};
</script>

<style></style>
