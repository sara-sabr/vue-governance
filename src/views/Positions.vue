<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.positions.title") }}</h1>
    <p>{{ $t("navigation.onThisPage") }}</p>
    <div class="nav flex-column">
      <a href="#positionList" class="nav-link">{{
        $t("page.positions.positionsList.title")
      }}</a>
      <a href="#positionCommitteeRelation" class="nav-link">{{
        $t("page.positions.positionsCommittees.title")
      }}</a>
      <a href="#positionOrgChart" class="nav-link">{{
        $t("page.positions.orgChart.title")
      }}</a>
    </div>
    <section id="positionList">
      <h2>{{ $t("page.positions.positionsList.title") }}</h2>
      <PositionsList :positions="positions" :lang="lang" />
    </section>
    <section id="positionCommitteeRelation">
      <h2>{{ $t("page.positions.positionsCommittees.title") }}</h2>
      <p>{{ $t("page.positions.positionsCommittees.description") }}</p>
      <PositionsCommittees
        v-for="position in positions"
        :key="position.id"
        :position="position"
        :committees="committees"
        :lang="lang"
      />
    </section>
    <section id="positionOrgChart">
      <h2>{{ $t("page.positions.orgChart.title") }}</h2>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
import PositionsList from "@/components/PositionsList.vue";
import PositionsCommittees from "@/components/PositionsCommittees.vue";
@Component({
  data() {
    return {
      lang: this.$i18n.locale,
    };
  },
  components: {
    PositionsList,
    PositionsCommittees,
  },
  computed: mapState(["positions", "committees"]),
})
export default class Positions extends Vue {}
</script>
