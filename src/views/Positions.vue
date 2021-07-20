<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.positions.title") }}</h1>
    <p>{{ $t("navigation.inThisPage") }}</p>
    <div class="nav flex-column">
      <a href="#positionList" class="nav-link">{{
        $t("page.positions.positionsList.title")
      }}</a>
      <a href="#positionCommitteeRelation" class="nav-link">{{
        $t("page.positions.committeesPerPosition.title")
      }}</a>
      <a href="#positionOrgChart" class="nav-link">{{
        $t("page.positions.orgChart.title")
      }}</a>
    </div>
    <section id="positionList">
      <h2>{{ $t("page.positions.positionsList.title") }}</h2>
      <div>
        <table class="table table-striped table-bordered">
          <caption></caption>
          <thead>
            <th scope="col">
              {{ $t("page.positions.positionsList.table.key") }}
            </th>
            <th scope="col">
              {{ $t("page.positions.positionsList.table.position") }}
            </th>
            <th scope="col">
              {{ $t("page.positions.positionsList.table.classification") }}
            </th>
            <th scope="col">
              {{ $t("page.positions.positionsList.table.reportsTo") }}
            </th>
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
              <td>{{ position.reportsTo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section id="positionCommitteeRelation">
      <h2>{{ $t("page.positions.committeesPerPosition.title") }}</h2>
    </section>
    <section id="positionOrgChart">
      <h2>{{ $t("page.positions.orgChart.title") }}</h2>
    </section>
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
