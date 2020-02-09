import Vue from 'vue'
import App from './app/App';

// Vue.config.productionTip = false

/* eslint-disable no-new */
window.onload = function () {
    new Vue({
        el: '#app',
        render: h => h(App)
    })
}