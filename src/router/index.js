import { createRouter, createWebHashHistory } from "vue-router";
import menuLayout from "../layouts/index.vue";

const routes = [
  {
    path: "/",
    component: menuLayout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@views/home/index.vue"),
      },
      {
        path: "/chart",
        redirect: "/chart/pie",
        children: [
          {
            path: "/chart/pie",
            component: () => import("@views/chart/index.vue"),
          },
        ],
      },
      {
        path: "/vueinfo",
        redirect: "/vueinfo/transfer",
        children: [
          {
            path: "/vueinfo/transfer",
            component: () => import("@views/vueinfo/transfer/index.vue"),
          },
          {
            path: "/vueinfo/v-model",
            component: () => import("@views/vueinfo/v-model/index.vue"),
          },
        ],
      },
      {
        path: "/user",
        component: () => import("@views/user/index.vue"),
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
