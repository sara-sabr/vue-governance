import Vue from "vue";
import Vuex, {
  Store as VuexStore,
  StoreOptions,
  DispatchOptions,
  CommitOptions,
  createLogger,
} from "vuex";
import VuexPersistence from "vuex-persist";

import { RootState, state } from "@/store/state";
import { Actions, actions } from "@/store/actions";
import { Mutations, mutations } from "@/store/mutations";
import { Getters, getters } from "@/store/getters";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: RootState) => ({
    positions: state.positions,
    committees: state.committees,
    pathways: state.pathways,
    rates: state.rates,
  }),
});

export const store: StoreOptions<RootState> = {
  plugins:
    process.env.NODE_ENV === "development"
      ? [
          createLogger({
            collapsed: false,
          }),
          vuexLocal.plugin,
        ]
      : [vuexLocal.plugin],
  state,
  mutations,
  actions,
  getters,
};

export default new Vuex.Store<RootState>(store);
export type Store = Omit<
  VuexStore<RootState>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: { [K in keyof Getters]: ReturnType<Getters[K]> };
};
