<template>
  <input
    type="text"
    :value="currentValue"
    @blur="handleBlur"
    @input="handleInput"
  />
</template>

<script>
import Emitter from "@/views/mixins/emitter";
export default {
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      this.currentValue = value;
      this.$emit("input", value);
      this.dispatch("formItem", "on-form-change", value);
    },
    handleBlur() {
      this.dispatch("formItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>

<style></style>
