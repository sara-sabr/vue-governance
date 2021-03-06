import { MutationTree } from "vuex";
import { Committee, Pathway, Position, Rate, RootState } from "@/store/state";

export enum MutationType {
  SetPositions = "SET_POSITIONS",
  SetCommittees = "SET_COMMITTEES",
  SetRates = "SET_RATES",
  SetPathways = "SET_PATHWAYS",
  SetLang = "SET_LANG",
  SetDataLoaded = "SET_DATA_LOADED",
  ResetData = "RESET_DATA",
}

export type Mutations = {
  [MutationType.SetPositions](state: RootState, payload: Position[]): void;
  [MutationType.SetCommittees](state: RootState, payload: Committee[]): void;
  [MutationType.SetPathways](state: RootState, payload: Pathway[]): void;
  [MutationType.SetRates](state: RootState, payload: Rate[]): void;
  [MutationType.SetLang](state: RootState, payload: string): void;
  [MutationType.SetDataLoaded](state: RootState, payload: null): void;
  [MutationType.ResetData](state: RootState, payload: null): void;
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
  [MutationType.SetLang](state: RootState, payload: string) {
    state.lang = payload;
    document.documentElement.lang = payload;
  },
  [MutationType.SetDataLoaded](state: RootState) {
    state.dataLoaded = true;
  },
  [MutationType.ResetData](state: RootState) {
    state.committees = [];
    state.positions = [];
    state.pathways = [];
    state.rates = [];
    state.lang = "en";
    state.dataLoaded = false;
  },
};
