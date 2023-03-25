<template>
  <div>
    <h3>原生输入框,输入数字(改变输入内容)</h3>
    <div class="date-box">
      <div class="item">
        <h3>文本输入框,整数或小数</h3>
        <a-input
          :value="amount"
          style="width: 70%"
          @input="handleInput"
          @blur="handleBlur"
        ></a-input>
      </div>
      <div class="item">
        <h3>文本输入框,整数或小数,小数位数不超过两位</h3>
        <a-input
          :value="amount3"
          style="width: 70%"
          @input="handleInput3"
          @blur="handleBlur3"
        ></a-input>
      </div>
      <div class="item">
        <h3>type=number输入框,整数或小数</h3>
        <a-input
          :type="isEdit ? 'number' : 'text'"
          :value="amount2"
          @input="handleInput2"
          @blur="handleBlur2"
          @focus="handleFaucs2"
          style="width: 70%"
        ></a-input>
      </div>
    </div>
    <h3>数字输入组件(改变输入内容)</h3>
    <p>inputnumber数字输入组件自带的会处理输入不是数字和输入多个小数点的情况</p>
    <div class="date-box">
      <div class="item">
        <h3>数字输入,自动添加小数点</h3>
        <a-input-number
          :min="0"
          :max="9999"
          :precision="2"
          style="width: 70%"
        />
      </div>
      <div class="item">
        <h3>数字输入,每3位添加逗号分隔符,小数位数不超过2</h3>
        <a-input-number
          :min="0"
          :max="9999999999"
          :precision="2"
          :formatter="numberFormat"
          :parser="toNumberFormat"
          style="width: 70%"
        />
      </div>
      <div class="item">
        <h3>数字输入,每3位添加逗号分隔符,小数不处理</h3>
        <a-input-number
          :min="0"
          :max="9999999999"
          :formatter="numberDotFormat"
          :parser="toNumberFormat"
          style="width: 70%"
        />
      </div>
    </div>
    <h3>数字输入组件(form表单校验提示)</h3>
    <a-form
      ref="formRef"
      name="dynamic_form_item"
      :model="info"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
    >
      <div class="date-box">
        <div class="item">
          <h3>只能输入整数(四舍五入)</h3>
          <a-form-item label="数字1" name="number1">
            <a-input-number
              v-model:value="info.number1"
              :min="0"
              :max="9999"
              :precision="0"
              style="width: 70%"
            />
          </a-form-item>
        </div>
        <div class="item">
          <h3>只能输入整数(不改变,提示)</h3>
          <a-form-item label="数字2" name="number2">
            <a-input-number
              v-model:value="info.number2"
              :min="0"
              :max="9999"
              style="width: 70%"
            />
          </a-form-item>
        </div>
        <div class="item">
          <h3>只能输入整数和小数,小数位数不超过3</h3>
          <a-form-item label="数字3" name="number3">
            <a-input-number
              v-model:value="info.number3"
              :min="0"
              :max="9999"
              style="width: 70%"
            />
          </a-form-item>
        </div>
      </div>
      <div><a-button type="primary" @click="submit">保存</a-button></div>
    </a-form>
  </div>
</template>

<script>
import {
  numberFormat,
  toNumberFormat,
  numberDotFormat,
  initNumberReg,
  initDotNumberReg,
  numberInputFormat,
  numberInputFormat2,
} from "@/utils";
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";

export default {
  name: "numberInput",
  setup() {
    const info = reactive({
      number1: null,
      number2: null,
      number3: null,
    });
    const formRef = ref(null);
    const rules = {
      number1: [{ required: true, trigger: "blur", message: "请输入数字" }],
      number2: [
        { required: true, trigger: "blur", message: "请输入数字" },
        initNumberReg,
      ],
      number3: [
        { required: true, trigger: "blur", message: "请输入数字" },
        initDotNumberReg,
      ],
    };
    const submit = () => {
      formRef.value.validateFields().then(() => {
        console.log(info);
        message.success("success");
      });
    };
    const amount = ref(null);
    const handleInput = (e) => {
      const val = e.target.value;
      amount.value = val;
    };
    const handleBlur = (e) => {
      const val = e.target.value;
      amount.value = numberInputFormat(val);
      // console.log(amount.value);
    };
    const amount3 = ref(null);
    const handleInput3 = (e) => {
      const val = e.target.value;
      amount3.value = val;
    };
    const handleBlur3 = (e) => {
      const val = e.target.value;
      amount3.value = numberInputFormat(val, 2);
      // console.log(amount.value);
    };
    const amount2 = ref(null);
    const isEdit = ref(true); // 是否是编辑状态
    const handleInput2 = (e) => {
      const val = e.target.value;
      amount2.value = val;
    };
    const handleBlur2 = (e) => {
      const val = e.target.value;
      amount2.value = numberInputFormat2(val);
      isEdit.value = false;
      // console.log(amount.value);
    };
    const handleFaucs2 = () => {
      amount2.value = toNumberFormat(amount2.value);
      isEdit.value = true;
    };
    return {
      numberFormat,
      toNumberFormat,
      numberDotFormat,
      numberInputFormat,
      numberInputFormat2,
      info,
      formRef,
      rules,
      submit,
      amount,
      handleInput,
      handleBlur,
      amount3,
      handleInput3,
      handleBlur3,
      amount2,
      isEdit,
      handleInput2,
      handleBlur2,
      handleFaucs2,
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
  width: 45%;
  margin-bottom: 12px;
}
</style>
