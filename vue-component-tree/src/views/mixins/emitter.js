/**
 * 
 * @param {*} componentName 组件名 
 * @param {*} eventName 事件
 * @param {*} params 参数
 */

function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]))
        }
    })
}

export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root
            let name = parent.$parent.name
    
            while (parent && (!name || name !== componentName)) {
                if (parent) {
                    name = parent.$options.name
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params))
            }
        },

        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params)
        }
    }
}
