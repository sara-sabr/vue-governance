import { GetterTree } from "vuex";
import {
  Committee,
  Graph,
  Position,
  RootState,
  SankeyGraphLink,
  SankeyGraphNode,
} from "./state";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export type Getters = {
  isPositionsEmpty(state: RootState): boolean;
  isCommitteesEmpty(state: RootState): boolean;
  getPositionName(state: RootState, position: Position): string;
  getAllCommitteesPositionsGraphData(state: RootState): Graph;
  getMappedCommitteesPositionsGraphData(state: RootState): Graph;
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
  getAllCommitteesPositionsGraphData(state: RootState): Graph {
    const committees: Committee[] = state.committees;
    const positions: Position[] = state.positions;
    if (committees.length < 1 || positions.length < 1) {
      throw console.error("Invalid data set provided to generate graph");
    }
    //Create nodes
    const nodes: SankeyGraphNode[] = [];

    nodes.push({
      nodeId: "0",
      name:
        state.lang === "en"
          ? en.page.committees.committeePositionMap.notAssigned
          : fr.page.committees.committeePositionMap.notAssigned,
    });
    committees.forEach((committee) => {
      const nameEn = committee.name.en ? committee.name.en : "N/A";
      const nameFr = committee.name.fr ? committee.name.fr : "N/A";

      const node = {
        nodeId: committee.id.toString(),
        name: state.lang === "en" ? nameEn : nameFr,
      };
      nodes.push(node);
    });
    positions.forEach((position) => {
      const nameEn = position.name.en ? position.name.en : "N/A";
      const nameFr = position.name.fr ? position.name.fr : "N/A";

      const node = {
        nodeId: position.id,
        name: state.lang === "en" ? nameEn : nameFr,
      };
      nodes.push(node);
    });

    //Create links
    const links: SankeyGraphLink[] = [];
    let allCommsAttendees: string[] = [];
    const positionsIds = positions.map((position) => position.id);
    if (committees.length > 0 || positionsIds.length > 0) {
      committees.forEach((committee) => {
        const committeeAttendees = [
          ...committee.chairs,
          ...committee.viceChairs,
          ...committee.members,
          ...committee.standingParticipants,
        ];
        allCommsAttendees = [...committeeAttendees];

        committeeAttendees.forEach((attendee) => {
          const positionIndex = positionsIds.findIndex(
            (positionID) => attendee === positionID
          );
          if (positionIndex !== -1) {
            const newLink: SankeyGraphLink = {
              source: attendee,
              target: committee.id.toString(),
              value: 1,
            };

            links.push(newLink);
          }
        });
      });
    }
    //Parse all positions to filter out positions not attending committees
    positionsIds.forEach((positionId) => {
      const positionIdIndex = allCommsAttendees.findIndex(
        (attendee) => attendee === positionId
      );
      if (positionIdIndex === -1) {
        const newLink: SankeyGraphLink = {
          source: positionId,
          target: "0",
          value: 1,
        };

        links.push(newLink);
      }
    });
    return { nodes, links };
  },
  getMappedCommitteesPositionsGraphData(state: RootState): Graph {
    const links: SankeyGraphLink[] = [];
    const nodes: SankeyGraphNode[] = [];
    const committees: Committee[] = state.committees;
    const positions: Position[] = state.positions;

    if (committees.length < 1 || positions.length < 1) {
      throw console.error("Invalid data set provided to generate graph");
    }

    let allCommitteesAttendeesIDs: string[] = [];

    // List all attendees' positions ID from each committee
    if (committees.length > 0 || positions.length > 0) {
      committees.forEach((committee) => {
        const committeeAttendees = [
          ...committee.chairs,
          ...committee.viceChairs,
          ...committee.members,
          ...committee.standingParticipants,
        ];
        allCommitteesAttendeesIDs = [
          ...new Set([...allCommitteesAttendeesIDs, ...committeeAttendees]),
        ];
      });
    }

    // Map only positions known as committee attendees
    const mappedPositions: Position[] = positions.filter((position) => {
      const positionIndex = allCommitteesAttendeesIDs.findIndex(
        (id) => position.id === id
      );
      if (positionIndex !== -1) {
        return position;
      }
    });

    // Create nodes for committees and mapped positions
    committees.forEach((committee) => {
      const nameEn = committee.name.en ? committee.name.en : "N/A";
      const nameFr = committee.name.fr ? committee.name.fr : "N/A";

      const node = {
        nodeId: committee.id.toString(),
        name: state.lang === "en" ? nameEn : nameFr,
      };
      nodes.push(node);
    });
    mappedPositions.forEach((position) => {
      const idIndex = allCommitteesAttendeesIDs.findIndex(
        (id) => position.id === id
      );
      if (idIndex !== -1) {
        const nameEn = position.name.en ? position.name.en : "N/A";
        const nameFr = position.name.fr ? position.name.fr : "N/A";

        const node = {
          nodeId: position.id,
          name: state.lang === "en" ? nameEn : nameFr,
        };
        nodes.push(node);
      }
    });

    // Create links between committees and attendees
    if (committees.length > 0 || mappedPositions.length > 0) {
      committees.forEach((committee) => {
        const committeeAttendees = [
          ...committee.chairs,
          ...committee.viceChairs,
          ...committee.members,
          ...committee.standingParticipants,
        ];

        committeeAttendees.forEach((attendee) => {
          const positionIndex = mappedPositions.findIndex(
            (position) => attendee === position.id
          );
          if (positionIndex !== -1) {
            const newLink: SankeyGraphLink = {
              source: attendee,
              target: committee.id.toString(),
              value: 1,
            };

            links.push(newLink);
          }
        });
      });
    }
    return { nodes, links };
  },
};
