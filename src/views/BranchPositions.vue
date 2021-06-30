<template>
  <div class="branch-position">
    <h1>{{ $t("branchPositionsAnalysis") }}</h1>
    <table>
      <caption></caption>
      <thead>
        <th>{{ $t("branchPositionTable.position") }}</th>
        <th>{{ $t("branchPositionTable.key") }}</th>
        <th>{{ $t("branchPositionTable.classification") }}</th>
      </thead>
      <tbody>
        <tr v-for="position in branchPositions" :key="position.id">
          <td>
            {{ position.name[lang] }}
          </td>
          <td>
            {{ position.id }}
          </td>
          <td>{{ getClassLevel(position) }}</td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.standingPartipantsCount") }}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.totalParticipants") }}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingDuration") }}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingCost") }}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{{ $t("committeeTable.meetingAnnualCost") }}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Position } from "@/store/types";
export default class BranchPositions extends Vue {
  branchPositions: Position[] = require("@/assets/data/branchPositions.json");
  lang = this.$i18n.locale;
  getClassLevel(position: Position): string {
    return position.classification + "-0" + position.level;
  }
}
</script>
