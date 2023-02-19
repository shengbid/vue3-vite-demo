<template>
  <div>
    <a-result
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <a-button type="primary" @click="toHome">Back Home</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const toHome = () => {
      router.push("/home");
    };
    return {
      toHome
    };
  }
};
</script>