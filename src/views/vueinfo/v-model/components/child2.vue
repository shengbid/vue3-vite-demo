<template>
  <div>
    name: <input :value="modelValue" @input="inputValue" type="number" /> title:
    <input :value="titleValue" @input="inputTilte" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    titleValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const inputValue = (e) => {
      const value = e.target.value;
      emit("update:modelValue", value);
    };
    const inputTilte = (e) => {
      emit("update:titleValue", e.target.value);
    };
    return {
      inputValue,
      inputTilte,
    };
  },
};
</script>
