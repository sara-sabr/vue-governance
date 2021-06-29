<template>
  <div class="hello">
    <h1>{{ $t("committeesAnalysis") }}</h1>
    <CommitteeDetails
      v-for="committee in committees"
      :key="committee.id"
      :committee="committee"
      :lang="lang"
    >
    </CommitteeDetails>
  </div>
</template>

<script lang="ts">
import { Committee, Rate } from "@/store/types";
import { PropType } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import CommitteeDetails from "@/components/CommitteeDetails.vue";

@Component({
  components: {
    CommitteeDetails,
  },
  props: {
    rates: {
      type: Array as PropType<Rate[]>,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
})
export default class Committees extends Vue {
  // @Prop() private rates!: Rate[];
  @Prop() private committees!: Committee[];
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
