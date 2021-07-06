import Vue from "vue";
import Vuex from "vuex";
import { RootState, state } from "@/store/types";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state,
  mutations: {},
  actions: {},
  modules: {},
});
