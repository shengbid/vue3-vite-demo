<template>
  <div>
    <h3>完整的表格增删改,弹框关闭表单的重置,多表单显示隐藏控制,提交验证</h3>
    <div style="margin-bottom: 16px; text-align: right">
      <a-button type="primary" @click="add"> 新增 </a-button>
    </div>
    <a-table :columns="columns" :data-source="tableData" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <a href="">{{ record.name }}</a>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-space :size="16">
            <a-button type="primary" shape="circle" @click="onEdit(record)">
              <template #icon><EditOutlined /></template>
            </a-button>
            <a-popconfirm
              v-if="tableData.length > 1"
              title="确定删除?"
              @confirm="remove(record.key)"
            >
              <a-button
                type="primary"
                shape="circle"
                :disabled="tableData.length < 2"
              >
                <template #icon><DeleteOutlined /></template>
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
    <add-model :visible="visible" :formData="formData" @onCancel="onCancel" />
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import AddModel from "./components/addModel.vue";

export default {
  name: "business",
  components: {
    EditOutlined,
    DeleteOutlined,
    AddModel,
  },
  setup() {
    const orgTypes = {
      person: "个人",
      company: "机构",
      all: "不区分",
    };
    const columns = [
      {
        title: "机构名称",
        dataIndex: "name",
      },
      {
        title: "机构类型",
        dataIndex: "orgType",
        customRender: ({ text }) => orgTypes[text],
      },
      {
        title: "总额度",
        dataIndex: "amount",
      },
      {
        title: "成立日期",
        dataIndex: "establishDate",
      },
      {
        title: "action",
        dataIndex: "action",
        width: "10%",
      },
    ];
    const info = reactive({
      tableData: [
        {
          key: 1,
          name: "小米科技",
          orgType: "company",
          amount: 1000,
          establishDate: "2022-01-01",
          company: {
            address: "朝阳大街2",
            amount: "500",
            usedAmount: "200",
            fileList: [],
          },
        },
        {
          key: 2,
          name: "奇迹科技",
          orgType: "person",
          amount: 2000,
          establishDate: "2020-08-12",
          person: {
            name: "张三",
            amount: "900",
            usedAmount: "100",
            phone: "13567687766",
          },
        },
      ],
      formData: {},
    });
    const visible = ref(false);

    // 修改
    const onEdit = (record) => {
      //   console.log(111, record);
      info.formData = record;
      visible.value = true;
    };
    // 删除
    const remove = (key) => {
      info.tableData = info.tableData.filter((item) => item.key !== key);
    };
    const onCancel = (form) => {
      console.log(form);
      if (form) {
        if (form.key) {
          // 修改
          info.tableData = info.tableData.map((item) => {
            let newItem = { ...item };
            if (item.key === form.key) {
              newItem = { ...form };
            }
            return newItem;
          });
        } else {
          // 新增
          const key = info.tableData[info.tableData.length - 1].key + 1;
          info.tableData.push({
            ...form,
            key,
          });
        }
      }
      visible.value = false;
    };
    // 新增
    const add = () => {
      visible.value = true;
      info.formData = {};
    };
    return {
      columns,
      add,
      visible,
      onCancel,
      onEdit,
      remove,
      ...toRefs(info),
    };
  },
};
</script>

<style></style>
