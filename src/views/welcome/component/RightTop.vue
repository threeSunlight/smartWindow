<template>
  <div>
    <div
      v-for="item in info"
      :key="item.label"
      style="margin-right: 10px; display: inline-block; vertical-align: middle"
    >
      <span :style="{ color: item.color }">{{ item.labelCrice }}</span>
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
.fontStyle {
  font-size: 12px;
  color: #666666;
  font-weight: 400;
}
</style>
