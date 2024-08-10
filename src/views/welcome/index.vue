<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <div>
    <!-- 上面的盒子 -->
    <div class="topBottom">
      <div class="lineClass">折线图</div>
      <div class="annularClass">环形图</div>
    </div>
    <!-- 下面的盒子 -->
    <div class="contentBottom">
      <div class="mapClass">地图</div>
      <div class="barClass">柱状图</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.topBottom {
  height: 355px;
  border: 1px solid red;
  margin-bottom: 8px;
  display: flex;
  .lineClass {
    width: 1094px;
    border: 1px solid red;
  }
  .annularClass {
    width: 577px;
    border: 1px solid red;
  }
}
.contentBottom {
  display: flex;
  height: 460px;
  .mapClass {
    width: 934px;
    border: 1px solid red;
    margin-right: 8px;
  }
  .barClass {
    width: 730px;
    border: 1px solid red;
  }
}
</style>
