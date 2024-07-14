import App from './App'

import store from './store/index.js';
import upload from './utils/upload.js';
import { userAvatar } from './utils/global.js'

Vue.prototype.$store = store;
Vue.prototype.$upload = upload;


import share from './utils/share.js'
Vue.mixin(share)

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif