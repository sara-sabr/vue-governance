<template>
  <div class="home">
    <CommitteeList
      :rates="rates"
      :committees="committees"
      :lang="lang"
      :branch-positions="branchPositions"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommitteeList from "@/components/CommitteeList.vue"; // @ is an alias to /src
import { Committee, Position, Rate } from "@/store/types";

@Component({
  components: {
    CommitteeList,
  },
})
export default class Home extends Vue {
  rates: Rate[] = require("@/assets/data/rates.json");
  committees: Committee[] = require("@/assets/data/committees.json");
  branchPositions: Position[] = require("@/assets/data/branchPositions.json");
  lang = this.$i18n.locale;
}
</script>
