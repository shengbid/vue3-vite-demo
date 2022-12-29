<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    @select="selectMenu"
  >
    <MenuItem />
  </a-menu>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import MenuItem from "../menuItem/index.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    MenuItem,
  },
  setup(props, { emit }) {
    const info = reactive({
      openKeys: ["/home"],
      selectedKeys: ["/home"],
    });
    const route = useRoute();

    const handleRoute = () => {
      // console.log(route);
      const { path } = route;
      info.selectedKeys = [path];
      const paths = path.split("/");

      if (paths.length > 2) {
        info.openKeys = [`/${paths[1]}`];
      } else {
        info.openKeys = [path];
      }
    };
    handleRoute();

    watch(route, (newVal) => {
      handleRoute();
    });

    const selectMenu = ({ key, item }) => {
      const { title } = item;
      emit("selectMenu", { path: key, title });
    };

    return {
      ...toRefs(info),
      selectMenu,
    };
  },
};
</script>
