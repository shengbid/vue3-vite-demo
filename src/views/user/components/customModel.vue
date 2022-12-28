<template>
  <div>
    modelValue:
    <input :value="title" @input="inputChange" />
    {{ title }}
    <input v-focus />
  </div>
</template>

<script>
export default {
  // props: ["modelValue"],
  // emits: ["update:modelValue"], // 默认是modelValue
  props: ["title"],
  emits: ["update:title"],
  directives: {
    // 在模板中启用 v-focus
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
  setup(props, { emit }) {
    console.log(props);
    const inputChange = (e) => {
      console.log(e.target.value);
      emit("update:title", e.target.value);
    };
    return { inputChange };
  },
};
</script>
