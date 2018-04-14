import "normalize.css"
import "vuetify/dist/vuetify.min.css"

import Vue from "vue"
import Vuetify from "vuetify"
import * as VueGoogleMaps from "vue2-google-maps"

import App from "./App.vue"

Vue.use(Vuetify)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBS4g7qNqSVoVAEAkKiL_eosjSxMeaowBE"
  }
})

Vue.component("app", App)

new Vue({
  el: "#app",
  render: h => h(App)
})
