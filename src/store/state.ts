import * as d3Sankey from "d3-sankey";

export interface SankeyGraphNode {
  nodeId: string;
  name: string;
}
export interface SankeyGraphLink {
  source: string;
  target: string;
  value: number;
}

export type GraphNode = d3Sankey.SankeyNode<SankeyGraphNode, SankeyGraphLink>;
export type GraphLink = d3Sankey.SankeyLink<SankeyGraphNode, SankeyGraphLink>;

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}
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

export interface Pathway {
  name: Lang;
  steps: string[];
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
  fr: string;
  en: string;
}

export interface RootState {
  committees: Committee[];
  positions: Position[];
  pathways: Pathway[];
  rates: Rate[];
  lang: string;
}

export interface DataFile {
  version: string;
  committees: string;
  positions: string;
  pathways: string;
  rates: string;
}

export const state: RootState = {
  committees: [],
  positions: [],
  pathways: [],
  rates: [],
  lang: "en",
};
