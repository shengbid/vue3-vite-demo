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
      <Menu @selectMenu="selectMenu" />
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
        <div class="right-person">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <a-avatar style="background-color: #fde3cf">
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
              <span class="name">
                {{ userInfo.name }}
              </span>
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="toUser">个人中心</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">退出登陆</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-tabs
        v-model:activeKey="activeKey"
        hide-add
        type="editable-card"
        @change="changeTab"
        @edit="onEdit"
      >
        <a-tab-pane
          v-for="(pane, i) in panes"
          :key="pane.path"
          :tab="pane.title"
          :closable="i !== 0"
        />
      </a-tabs>
      <a-layout-content
        :style="{
          margin: '0px 16px 24px',
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
            <component
              :is="Component"
              :key="route.path"
              v-if="route.meta.keepAlive"
            />
          </keep-alive>
          <component :is="Component" v-if="!route.meta.keepAlive" />
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, reactive, toRefs } from "vue";
import Menu from "./sider/menu/index.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/stores/userInfo";

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    DownOutlined,
    Menu,
  },
  setup() {
    const collapsed = ref(false);
    const info = reactive({
      activeKey: "/home",
      panes: [{ title: "首页", path: "/home" }],
    });
    const userStore = useUserInfoStore();
    const { userInfo } = storeToRefs(userStore);
    // console.log(userStore);
    console.log("初始值: userInfo", userInfo);
    const router = useRouter();
    const toUser = () => {
      router.push({ name: "userInfo" });
    };
    // 删除tab
    const onEdit = (key, action) => {
      info.panes = info.panes.filter((item) => item.path !== key);
      // 如果删除的是当前展示的项,往前移一项
      if (info.activeKey === key) {
        info.activeKey = info.panes[info.panes.length - 1].path;
      }
    };
    // 切换tab
    const changeTab = (key) => {
      info.activeKey = key;
      router.push(key);
    };
    // 选择菜单
    const selectMenu = (row) => {
      // console.log(row);
      const showKeys = info.panes.filter((item) => item.path === row.path);
      if (!showKeys.length) {
        info.panes.push(row);
      }
      info.activeKey = row.path;
    };
    return {
      collapsed,
      ...toRefs(info),
      onEdit,
      changeTab,
      selectMenu,
      userInfo,
      toUser,
    };
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
.right-person {
  float: right;
  margin-right: 24px;
}
.name {
  margin: 0 10px;
}
</style>
