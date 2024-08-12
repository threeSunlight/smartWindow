<script setup lang="ts">
defineOptions({
  name: "Histogram"
});
import { reactive } from "vue";
import Echarts from "./Echarts.vue";
import RightTop from "./RightTop.vue";
import { getLineData } from "@/api/welcome";
const sourceData = reactive([]);
const initAllData = async () => {
  try {
    // let result = await getLineData();
  } catch (error) {}
};
initAllData();
const option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },

  xAxis: {
    type: "category"
  },
  dataset: {
    source: [
      ["2023/02/01", 43.3, 85.8, 93.7],
      ["2023/02/02", 83.1, 73.4, 55.1],
      ["2023/02/03", 86.4, 65.2, 82.5],
      ["2023/02/04", 72.4, 53.9, 39.1]
    ]
  },
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      type: "bar",
      itemStyle: {
        color: "#1ebfa0"
      }
    },
    {
      type: "bar",
      itemStyle: {
        color: "#ff8c03"
      }
    },
    {
      type: "bar",
      itemStyle: {
        color: "#ff4368"
      }
    }
  ]
});
</script>

<template>
  <div class="top">
    <div>
      <el-button>故障统计</el-button>
    </div>
    <div><RightTop /></div>
  </div>
  <Echarts :style="{ height: '90%', width: '90%' }" :option="option" />
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  line-height: 30px;
  margin-right: 20px;
  margin-left: 20px;
}
</style>
