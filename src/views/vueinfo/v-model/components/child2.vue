<template>
  <div>
    name: <input :value="modelValue" @input="inputValue" /> title:
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
    modelModifiers: { default: () => ({}) },
    titleValueModifiers: { default: () => ({}) },
  },
  setup(props, { emit }) {
    // console.log(props.modelModifiers);
    const inputValue = (e) => {
      let value = e.target.value;
      if (props.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      emit("update:modelValue", value);
    };
    const inputTilte = (e) => {
      let value = e.target.value;
      if (props.titleValueModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      emit("update:titleValue", value);
    };
    return {
      inputValue,
      inputTilte,
    };
  },
};
</script>
