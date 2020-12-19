<template>
  <div class="home">
    <kd-form ref="form" :model="form" :rules="rules">
      <kd-form-item label="用户名" prop="name">
        <kd-input v-model="form.name"></kd-input>
      </kd-form-item>
      <kd-form-item label="邮箱" prop="mail">
        <kd-input v-model="form.mail"></kd-input>
      </kd-form-item>
      <button @click="handleSubmit">提交</button>
      <button @click="handleReset">重置</button>
    </kd-form>
  </div>
</template>

<script>
// @ is an alias to /src
import kdFormItem from "@/components/form/form-item";
import kdForm from "@/components/form/form";
import kdInput from "@/components/input/input";
export default {
  name: "Home",
  data() {
    return {
      form: {
        name: "",
        mail: "",
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    kdFormItem,
    kdForm,
    kdInput,
  },
  methods: {
    handleSubmit() {
      console.log(this.$refs.form);
      this.$refs.form.validate((valid) => {
        console.log(valid);
      });
    },
    handleReset() {
      console.log(this.$refs.form);
      this.$refs.form.resetFields();
    },
  },
};
</script>
