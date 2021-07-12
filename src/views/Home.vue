<template>
  <div class="container">
    <h1 class="text-center">{{ $t("homeTitle") }}</h1>
    <div v-html="markdownToHtml($t('homeExplanation'))"></div>
    <!-- <FileLoader v-on:fileLoaded="fileLoaded($event)" /> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import FileLoader from "@/components/FileLoader.vue";
import BranchPositions from "./BranchPositions.vue";
@Component({
  components: {
    // FileLoader,
  },
  methods: {
    markdownToHtml(message: string) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const marked = require("marked");
      return marked(message);
    },
    // },
    // fileLoaded($event: BranchPositions[]) {
    //   console.log("Home level: \n");
    //   const content = $event;
    //   // content.forEach((item) => {
    //   //   console.log(Object.keys(item) + " " + Object.values(item));
    //   // });
    //   // const branchPositions = $event;
    //   this.$emit("fileLoadedAgain", content);
    // },
  },
})
export default class Home extends Vue {
  fileLoaded($event: BranchPositions[]): void {
    console.log("Home level: \n");
    const content = $event;
    // content.forEach((item) => {
    //   console.log(Object.keys(item) + " " + Object.values(item));
    // });
    // const branchPositions = $event;
    this.$emit("fileLoadedAgain", content);
  }
}
</script>
