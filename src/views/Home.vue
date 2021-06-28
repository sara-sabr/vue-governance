<template>
  <div class="home">
    <Committees :rates="rates" :committees="committees" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Committees from "@/components/Committees.vue"; // @ is an alias to /src
import { Committee, Rate } from "@/store/types";

@Component({
  components: {
    Committees,
  },
})
export default class Home extends Vue {
  rates: Rate[] = require("@/assets/data/rates.json");
  committees: Committee[] = require("@/assets/data/committees.json");
}
</script>
