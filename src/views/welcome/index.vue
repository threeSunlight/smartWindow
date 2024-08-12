<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
import LineChart from "./component/LineChart.vue";
import Doughnut from "./component/Doughnut.vue";
import MapEcharts from "./component/MapEchart.vue";
import Histogram from "./component/Histogram.vue";
</script>

<template>
  <div class="conterin">
    <!-- 上面的盒子 -->
    <div class="topBottom conterinBgc">
      <div class="lineClass">
        <LineChart />
      </div>
      <div class="centerCorder"></div>
      <div class="annularClass">
        <Doughnut />
      </div>
    </div>
    <!-- 下面的盒子 -->
    <div class="contentBottom">
      <div class="mapClass conterinBgc">
        <MapEcharts />
      </div>
      <div class="barClass conterinBgc">
        <Histogram />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.conterinBgc {
  background-color: #fff;
}
.topBottom {
  height: 355px;
  margin-bottom: 8px;
  display: flex;
  .lineClass {
    width: 1094px;
    // border: 1px solid red;
  }
  .annularClass {
    width: 577px;
  }
  .centerCorder {
    // width: 1px;
    height: 300px;
    margin-top: 24px;
    border: 1px solid #eee;
  }
}
.contentBottom {
  display: flex;
  height: 460px;
  .mapClass {
    width: 934px;
    margin-right: 8px;
  }
  .barClass {
    text-align: -webkit-center;
    // text-align: center;
    width: 730px;
  }
}
</style>
