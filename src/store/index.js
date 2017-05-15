import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { state } from "./state.js";
import { getters } from "./getters.js";
import { mutations } from "./mutations.js";
import { actions } from "./actions.js";

import { test } from "./modules/test/test";

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: { test }
});

/*
store.commit('INIT_DEVICE');*/
store.commit('SYNC');
store.commit('test/TEST');
