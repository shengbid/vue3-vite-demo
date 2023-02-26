// 用户登陆信息
import {
  defineStore
} from "pinia";

// 选项式写法
// 这里的初始值应该是调用后端的接口获取,这里纯前端就用本地存的用户信息
const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo")) || {};
const {
  userName
} = loginInfo;
// export const useUserInfoStore = defineStore("userInfo", {
//   state: () => {
//     return {
//       userInfo: {
//         name: userName,
//         sex: "0",
//         worker: "工人",
//         address: "奥利奥大街",
//         phone: "13322345678",
//       },
//     };
//   },
//   actions: {
//     // 修改用户信息
//     changeUserInfo(info) {
//       setTimeout(() => {
//         this.userInfo = {
//           ...info
//         };

//       }, 500);
//     },
//   },
// });

import {
  ref
} from "vue";

// 组合式写法
// 这里的初始值应该是调用后端的接口获取,这里纯前端就用本地存的用户信息
export const useUserInfoStore = defineStore("userInfo", () => {
  const userInfo = ref({
    name: userName,
    sex: "0",
    worker: "工人",
    address: "奥利奥大街",
    phone: "13322345678",
  });

  const changeUserInfo = (info) => {
    setTimeout(() => {
      userInfo.value = {
        ...info
      };
    }, 500);
  };
  return {
    userInfo,
    changeUserInfo,
  };
});