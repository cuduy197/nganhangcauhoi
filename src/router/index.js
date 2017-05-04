import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import notFoundPage from '@/components/notFoundPage';

import toan from '@/components/subjects/toan/view';
import van from '@/components/subjects/van/view';
import anh from '@/components/subjects/anh/view';

import toanCreate from '@/components/subjects/toan/create';
import vanCreate from '@/components/subjects/van/create';
import anhCreate from '@/components/subjects/anh/create';


Vue.use(Router);

export default new Router({
    mode: 'hash',
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
            path: '/toan/create',
            name: 'toanCreate',
            component: toanCreate
        }, {
            path: '/toan/create/:subpath',
            component: toanCreate
        }, {
            path: '/toan/edit/:id',
            component: toanCreate
        }, {
            path: '/van/create',
            name: 'vanCreate',
            component: vanCreate
        }, {
            path: '/van/create/:subpath',
            component: vanCreate
        }, {
            path: '/van/edit/:id',
            component: vanCreate
        }, {
            path: '/anh/create',
            name: 'anhCreate',
            component: anhCreate
        }, {
            path: '/anh/create/:subpath',
            component: anhCreate
        }, {
            path: '/anh/edit/:id',
            component: anhCreate
        }, {
            path: '*',
            component: notFoundPage
        }

    ]
});
