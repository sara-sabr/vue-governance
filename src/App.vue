<template>
  <div>
    <a class="visually-hidden-focusable" href="#app">{{
      $t("navigation.skipToMain")
    }}</a>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/" class="nav-link">{{
              $t("navigation.toHome")
            }}</router-link>
            <router-link to="/committees" class="nav-link">{{
              $t("navigation.toCommittees")
            }}</router-link>
            <router-link to="/positions" class="nav-link">{{
              $t("navigation.toPositions")
            }}</router-link>
            <router-link to="/pathways" class="nav-link">{{
              $t("navigation.toPathways")
            }}</router-link>
            <button class="nav-link btn" @click="languageToggle()">
              {{ $t("navigation.languageToggle") }}
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main id="app" property="mainContentOfPage" class="mt-3">
      <div class="container">
        <div class="alert alert-primary" role="alert">
          {{ $t("alert.proofOfConcept") }}
        </div>
      </div>
      <router-view />
    </main>
    <footer>
      <div class="container">
        <a href="https://github.com/sara-sabr/vue-governance">{{
          $t("link.source")
        }}</a>
        <p class="mt-3">{{ $t("alert.copyrightNotice") }}</p>
        <a class="visually-hidden-focusable" href="#app">{{
          $t("navigation.toTop")
        }}</a>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      lang: this.$i18n.locale,
    };
  },
  methods: {
    languageToggle(): void {
      if (this.$i18n.locale === "en") {
        this.$i18n.locale = "fr";
      } else {
        this.$i18n.locale = "en";
      }
    },
  },
});
</script>
