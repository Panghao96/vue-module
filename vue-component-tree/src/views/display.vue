<template>
  <div>
    <h3>动态渲染.vue文件的组件一display</h3>
    <display :code="code"></display>
  </div>
</template>

<script>
import display from "@/components/display/display";
import defaultCode from "@/utils/default-code";
export default {
  data() {
    return {
      code: defaultCode,
    };
  },
  components: {
    display,
  },
};
</script>

<style>
</style>