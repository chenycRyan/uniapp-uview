<template>
  <div :style="{ height: contentHeight + 'px', width: contentWidth + 'px' }">
    <canvas
      v-if="canvasId"
      @tap="drawTap"
      :id="canvasId"
      :canvasId="canvasId"
      :width="contentWidth"
      :height="contentHeight"
      :style="{ height: contentHeight + 'px', width: contentWidth + 'px' }"
    ></canvas>
  </div>
</template>
<script>
export default {
  name: "verify-canvas",
  props: {
    code: {
      type: String,
      default: "",
    },
    codeLength: {
      //验证码数量
      type: Number,
      default: 4,
    },
    contentWidth: {
      type: Number,
      default: 120,
    },
    contentHeight: {
      type: Number,
      default: 60,
    },
    lineLength: {
      //线条数
      type: Number,
      default: 8,
    },
    backgroundColor: {
      // 画板背景
      type: String,
      default: "rgb(238,226,224)",
    },
    lineColorList: {
      type: Array,
      default() {
        return [
          "rgba(238,0,0,.5)",
          "rgba(0, 170, 255,.5)",
          "rgba(0, 170, 0,.5)",
          "rgba(0, 0, 0,.5)",
          "rgba(153, 146, 255,.5)",
        ];
      },
    },
    colorList: {
      type: Array,
      default() {
        return [
          "rgb(238,0,0)",
          "rgb(0, 170, 255)",
          "rgb(0, 170, 0)",
          "rgb(0, 0, 0)",
          "rgb(153, 146, 255)",
        ];
      },
    },
  },
  computed: {
    canvasId() {
      // #ifdef VUE2
      return `lime-signature${this._uid}`;
      // #endif
      // #ifdef VUE3
      return `lime-signature${this._.uid}`;
      // #endif
    },
  },
  data() {
    return {
      identifyCode: "",
    };
  },
  watch: {
    code: {
      handler(newVal) {
        if (newVal) {
          this.drawPic();
        }
      },
      immediate: true,
    },
  },
  methods: {
    verification(code) {
      return this.identifyCode == code;
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getcheckCode() {
      let code = "";
      const codeLength = this.codeLength;
      const random = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      for (let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random() * 34);
        code += random[index];
      }
      this.identifyCode = code;
    },
    drawTap() {
      if (this.code) {
        this.$emit("getCode");
      } else {
        this.drawPic();
      }
    },
    drawPic() {
      if (this.code) {
        this.identifyCode = this.code;
      } else {
        this.getcheckCode();
      }

      let context = uni.createCanvasContext(this.canvasId, this);

      context.setTextBaseline("bottom");

      context.setFillStyle(this.backgroundColor);

      context.fillRect(0, 0, this.contentWidth, this.contentHeight);
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(context, this.identifyCode[i], i);
      }

      this.drawLine(context);

      context.draw();
    },
    drawText(context, txt, i) {
      let a = Math.floor(Math.random() * this.colorList.length);
      context.setFillStyle(this.colorList[a]);

      let fontSize = Math.trunc(this.contentWidth / this.identifyCode.length);
      console.log(fontSize);
      context.setFontSize(this.randomNum(fontSize, fontSize) + "px SimHei");

      let x =
        i * (this.contentWidth / (this.identifyCode.length + 1)) +
        Math.trunc(fontSize / 2);
      let y = this.randomNum(fontSize, this.contentHeight - 5);
      var deg = this.randomNum(-10, 10);

      context.translate(x, y);
      context.rotate((deg * Math.PI) / 180);
      context.fillText(txt, 0, 0);

      context.rotate((-deg * Math.PI) / 180);
      context.translate(-x, -y);
    },
    drawLine(context) {
      for (let i = 0; i < this.lineLength; i++) {
        let a = Math.floor(Math.random() * this.lineColorList.length);
        context.setStrokeStyle(this.lineColorList[a]);
        context.beginPath();
        let startX = this.randomNum(0, this.contentWidth);
        let startY = this.randomNum(0, this.contentHeight);
        let endX = this.randomNum(0, this.contentWidth);
        let endY = this.randomNum(0, this.contentHeight);
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
      }
    },
  },
};
</script>

<style scoped></style>
