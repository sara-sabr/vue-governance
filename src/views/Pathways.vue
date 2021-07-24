<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.pathways.title") }}</h1>
    <p>{{ $t("page.pathways.description") }}</p>
    <div v-for="pathway in pathways" :key="pathway.id">
      <h2 v-if="pathway.name[lang].length > 0">
        {{ $t("page.pathways.pathway") }}: {{ pathway.name[lang] }}
        {{ pathway.name[lang] }}
      </h2>
      <div v-for="(step, stepKey) in pathway.steps" :key="step.id">
        <h3>
          {{ $t("page.pathways.step") }} {{ stepKey + 1 }}:
          {{ step.name[lang] }}
        </h3>
        <p>{{ step.description[lang] }}</p>
      </div>
      <!-- <p>{{ $tc("message.title") }}</p> -->
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
@Component({
  data() {
    return {
      lang: this.$i18n.locale,
      totalTime: 0,
    };
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
