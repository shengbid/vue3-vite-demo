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
          <a-input v-model:value="form.userName" placeholder="用户名admin">
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="passWord">
          <a-input-password
            v-model:value="form.passWord"
            placeholder="密码123456"
          >
            <template #prefix>
              <security-scan-outlined />
            </template>
          </a-input-password>
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
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo";
import { UserOutlined, SecurityScanOutlined } from "@ant-design/icons-vue";

export default {
  name: "login",
  components: {
    UserOutlined,
    SecurityScanOutlined,
  },
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
    const router = useRouter();
    const submit = async () => {
      await formRef.value.validate();
      if (!roles.includes(form.userName) || form.passWord !== "123456") {
        message.warn("账号或密码错误,账号admin,role1,role2,密码123456");
        return;
      }
      message.success("登陆成功!");
      // 将登陆信息存在本地,方便路由拦截
      sessionStorage.setItem("loginInfo", JSON.stringify(form));
      router.push("home");
      const { userInfo, changeUserInfo } = useUserInfoStore();
      changeUserInfo({ ...userInfo, name: form.userName });
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
