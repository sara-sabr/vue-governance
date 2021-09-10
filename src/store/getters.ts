import { GetterTree } from "vuex";
import { Position, RootState } from "./state";

export type Getters = {
  isPositionsEmpty(state: RootState): boolean;
  isCommitteesEmpty(state: RootState): boolean;
  getPositionName(state: RootState, position: Position): string;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  isPositionsEmpty(state: RootState) {
    if (state.positions.length === 0) {
      return true;
    } else {
      return false;
    }
  },
  isCommitteesEmpty(state: RootState): boolean {
    if (state.committees.length === 0) {
      return true;
    } else {
      return false;
    }
  },
  getPositionName(state: RootState, position: Position): string {
    if (state.lang === "fr") {
      return position.name.fr;
    }
    return position.name.en;
  },
};
