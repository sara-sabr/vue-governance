<template>
  <div
    class="committee-details accordion mb-3"
    :id="'accordion-committee-' + elementKey"
  >
    <div class="accordion-item">
      <h2 class="accordion-header" :id="'committee-' + elementKey">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + elementKey"
          aria-expanded="false"
          :aria-controls="'#collapse' + elementKey"
        >
          {{ committee.name[lang] }}
        </button>
      </h2>
      <div
        :id="'collapse' + elementKey"
        class="accordion-collapse collapse"
        :aria-labelledby="'committee-' + elementKey"
        :data-bs-parent="'#accordion-committee-' + elementKey"
      >
        <div class="accordion-body">
          <div>
            <h3>{{ $t("page.committees.details.mandate") }}</h3>
            <div v-html="markdownToHtml(committee.mandate[lang])"></div>
            <h3>{{ $t("page.committees.details.responsibilities") }}</h3>
            <div v-html="markdownToHtml(committee.responsibility[lang])"></div>
          </div>
          <div>
            <table class="table table-striped table-bordered">
              <caption></caption>
              <thead>
                <th scope="col">{{ $t("page.committees.table.property") }}</th>
                <th scope="col">{{ $t("page.committees.table.value") }}</th>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t("page.committees.table.membersCount") }}</td>
                  <td>{{ membersCount() }}</td>
                </tr>
                <tr>
                  <td>
                    {{ $t("page.committees.table.standingPartipantsCount") }}
                  </td>
                  <td>{{ committee.standingParticipants.length }}</td>
                </tr>
                <tr>
                  <td>{{ $t("page.committees.table.totalParticipants") }}</td>
                  <td>{{ allAttendantsCount() }}</td>
                </tr>
                <tr>
                  <td>{{ $t("page.committees.table.meetingDuration") }}</td>
                  <td>{{ committee.meetings.duration }}</td>
                </tr>
                <tr>
                  <td>{{ $t("page.committees.table.meetingCost") }}</td>
                  <td>{{ calculateMeetingCost().toFixed(2) }}</td>
                </tr>
                <tr>
                  <td>{{ $t("page.committees.table.meetingAnnualCost") }}</td>
                  <td>{{ calculateYearlyMeetingCost().toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Committee, Position, Rate } from "@/store/state";
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
    positions: {
      type: Array as PropType<Position[]>,
      required: true,
    },
    rates: {
      type: Array as PropType<Rate[]>,
    },
    elementKey: {
      type: Number,
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
    const positionIndex = this.$props.positions.findIndex(
      (position: Position) => {
        return position.id === positionId;
      }
    );
    if (positionIndex === -1) {
      return "-";
    }
    const classLevel =
      this.$props.positions[positionIndex].classification +
      "-0" +
      this.$props.positions[positionIndex].level;

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

  isArray(element: string | Array<string>): boolean {
    if (typeof element === "string") {
      return false;
    }
    return true;
  }

  markdownToHtml(message: string): any {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const marked = require("marked");
    return marked(message);
  }
}
</script>
