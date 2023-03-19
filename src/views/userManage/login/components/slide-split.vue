<template>
  <div class="slider-container" :style="{ width: w + 'px' }">
    <div class="slider-canvas" :style="{ width: w + 'px', height: h + 'px' }">
      <!-- 大图 -->
      <canvas :width="w" :height="h" ref="canvas" />
      <!-- 小图 -->
      <canvas
        class="slider-block"
        :width="slideInfo.sw"
        :height="h"
        ref="block"
      />
      <!-- 结果遮罩层 -->
      <div
        :class="`result-mask ${resultMask.class}`"
        :style="{ height: `${resultMask.height}px` }"
      />
    </div>
    <!-- 拖动的滑块内容 -->
    <div class="slider-square">
      <div class="box">
        <div
          class="slider-square-icon"
          @mousedown="sliderDown"
          :style="{ left: slideInfo.sliderLeft }"
        ></div>
        <span>{{ slideInfo.sliderText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, onDeactivated, watch } from "vue";

export default {
  props: {
    w: {
      // 大图的宽度
      type: Number,
      default: 450,
    },
    h: {
      // 大图的高度
      type: Number,
      default: 300,
    },
    l: {
      // 小图的宽度/高度(正方形的宽度,实际宽度需要加上圆弧的宽度)
      type: Number,
      default: 42,
    },
    sliderText: {
      // 滑块文字
      type: String,
      default: "拖动滑块向右>>",
    },
    bigImg: {
      // 大图源
      type: String,
      default: "",
    },
    smImg: {
      // 小图图源
      type: String,
      default: "",
    },
    r: {
      // 小图的拼图半径
      type: Number,
      default: 10,
    },
    accuracy: {
      // 拖动误差范围
      type: Number,
      default: 5,
    },
  },
  setup(props, { emit }) {
    const canvas = ref(null); // 大图ref
    const canvasCtx = ref(null); // 大图canvas绘制容器
    const block = ref(null); // 小图ref
    const blockCtx = ref(null); // 小图canvas绘制容器
    const { w, h, l, r, sliderText } = props;
    const slideInfo = reactive({
      sliderLeft: 0, // 可拖动滑块的left
      block_x: 0, // 拼图最终要滑动的位置x
      block_y: 0, // 拼图位置的y
      sw: l + r * 2 + 3, // 拼图的实际宽度 小图宽度 + 2*半径 + 3(border)
      sliderText, // 滑块提示文字
      bigImg: "",
      smImg: "",
    });
    const origin = reactive({
      // 鼠标按下初始位置
      orginX: 0,
      originY: 0,
    });
    const resultMask = reactive({
      // 结果提示背景色
      class: "",
      height: 0,
    });

    // 初始化canvas dom
    const initDom = () => {
      canvasCtx.value = canvas.value.getContext("2d");
      blockCtx.value = block.value.getContext("2d");
    };
    // 初始化图片
    const initImg = () => {
      const bigImg = createImg(() => {
        canvasCtx.value.drawImage(bigImg, 0, 0, w, h);
      }, props.bigImg);
      const smImg = createImg(() => {
        blockCtx.value.drawImage(smImg, 0, 0, slideInfo.sw, h);
      }, props.smImg);
      slideInfo.bigImg = bigImg;
      slideInfo.smImg = smImg;
    };

    const createImg = (onload, url) => {
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.onload = onload;
      img.onerror = () => {
        img.src = url;
      };
      img.src = url;
      return img;
    };

    onMounted(() => {
      initDom();
      initImg();
      bindEvents();
    });

    const slider = ref(false);

    // 鼠标按下
    const sliderDown = (e) => {
      slider.value = true;
      slideInfo.sliderText = "";
      origin.orginX = e.pageX;
      origin.originY = e.pageY;
      console.log(1, e);
    };

    // 鼠标移动
    const sliderMove = (e) => {
      if (slider.value) {
        const moveX = e.pageX - origin.orginX;
        const moveY = e.pageY - origin.originY;
        if (moveX < 0 || moveY + 38 > w) return false;
        slideInfo.sliderLeft = moveX + "px";
        let blockLeft = ((w - slideInfo.sw) / (w - 40)) * moveX;
        block.value.style.left = blockLeft + "px";
      }
    };

    // 鼠标松开
    const sliderUp = (e) => {
      if (!slider.value) return false;
      slider.value = false;
      console.log(3, e);
      resultMask.height = h / 2;
      const left = parseInt(block.value.style.left);
      emit("sliderJudge", left);
    };

    // 将鼠标移动,鼠标松开事件绑定在dom上,如果鼠标移出滑块范围,还可以继续移动
    const bindEvents = () => {
      document.addEventListener("mousemove", sliderMove);
      document.addEventListener("mouseup", sliderUp);
    };

    // 调用接口获取图片,异步,监听图片地址变动
    watch(
      () => props.bigImg,
      (newVal) => {
        slideInfo.bigImg.src = newVal;
      }
    );
    watch(
      () => props.smImg,
      (newVal) => {
        slideInfo.smImg.src = newVal;
      }
    );

    // 重置/刷新图片
    const reset = () => {
      canvasCtx.value.clearRect(0, 0, w, h);
      blockCtx.value.clearRect(0, 0, w, h);
      slideInfo.sliderText = sliderText;
      resultMask.height = 0;
      resultMask.class = "";
      slideInfo.sliderLeft = 0;
      block.value.style.left = 0;
    };

    // 组建销毁时,移除鼠标事件
    onDeactivated(() => {
      document.removeEventListener("mousemove", sliderMove);
      document.removeEventListener("mouseup", sliderUp);
    });

    return {
      canvas,
      canvasCtx,
      blockCtx,
      block,
      slideInfo,
      sliderDown,
      sliderMove,
      sliderUp,
      resultMask,
      reset,
    };
  },
};
</script>

<style lang="less">
.slider-container {
  position: relative;
  .slider-canvas {
    position: relative;
    .slider-block {
      position: absolute;
      left: 0;
      top: 0;
    }
    @keyframes result-show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 0.7;
      }
    }
    .result-mask {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      opacity: 0.7;
      &.success {
        background-color: #52ccba;
        animation: result-show 1s;
      }
      &.fail {
        background-color: #f57a7a;
        animation: result-show 1s;
      }
    }
  }
}
.slider-square {
  background-color: #f7f9fa;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid #ddd;
  position: relative;
  margin-top: 12px;

  .slider-square-icon {
    position: absolute;
    top: 0;
    left: 0;
    height: 39px;
    width: 39px;
    background-color: #fff;
    box-shadow: blanchedalmond 0px 0px 1px 2px;
    cursor: pointer;
    &:hover {
      background-color: rgb(249, 162, 32);
    }
  }
}
</style>
