<template>
  <div>
    <main id="app" property="mainContentOfPage">
      <div id="nav" class="nav nav-pills justify-content-center">
        <router-link to="/" class="nav-link">{{ $t("homeTitle") }}</router-link>
        <router-link to="/committees" class="nav-link">{{
          $t("committeesTitle")
        }}</router-link>
        <router-link to="/positions" class="nav-link">{{
          $t("positionsTitle")
        }}</router-link>
        <router-link to="/pathways" class="nav-link">{{
          $t("pathwaysTitle")
        }}</router-link>
      </div>
      <router-view />
    </main>
    <footer>
      <div class="container">
        <a href="https://github.com/sara-sabr/vue-governance">{{
          $t("link.source")
        }}</a>
      </div>
    </footer>
  </div>
</template>
