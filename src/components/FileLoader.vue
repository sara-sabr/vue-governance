<template>
  <div class="input-group">
    <!-- <label class="form-label" for="formFile">{{
      $t("fileLoader.selectFile")
    }}</label> -->
    <input
      type="file"
      class="form-control"
      id="formFile"
      aria-describedby="dataFileInput"
      v-bind:aria-label="$t('fileLoader.submit')"
      @change="onChangeFile($event)"
    />
    <button
      type="button"
      id="dataFileInput"
      class="btn btn-primary"
      @click="onSubmit()"
    >
      {{ $t("fileLoader.submit") }}
    </button>
  </div>
</template>
<script lang="ts">
import { DataFile } from "@/store/state";
import Vue from "vue";
export default class FileLoader extends Vue {
  validFile = false;
  dataFile = new Object() as DataFile;
  onChangeFile(event: Event): void {
    if (event === null || event === undefined) {
      return;
    }
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files === null || files.length === 0) {
      return;
    }
    this.loadDataFile(files[0]);
  }

  loadDataFile(file: File): void {
    //Validate file type - JSON
    let extension = file.name.split(".").pop();
    if (extension === undefined || extension.toLowerCase() != "json") {
      alert(this.$t("alert.fileTypeJSON"));
      return;
    }

    const reader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reader.onload = (e: ProgressEvent) => {
      const result = reader.result as string;
      if (result === "undefined") {
        console.log("file is undefined");
        return;
      }

      const loadedFile: DataFile = JSON.parse(result);

      // Validate File Content Structure
      let message = "";
      let version = loadedFile.version;
      if (version === undefined) {
        message = message + "\n" + this.$t("alert.missingVersion").toString();
      }
      if (
        loadedFile.positions === undefined ||
        loadedFile.positions.length === 0
      ) {
        message = message + "\n" + this.$t("alert.missingPositions").toString();
      }
      if (
        loadedFile.committees === undefined ||
        loadedFile.committees.length === 0
      ) {
        message =
          message + "\n" + this.$t("alert.missingCommittees").toString();
      }
      if (
        loadedFile.pathways === undefined ||
        loadedFile.pathways.length === 0
      ) {
        message += "\n" + this.$t("alert.missingPathways").toString();
      }
      if (loadedFile.rates === undefined || loadedFile.rates.length === 0) {
        message = message + "\n" + this.$t("alert.missingRates").toString();
      }

      if (message !== "") {
        alert(this.$t("alert.fileStructure") + "\n" + message);
        return;
      }
      this.dataFile = loadedFile;
      this.validFile = true;
      // this.$emit("fileLoaded", loadedFile);
    };

    reader.readAsText(file);
  }

  onSubmit(): void {
    if (this.validFile === true) {
      this.$emit("fileLoaded", this.dataFile);
    } else {
      alert(this.$t("alert.submitValidFile"));
    }
  }
}
</script>
