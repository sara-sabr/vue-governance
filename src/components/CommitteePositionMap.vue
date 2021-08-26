<template>
  <div class="committee-details accordion mb-3" id="accordion-map">
    <div class="accordion-item">
      <h2 class="accordion-header" id="map">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-map"
          aria-expanded="false"
          aria-controls="#collapse-map"
        >
          MAP
        </button>
      </h2>
      <div
        id="collapse-map"
        class="accordion-collapse collapse"
        aria-labelledby="map"
        data-bs-parent="#accordion-map"
      >
        <div class="accordion-body">
          {{ mappedData }}
          <svg
            v-bind:width="settings.width"
            v-bind:height="settings.height"
          ></svg>
        </div>
      </div>
    </div>
  </div>
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
      const positionsIds = positions.map((position) => position.id);
      if (committees.length > 0 || positionsIds.length > 0) {
        committees.forEach((committee) => {
          const committeeAttendees = [
            ...committee.chairs,
            ...committee.viceChairs,
            ...committee.members,
            ...committee.standingParticipants,
          ];

          committeeAttendees.forEach((attendee) => {
            let positionIndex = committeeAttendees.findIndex(
              (committeePosition) => attendee === committeePosition
            );
            if (positionIndex !== -1) {
              let newLink: GraphLink = {
                source: attendee,
                target: committee.id,
              };

              links.push(newLink);
            }
          });
        });
      }

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
