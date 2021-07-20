<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.pathways.title") }}</h1>
    <div v-for="pathway in pathways" :key="pathway.id">
      <p v-if="pathway.name[lang].length > 0">{{ pathway.name[lang] }}</p>
      <p>{{ pathway.steps[0].description[lang] }}</p>
      <!-- <p>{{ $tc("message.title") }}</p> -->
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
@Component({
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
