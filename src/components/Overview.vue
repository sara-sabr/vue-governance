<template>
  <div>
    <p>{{ $t("overview") }}</p>
    <table class="table table-striped table-bordered">
      <tbody>
        <tr>
          <td>{{ $t("positionsCount") }}</td>
          <td>{{ positions.length }}</td>
        </tr>
        <tr>
          <td>{{ $t("committeesCount") }}</td>
          <td>{{ committees.length }}</td>
        </tr>
        <tr>
          <td>{{ $t("pathwaysCount") }}</td>
          <td>{{ pathways.length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
@Component({
  computed: {
    ...mapState(["positions", "committees", "pathways"]),
  },
  i18n: {
    messages: {
      en: {
        overview: "The data provided indicates the following key elements.",
        positionsCount: "Count of positions documented",
        committeesCount: "Count of committees documented",
        pathwaysCount: "Count of pathways documented",
      },
      fr: {
        overview: "Les données fournies indiquent les éléments clés suivants:",
        positionsCount: "Nombre de positions documentées",
        committeesCount: "Nombre de comités documentés",
        pathwaysCount: "Nombre de parcours documentés",
      },
    },
  },
})
export default class Overview extends Vue {}
</script>
