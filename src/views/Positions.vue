<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.positions.title") }}</h1>
    <div class="accordion mb-3" id="accordion-positions-approach">
      <div class="accordion-item">
        <h2 class="accordion-header" id="approach">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {{ $t("page.approach") }}
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="approach"
          data-bs-parent="#accordion-positions-approach"
        >
          <div
            v-html="markdownToHtml($t('page.positions.description'))"
            class="accordion-body"
          ></div>
        </div>
      </div>
    </div>
    <section id="accordion-positionList" class="accordion mb-3">
      <div class="accordion-item">
        <h2 class="accordion-header" id="positionList">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            {{ $t("page.positions.positionsList.title") }}
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="positionList"
          data-bs-parent="#accordion-positionList"
        >
          <div class="accordion-body">
            <PositionsList :positions="positions" :lang="lang" />
          </div>
        </div>
      </div>
    </section>
    <section id="accordion-positionCommitteeRelation" class="accordion mb-3">
      <div class="accordion-item">
        <h2 class="accordion-header" id="positionCommitteeRelation">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            {{ $t("page.positions.positionsCommittees.title") }}
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="positionCommitteeRelation"
          data-bs-parent="#accordion-positionCommitteeRelation"
        >
          <div class="accordion-body">
            <p>{{ $t("page.positions.positionsCommittees.description") }}</p>
            <PositionsCommittees
              v-for="position in positions"
              :key="position.id"
              :position="position"
              :committees="committees"
              :lang="lang"
            />
          </div>
        </div>
      </div>
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
  methods: {
    markdownToHtml(message: string) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const marked = require("marked");
      return marked(message);
    },
  },
})
export default class Positions extends Vue {}
</script>
