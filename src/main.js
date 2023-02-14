import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

import {auth} from '@/firebase';

Vue.config.productionTip=false

import vueChatScroll from 'vue-chat-scroll'
Vue.use(vueChatScroll)

auth.onAuthStateChanged(function(user){
  if(user){
    //User is signed in.
    store.dispatch('setUsuario', user);
  }
  Vue.config.productionTip = false

  new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


})

