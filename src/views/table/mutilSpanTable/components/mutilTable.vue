<template>
  <div style="margin-top: 20px">
    <p>动态层级表格合并</p>
    <div style="margin-bottom: 10px">
      表格层级(2-5):
      <a-input-number
        :value="maxLevel"
        :min="2"
        :max="5"
        style="width: 220px"
        @change="changeLevel"
      />
    </div>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      bordered
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a href="javascript:;">{{ text }}</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { omit } from "lodash";

export default {
  name: "mutilSpan",
  setup() {
    const maxLevel = ref(2);
    const tableData = ref([]);
    const treeData = ref([]);
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        customCell: (record, index) => {
          if (record.level < 2) return {};
          return {
            rowSpan: record.rowSpan1 ? record.rowSpan1 : 0
          };
        }
      },
      {
        title: "Age",
        dataIndex: "age",
        customCell: (record, index) => {
          if (record.level < 3) return {};
          return {
            rowSpan: record.rowSpan2 ? record.rowSpan2 : 0
          };
        }
      },
      {
        title: "Home phone",
        dataIndex: "tel",
        customCell: (record, index) => {
          if (record.level < 4) return {};
          return {
            rowSpan: record.rowSpan3 ? record.rowSpan3 : 0
          };
        }
      },
      {
        title: "Phone",
        dataIndex: "phone",
        customCell: (record, index) => {
          if (record.level < 5) return {};
          return {
            rowSpan: record.rowSpan4 ? record.rowSpan4 : 0
          };
        }
      },
      {
        title: "Address",
        dataIndex: "address"
      }
    ];
    // 获取表格children length
    const getChildLength = (data, spanLengths = []) => {
      let newLeg = 0;
      data.forEach(item => {
        if (item.children && item.children.length) {
          getChildLength(item.children, spanLengths);
        } else {
          newLeg++;
        }
      });
      spanLengths.push(newLeg);
      return spanLengths;
    };
    // 处理表格数据
    const handleTable = (data, parentItem) => {
      data.forEach((item, i) => {
        if (item.children && item.children.length) {
          item[`rowSpan${item.level}`] = getChildLength(item.children).reduce(
            (pre, cur) => {
              return pre + cur;
            },
            0
          );

          handleTable(
            item.children,
            i === 0
              ? {
                  ...parentItem,
                  ...omit(item, "children")
                }
              : { ...omit(item, "children") }
          );
        } else {
          if (i === 0) {
            tableData.value.push({ ...parentItem, ...omit(item, "children") });
          } else {
            tableData.value.push(omit(item, "children"));
          }
        }
      });
    };

    // 生成表格树形数据
    const initTable = () => {
      const render = (level, key) => {
        let newLevel = level;
        const arr = [];
        // 两种情况都可满足
        // const random = Math.floor(Math.random() * 3); // 1.children可以为空
        const random = Math.ceil(Math.random() * 3); // 2.每层children下都有值
        for (let i = 0; i < random; i++) {
          const item = {
            key: `${key}${i}`,
            name: "John Brown",
            age: 32,
            tel: "0571-22098909",
            phone: 18889898989,
            address: "New York No. 1 Lake Park",
            level: newLevel
          };
          if (newLevel < maxLevel.value) {
            item.children = render(newLevel + 1, item.key);
          }
          arr.push(item);
        }
        return arr;
      };
      treeData.value = render(1, "");
      tableData.value = [];
      handleTable(treeData.value);
    };
    initTable();
    // console.log(treeData.value, tableData.value);

    const changeLevel = val => {
      maxLevel.value = val;
      initTable();
      console.log(treeData.value, tableData.value);
    };
    return {
      maxLevel,
      columns,
      tableData,
      changeLevel
    };
  }
};
</script>

<style>
</style>