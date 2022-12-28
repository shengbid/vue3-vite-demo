<template>
  <div class="loading" v-show="isShow">loading...</div>
</template>

<script>
import { ref, defineExpose } from "vue";
export default {
  setup() {
    const isShow = ref(false);

    const show = () => (isShow.value = true);
    const close = () => (isShow.value = false);

    return { isShow, show, close };
  },
};
</script>

<style scoped>
.loading {
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 30px;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
