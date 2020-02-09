import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './app/App';

Vue.config.productionTip = false
Vue.use(Vuetify)

/* eslint-disable no-new */
window.onload = function () {
    new Vue({
        el: '#app',
        render: h => h(App)
    })
}