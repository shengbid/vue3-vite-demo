<template>
  <div class="box">
    <h3>1.自定义头部, 月份增减; 2.自定义日期显示,工作日显示,周末显示</h3>
    <a-calendar
      :fullscreen="false"
      v-model:value="date"
      @panelChange="onPanelChange"
      @select="selectDate"
    >
      <template #headerRender="{ value, type, onChange, onTypeChange }">
        <div class="header">
          <left-outlined class="item" @click="dcrease(value, onChange)" />
          <span class="item">
            {{ format(value) }}
          </span>
          <right-outlined class="item" @click="increase(value, onChange)" />
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
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";

export default {
  name: "params",
  components: {
    LeftOutlined,
    RightOutlined,
  },
  setup() {
    const date = ref(dayjs());
    const onPanelChange = (a) => {
      console.log(a);
    };
    const selectDate = (val) => {
      date.value = val;
    };
    // 自定义日历头显示
    const format = (val) => {
      const newVal = dayjs(val).format("YYYY-MM");
      // console.log(val, newVal);
      return newVal;
    };
    // 月份减少, 需要保证传给onchange的值,是dayjs日期格式
    const dcrease = (value, onChange) => {
      date.value = value.month(value.month() - 1);
      onChange(date.value);
    };
    // 月份增加
    const increase = (value, onChange) => {
      date.value = value.month(value.month() + 1);
      onChange(date.value);
    };

    // 日期样式设置
    const getDateCss = (val) => {
      const day = val.day();
      const currentMonth = date.value.month() + 1;
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
      dcrease,
      increase,
    };
  },
};
</script>

<style scoped lang="less">
.box {
  .header {
    padding: 12px;
    display: flex;
    justify-content: space-around;
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
