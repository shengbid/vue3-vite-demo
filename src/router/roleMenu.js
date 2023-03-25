import menus from "./menu";

export const getRoleMenus = (roleName) => {
  let roleMenus = [];
  const render = (data, noShow, newArr = []) => {
    data.forEach((item) => {
      if (!noShow.includes(item.path)) {
        const newItem = {
          ...item,
        };
        if (item.children) {
          newItem.children = render(item.children, noShow);
        }
        newArr.push(newItem);
      }
    });
    return newArr;
  };
  switch (roleName) {
    case "admin":
      roleMenus = menus;
      break;
    case "role1":
      const noAuthor = ["/table", "/demo", "/vueinfo/v-model"];
      roleMenus = render(menus, noAuthor);
      break;
    case "role2":
      const noAuthor2 = ["/table/mutilSpanTable", "/form", "/userManage"];
      roleMenus = render(menus, noAuthor2);
      break;

    default:
      break;
  }
  return roleMenus;
};

export const getRoleAuthor = (roleName, path) => {
  const roleMenus = getRoleMenus(roleName);
  const commonMenu = ["/home", "/login", "/404", "/403"];
  let flag = false;
  flag = commonMenu.includes(path);
  const render = (data) => {
    data.some((item) => {
      if (item.path === path) {
        flag = true;
        return;
      } else if (item.children) {
        render(item.children);
      }
    });
  };
  render(roleMenus);

  return flag;
};