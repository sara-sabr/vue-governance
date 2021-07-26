<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.pathways.title") }}</h1>
    <div v-html="markdownToHtml($t('page.pathways.description'))"></div>
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
