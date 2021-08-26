<template>
  <svg v-bind:width="settings.width" v-bind:height="settings.height"></svg>
</template>
<script lang="ts">
import { Committee, GraphLink, GraphNode, Position } from "@/store/state";
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
@Component({
  data() {
    return {
      colorTrue: "#fff",
      colorFalse: "#000",
      settings: {
        margin: { top: 30, right: 30, bottom: 30, left: 30 },
        height: "100%",
        width: "100%",
      },
    };
  },
  computed: {
    mappedData() {
      const committees: Committee[] = this.$props.committees;
      const positions: Position[] = this.$props.positions;
      //Create nodes names
      const nodes: GraphNode[] = [];
      committees.forEach((committee) => {
        let nameEn = committee.name.en ? committee.name.en : "N/A";
        let nameFr = committee.name.fr ? committee.name.fr : "N/A";

        let node = { id: committee.id, name: { en: nameEn, fr: nameFr } };
        nodes.push(node);
      });

      positions.forEach((position) => {
        let nameEn = position.name.en ? position.name.en : "N/A";
        let nameFr = position.name.fr ? position.name.fr : "N/A";

        let node = { id: position.id, name: { en: nameEn, fr: nameFr } };
        nodes.push(node);
      });
      // Create links
      let links: GraphLink[] = [];
      if (committees.length > 0 || positions.length > 0) {
        links = committees.map((committee) => {
          const committeePositions = [
            ...committee.chairs,
            ...committee.viceChairs,
            ...committee.members,
            ...committee.standingParticipants,
          ];
          let link: GraphLink = positions.find((position) => {
            let positionIndex = committeePositions.findIndex(
              (committeePosition) => position.id === committeePosition
            );
            if (positionIndex !== -1) {
              return { source: position.id, target: committee.id };
            }
          });
          if (link !== undefined) {
            return link;
          }
        });
      }

      //Map committee attendees to existing positions
      committees.forEach((committee) => {
        //List all committee attendees
        const committeePositions = [
          ...committee.chairs,
          ...committee.viceChairs,
          ...committee.members,
          ...committee.standingParticipants,
        ];
        positions.forEach((position) => {
          if (position.id === committeePositions) {
            links.push({ source: position.id, target: committeePosition });
          }
        });
      });

      return { nodes, links };
    },
    ...mapState,
  },
  methods: {
    getCommitteePositionIds(): string[] {
      return [
        ...this.$props.committee.chairs,
        ...this.$props.committee.viceChairs,
        ...this.$props.committee.members,
        ...this.$props.committee.standingParticipants,
      ];
    },
  },
  props: {
    positions: {
      type: Array as PropType<Position[]>,
      required: true,
    },
    committees: {
      type: Array as PropType<Committee[]>,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
})
export default class CommitteePositionMap extends Vue {}
</script>
