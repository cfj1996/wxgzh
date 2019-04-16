/*
 * @class   自定义弹层
 * @author  Jeff Tsui
 * @date    17.07.21
 */
import Vue from 'vue'
const ConfirmConstructor = Vue.extend(require('./Confirm.vue'))

let getAnInstance = () => {
  return new ConfirmConstructor({
    el: document.createElement('div')
  })
}

let removeDom = event => {
  if (event.parentNode) {
    event.parentNode.removeChild(event)
  }
}

ConfirmConstructor.prototype.close = function() {
  removeDom(this.$el)
}

let Confirm = (params = {}) => {
  const options = {
    btnTxt: '确定',
    content: '',
    tips: '',
    callback: function () {}
  }
  Object.assign(options, params)
  let instance = getAnInstance()
  for (let key in options) {
    instance[key] = options[key]
  }
  instance.callback = function () {
    instance.close()
    options.callback()
  }
  document.body.appendChild(instance.$el)
}
export default Confirm
