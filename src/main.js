/*jshint esversion: 6 */
/*jshint -W030 */

import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'animate.css/animate.min.css';

import MaterialLite from 'material-design-lite';
import 'material-design-lite/material.min.css';

import './assets/custom.css';

import App from './App';
import { sync } from 'vuex-router-sync';
import router from './router';
import { store } from './store/index';

sync(store, router); // done.

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    components: { App }
});
