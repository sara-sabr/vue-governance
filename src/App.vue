<template>
  <div id="app">
    <div id="nav" class="nav nav-pills justify-content-center">
      <router-link to="/" class="nav-link">{{ $t("homeTitle") }}</router-link>
      <router-link to="/committees" class="nav-link">{{
        $t("committeesTitle")
      }}</router-link>
      <router-link to="/positions" class="nav-link">{{
        $t("positionsTitle")
      }}</router-link>
    </div>
    <router-view />
  </div>
</template>
