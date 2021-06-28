<template>
  <div class="home">
    <Committees msg="Test" :rates="rates" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Committees from "@/components/Committees.vue"; // @ is an alias to /src
import { Rate } from "@/store/types";

@Component({
  components: {
    Committees,
  },
})
export default class Home extends Vue {
  // committees: Committee = require("@/assets/data/committees.yaml");
  rates: Rate[] = require("@/assets/data/rates.json");
}
</script>
