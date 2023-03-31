<template>
  <canvas ref="canvas" width="300" height="300" class="canvas"></canvas>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext("2d");
    this.draw(0);
  },
  methods: {
    draw(offsetX) {
      this.ctx.save();
      this.ctx.fillStyle = "rgb(43, 43, 43)";
      this.ctx.fillRect(0, 0, 300, 300);
      this.drawHeart();
      this.ctx.translate(-150, 0);
      this.drawWave(offsetX);
      this.drawWave(offsetX + 10, 0.04, 3, "rgba(0, 96, 143,1)");
      this.ctx.restore();
      window.requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, 300, 300);
        this.draw(offsetX + 0.06);
      });
    },
    drawHeart() {
      // 半径
      const r = 8;
      // 圆周
      const circle = Math.PI * 2;
      // 描点的个数
      const count = 80;
      this.ctx.beginPath();
      this.ctx.translate(150, 120);
      for (let i = 0; i < count; i++) {
        const step = (i / count) * circle;
        const vector = {
          x: 16 * Math.sin(step) ** 3,
          y:
            13 * Math.cos(step) -
            5 * Math.cos(2 * step) -
            2 * Math.cos(3 * step) -
            Math.cos(4 * step),
        };
        this.ctx.lineTo(r * vector.x, vector.y * r * -1);
      }

      this.ctx.strokeStyle = "#ff608f";
      this.ctx.closePath();
      this.ctx.lineWidth = 10;
      this.ctx.stroke();
      this.ctx.clip();
    },
    drawWave(
      offsetX = 0,
      waveWidth = 0.06,
      waveHeight = 6,
      color = "rgba(0, 96, 143, 0.7)"
    ) {
      // const offsetX = 0;
      const offsetY = 0;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      for (let x = 0; x < 300; x += Math.PI / 16) {
        const y = Math.sin(x * waveWidth + offsetX) * waveHeight + offsetY;
        this.ctx.lineTo(x, y);
      }
      this.ctx.lineTo(300, 150);
      this.ctx.lineTo(0, 150);
      this.ctx.lineTo(0, 0);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.closePath();
    },
  },
});
</script>

<style>
.canvas {
  border: 1px solid #dedede;
}
</style>
