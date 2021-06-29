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
          <td>{{ membersCount() }}</td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.standingPartipantsCount") }}</td>
          <td>{{ committee.standingParticipants.length }}</td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.totalParticipants") }}</td>
          <td>{{ allAttendantsCount() }}</td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingDuration") }}</td>
          <td>{{ committee.meetings.duration }}</td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingCost") }}</td>
          <td>{{ calculateMeetingCost().toFixed(2) }}</td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingAnnualCost") }}</td>
          <td>{{ calculateYearlyMeetingCost().toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Committee, Position, Rate } from "@/store/types";
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
    branchPositions: {
      type: Array as PropType<Position[]>,
      required: true,
    },
    rates: {
      type: Array as PropType<Rate[]>,
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
    const count =
      this.membersCount() + this.$props.committee.standingParticipants.length;
    return count;
  }

  getCommitteePositionIds(): string[] {
    return [
      ...this.$props.committee.chairs,
      ...this.$props.committee.viceChairs,
      ...this.$props.committee.members,
      ...this.$props.committee.standingParticipants,
    ];
  }

  getClassLevel(positionId: string): string {
    const positionIndex = this.$props.branchPositions.findIndex(
      (position: Position) => {
        return position.id === positionId;
      }
    );
    if (positionIndex === -1) {
      return "-";
    }
    const classLevel =
      this.$props.branchPositions[positionIndex].classification +
      "-0" +
      this.$props.branchPositions[positionIndex].level;

    return classLevel;
  }

  calculateHourlyRate(positionId: string): number {
    const classLevel = this.getClassLevel(positionId);
    if (classLevel === "-") {
      return 0;
    }
    const rateIndex = this.$props.rates.findIndex((rate: Rate) => {
      return rate.label === classLevel;
    });

    if (rateIndex == -1) return 0;

    const hourlyRate = Number(this.$props.rates[rateIndex].min);
    return hourlyRate / 1950;
  }

  calculateMeetingCost(): number {
    const positionIds = this.getCommitteePositionIds();
    let totalCost = 0;
    positionIds.forEach((id) => {
      totalCost += Number(this.calculateHourlyRate(id));
    });
    return totalCost;
  }

  calculateYearlyMeetingCost(): number {
    let totalOccurences = 0;
    switch (this.$props.committee.meetings.recurrence) {
      case "weekly":
        totalOccurences = 52;
        break;
      case "bi-weekly":
        totalOccurences = 52 / 2;
        break;
      case "montly":
        totalOccurences = 12;
        break;
      case "bi-monthly":
        totalOccurences = 6;
        break;
      case "quarterly":
        totalOccurences = 3;
        break;
      default:
        totalOccurences = 12;
    }
    return this.calculateMeetingCost() * totalOccurences;
  }
}
</script>
