<template>
  <div>
    <div id="chart" />
    <div id="chart2" />
    <div id="chart3" />
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

onMounted(() => {
  var myChart = echarts.init(document.getElementById("chart"));
  var myChart2 = echarts.init(document.getElementById("chart2"));
  var myChart3 = echarts.init(document.getElementById("chart3"));

  var placeHolderStyle = {
    label: {
      show: false,
      position: "center",
    },
    labelLine: {
      show: false,
    },
    itemStyle: {
      color: "#5b5b5b",
      borderColor: "#5b5b5b",
      borderWidth: 10,
    },
    emphasis: {
      // color: '#dedede',
      // borderColor: '#dedede',
      // borderWidth: 10,
      disabled: true,
      //   label: {
      //     show: false,
      //   },
      //   labelLine: {
      //     show: false,
      //   },
    },
  };
  const labelStyle = (color, length = 100) => {
    return {
      label: {
        // show: false,
        position: "outside",
        formatter: "{a}: {c}",
      },
      labelLine: {
        // show: false,
        length,
        smooth: 0.5,
      },
      itemStyle: {
        borderWidth: BorderWidth,
        shadowBlur: 40,
        borderColor: color,
        shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
      },
    };
  };
  var BorderWidth = "10";

  myChart.setOption({
    backgroundColor: "#333",
    color: ["#53f1f2", "#4ebefd", "#30ed9d", "#faa234", "#fff"],
    legend: {
      show: true,
      orient: "vertical",
      left: "left",
      top: "middle",
      data: ["正常", "次要", "警告", "重要", "严重"],
      textStyle: {
        color: "#fff",
        fontSize: 16,
      },
    },
    series: [
      {
        name: "正常",
        type: "pie",
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [100, 101],
        ...labelStyle("#53f1f2", 50),
        data: [
          {
            value: 3,
            name: "",
            ...placeHolderStyle,
          },
          {
            value: 7,
            name: "70%",
          },
        ],
      },
      {
        name: "次要",
        type: "pie",
        clockWise: false,
        hoverAnimation: false,
        radius: [80, 81],
        // itemStyle: {
        //     normal: {
        //         label: {
        //             show: false,
        //         },
        //         labelLine: {
        //             show: false,
        //             length: 100,
        //             smooth: 0.5,
        //         },
        //         borderWidth: BorderWidth,
        //         shadowBlur: 40,
        //         borderColor: '#4ebefd',
        //         shadowColor: 'rgba(0, 0, 0, 0)', //边框阴影
        //     },
        // },
        ...labelStyle("#4ebefd", 60),
        data: [
          {
            value: 4,
            name: "",
            ...placeHolderStyle,
          },
          {
            value: 6,
            name: "60%",
          },
        ],
      },
      {
        name: "警告",
        type: "pie",
        clockWise: false,
        hoverAnimation: false,
        radius: [60, 61],
        ...labelStyle("#30ed9d", 70),
        data: [
          {
            value: 5,
            name: "",
            ...placeHolderStyle,
          },
          {
            value: 5,
            name: "40%",
          },
        ],
      },
      {
        name: "重要",
        type: "pie",
        clockWise: false,
        hoverAnimation: false,
        radius: [40, 41],
        // itemStyle: {
        //     normal: {
        //         label: {
        //             show: false,
        //         },
        //         labelLine: {
        //             show: false,
        //             length: 100,
        //             smooth: 0.5,
        //         },
        //         borderWidth: BorderWidth,
        //         shadowBlur: 40,
        //         borderColor: '#faa234',
        //         shadowColor: 'rgba(0, 0, 0, 0)', //边框阴影
        //     },
        // },
        ...labelStyle("#faa234", 90),
        data: [
          {
            value: 7,
            name: "",
            ...placeHolderStyle,
          },
          {
            value: 3,
            name: "30%",
          },
        ],
      },
      {
        name: "严重",
        type: "pie",
        clockWise: false,
        hoverAnimation: false,
        radius: [20, 21],
        ...labelStyle("#fff"),
        labelLine: {
          lineStyle: {
            color: "#fff",
          },
          length: 100,
          smooth: 0.5,
        },
        data: [
          {
            value: 6,
            name: "",
            ...placeHolderStyle,
          },
          {
            value: 4,
            name: "30%",
          },
        ],
      },
    ],
  });

  myChart2.setOption({
    title: {
      text: "销售分布",
    },
    tooltip: {},
    legend: {
      data: ["一月", "二月", "三月"],
    },
    polar: {
      radius: ["5%", "40%"],
      //   center: ["50%", "50%"],
    },
    angleAxis: {
      max: 4,
      startAngle: 90,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    radiusAxis: {
      type: "category",
      data: ["a", "b", "c", "d"],
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    series: {
      type: "bar",
      showBackground: true,
      colorBy: "data",
      barCategoryGap: 4,
      color: ["#00BDAE", "#88bedb", "#f8dc74", "#ee9665"],
      data: [
        2,
        1.2,
        {
          value: 2.4,
          label: {
            offset: [50, 80],
            rotate: 0,
          },
        },
        {
          value: 2.6,
          label: {
            offset: [0, 60],
          },
        },
      ],
      roundCap: true,
      coordinateSystem: "polar",
      label: {
        show: true,
        position: "middle",
        formatter: "{b}: {c}",
        offset: [100, -50],
        rotate: 0,
      },
      labelLine: {
        show: true,
      },
    },
  });

  const placeItemStyle = {
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
    itemStyle: {
      color: "#cbccd0",
    },
    emphasis: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
    },
  };
  myChart3.setOption({
    title: {
      text: "销售分布",
    },
    tooltip: {},
    legend: {
      data: ["一月", "二月", "三月"],
    },
    // yAxis: {},
    series: [
      {
        name: "销量",
        type: "pie",
        radius: ["65%", "80%"],
        color: ["#afdd8a", "#cbccd0"],
        zlevel: 1,
        hoverAnimation: false, //鼠标移入变大
        data: [
          {
            value: 22,
            name: "一月",
            itemStyle: {
              color: "#afdd8a",
              //   borderRadius: 15,
            },
          },
          {
            value: 64,
            name: "",
            ...placeItemStyle,
          },
        ],
      },
      {
        name: "销量",
        type: "pie",
        radius: ["49%", "64%"],
        color: ["#00BDAE", "#cbccd0"],
        zlevel: 2,
        hoverAnimation: false, //鼠标移入变大
        data: [
          {
            value: 32,
            name: "二月",
            itemStyle: {
              // color: '#00BDAE',
              //   borderRadius: 15,
            },
            labelLine: {
              length: 45,
            },
          },
          {
            value: 54,
            name: "",
            ...placeItemStyle,
          },
        ],
      },
      {
        name: "销量",
        type: "pie",
        radius: ["34%", "48%"],
        color: ["#efb754", "#cbccd0"],
        zlevel: 3,
        hoverAnimation: false, //鼠标移入变大
        itemStyle: {
          color: "#efb754",
          //   borderRadius: 15,
        },
        data: [
          {
            value: 28,
            name: "三月",
            labelLine: {
              length: 70,
            },
          },
          {
            value: 60,
            name: "",
            ...placeItemStyle,
          },
        ],
      },
    ],
  });
});
</script>

<style scoped>
#chart {
  width: 500px;
  height: 400px;
}
#chart2 {
  width: 500px;
  height: 400px;
}
#chart3 {
  width: 500px;
  height: 400px;
}
</style>