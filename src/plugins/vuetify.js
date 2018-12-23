import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { Scroll } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  iconfont: 'md',
  directives: {
    Scroll
  }
})
