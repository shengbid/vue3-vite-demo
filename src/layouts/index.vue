<template>
  <a-layout class="demo-custom-trigger">
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <Menu />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view #default="{ Component, route }">
          <!-- <keep-alive :include="['user']">
        <component :is="Component" />
      </keep-alive> -->
          <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!route.meta.keepAlive" />
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import Menu from "./sider/menu/index.vue";

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    Menu,
  },
  setup() {
    const collapsed = ref(false);
    return { collapsed };
  },
});
</script>
<style>
.demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
