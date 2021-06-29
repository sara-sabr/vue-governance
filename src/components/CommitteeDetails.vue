<template>
  <div>
    <h2>{{ committee.name[lang] }}</h2>
    <p>{{ committee }}</p>
  </div>
</template>
<script lang="ts">
import { Committee } from "@/store/types";
import Vue, { PropType } from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    committee: {
      type: Object as PropType<Committee>,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
})
export default class CommitteeDetails extends Vue {
  membersCount(): number {
    const count =
      this.$props.committee.chairs.length +
      this.$props.committee.viceChairs.length +
      this.$props.committee.members.length;
    return count;
  }

  allAttendantsCount(): number {
    const count = this.membersCount() + this.$props.committee.members.length;
    return count;
  }
}
</script>
