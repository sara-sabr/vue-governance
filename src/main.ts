import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
