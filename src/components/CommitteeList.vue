<template>
  <div>
    <CommitteeDetails
      v-for="committee in committees"
      :key="committee.id"
      :committee="committee"
      :lang="lang"
      :rates="rates"
      :positions="positions"
    >
    </CommitteeDetails>
  </div>
</template>

<script lang="ts">
import { Committee, Position, Rate } from "@/store/state";
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
    positions: {
      type: Array as PropType<Position[]>,
      required: true,
    },
  },
})
export default class CommitteeList extends Vue {
  @Prop() private committees!: Committee[];
}
</script>
