<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.pathways.title") }}</h1>
    <div class="accordion mb-3" id="accordion-pathways-approach">
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
            {{ $t("page.pathways.approach") }}
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="approach"
          data-bs-parent="#accordion-pathways-approach"
        >
          <div
            v-html="markdownToHtml($t('page.pathways.description'))"
            class="accordion-body"
          ></div>
        </div>
      </div>
    </div>
    <pathway-details
      v-for="pathway in pathways"
      :key="pathway.id"
      :pathway="pathway"
      :lang="lang"
    ></pathway-details>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
import PathwayDetails from "@/components/PathwayDetails.vue";
@Component({
  data() {
    return {
      lang: this.$i18n.locale,
      totalTime: 0,
    };
  },
  components: {
    PathwayDetails,
  },
  computed: mapState(["pathways"]),
  methods: {
    markdownToHtml(message: string) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const marked = require("marked");
      return marked(message);
    },
  },
})
export default class Pathways extends Vue {
  lang = this.$i18n.locale;
}
</script>
