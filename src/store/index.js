/*jshint esversion: 6 */
/*jshint -W030 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { state } from "./state.js";
import { getters } from "./getters.js";
import { mutations } from "./mutations.js";
import { actions } from "./actions.js";

/*import { account } from "./modules/account";*/

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    // modules: {}
});

/*store.commit('test/TEST');
store.commit('INIT_DEVICE');*/
store.commit('SYNC');
