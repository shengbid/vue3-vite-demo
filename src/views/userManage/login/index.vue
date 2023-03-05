<template>
  <div class="login-container">
    <div class="login-form">
      <h3 class="title">登陆</h3>
      <a-form
        ref="formRef"
        name="dynamic_form_item"
        :model="form"
        :rules="rules"
      >
        <a-form-item name="userName">
          <a-input v-model:value="form.userName" placeholder="用户名admin" />
        </a-form-item>
        <a-form-item name="passWord">
          <a-input v-model:value="form.passWord" placeholder="密码123456" />
        </a-form-item>
        <p><a href="javascript:void(0);">忘记密码?</a></p>
        <div class="login-btn">
          <a-button type="primary" @click="submit">确定</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";

export default {
  name: "login",
  setup() {
    const form = reactive({
      userName: "",
      passWord: "",
    });
    const rules = {
      userName: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      passWord: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    };
    const formRef = ref(null);
    const roles = ["admin", "role1", "role2"];
    const submit = async () => {
      await formRef.value.validate();
      if (!roles.includes(form.userName) || form.passWord !== "123456") {
        message.warn("账号或密码错误,账号admin,role1,role2,密码123456");
      }
    };
    return {
      form,
      rules,
      formRef,
      submit,
    };
  },
};
</script>

<style lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6f7ff;
  height: 100vh;
  .login-form {
    background-color: #fff;
    width: 400px;
    padding: 24px;
    .title {
      margin-bottom: 12px;
      text-align: center;
    }
    .login-btn {
      text-align: right;
    }
  }
}
</style>
