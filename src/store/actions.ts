import { ActionTree, ActionContext } from "vuex";
import { Mutations, MutationType } from "@/store/mutations";
import { Committee, Pathway, Position, Rate, RootState } from "@/store/state";

export enum ActionTypes {
  LoadFileData = "LOAD_FILE_DATA",
  ResetData = "RESET_DATA",
  SetLang = "SET_LANG",
}

type ActionAugments = Omit<ActionContext<RootState, RootState>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.LoadFileData](
    context: ActionAugments,
    value: {
      positions: Position[];
      committees: Committee[];
      pathways: Pathway[];
      rates: Rate[];
      lang: string;
    }
  ): void;
  [ActionTypes.ResetData](context: ActionAugments, value: null): void;
  [ActionTypes.SetLang](context: ActionAugments, value: string): void;
};

export const actions: ActionTree<RootState, RootState> & Actions = {
  async [ActionTypes.LoadFileData]({ commit }, value) {
    commit(MutationType.SetPositions, value.positions);
    commit(MutationType.SetCommittees, value.committees);
    commit(MutationType.SetPathways, value.pathways);
    commit(MutationType.SetRates, value.rates);
    commit(MutationType.SetDataLoaded, null);
  },
  async [ActionTypes.ResetData]({ commit }, value) {
    commit(MutationType.ResetData, value);
  },
  async [ActionTypes.SetLang]({ commit }, value) {
    commit(MutationType.SetLang, value);
  },
};
