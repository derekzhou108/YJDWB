// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { AlertPlugin, ToastPlugin, XDialog, TransferDom } from 'vux'

import './assets/style/reset.less'
import './assets/style/custom.less'

// mock request data
// import './mock'

// viewLoad
import './viewLoad'

// rem.js --> font-size
import './utils/rem.js'

// register global component
Vue.component('x-dialog', XDialog)

// register global plugin
Vue.use(AlertPlugin)
Vue.use(ToastPlugin, { type: 'text' })

// register global directive
Vue.directive('transfer-dom', TransferDom)

/* fixed mobile click 300ms delay */
const FastClick = require('fastclick')
FastClick.attach(document.body)

// remove production alarm tip
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
