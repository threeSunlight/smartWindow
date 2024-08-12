<template>
  <div class="allStyle">
    <div
      v-for="item in info"
      :key="item.label"
      style="margin-right: 10px; display: inline-block; vertical-align: middle"
    >
      <div
        class="leftColor"
        :style="{
          backgroundColor: item.color
        }"
      ></div>
      <span class="fontStyle">{{ item.label }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
defineOptions({
  name: "RightTop"
});
const info = reactive([
  {
    label: "正常",
    labelCrice: "●",
    color: "#1ebfa0"
  },
  {
    label: "异常",
    labelCrice: "●",
    color: "#ff8c03"
  },
  {
    label: "关闭",
    labelCrice: "●",
    color: "#ff4368"
  }
]);
</script>
<style scoped lang="scss">
.allStyle {
  display: flex;
  display: inline-block;
  .fontStyle {
    font-size: 12px;
    color: #666666;
    font-weight: 400;
  }
  .leftColor {
    width: 20px;
    height: 10px;
    border-radius: 3px;
    display: inline-block;
    margin-right: 5px;
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>
