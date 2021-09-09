<template>
  <div>
    <div>
      <h3>{{ position.name[lang] }}</h3>
      <table class="table table-striped table-bordered">
        <caption></caption>
        <thead>
          <th scope="col">
            {{ $t("page.positions.positionsCommittees.table.committee") }}
          </th>
          <th scope="col">
            {{ $t("page.positions.positionsCommittees.table.role") }}
          </th>
        </thead>
        <tbody v-if="listCommitteesPerPosition.length > 0">
          <tr
            v-for="committee in listCommitteesPerPosition"
            :key="committee.id"
          >
            <td>{{ committeeName(committee) }}</td>
            <td>{{ $t("role." + roleInCommittee(position, committee)) }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Committee, Position } from "@/store/state";
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
@Component({
  data() {
    return {
      hasCommittees: false,
      listedCommittees: [],
    };
  },
  props: {
    position: {
      type: Object as PropType<Position>,
      required: true,
    },
    committees: {
      type: Array as PropType<Committee[]>,
      required: true,
    },
  },
  computed: {
    listCommitteesPerPosition(): Committee[] {
      const committees: Committee[] = this.$props.committees;
      if (!committees) {
        return [];
      }
      const list: Committee[] = committees.filter((committee) => {
        let listedPositions = [
          ...committee.chairs,
          ...committee.viceChairs,
          ...committee.members,
          ...committee.standingParticipants,
        ];
        return (
          listedPositions.findIndex((listedPosition) => {
            return this.$props.position.id === listedPosition;
          }) !== -1
        );
      });
      return list;
    },
    ...mapState(["lang"]),
  },
  i18n: {
    messages: {
      en: {
        role: {
          chair: "Chair",
          viceChair: "Vice-Chair",
          member: "Voting Member",
          standingParticipant: "Standing Participant",
        },
      },
      fr: {
        role: {
          chair: "Présidence",
          viceChair: "Vice-présidence",
          member: "Membre votant",
          standingParticipant: "Membre observateur",
        },
      },
    },
  },
  methods: {
    roleInCommittee(position: Position, committee: Committee): string {
      if (
        committee.chairs.findIndex((element) => {
          return element === this.$props.position.id;
        }) !== -1
      ) {
        return "chair";
      }
      if (
        committee.viceChairs.findIndex((element) => {
          return element === this.$props.position.id;
        }) !== -1
      ) {
        return "viceChair";
      }
      if (
        committee.members.findIndex((element) => {
          return element === this.$props.position.id;
        }) !== -1
      ) {
        return "member";
      }
      return "standingParticipant";
    },
    committeeName(committee: Committee): string {
      if (this.$i18n.locale === "fr") {
        return committee.name.fr;
      }
      return committee.name.en;
    },
  },
})
export default class PositionsCommittees extends Vue {}
</script>
