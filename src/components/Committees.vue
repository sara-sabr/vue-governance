<template>
  <div class="hello">
    <h1>{{ $t("committeesAnalysis") }}</h1>
    <div v-for="rate in rates" :key="rate.id">
      {{ rate }}
    </div>
    <div v-for="committee in committees" :key="committee.id">
      <h2>
        {{ committee.name[lang] }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Committee, Rate } from "@/store/types";
import { PropType } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: {
    rates: {
      type: Object as PropType<Rate[]>,
      required: true,
    },
  },
  computed: {},
})
export default class Committees extends Vue {
  // @Prop() private rates!: Rate[];
  @Prop() private committees!: Committee[];
  lang = this.$i18n.locale;
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
