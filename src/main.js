/*jshint esversion: 6 */
/*jshint -W030 */

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'animate.css/animate.min.css';

//import MaterialLite from 'material-design-lite';
//import 'material-design-lite/material.min.css';
//
import App from './App';
import router from './router';
import { store } from './store/index';

Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    components: { App }
});
