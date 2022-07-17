import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
import mutations from "./mutations";
import actions from "./actions";
const state = {
    username: '',
    cartCount:0
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})