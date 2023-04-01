<template>
  <div>
    <h3>单个日期选择</h3>
    <div class="date-box">
      <div class="item">
        <h3>选择今天之前的日期</h3>
        <a-date-picker format="YYYY-MM-DD" :disabled-date="disabledDate1" />
      </div>
      <div class="item">
        <h3>选择未来一周的日期</h3>
        <a-date-picker format="YYYY-MM-DD" :disabled-date="disabledDate2" />
      </div>
      <div class="item">
        <h3>选择未来一月的日期</h3>
        <a-date-picker format="YYYY-MM-DD" :disabled-date="disabledDate3" />
      </div>
    </div>
    <h3>日期范围选择</h3>
    <div class="date-box">
      <div class="item">
        <h3>选择今天之前的日期</h3>
        <a-range-picker format="YYYY-MM-DD" :disabled-date="disabledRange1" />
      </div>
      <div class="item">
        <h3>选择未来一周的日期</h3>
        <a-range-picker format="YYYY-MM-DD" :disabled-date="disabledRange2" />
      </div>
      <div class="item">
        <h3>选择未来一月的日期</h3>
        <a-range-picker format="YYYY-MM-DD" :disabled-date="disabledRange3" />
      </div>
      <div class="item">
        <h3>选择开始日期后一周的日期</h3>
        <a-range-picker
          :value="weekDate"
          format="YYYY-MM-DD"
          :disabled-date="disabledRange4"
          @change="changeWeek"
          @openChange="onOpenChange1"
          @calendarChange="onCalendarChange1"
        />
      </div>
      <div class="item">
        <h3>选择开始日期后一月的日期</h3>
        <a-range-picker
          :value="monthDate"
          format="YYYY-MM-DD"
          :disabled-date="disabledRange5"
          @change="changeMonth"
          @calendarChange="onCalendarChange2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { ref } from "vue";
import "moment/locale/zh-cn";

export default {
  name: "datePicker",
  setup() {
    // 选择今天之前的日期
    const disabledDate1 = (current) => {
      // return current && current > moment().endOf("day") // 今天可选
      return current && current > moment().subtract(1, "day"); // 今天不可选
    };
    // 选择选择未来一周的日期
    const disabledDate2 = (current) => {
      const tooEarly = current < moment().endOf("day");
      const tooLater = current > moment().add(7, "day");
      return current && (tooEarly || tooLater);
    };
    // 选择未来一月的日期
    const disabledDate3 = (current) => {
      const tooEarly = current < moment().endOf("day");
      const tooLater = current > moment().add(1, "month");
      return current && (tooEarly || tooLater);
    };
    // 选择今天之前的日期
    const disabledRange1 = (current) => {
      // return current && current > moment().endOf("day") // 今天可选
      return current && current > moment().subtract(1, "day"); // 今天不可选
    };
    // 选择选择未来一周的日期
    const disabledRange2 = (current) => {
      const tooEarly = current < moment().endOf("day");
      const tooLater = current > moment().add(7, "day");
      return current && (tooEarly || tooLater);
    };
    // 选择未来一月的日期
    const disabledRange3 = (current) => {
      const tooEarly = current < moment().endOf("day");
      const tooLater = current > moment().add(1, "month");
      return current && (tooEarly || tooLater);
    };
    const weekDate = ref([]);
    const weekDates = ref([]);
    // 选择开始日期后一周的日期
    const disabledRange4 = (current) => {
      const dates = weekDates.value;
      if (!dates || dates.length === 0) {
        return false;
      }
      const tooEarly = dates[0] && current.diff(dates[0], "days") > 7;
      const tooLater = dates[1] && dates[1].diff(current, "days") > 7;
      return current && (tooEarly || tooLater);
    };
    const changeWeek = (val) => {
      weekDate.value = val;
    };
    const onOpenChange1 = (open) => {
      if (open) {
        // weekDates.value = [];
      }
    };
    const onCalendarChange1 = (val) => {
      weekDates.value = val;
    };
    const monthDate = ref([]);
    const monthDates = ref([]);
    // 选择开始日期后一月的日期
    const disabledRange5 = (current) => {
      const dates = monthDates.value;
      if (!dates || dates.length === 0) {
        return false;
      }
      const tooEarly = dates[0] && current.diff(dates[0], "month") > 0;
      const tooLater = dates[1] && dates[1].diff(current, "month") > 0;
      return current && (tooEarly || tooLater);
    };
    const changeMonth = (val) => {
      monthDate.value = val;
    };
    const onCalendarChange2 = (val) => {
      monthDates.value = val;
    };
    return {
      disabledDate1,
      disabledDate2,
      disabledDate3,
      disabledRange1,
      disabledRange2,
      disabledRange3,
      disabledRange4,
      disabledRange5,
      weekDate,
      monthDate,
      changeWeek,
      changeMonth,
      onOpenChange1,
      onCalendarChange1,
      onCalendarChange2,
    };
  },
};
</script>

<style scoped>
.date-box {
  display: flex;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.date-box .item {
  width: 30%;
  margin-right: 12px;
  margin-bottom: 12px;
}
</style>
