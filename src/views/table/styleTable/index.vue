<template>
  <div>
    <h3>表格样式设置</h3>
    <a-table
      class="container"
      :columns="columns"
      :data-source="fixedData"
      bordered
      :rowClassName="rowClassName"
      :customHeaderRow="customHeaderRow"
    >
    </a-table>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "tableStyle",
  setup() {
    const fixedData = ref([]);
    for (let i = 0; i < 20; i += 1) {
      fixedData.value.push({
        key: i,
        name: ["Light", "Bamboo", "Little"][i % 3],
        borrow: Math.floor(Math.random() * 100),
        repayment: Math.floor(Math.random() * 100),
        description: "Everything that has a beginning, has an end.",
      });
    }

    // 表格行样式
    const rowClassName = (record, index) => {
      if (index % 2 === 1) {
        return "default-row double-row";
      }
      return "default-row";
    };
    // 表格头样式
    const customHeaderRow = (column, index) => {
      return {
        class: "header-row",
      };
    };
    // 单元格样式
    const customCell = (column, index) => {
      // console.log(column, index);
      if (index === 0 || index === 2) {
        return {
          class: "custom-row",
        };
      }
      return {};
    };
    // 表头单元格样式
    const customHeaderCell = (column, index) => {
      return {
        class: "custom-header-row",
      };
    };

    const columns = ref([
      {
        title: "Name",
        dataIndex: "name",
        fixed: true,
        customCell: customCell,
      },
      {
        title: "Borrow",
        dataIndex: "borrow",
        customHeaderCell: customHeaderCell,
      },
      {
        title: "Repayment",
        dataIndex: "repayment",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
    ]);
    return {
      columns,
      fixedData,
      rowClassName,
      customHeaderRow,
      customCell,
      customHeaderCell,
    };
  },
};
</script>

<style lang="less">
.container {
  .header-row > th {
    background-color: rgb(32, 187, 226);
  }
  .header-row .custom-header-row {
    background-color: rgb(194, 26, 236);
    color: #fff;
  }
  .double-row > td {
    background-color: wheat;
  }
  .custom-row {
    background-color: rgb(156, 236, 26);
  }
  .default-row:hover > td.ant-table-cell-row-hover {
    background-color: wheat;
  }
}
</style>
