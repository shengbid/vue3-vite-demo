import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import menuLayout from "../layouts/index.vue";

const routes = [{
    path: "/login",
    name: "login",
    component: () => import("@/views/userManage/login/index.vue"),
  },
  {
    path: "/",
    component: menuLayout,
    redirect: "/home",
    children: [{
        path: "/home",
        name: "home",
        component: () => import("@views/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/chart",
        redirect: "/chart/pie",
        children: [{
          path: "/chart/pie",
          component: () => import("@views/chart/index.vue"),
          meta: {
            title: "多重环形图",
          },
        }, ],
      },
      {
        path: "/table",
        redirect: "/table/mutilSpanTable",
        children: [{
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
        redirect: "/form/inputNumber",
        children: [{
            path: "/form/inputNumber",
            component: () => import("@views/form/inputNumber/index.vue"),
            meta: {
              title: "数字输入验证",
            },
          },
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
        path: "/demo",
        redirect: "/demo/dragTime",
        children: [{
            path: "/demo/dragTime",
            component: () => import("@views/demo/dragTime/index.vue"),
            meta: {
              title: "时间范围选择",
            },
          },
          {
            path: "/demo/business",
            component: () => import("@views/demo/business/index.vue"),
            meta: {
              title: "表单增删改",
            },
          },
        ],
      },
      {
        path: "/vueinfo",
        redirect: "/vueinfo/transfer",
        children: [{
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
      {
        path: "/userManage",
        redirect: "/userManage/userInfo",
        children: [{
            path: "/userManage/roleMenu",
            name: "roleMenu",
            component: () => import("@views/userManage/roleMenu/index.vue"),
            meta: {
              title: "角色菜单",
            },
          },
          {
            path: "/userManage/userInfo",
            name: "userInfo",
            component: () => import("@views/userManage/userInfo/index.vue"),
            meta: {
              title: "个人中心",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@views/404.vue"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@views/403.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;