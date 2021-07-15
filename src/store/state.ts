export interface Committee {
  id: string;
  name: Lang;
  abbreviation: Lang;
  tier?: number;
  level: string;
  status: string;
  workspace: Workspace;
  termsOfReference: ToR;
  meetings: Meeting;
  quorum: string;
  chairs: string[];
  viceChairs: string[];
  members: string[];
  standingParticipants: string[];
  mandate: Lang;
  responsibility: Lang;
  delegation: string[];
}

export interface Workspace {
  URL: Lang;
  access: string;
}

export interface ToR {
  URL: Lang;
}

export interface Meeting {
  recurrence: string;
  day: string;
  duration: number;
  extension: number;
}

export interface Rate {
  label: string;
  min: number;
  max: number;
  description: string;
}

export interface Position {
  id: string;
  name: Lang;
  classification: string;
  level: number;
  incumbent?: string;
  reportsTo?: string;
}

export interface Lang {
  fr?: string;
  en?: string;
}

export interface RootState {
  committees: Committee[];
  branchPositions: Position[];
  rates: Rate[];
}

export interface DataFile {
  version: string;
  committees: string;
  branchPositions: string;
  rates: string;
}

export const state: RootState = {
  committees: [],
  branchPositions: [],
  rates: [],
};
