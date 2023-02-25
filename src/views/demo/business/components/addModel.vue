<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    width="700px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-collapse :active-key="activeKey" @change="changeCollapase">
      <a-collapse-panel key="basic" header="基础信息">
        <Basic
          ref="basicRef"
          :formData="form.basic"
          @changeOrgType="changeOrgType"
        />
      </a-collapse-panel>
      <a-collapse-panel
        v-if="orgType !== 'company'"
        key="person"
        header="个人信息"
      >
        <Person ref="personRef" :formData="form.person" />
      </a-collapse-panel>
      <a-collapse-panel
        v-if="orgType !== 'person'"
        key="company"
        header="机构信息"
      >
        <Company ref="companyRef" :formData="form.company" />
      </a-collapse-panel>
    </a-collapse>
  </a-modal>
</template>

<script>
import { ref, reactive, watch, toRefs } from "vue";
import Basic from "./basic.vue";
import Person from "./person.vue";
import Company from "./company.vue";
import { omit } from "lodash";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Basic,
    Person,
    Company,
  },
  setup(props, { emit }) {
    const confirmLoading = ref(false);
    const activeKey = ref(["basic", "person", "company"]);
    const title = ref("新增");
    const orgType = ref("person");
    const initData = {
      basic: {
        orgType: "person",
      },
      person: {},
      company: {
        fileList: [],
      },
    };
    const info = reactive({
      form: { ...initData },
    });

    watch(
      () => props.visible,
      (newVal) => {
        if (newVal) {
          const { person, company } = props.formData;
          if (props.formData.key) {
            title.value = "修改";
            info.form = {
              basic: { ...omit(props.formData, ["person", "company"]) },
              person: person || {},
              company: company || { fileList: [] },
            };
            orgType.value = props.formData.orgType;
          } else {
            title.value = "新增";
            info.form = { ...initData };
            orgType.value = "person";
          }
        }
      }
    );
    const changeCollapase = (val) => {
      activeKey.value = val;
    };
    const basicRef = ref(null);
    const personRef = ref(null);
    const companyRef = ref(null);

    const refsPromise = ref([]);
    // 根据选择的机构类型,显示组件
    const changeOrgType = (val) => {
      orgType.value = val;
    };
    const handleCancel = () => {
      emit("onCancel");
    };
    const handleRef = () => {
      switch (orgType.value) {
        case "person":
          refsPromise.value = [
            basicRef.value.validateForm(),
            personRef.value.validateForm(),
          ];
          break;
        case "company":
          refsPromise.value = [
            basicRef.value.validateForm(),
            companyRef.value.validateForm(),
          ];
          break;
        case "all":
          refsPromise.value = [
            basicRef.value.validateForm(),
            personRef.value.validateForm(),
            companyRef.value.validateForm(),
          ];
          break;

        default:
          break;
      }
    };
    // 新增,修改
    const handleOk = async () => {
      handleRef();
      Promise.all(refsPromise.value)
        .then((res) => {
          console.log(res);
          let form = {
            person: {},
            company: {},
          };
          res.forEach((item) => {
            if (item.orgType) {
              form = { ...item };
            }
            if (item.phone) {
              form.person = { ...item };
            }
            if (item.address) {
              form.company = { ...item };
            }
          });
          emit("onCancel", form);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      confirmLoading,
      title,
      activeKey,
      changeCollapase,
      handleCancel,
      handleOk,
      changeOrgType,
      orgType,
      basicRef,
      personRef,
      companyRef,
      ...toRefs(info),
    };
  },
};
</script>

<style></style>
