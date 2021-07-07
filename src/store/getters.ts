import { GetterTree } from "vuex";
import { RootState } from "./state";

export type Getters = {
  isBranchPositionsEmpty(state: RootState): boolean;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  isBranchPositionsEmpty(state: RootState) {
    if (state.branchPositions.length === 0) {
      return true;
    } else {
      return false;
    }
  },
};
