<template>
  <div>
    <p>信息修改后,右上角登陆名称同步更新</p>
    <a-card title="个人信息" style="width: 65%">
      <a-form
        ref="formRef"
        name="dynamic_form_item"
        :model="form"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="12">
            <a-form-item label="姓名" name="name">
              <a-input v-model:value="form.name" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="性别" name="sex">
              <a-select
                v-model:value="form.sex"
                :options="sexOptions"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="电话" name="phone">
              <a-input-number v-model:value="form.phone" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="职业" name="worker">
              <a-input v-model:value="form.worker" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="24">
            <a-form-item
              label="地址"
              name="address"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-textarea v-model:value="form.address" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-button type="primary" @click="submit">保存</a-button>
    <a-button @click="reset" style="margin-left: 10px">重置</a-button>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useUserInfoStore } from "@/stores/userInfo";

export default {
  name: "userInfo",
  setup() {
    const sexOptions = [
      { value: "0", label: "男" },
      { value: "1", label: "女" },
    ];
    const formRef = ref(null);
    const userStore = useUserInfoStore();
    const form = reactive({ ...userStore.userInfo });

    const rules = {
      address: [
        {
          required: true,
          message: "请输入地址",
          trigger: "blur",
        },
      ],
      name: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
      sex: [
        {
          required: true,
          message: "请选择性别",
          trigger: "blur",
        },
      ],
      phone: [
        {
          required: true,
          message: "请输入电话",
          trigger: "change",
        },
      ],
      worker: [
        {
          required: true,
          message: "请输入职业",
          trigger: "change",
        },
      ],
    };
    const submit = () => {
      formRef.value.validate().then(() => {
        userStore.changeUserInfo(form);
        console.log("修改后的值", userStore, userStore.$state.userInfo);
      });
    };
    const reset = () => {
      formRef.value.resetFields();
    };
    return {
      sexOptions,
      formRef,
      form,
      rules,
      submit,
      reset,
    };
  },
};
</script>

<style>
</style>