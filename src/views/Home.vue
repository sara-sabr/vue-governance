<template>
  <div class="home"><Committees msg="Test" committees:="committees"/></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Committees from "@/components/Committees.vue"; // @ is an alias to /src
import { Committee } from "@/store/types";

@Component({
  components: {
    Committees,
  },
})
export default class Home extends Vue {
  committees: Committee = require("@/assets/data/committees.yaml");
}
</script>
