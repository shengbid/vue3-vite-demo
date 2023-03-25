// 常用数据转换

export const initDotReg = /\B(?=(\d{3})+(?!\d))/g; // 整数每3位添加逗号分隔符
export const floatDotReg = /(?!^)(?=(\d{3})+\.)/g; // 小数每3位添加逗号分隔符

// 数字输入,每3位添加逗号分隔符
export const numberFormat = (value) => {
  if (value) {
    return value.replace(initDotReg, ",");
  } else {
    return value;
  }
};
// 去掉逗号
export const toNumberFormat = (value) => {
  if (value) {
    return value.replace(/\$\s?|(,*)/g, "");
  } else {
    return value;
  }
};

// 数字输入,每3位添加逗号分隔符,小数不处理
export const numberDotFormat = (value) => {
  if (value) {
    // 有小数点
    if (String(value).indexOf(".") > 0) {
      return value.replace(floatDotReg, ",");
    } else {
      // 无小数点
      return value.replace(initDotReg, ",");
    }
  } else {
    return value;
  }
};
// 正则校验
// 只能输入整数
export const initNumberReg = {
  pattern: /^[1-9]+\d*$/,
  trigger: "blur",
  message: "只能输入整数",
};
// 只能输入整数或小数
export const initDotNumberReg = {
  pattern: /^(0|[1-9])+(\.[0-9]{1,3}){0,1}$/,
  trigger: "blur",
  message: "只能输入整数或小数,小数位数不超过3",
};

// 文本输入框, 数字输入,每3位添加逗号分隔符,只能输入一个小数点
// val:输入内容 dot:小数位数
export const numberInputFormat = (val, dot = 0) => {
  if (val) {
    const numberReg = /[^\d^\.]+/g; // 只保留数字和.
    const dotreg = /(\.+)*(\d{0,})\.(\.+)*(\d{0,}).*$/; // 只保留一个点.
    let value = val.replace(numberReg, "").replace(dotreg, "$2.$4");
    // console.log(value);
    value = Number(value);
    if (isNaN(value)) return "";
    value = String(value);
    // 有小数点
    if (String(value).indexOf(".") > 0) {
      // console.log(value);
      if (dot) {
        const precisionReg = new RegExp("(\\d+)\\.(\\d{" + dot + "})(\\d+)*$"); // 输入小数个数限制
        // const precisionReg = /^(\d+)\.(\d{2})(\d+)*$/; // 输入小数个数限制
        value = value.replace(precisionReg, "$1.$2");
      }
      return value.replace(floatDotReg, ",");
    } else {
      // 无小数点
      return value.replace(initDotReg, ",");
    }
  } else {
    return val;
  }
};

// type=number输入框, 数字输入,每3位添加逗号分隔符,只能输入一个小数点
export const numberInputFormat2 = (val) => {
  if (val) {
    let value = Number(val);
    value = String(value);
    // 有小数点
    if (String(value).indexOf(".") > 0) {
      return value.replace(floatDotReg, ",");
    } else {
      // 无小数点
      return value.replace(initDotReg, ",");
    }
  } else {
    return val;
  }
};