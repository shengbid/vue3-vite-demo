<template>
  <div>
    user
    <!-- <Teleport to="#app">
      <TeleportBody></TeleportBody>
    </Teleport> -->
    <a-form
      class="form-contanier"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember"
          >Remember me</a-checkbox
        >
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
    <p>CutomModal: {{ value }}</p>
    <CutomModal v-model:title="value" />
    {{ $filters.formatNumber(6666.777) }}
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  getCurrentInstance,
  onMounted,
} from "vue";
//import TeleportBody from "./components/teleport.vue";
import CutomModal from "./components/customModel.vue";

export default {
  name: "user",
  // components: {
  //   TeleportBody,
  // },
  components: {
    CutomModal,
  },
  setup() {
    const formState = reactive({
      username: "",
      password: "",
      remember: true,
    });

    const value = ref(1);

    const { appContext } = getCurrentInstance();

    onMounted(() => {
      console.log(
        1,
        appContext.config.globalProperties.$filters.formatNumber(6666.777)
  
      );
       appContext.config.globalProperties.$myLoading.show()
      setTimeout(() => {
        appContext.config.globalProperties.$myLoading.close()
      }, 2000)
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      formState,
      value,
      onFinish,
      onFinishFailed,
    };
  },
};
</script>

<style lang="less">
.form-contanier {
  width: 600px;
  margin: 30px auto;
}
</style>
