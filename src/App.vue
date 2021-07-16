<template>
  <div>
    <div id="nav" class="nav nav-pills justify-content-center">
      <router-link to="/" class="nav-link">{{ $t("homeTitle") }}</router-link>
      <router-link to="/committees" class="nav-link">{{
        $t("committeesTitle")
      }}</router-link>
      <router-link to="/positions" class="nav-link">{{
        $t("positionsTitle")
      }}</router-link>
    </div>
    <main id="app" property="mainContentOfPage">
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
