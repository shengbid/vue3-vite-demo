<template>
  <div class="box">
    <h3>1.自定义头部; 2.自定义日期显示,工作日显示,周末显示</h3>
    <a-calendar
      :fullscreen="false"
      v-model:value="date"
      @panelChange="onPanelChange"
      @select="selectDate"
    >
      <template #headerRender="{ value, type, onChange, onTypeChange }">
        <div class="header">
          {{ format(value) }}
        </div>
      </template>
      <template #dateFullCellRender="{ current: value }">
        <div :class="getDateCss(value)">
          {{ value.date() }}
        </div>
      </template>
    </a-calendar>
  </div>
</template>

<script>
import { ref } from "vue";
import dayjs from "dayjs";
export default {
  name: "params",
  setup() {
    const date = ref();
    const onPanelChange = (a) => {
      console.log(a);
    };
    const selectDate = (val) => {
      date.value = val;
    };
    // 自定义日历头
    const format = (val) => {
      const newVal = dayjs(val).format("YYYY-MM");
      console.log(val, newVal);
      return newVal;
    };
    // 日期样式设置
    const getDateCss = (val) => {
      const day = val.day();
      const currentMonth = dayjs().month() + 1;
      const month = val.month() + 1;
      // 如果不是当前月份
      if (month !== currentMonth) {
        return "date";
      }
      // 如果是周六周日
      if (day === 6 || day === 0) {
        return "date week";
      } else {
        return "date work";
      }
    };
    return {
      date,
      onPanelChange,
      format,
      selectDate,
      getDateCss,
    };
  },
};
</script>

<style scoped lang="less">
.box {
  .header {
    padding: 12px;
    text-align: center;
  }
  .date {
    position: relative;
    z-index: 2;
    display: inline-block;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 2px;
    transition: background 0.3s, border 0.3s;
    &.work {
      background-color: rgb(20, 134, 228);
    }
    &.week {
      background-color: rgb(193, 240, 97);
    }
  }
}
</style>
