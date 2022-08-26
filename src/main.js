import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import "./index.css"

Vue.config.productionTip = false
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'GMAP_JAVASCRIPT_TOKEN_API'
  },
})

new Vue({
  render: h => h(App),
}).$mount('#app')
