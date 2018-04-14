import "normalize.css"
import "vuetify/dist/vuetify.min.css"

import Vue from "vue"
import Vuetify from "vuetify"
import ScrollIntoView from "scroll-into-view"

import App from "./App.vue"

Vue.use(Vuetify)
Vue.component("app", App)

window.scrollIntoView = ScrollIntoView

new Vue({
  el: "#app",
  render: h => h(App)
})
