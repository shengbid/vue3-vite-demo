<template>
  <div>
    transition
    <a-button @click="show = !show">点击切换动画</a-button>
    <a-button @click="show2 = !show2">点击切换动画</a-button>
    <div class="box">
      <Transition name="slide-fade">
        <div v-show="show" class="box1"></div>
      </Transition>
      <Transition name="bounce">
        <div v-show="show2" class="box2"></div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const show = ref(true);
    const show2 = ref(true);

    return { show, show2 };
  },
};
</script>

<style lang="less">
.box {
  display: flex;
  justify-content: space-between;
}
.box1 {
  width: 200px;
  height: 200px;
  background-color: yellow;
}
.box2 {
  width: 200px;
  height: 200px;
  background-color: green;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(120px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
