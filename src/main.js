import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import { store } from './store/store.js';

Vue.config.productionTip = false;

Vue.use(Vuex, VueAxios, axios);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
