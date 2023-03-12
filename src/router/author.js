// 路由鉴权

import router from "./index";
import { getRoleAuthor } from "./roleMenu";

router.beforeEach((to, from) => {
  const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo")) || {};
  const { userName } = loginInfo;
  const noLogin = userName ? false : true;
  if (noLogin && to.name !== "login") {
    return {
      name: "login",
    };
  }

  if (!getRoleAuthor(userName, to.path) && to.name !== "403") {
    return {
      name: "403",
    };
  }
});
