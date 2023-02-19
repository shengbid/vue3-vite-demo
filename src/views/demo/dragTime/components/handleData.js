const handleData = weekData => {
  let allWeeks = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日',
  ];
  // 将weekdata中空数据补齐
  allWeeks = allWeeks.map((item, i) => {
    let newItem = {
      id: i,
      week: item,
      value: '',
    };
    weekData.some(subItem => {
      if (subItem.week === item) {
        newItem = {
          ...subItem,
        };
      }
    });
    return newItem;
  });

  const formatDate = (date, fmt) => {
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length),
      );
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ?
          o[k] :
          ('00' + o[k]).substr(('' + o[k]).length),
        );
      }
    }
    return fmt;
  };

  const createArr = len => {
    return Array.from(Array(len)).map((ret, id) => id);
  };

  const formatWeektime = col => {
    const timestamp = 1542384000000; // '2018-11-17 00:00:00'
    const beginstamp = timestamp + col * 1800000; // col * 30 * 60 * 1000
    const endstamp = beginstamp + 1800000;

    const begin = formatDate(new Date(beginstamp), 'hh:mm');
    const end = formatDate(new Date(endstamp), 'hh:mm');
    return `${begin}~${end}`;
  };

  const data = allWeeks.map((ret, index) => {
    const children = (ret, row, max) => {
      const valueRange = [];
      if (ret.value) {
        ret.value.split('、').forEach(item => {
          if (item) {
            const minValue = new Date(
              `2018-01-01 ${item.split('~')[0]}`,
            ).getTime();
            const maxValue = new Date(
              `2018-01-01 ${item.split('~')[1]}`,
            ).getTime();
            valueRange.push({
              minValue,
              maxValue,
            });
          }
        });
        console.log(valueRange);
      }
      return createArr(max).map((t, col) => {
        const newItem = {
          week: ret.week,
          value: formatWeektime(col),
          begin: formatWeektime(col).split('~')[0],
          end: formatWeektime(col).split('~')[1],
          row: row,
          col: col,
        };
        if (valueRange.length) {
          const endTime = new Date(
            `2018-01-01 ${newItem.end}`,
          ).getTime();
          valueRange.some(item => {
            if (
              endTime > item.minValue &&
              endTime <= item.maxValue
            ) {
              newItem.check = true;
              return true;
            }
          });
        }
        return newItem;
      });
    };
    return {
      value: ret.week,
      row: index,
      child: children(ret, index, 48),
    };
  });
  return data;
};

export default handleData;