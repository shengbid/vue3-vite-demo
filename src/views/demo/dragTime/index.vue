<template>
  <div class="about">
    <div>
      <h3>新增</h3>
      <drag-weektime
        v-model:value="multTimeRange"
        :data="weektimeData"
        @on-clear="clearWeektime"
      >
      </drag-weektime>
      <a-button type="parimary" @click="submit">提交</a-button>
    </div>
    <div>
      <h3>数据回显</h3>
      <drag-weektime
        v-model:value="multTimeRange2"
        :data="weektimeData2"
        @on-clear="clearWeektime2"
      >
      </drag-weektime>
      <a-button type="parimary" @click="submit2">提交</a-button>
    </div>
  </div>
</template>
<script>
import DragWeektime from "./components/dragWeekTime.vue";
import handleData from "./components/handleData";

function splicing(list) {
  let same;
  let i = -1;
  let len = list.length;
  let arr = [];

  if (!len) return;
  while (++i < len) {
    const item = list[i];
    if (item.check) {
      if (item.check !== Boolean(same)) {
        arr.push(...["、", item.begin, "~", item.end]);
      } else if (arr.length) {
        arr.pop();
        arr.push(item.end);
      }
    }
    same = Boolean(item.check);
  }
  arr.shift();
  return arr.join("");
}

export default {
  name: "DragTime",
  components: { DragWeektime }, //, DatePicker
  computed: {
    multTimeRange() {
      return this.weektimeData.map(item => {
        return {
          id: item.row,
          week: item.value,
          value: splicing(item.child)
        };
      });
    },
    multTimeRange2() {
      return this.weektimeData2.map(item => {
        return {
          id: item.row,
          week: item.value,
          value: splicing(item.child)
        };
      });
    }
  },
  data() {
    return {
      weektimeData: handleData([]),
      weektimeData2: handleData([])
    };
  },
  created() {
    setTimeout(() => {
      const testData = [
        {
          id: 0,
          week: "星期一",
          value: "05:00~11:00、15:00~17:30"
        },
        { id: 2, week: "星期三", value: "06:30~18:00" }
      ];
      this.weektimeData2 = handleData(testData);
      console.log("multTimeRange后台数据", this.multTimeRange2);
      console.log("weektimeData转换后数据", this.weektimeData2);
    }, 1000);
  },
  methods: {
    // 清空时间段
    clearWeektime() {
      this.weektimeData.forEach(item => {
        item.child.forEach(t => {
          t.check = false;
        });
      });
    },
    // 提交数据格式
    submit() {
      console.log("submit", this.multTimeRange);
    },
    // 清空时间段
    clearWeektime2() {
      this.weektimeData2.forEach(item => {
        item.child.forEach(t => {
          t.check = false;
        });
      });
    },
    // 提交数据格式
    submit2() {
      console.log("submit", this.multTimeRange);
    }
  }
};
</script>