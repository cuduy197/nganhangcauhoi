/*jshint esversion: 6 */ /*jshint -W030 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import notFoundPage from '@/components/notFoundPage';

import toan from '@/components/subjects/toan/toan';
import van from '@/components/subjects/van/van';
import anh from '@/components/subjects/anh/anh';



Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        }, {
            path: '/toan',
            name: 'toan',
            component: toan
        }, {
            path: '/van',
            name: 'van',
            component: van
        }, {
            path: '/anh',
            name: 'anh',
            component: anh
        }, {
            path: '*',
            component: notFoundPage
        }

    ]
});
