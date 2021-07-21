<template>
  <div>
    <div v-for="position in positions" :key="position.id">
      <h3>{{ position.name[lang] }}</h3>
      <p>{{ $t("page.positions.positionsCommittees.attends") }}:</p>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Committee, Position } from "@/store/state";
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
@Component({
  props: {
    positions: {
      type: Array as PropType<Position[]>,
      required: true,
    },
    committees: {
      type: Array as PropType<Committee[]>,
      required: true,
    },
  },
  methods: {
    //TODO: return all committees attended by the position
    // listCommitteesPerPosition(position: Position): void {
    //   return;
    // },
  },
})
export default class PositionsCommittees extends Vue {
  lang = this.$i18n.locale;
}
</script>
