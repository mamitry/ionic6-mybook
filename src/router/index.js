import { createRouter, createWebHashHistory } from "@ionic/vue-router";
import { DebugLevel, appLog } from "../functions/Logging";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/book",
    component: () => import("../views/Books.vue"),
  },
  {
    path: "/book/:key",
    component: () => import("../views/BooksDetails.vue"),
    name: "books",
  },
  {
    path: "/chapters/:key",
    component: () => import("../views/Chapters.vue"),
    name: "chapters",
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const el = window.location.href.split("#")[2];
      if (el.length && document.getElementById(el) !== null) {
        appLog(DebugLevel.ROUTER, "[ROUTER]", "el: ", el);
        appLog(DebugLevel.ROUTER, "[ROUTER]", "document.getElementById(el) ", document.getElementById(el));
        document.getElementById(el).scrollIntoView({ inline: "nearest" });
      }
    } else if (savedPosition) {
      return savedPosition;
    } else {
      document.getElementById("app").scrollIntoView();
    }
  },
  // check this:
  // https://stackoverflow.com/questions/71196755/linking-router-link-and-scrollbehavior-not-working-vue-3-and-ionic-6/71199653#71199653
});

router.beforeEach((to, from) => {
  appLog(DebugLevel.ROUTER, "[ROUTER]", "from: ", from);
  appLog(DebugLevel.ROUTER, "[ROUTER]", "to: ", to);
  return true;
});

export default router;
