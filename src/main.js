import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBS4g7qNqSVoVAEAkKiL_eosjSxMeaowBE'
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
