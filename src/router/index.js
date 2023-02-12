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
        meta: {
          title: "首页",
        },
      },
      {
        path: "/chart",
        redirect: "/chart/pie",
        children: [
          {
            path: "/chart/pie",
            component: () => import("@views/chart/index.vue"),
            meta: {
              title: "多重环形图",
            },
          },
        ],
      },
      {
        path: "/table",
        redirect: "/table/mutilSpanTable",
        children: [
          {
            path: "/table/mutilSpanTable",
            component: () => import("@views/table/mutilSpanTable/index.vue"),
            meta: {
              title: "动态层级表格合并",
            },
          },
          {
            path: "/table/styleTable",
            component: () => import("@views/table/styleTable/index.vue"),
            meta: {
              title: "表格样式设置",
            },
          },
        ],
      },
      {
        path: "/form",
        redirect: "/form/mutilForm",
        children: [
          {
            path: "/form/mutilForm",
            component: () => import("@views/form/mutilForm/index.vue"),
            meta: {
              title: "动态增减表单",
            },
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
            meta: {
              title: "组件动画",
            },
          },
          {
            path: "/vueinfo/v-model",
            component: () => import("@views/vueinfo/v-model/index.vue"),
            meta: {
              keepAlive: true,
              title: "v-model",
            },
          },
          {
            path: "/vueinfo/global",
            component: () => import("@views/user/index.vue"),
            meta: {
              keepAlive: true,
              title: "缓存与全局组件",
            },
          },
        ],
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
