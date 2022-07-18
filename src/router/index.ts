import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TicTacToeView from "../views/TicTacToeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: () => {
      return "one";
    },
  },
  {
    path: "/one",
    name: "one",
    component: TicTacToeView,
  },
  {
    path: "/two",
    name: "two",
    component: TicTacToeView,
  },
  {
    path: "/**",
    redirect: () => {
      return "one";
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
