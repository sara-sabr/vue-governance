import { MutationTree } from "vuex";
import { Committee, Position, Rate, RootState } from "@/store/state";

export enum MutationType {
  SetBranchPositions = "SET_BRANCH_POSITIONS",
  SetCommittees = "SET_COMMITTEES",
  SetRates = "SET_RATES",
}

export type Mutations = {
  [MutationType.SetBranchPositions](
    state: RootState,
    payload: Position[]
  ): void;
  [MutationType.SetCommittees](state: RootState, payload: Committee[]): void;
  [MutationType.SetRates](state: RootState, payload: Rate[]): void;
};

export const mutations: MutationTree<RootState> & Mutations = {
  [MutationType.SetBranchPositions](state: RootState, payload: Position[]) {
    state.branchPositions = payload;
  },
  [MutationType.SetCommittees](state: RootState, payload: Committee[]) {
    state.committees = payload;
  },
  [MutationType.SetRates](state: RootState, payload: Rate[]) {
    state.rates = payload;
  },
};
