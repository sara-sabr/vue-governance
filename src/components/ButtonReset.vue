<template>
  <button class="custom-file" @click="reset()">{{ $t("button.reset") }}</button>
</template>
<script lang="ts">
import { ActionTypes } from "@/store/actions";
import Vue from "vue";
export default class Reset extends Vue {
  reset(): void {
    this.$store.dispatch(ActionTypes.ResetData, null);
  }
}
</script>
