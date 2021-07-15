import { GetterTree } from "vuex";
import { RootState } from "./state";

export type Getters = {
  isPositionsEmpty(state: RootState): boolean;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  isPositionsEmpty(state: RootState) {
    if (state.positions.length === 0) {
      return true;
    } else {
      return false;
    }
  },
};
