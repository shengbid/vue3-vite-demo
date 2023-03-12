export default [
  {
    path: "/home",
    title: "首页",
    icon: "HomeOutlined",
  },
  {
    path: "/chart",
    title: "图表",
    icon: "GatewayOutlined",
    children: [
      {
        path: "/chart/pie",
        title: "多重环形图",
      },
    ],
  },
  {
    path: "/table",
    title: "表格",
    icon: "TableOutlined",
    children: [
      {
        path: "/table/mutilSpanTable",
        title: "动态层级表格合并",
      },
      {
        path: "/table/styleTable",
        title: "表格样式设置",
      },
    ],
  },
  {
    path: "/form",
    title: "表单",
    icon: "ProfileOutlined",
    children: [
      {
        path: "/form/mutilForm",
        title: "动态增减表单",
      },
    ],
  },
  {
    path: "/demo",
    title: "小例子",
    icon: "SmileOutlined",
    children: [
      {
        path: "/demo/dragTime",
        title: "时间范围选择",
      },
      {
        path: "/demo/business",
        title: "表单增删改",
      },
    ],
  },
  {
    path: "/vueinfo",
    title: "vue知识",
    icon: "FileTextOutlined",
    children: [
      {
        path: "/vueinfo/transfer",
        title: "组件动画",
      },
      {
        path: "/vueinfo/v-model",
        title: "v-model",
      },
      {
        path: "/vueinfo/global",
        title: "缓存与全局组件",
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/userManage",
    title: "用户管理",
    icon: "SettingOutlined",
    children: [
      {
        path: "/userManage/roleMenu",
        title: "角色菜单",
      },
      {
        path: "/userManage/userInfo",
        title: "个人中心",
      },
    ],
  },
];
