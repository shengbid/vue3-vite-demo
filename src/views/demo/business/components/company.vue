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
        <a-form-item label="注册地址" name="address">
          <a-input v-model:value="form.address" />
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
      <a-col class="gutter-row" :span="12">
        <a-form-item label="附件" name="fileList">
          <a-upload
            v-model:file-list="form.fileList"
            list-type="picture-card"
            @change="changeFile"
            :beforeUpload="beforeUpload"
          >
            <div v-if="form.fileList.length < 5">
              <plus-outlined />
              <div style="margin-top: 8px">上传</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { ref, watch } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    PlusOutlined,
  },
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
      address: [
        {
          required: true,
          message: "请输入注册地址",
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
      fileList: [
        {
          required: true,
          message: "请上传附件",
          trigger: "change",
        },
      ],
    };

    const beforeUpload = (file, fileList) => {
      console.log(file, fileList);
      return false;
    };

    const changeFile = (file) => {
      console.log(33, file);
    };

    const validateForm = () => {
      return formRef.value.validate();
    };
    return {
      formRef,
      form,
      beforeUpload,
      changeFile,
      validateForm,
      rules,
    };
  },
};
</script>

<style></style>
