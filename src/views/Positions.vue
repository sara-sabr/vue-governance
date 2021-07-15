<template>
  <div class="container">
    <h1 class="text-center">{{ $t("positionsAnalysis") }}</h1>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <caption></caption>
        <thead>
          <th scope="col">{{ $t("positionTable.key") }}</th>
          <th scope="col">{{ $t("positionTable.position") }}</th>
          <th scope="col">{{ $t("positionTable.classification") }}</th>
        </thead>
        <tbody>
          <tr v-for="position in positions" :key="position.id">
            <td>
              {{ position.id }}
            </td>
            <td>
              {{ position.name[lang] }}
            </td>
            <td>{{ getClassLevel(position) }}</td>
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
import { mapState } from "vuex";
@Component({
  computed: mapState(["positions"]),
})
export default class Positions extends Vue {
  lang = this.$i18n.locale;
  getClassLevel(position: Position): string {
    return position.classification + "-0" + position.level;
  }
}
</script>
