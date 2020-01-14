import Vue from 'vue'
import App from './App'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './assets/style/main.css'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import filters from './filter/index'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(MuseUI)
Vue.use(VueAxios, axios)
Vue.use(filters)
Vue.use(Elementui)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
