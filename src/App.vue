<template>
  <div id="app">
    <div id="nav" class="nav nav-pills justify-content-center">
      <router-link to="/" class="nav-link">{{ $t("homeTitle") }}</router-link>
      <router-link to="/branch-positions" class="nav-link">{{
        $t("branchPositionsTitle")
      }}</router-link>
    </div>
    <router-view />
  </div>
</template>
