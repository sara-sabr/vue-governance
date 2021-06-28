<template>
  <div class="hello">
    <h1>{{ $t("committeesAnalysis") }}</h1>
    <div v-for="rate in rates" :key="rate.id">
      {{ rate }}
    </div>
  </div>
</template>

<script lang="ts">
import { Rate } from "@/store/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Committees extends Vue {
  @Prop() private msg!: string;
  @Prop() private rates!: Rate[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
