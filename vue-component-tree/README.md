# 自定义表单校验
```
表单校验由input输入框触发校验  通过Emitter  dispatch向上级组件派发事件  form-item中$on触发事件名 并执行校验  