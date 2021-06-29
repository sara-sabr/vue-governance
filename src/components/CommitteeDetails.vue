<template>
  <div>
    <h2>{{ committee.name[lang] }}</h2>
    <table>
      <caption></caption>
      <thead>
        <th>{{ $t("committeeTable.property") }}</th>
        <th>{{ $t("committeeTable.value") }}</th>
      </thead>
      <tbody>
        <tr>
          <td>{{ $t("committeeTable.membersCount") }}</td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.standingPartipantsCount") }}</td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.totalParticipants") }}</td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingDuration") }}</td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingCost") }}</td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingAnnualCost") }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <p>{{ committee }}</p>
  </div>
</template>
<script lang="ts">
import { Committee } from "@/store/types";
import Vue, { PropType } from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    committee: {
      type: Object as PropType<Committee>,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
})
export default class CommitteeDetails extends Vue {
  membersCount(): number {
    const count =
      this.$props.committee.chairs.length +
      this.$props.committee.viceChairs.length +
      this.$props.committee.members.length;
    return count;
  }

  allAttendantsCount(): number {
    const count = this.membersCount() + this.$props.committee.members.length;
    return count;
  }
}
</script>
