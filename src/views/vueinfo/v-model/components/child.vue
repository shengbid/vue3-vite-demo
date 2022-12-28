<template>
  <input :value="modelValue" @input="inputValue" type="number" />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const inputValue = (e) => {
      const value = e.target.value;
      emit("updatemodelValue", value);
    };
    return {
      inputValue,
    };
  },
};
</script>
