<template>
  <div>
    <table class="table table-striped table-bordered">
      <caption></caption>
      <thead>
        <th scope="col">
          {{ $t("page.positions.positionsList.table.key") }}
        </th>
        <th scope="col">
          {{ $t("page.positions.positionsList.table.position") }}
        </th>
        <th scope="col">
          {{ $t("page.positions.positionsList.table.classification") }}
        </th>
        <th scope="col">
          {{ $t("page.positions.positionsList.table.reportsTo") }}
        </th>
      </thead>
      <tbody>
        <tr v-for="position in positions" :key="position.id">
          <td>
            {{ position.id }}
          </td>
          <td>
            {{ position.name[lang] }}
          </td>
          <td>{{ getClassLevel(position) }}</td>
          <td>{{ position.reportsTo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Position } from "@/store/state";
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
@Component({
  computed: {
    ...mapState(["lang"]),
  },
  props: {
    positions: {
      type: Array as PropType<Position[]>,
      required: true,
    },
  },
})
export default class PositionsList extends Vue {
  getClassLevel(position: Position): string {
    return position.classification + "-0" + position.level;
  }
}
</script>
