<template>
  <template v-for="item in menuData">
    <a-menu-item
      :key="item.path"
      v-if="!item.children"
      @click="clickMenu(item.path)"
    >
      <template #icon v-if="item.icon">
        <CreateIcon :icon="item.icon" />
      </template>
      <span>{{ item.title }}</span>
    </a-menu-item>

    <a-sub-menu :key="item.path" v-else>
      <template #icon v-if="item.icon">
        <CreateIcon :icon="item.icon" />
      </template>
      <template #title>{{ item.title }}</template>
      <MenuItem :menuData="item.children" />
    </a-sub-menu>
  </template>
</template>

<script>
import menuData from "@/router/menu.js";
import { CreateIcon } from "../createIcon";
import { useRouter } from "vue-router";
export default {
  components: {
    CreateIcon,
  },
  name: "MenuItem",
  props: {
    menuData: {
      type: Array,
      default: () => menuData,
    },
  },
  setup() {
    const router = useRouter();
    const clickMenu = (path) => {
      router.push(path);
    };

    return {
      clickMenu,
    };
  },
};
</script>
