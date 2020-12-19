<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "kdForm",
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {
      fields: [],
    };
  },
  //vue组件时由内而外渲染的 ,所以formItem要先于form渲染
  created() {
    this.$on("on-form-item-add", (field) => {
      if (field) this.fields.push(field);
    });
    this.fields;
    this.$on("on-form-item-remove", (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  methods: {
    //全部重置数据
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    //全部校验数据
    validate(callback) {
      return new Promise((resolve,reject) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          field.validate("", (errors) => {
            if (errors) {
              reject(errors);
              valid = false;
            }
            if (++count === this.fields.length) {
              //全部完成
              resolve(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },
};
</script>

<style></style>
