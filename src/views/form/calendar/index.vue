<template>
  <div>
    <h2>calendar日历面板--通知日历与自定义日历面板</h2>
    <a-tabs>
      <a-tab-pane key="1" tab="通知日历">
        <Notice />
      </a-tab-pane>
      <a-tab-pane key="2" tab="自定义日历">
        <Setting />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Notice from "./components/notice.vue";
import Setting from "./components/setting.vue";

export default {
  components: {
    Notice,
    Setting,
  },
  setup() {
    return {};
  },
};
</script>
