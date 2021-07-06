import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Committees from "../views/Committees.vue";
import Home from "../views/Home.vue";
import BranchPositions from "../views/BranchPositions.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/committees",
    name: "Committees",
    component: Committees,
  },
  {
    path: "/branch-positions",
    name: "Branch Positions",
    component: BranchPositions,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/BranchPositions.vue"),
  },
  { path: "*", name: "notFound", component: Home },
];

const router = new VueRouter({
  routes,
});

export default router;
