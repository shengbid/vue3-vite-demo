<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <router-view />
    <!-- <div :class="['weight', 'padding']" :style="{ color: 'red' }">测试</div> -->
    <!-- <a-space>
      <router-link to="/home">去home页面</router-link>
      <router-link to="/user">去user页面</router-link>
      <router-link to="/chart">去chart页面</router-link>
      <router-link to="/transfer">去transfer页面</router-link>
    </a-space>
    <router-view #default="{ Component, route }"> -->
    <!-- <keep-alive :include="['user']">
        <component :is="Component" />
      </keep-alive> -->
    <!-- <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" />
    </router-view> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.weight {
  font-weight: bold;
}
.padding {
  padding-bottom: 20px;
}
.space {
  margin-right: 20px;
}
</style>
