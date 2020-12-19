<template>
  <div>
    <label
      v-if="label"
      :class="{ 'kd-form-item-label-required': isRequired }"
      >{{ label }}</label
    >
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="kd-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import Emitter from "@/views/mixins/emitter";
export default {
  name: "formItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      isRequired: false,
      validateState: "", //校验状态,
      validateMessage: "", //校验不通过时的提示信息
    };
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.required;
        });
      }
      this.$on("on-form-blur", this.onFieldBlur);
      this.$on("on-form-change", this.onFieldChange);
    },
    //从form的rules属性中,获取当前formitem的校验规则
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },

    //重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      //将父组件form中的prop设置为初始值
      this.form.model[this.prop] = this.initialValue;
    },
    //只支持blur和change,所以过滤出符合要求的rule规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },

    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     *
     */
    validate(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }

      //设置状态为校验中
      this.validateState = "validating";
      //async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;
      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        callback(this.validateMessage);
      });
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    },
  },
  computed: {
    //从form的model中动态得到当前表单组件的数据
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch("kdForm", "on-form-item-add", this);
      //设置初始值,以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch("kdForm", "on-form-item-remove", this);
  },
};
</script>

<style>
.kd-form-item-label-required::before {
  content: "*";
  color: red;
}
.kd-form-item-message {
  color: red;
}
</style>
