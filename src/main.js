import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    // 全局事件总线
    Vue.prototype.$bus = this;
  }
}).$mount('#app')


// new Vue({
//   el:'#app',
// // render函数被vue自动调用，并且传递过来一个参数createElement
//   render:function(createElement) {
//     return createElement(App)
//   }
// })