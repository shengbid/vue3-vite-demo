import * as icons from "@ant-design/icons-vue";
// import { createApp } from 'vue'
import {
  createVNode
} from "vue";

// const app = createApp({})
// console.log(icons);

export const CreateIcon = (props) => {
  // const iconComponent = icons[icon] || icons['HomeOutlined']
  // app.component(
  //   icon,
  //   iconComponent
  // )
  const {
    icon
  } = props;
  return createVNode(icons[icon]);
};