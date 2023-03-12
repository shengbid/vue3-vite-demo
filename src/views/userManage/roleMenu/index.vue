<template>
  <a-table :columns="columns" :data-source="data" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'userName'">
        <a>
          {{ record.userName }}
        </a>
      </template>
      <template v-else-if="column.key === 'menus'">
        <span>
          <a @click="lookMenu(record.userName)">查看</a>
        </span>
      </template>
    </template>
  </a-table>
  <a-modal v-model:visible="visible" title="角色菜单" :footer="null">
    <a-tree :tree-data="treeData" :field-names="fieldNames"> </a-tree>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
import { getRoleMenus } from "@/router/roleMenu";

const columns = [
  {
    title: "用户名",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "密码",
    dataIndex: "passWord",
    key: "passWord",
  },
  {
    title: "角色",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "角色菜单",
    dataIndex: "menus",
    key: "menus",
  },
];
const data = [
  {
    key: "1",
    userName: "admin",
    passWord: 123456,
    roleName: "管理员",
    menus: [],
  },
  {
    key: "2",
    userName: "role1",
    passWord: 123456,
    roleName: "角色1",
    menus: [],
  },
  {
    key: "3",
    userName: "role2",
    passWord: 123456,
    roleName: "角色2",
    menus: [],
  },
];
export default defineComponent({
  setup() {
    const treeData = ref([]);
    const visible = ref(false);
    const fieldNames = { key: "path" };
    const lookMenu = (roleName) => {
      visible.value = true;
      treeData.value = getRoleMenus(roleName);
      console.log(treeData.value);
    };
    return {
      data,
      columns,
      lookMenu,
      treeData,
      visible,
      fieldNames,
    };
  },
});
</script>
