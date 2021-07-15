import { MutationTree } from "vuex";
import { Committee, Pathway, Position, Rate, RootState } from "@/store/state";

export enum MutationType {
  SetPositions = "SET_BRANCH_POSITIONS",
  SetCommittees = "SET_COMMITTEES",
  SetRates = "SET_RATES",
  SetPathways = "SET_PATHWAYS",
}

export type Mutations = {
  [MutationType.SetPositions](state: RootState, payload: Position[]): void;
  [MutationType.SetCommittees](state: RootState, payload: Committee[]): void;
  [MutationType.SetPathways](state: RootState, payload: Pathway[]): void;
  [MutationType.SetRates](state: RootState, payload: Rate[]): void;
};

export const mutations: MutationTree<RootState> & Mutations = {
  [MutationType.SetPositions](state: RootState, payload: Position[]) {
    state.positions = payload;
  },
  [MutationType.SetCommittees](state: RootState, payload: Committee[]) {
    state.committees = payload;
  },
  [MutationType.SetPathways](state: RootState, payload: Pathway[]) {
    state.pathways = payload;
  },
  [MutationType.SetRates](state: RootState, payload: Rate[]) {
    state.rates = payload;
  },
};
