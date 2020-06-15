import Vue from 'vue'
import App from './App.vue'
//import { MdApp, MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import VueMaterial from 'vue-material'
import store from './store'
import router from './router'


Vue.config.productionTip = false
Vue.use(VueMaterial)
/*Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdApp)
*/
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
