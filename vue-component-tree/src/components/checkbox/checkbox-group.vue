<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from "@/views/utils/assist";
import Emitter from "@/views/mixins";
export default {
  name: "kdCheckboxGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    };
  },
  methods: {
    updateModel(update) {
      this.childrens = findComponentsDownward(this, "kdCheckbox");
      if (this.childrens) {
        const { value } = this;
        this.childrens.forEach((child) => {
          child.model = value;
        });
        if (update) {
          child.currentValue = value.indexOf(child.label) >= 0;
          child.group = true;
        }
      }
    },
    change(date) {
      this.currentValue = date;
      this.$emit("input", data);
      this.$emit("on-change", data);
      this.dispatch("kdFormItem", "on-form-change", data);
    },
  },
  mounted() {
    this.updateModel(true);
  },
  watch: {
    value() {
      this.updateModel(true);
    },
  },
};
</script>

<style>
</style>