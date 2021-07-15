import { ActionTree, ActionContext } from "vuex";
import { Mutations, MutationType } from "@/store/mutations";
import { Committee, Pathway, Position, Rate, RootState } from "@/store/state";

export enum ActionTypes {
  LoadFileData = "LOAD_FILE_DATA",
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
      Positions: Position[];
      committees: Committee[];
      pathways: Pathway[];
      rates: Rate[];
    }
  ): void;
};

export const actions: ActionTree<RootState, RootState> & Actions = {
  async [ActionTypes.LoadFileData]({ commit }, value) {
    commit(MutationType.SetPositions, value.Positions);
    commit(MutationType.SetCommittees, value.committees);
    commit(MutationType.SetPathways, value.pathways);
    commit(MutationType.SetRates, value.rates);
  },
};
