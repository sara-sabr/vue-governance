<template>
  <div class="container">
    <h1 class="text-center">{{ $t("branchPositionsAnalysis") }}</h1>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <caption></caption>
        <thead>
          <th scope="col">{{ $t("branchPositionTable.key") }}</th>
          <th scope="col">{{ $t("branchPositionTable.position") }}</th>
          <th scope="col">{{ $t("branchPositionTable.classification") }}</th>
          <th scope="col">{{ $t("branchPositionTable.reportsTo") }}</th>
        </thead>
        <tbody>
          <tr v-for="position in branchPositions" :key="position.id">
            <td>
              {{ position.id }}
            </td>
            <td>
              {{ position.name[lang] }}
            </td>
            <td>{{ getClassLevel(position) }}</td>
            <td>{{ position.reportsTo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Position } from "@/store/state";
import Component from "vue-class-component";
@Component({
  data() {
    return {
      branchPositions: require("@/assets/data/branchPositions.json"),
    };
  },
})
export default class BranchPositions extends Vue {
  // branchPositions: Position[] = require("@/assets/data/branchPositions.json");
  lang = this.$i18n.locale;
  getClassLevel(position: Position): string {
    return position.classification + "-0" + position.level;
  }
}
</script>
