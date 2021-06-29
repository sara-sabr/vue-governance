<template>
  <div id="app">
    <div id="nav" class="nav nav-pills justify-content-center">
      <router-link to="/" class="nav-link">{{ $t("homeTitle") }}</router-link>
    </div>
    <router-view />
  </div>
</template>
