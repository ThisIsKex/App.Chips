import { createRouter, createWebHistory } from "vue-router";
import JoinView from "../views/JoinView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:id?",
      name: "join",
      component: JoinView
    },
    {
      path: "/session/:id",
      name: "session",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SessionView.vue")
    }
  ]
});

export default router;
