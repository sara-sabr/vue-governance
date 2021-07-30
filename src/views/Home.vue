<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.home.title") }}</h1>
    <div v-html="markdownToHtml($t('page.home.description'))"></div>
    <div class="row mb-3">
      <button class="btn btn-secondary col" @click="loadTestData()">
        {{ $t("button.test") }}
      </button>
      <a
        href="/assets/demoDataFile.json"
        download="demoDataFile"
        target="_blank"
        class="col"
        >{{ $t("page.home.testData") }}</a
      >
    </div>
    <FileLoader
      v-on:fileLoaded="fileLoaded($event)"
      v-on:reset="reset($event)"
    />
  </div>
</template>

<script lang="ts">
import { DataFile } from "@/store/state";
import Vue from "vue";
import Component from "vue-class-component";
import FileLoader from "@/components/FileLoader.vue";
import { ActionTypes } from "@/store/actions";
// import Positions from "./Positions.vue";
@Component({
  data() {
    return {
      demoFile: require("@/assets/demoDataFile.json"),
    };
  },
  components: {
    FileLoader,
  },
  methods: {
    markdownToHtml(message: string) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const marked = require("marked");
      return marked(message);
    },
  },
})
export default class Home extends Vue {
  loadTestData(): void {
    this.$store.dispatch(ActionTypes.LoadFileData, this.$data.demoFile);
  }
  fileLoaded(file: DataFile): void {
    this.$store.dispatch(ActionTypes.LoadFileData, file);
  }
  reset(): void {
    this.$store.dispatch(ActionTypes.ResetData, null);
  }
}
</script>
