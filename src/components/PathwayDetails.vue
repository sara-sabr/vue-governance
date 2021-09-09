<template>
  <div
    class="pathway-details accordion mb-3"
    :id="'accordion-pathway-' + elementKey"
  >
    <div class="accordion-item">
      <h2 class="accordion-header" :id="'pathway-' + elementKey">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + elementKey"
          aria-expanded="false"
          :aria-controls="'#collapse' + elementKey"
        >
          {{ $t("page.pathways.pathway") }}: {{ pathway.name[lang] }}
        </button>
      </h2>
      <div
        :id="'collapse' + elementKey"
        class="accordion-collapse collapse"
        :aria-labelledby="'pathway-' + elementKey"
        :data-bs-parent="'#accordion-pathway-' + elementKey"
      >
        <div class="accordion-body">
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Pathway } from "@/store/state";
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
@Component({
  methods: {
    ...mapState(["lang"]),
  },
  props: {
    pathway: {
      type: Object as PropType<Pathway>,
      required: true,
    },
    elementKey: {
      type: Number,
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
