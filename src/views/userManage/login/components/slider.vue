<template>
  <div class="slider-container" :style="{ width: w + 'px' }">
    <div class="slider-canvas" :style="{ width: w + 'px', height: h + 'px' }">
      <!-- 大图 -->
      <canvas :width="w" :height="h" ref="canvas" />
      <!-- 小图 -->
      <canvas class="slider-block" :width="w" :height="h" ref="block" />
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
    imgs: {
      // 图片组
      type: Array,
      default: () => [],
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
    const { w, h, l, r, sliderText, imgs, accuracy } = props;
    const slideInfo = reactive({
      sliderLeft: 0, // 可拖动滑块的left
      block_x: 0, // 拼图最终要滑动的位置x
      block_y: 0, // 拼图位置的y
      sw: l + r * 2 + 3, // 拼图的实际宽度 小图宽度 + 2*半径 + 3(border)
      sliderText, // 滑块提示文字
      img: "", // 当前图片源
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
      const img = createImg(() => {
        drawBlock();
        canvasCtx.value.drawImage(img, 0, 0, w, h);
        blockCtx.value.drawImage(img, 0, 0, w, h);
        // 将小拼图的数据截取出来, y是从最左边的的起点开始,截取时要加上上方的圆弧高度
        let _y = slideInfo.block_y - r * 2 - 1;
        let ImageData = blockCtx.value.getImageData(
          slideInfo.block_x,
          _y,
          slideInfo.sw,
          slideInfo.sw
        );
        block.value.width = slideInfo.sw; // 改变小拼图的宽度,要在绘图前改变
        blockCtx.value.putImageData(ImageData, 0, _y);
      });
      slideInfo.img = img;
    };

    const drawBlock = () => {
      // 拼图大图抠图位置 x: 一个拼图的宽度+r ---- 容器宽度 - 小拼图宽度
      slideInfo.block_x = getRandomNumberByRange(l + 10, w - (l + 10));
      slideInfo.block_y = getRandomNumberByRange(10 + r * 2, h - (l + 10));
      draw(canvasCtx.value, slideInfo.block_x, slideInfo.block_y, "fill");
      draw(blockCtx.value, slideInfo.block_x, slideInfo.block_y, "clip");
    };
    const PI = Math.PI;
    const draw = (ctx, x, y, operation) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      // 绘制曲线的方法 arc
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
      ctx.lineTo(x + l, y);
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
      ctx.lineTo(x + l, y + l);
      ctx.lineTo(x, y + l);
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
      ctx.lineTo(x, y);
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.stroke();
      ctx[operation]();
      // Bug Fixes 修复了火狐和ie显示问题
      ctx.globalCompositeOperation = "destination-over";
    };

    const createImg = (onload) => {
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.onload = onload;
      img.onerror = () => {
        img.src = getRandomImg();
      };
      img.src = getRandomImg();
      return img;
    };
    // 随机生成img src
    const getRandomImg = () => {
      const len = imgs.length;
      return imgs[getRandomNumberByRange(0, len - 1)];
    };
    const getRandomNumberByRange = (start, end) => {
      return Math.round(Math.random() * (end - start) + start);
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
      if (judgeSlide()) {
        resultMask.class = "success";
        setTimeout(() => {
          emit("success");
        }, 500);
      } else {
        emit("fail");
        resultMask.class = "fail";
        setTimeout(() => {
          reset();
        }, 500);
      }
    };

    // 将鼠标移动,鼠标松开事件绑定在dom上,如果鼠标移出滑块范围,还可以继续移动
    const bindEvents = () => {
      document.addEventListener("mousemove", sliderMove);
      document.addEventListener("mouseup", sliderUp);
    };

    // 重置/刷新图片
    const reset = () => {
      canvasCtx.value.clearRect(0, 0, w, h);
      blockCtx.value.clearRect(0, 0, w, h);
      block.value.width = w;
      slideInfo.img.src = getRandomImg();
      slideInfo.sliderText = sliderText;
      resultMask.height = 0;
      resultMask.class = "";
      slideInfo.sliderLeft = 0;
      block.value.style.left = 0;
    };
    // 判断移动距离
    const judgeSlide = () => {
      // 小拼图的left和绘图时的x比较
      const left = parseInt(block.value.style.left);
      const isSuccess = Math.abs(left - slideInfo.block_x) <= accuracy;
      return isSuccess;
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
