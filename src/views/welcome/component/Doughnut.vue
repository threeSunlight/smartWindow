<script setup lang="ts">
defineOptions({
  name: ""
});
import { reactive, ref } from "vue";
import Echarts from "./Echarts.vue";
import RightTop from "./RightTop.vue";
import { getDoubghnutData } from "@/api/welcome";
/**初始化数据 */
let pieData = reactive([]);
/**初始化颜色 */
let color = ref([]);
/**调取接口获取数据 */
const getDoubghnutDatas = async () => {
  try {
    // let result = await getDoubghnutData();
    let result = [
      {
        name: "正常",
        value: 726,
        color: "#1ebfa0"
      },
      {
        name: "异常",
        value: 257,
        color: "#ff8c03"
      },
      {
        name: "关闭",
        value: 8,
        color: "#ff4368"
      }
    ];
    result.forEach(item => {
      color.value.push(item.color);
    });
    pieData = result;
  } catch (error) {}
};

getDoubghnutDatas();
const option = reactive({
  color: color.value,
  tooltip: {
    confine: true,
    trigger: "item",
    formatter: "{b} : {c}"
  },
  series: [
    {
      avoidLabelOverlap: false,
      type: "pie",
      // roseType: "area", // 玫瑰图
      center: ["50%", "50%"],
      radius: ["30%", "60%"],
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        formatter: "{b}\n---------\n {c}\ | {d}%",
        fontSize: 12
        // color: "#000"
      },
      labelLine: {
        length: 10,
        length2: 30
      },
      data: pieData
    }
  ]
});
</script>

<template>
  <div class="top">
    <div class="logClass">
      <el-button>故障日志</el-button>
    </div>
    <div><RightTop /></div>
  </div>
  <Echarts :style="{ height: '300px', width: '100%' }" :option="option" />
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
