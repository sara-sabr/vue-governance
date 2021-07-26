<template>
  <div class="pathway-details">
    <h2>{{ $t("page.pathways.pathway") }}: {{ pathway.name[lang] }}</h2>

    <div v-for="(step, stepKey) in pathway.steps" :key="step.id">
      <h3>
        {{ $t("page.pathways.step") }} {{ stepKey + 1 }}:
        {{ step.name[lang] }}
      </h3>
      <p>{{ step.description[lang] }}</p>
      <p>{{ $t("minimumDelay") }}</p>
      <p>{{ $t("expectedDelay") }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Pathway } from "@/store/state";
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
@Component({
  props: {
    pathway: {
      type: Object as PropType<Pathway>,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
  data() {
    return { minimumDelay: 0, expectedDelay: 0 };
  },
  i18n: {
    messages: {
      en: {
        minimumDelay: "Minimum delay for step's end to end completion: ",
        expectedDelay: "Expected delay for step's end to end completion: ",
      },
      fr: {
        minimumDelay: "Délai minimum pour compléter l'étape: ",
        expectedDelay: "Délai attendu pour compléter l'étape: ",
      },
    },
  },
})
export default class PathwayDetails extends Vue {}
</script>
