<template>
  <div class="container">
    <h1 class="text-center">{{ $t("page.home.title") }}</h1>
    <div v-html="markdownToHtml($t('page.home.description'))"></div>
    <FileLoader
      v-on:fileLoaded="fileLoaded($event)"
      v-on:reset="reset($event)"
    />
    <Overview v-if="dataLoaded === true" />
    <div class="mb-3">
      <button class="btn btn-secondary" @click="loadTestData()">
        {{ $t("button.test") }}
      </button>
    </div>
    <div class="mb-3">
      <a href="/assets/demoDataFile.json" download="demoDataFile">{{
        $t("page.home.testData")
      }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { DataFile } from "@/store/state";
import Vue from "vue";
import Component from "vue-class-component";
import FileLoader from "@/components/FileLoader.vue";
import Overview from "@/components/Overview.vue";
import { ActionTypes } from "@/store/actions";
import { mapState } from "vuex";
// import Positions from "./Positions.vue";
@Component({
  data() {
    return {
      demoFile: require("@/assets/demoDataFile.json"),
    };
  },
  computed: {
    ...mapState(["dataLoaded"]),
  },
  components: {
    FileLoader,
    Overview,
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
