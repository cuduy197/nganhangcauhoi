//Main app
import Vue from 'vue';
import locale from 'element-ui/lib/locale/lang/vi';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import './assets/custom.css';
import './assets/w3.css';


import App from './App';
import { sync } from 'vuex-router-sync';
import router from './router';
import {
    store
} from './store/index';

sync(store, router); // done.


import VueHtml5Editor from './assets/vue-html5-editor.js'
Vue.use(VueHtml5Editor, {
    visibleModules: [
        "text",
        "color",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "eraser",
        "undo"
    ],
});

Vue.use(ElementUI, {
    locale
});
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    components: {
        App
    }
});