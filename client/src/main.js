import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "vuetify/dist/vuetify.min.css";
import VueTelInputVuetify from "vue-tel-input-vuetify";
import vuetify from './plugins/vuetify';
import './plugins/apexcharts';


Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store, 
  render: h => h(App)
}).$mount('#app')
