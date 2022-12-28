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
    ],
  },
];
