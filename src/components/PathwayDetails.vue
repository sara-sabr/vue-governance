<template>
  <div class="pathway-details">
    <h2>{{ $t("page.pathways.pathway") }}: {{ pathway.name[lang] }}</h2>
    <div v-for="(step, stepKey) in pathway.steps" :key="step.id">
      <h3>
        {{ $t("page.pathways.step") }} {{ stepKey + 1 }}:
        {{ step.name[lang] }}
      </h3>
      <p>{{ step.description[lang] }}</p>
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
})
export default class PathwayDetails extends Vue {}
</script>
