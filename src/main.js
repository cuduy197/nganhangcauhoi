/*jshint esversion: 6 */
/*jshint -W030 */

import Vue from 'vue';
import locale from 'element-ui/lib/locale/lang/vi';
import ElementUI from 'element-ui';
/*import 'element-ui/lib/theme-default/index.css';*/
/*import 'animate.css/animate.min.css';*/

/*import MaterialLite from 'material-design-lite';
import 'material-design-lite/material.min.css';*/

import './assets/custom.css';

import App from './App';
//import { sync } from 'vuex-router-sync';
import router from './router';
import { store } from './store/index';

//sync(store, router); // done.

import VueQuillEditor from 'vue-quill-editor';
Vue.use(VueQuillEditor);


Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    components: { App }
});
