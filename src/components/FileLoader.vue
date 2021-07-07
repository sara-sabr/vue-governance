<template>
  <div class="custom-file">
    <input
      type="file"
      class="custom-file-input"
      id="customFile"
      @change="loadDataFromFile($event)"
    />
    <label class="custom-file-label" for="customFile"
      >Choose file for branch positions</label
    >
  </div>
</template>
<script lang="ts">
import BranchPositions from "@/views/BranchPositions.vue";
import Vue from "vue";
export default class FileLoader extends Vue {
  loadDataFromFile($event: any): void {
    if ($event === null || $event === undefined || $event.files === undefined) {
      return;
    }
    const target = $event.files;
    console.log(target);

    // const target = $event.target as HTMLInputElement;
    // const files = target;

    if (target?.length === 0) {
      return;
    }
    this.loadBranchPositions(target[0]);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadBranchPositions(file: File): void {
    // console.log(file);
    const reader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reader.onload = (e: ProgressEvent) => {
      const result = reader.result as string;
      if (result === "undefined") {
        console.log("file is undefined");
        return;
      }

      const loadedFile: BranchPositions[] = JSON.parse(result);
      // console.log(loadedFile);
      this.$emit("fileLoaded", loadedFile);
    };

    reader.readAsText(file);
  }
}
</script>
<style>
input {
  opacity: 0%;
}
label {
  outline: 1px;
  outline-color: black;
}
</style>
