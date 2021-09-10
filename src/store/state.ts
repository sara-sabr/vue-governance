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
  name: { fr: string; en: string };
  abbreviation: { fr: string; en: string };
  tier?: number;
  level: string;
  status: string;
  workspace: { URL: { fr: string; en: string }; access: string };
  termsOfReferenceURL: { fr: string; en: string };
  meetings: {
    recurrence: string;
    day: string;
    duration: number;
    extension: number;
    adHoc?: boolean;
  };
  quorum: string;
  chairs: string[];
  viceChairs: string[];
  members: string[];
  standingParticipants: string[];
  mandate: { fr: string; en: string };
  responsibility: { fr: string; en: string };
  delegation: string[];
}

export interface Pathway {
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  steps: {
    type: string;
    name: { fr: string; en: string };
    description: { fr: string; en: string };
    duration: { quantity: number; unit: string };
    stakeholders: string[];
  }[];
}

export interface Rate {
  label: string;
  min: number;
  max: number;
  description: string;
}

export interface Position {
  id: string;
  name: { fr: string; en: string };
  classification: string;
  level: number;
  incumbent?: string;
  reportsTo?: string;
}

export interface RootState {
  committees: Committee[];
  positions: Position[];
  pathways: Pathway[];
  rates: Rate[];
  lang: string;
  dataLoaded: boolean;
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
  dataLoaded: false,
};
