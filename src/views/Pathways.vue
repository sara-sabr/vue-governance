<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.pathways.title") }}</h1>
    <p>{{ $t("page.pathways.description") }}</p>
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

  // i18n: {
  //   messages: {
  //     en: { message: { title: "Title" } },
  //     fr: { message: { title: "Titre" } },
  //   },
  // },
})
export default class Pathways extends Vue {
  lang = this.$i18n.locale;
}
</script>
