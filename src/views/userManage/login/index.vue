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
        <p>
          <a @click="openSlide" href="javascript:void(0);">点击弹出滑块验证</a>
        </p>
        <div class="login-btn">
          <a-button type="primary" @click="submit">确定</a-button>
        </div>
      </a-form>
    </div>
    <a-modal v-model:visible="visible" title="身份验证" :footer="false">
      <SlideVerify
        :w="450"
        :h="300"
        :imgs="imgs"
        @success="onSuccess"
        @fail="onFail"
      />
    </a-modal>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo";
import { UserOutlined, SecurityScanOutlined } from "@ant-design/icons-vue";
import img0 from "@/assets/image/img.jpg";
import img1 from "@/assets/image/img1.jpg";
import img2 from "@/assets/image/img2.jpg";
import img3 from "@/assets/image/img3.jpg";
import img4 from "@/assets/image/img4.jpg";
import img5 from "@/assets/image/img5.jpg";
import SlideVerify from "./components/slide-verify.vue";

export default {
  name: "login",
  components: {
    UserOutlined,
    SecurityScanOutlined,
    SlideVerify,
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

    const slideInfo = reactive({
      visible: false,
      imgs: [img0, img1, img2, img3, img4, img5],
    });
    const slideRef = ref(null);

    // 打开滑块弹框
    const openSlide = () => {
      slideInfo.visible = true;
    };

    // 验证成功
    const onSuccess = () => {
      message.success("验证成功");
      slideInfo.visible = false;
    };
    // 验证失败
    const onFail = () => {
      message.success("验证失败!");
    };
    // 后端验证方法
    const onJudge = () => {};

    return {
      form,
      rules,
      formRef,
      submit,
      ...toRefs(slideInfo),
      slideRef,
      openSlide,
      onSuccess,
      onFail,
      onJudge,
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
