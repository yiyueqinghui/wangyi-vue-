// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/font-icon/style.css'     //引入字体图标
import store from  './store/store.js'
import axios from 'axios'
import Mint from 'mint-ui'    //mint-ui引入
import 'mint-ui/lib/style.css'
Vue.use(Mint)

Vue.prototype.$ajax = axios          //可以在组件中使用了，但无法在store中使用（store是外面引入的）
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({  
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
  	
  }
})
