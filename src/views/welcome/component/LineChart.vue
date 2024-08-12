<script setup lang="ts">
import { reactive, ref } from "vue";
import Echarts from "./Echarts.vue";
import RightTop from "./RightTop.vue";
import { getLineData } from "@/api/welcome";

defineOptions({
  name: "LineChart"
});
/** 初始化x轴数据*/
let xdata = ref([]);
/** 折线图处理后的初始化数据,并且添加颜色的改变 */
let initData = ref([
  {
    time: "2023/02/01",
    val: 25,
    color: "#FF8A48"
  },
  {
    time: "2023/02/02",
    val: 75,
    color: "#FF8A48 "
  },
  {
    time: "2023/02/03",
    val: 50,
    color: "#FF4368"
  },
  {
    time: "2023/02/04",
    val: 10,
    color: "#FF4368 "
  },
  {
    time: "2023/02/05",
    val: 20,
    color: "#1EBFA0"
  }
]);
/** 图标表单数据 */
let ydata = ref([]);
/** 总图标数据 */
let serisData = ref([]);
/** 默认日期查询 */
const value = ref(["2023/02/01", "2023/02/05"]);

const initAllData = async (data: any) => {
  try {
    // let result = await getLineData();
    let allInitData = initData.value;
    console.log(allInitData, "allInitDataallInitDataallInitDataallInitData");
    for (let i = 0; i < allInitData.length; i++) {
      xdata.value.push(allInitData[i].time);
      ydata.value.push({
        value: allInitData[i].val,
        color: allInitData[i].color
      });
      let obj = {
        gt: i,
        lte: i + 1,
        color: allInitData[i].color
      };
      serisData.value.push(obj);
    }
    console.log(xdata.value, "xdata.valuexdata.valuexdata.value");
    console.log(ydata.value, "ydata.valueydata.valueydata.value");
    console.log(
      serisData.value,
      " serisData.value serisData.value serisData.value serisData.value"
    );
  } catch (err) {
    console.log(err, "折线图的数据请求");
  }
};
initAllData(value.value);

const option = reactive({
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: xdata
  },
  yAxis: {
    type: "value",
    splitNumber: 5,
    interval: 25, //每次增加几个
    max: 100,
    axisPointer: {
      snap: true
    }
  },
  visualMap: [
    {
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: serisData
    }
  ],

  tooltip: {
    trigger: "axis",
    formatter: `<div style="padding: 5px">{b} <br/> <span style="color: red">●</span> {c}</div>` //折线图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
  },
  series: [
    {
      data: ydata,
      type: "line",
      symbol: "circle",
      symbolSize: 14
    }
  ]
});

const getBlur = (value: any) => {
  initData.value = [
    {
      time: "2023/04/05",
      val: 45,
      color: "#FF8A48"
    },
    {
      time: "2023/04/06",
      val: 55,
      color: "#FF8A48 "
    },
    {
      time: "2023/04/07",
      val: 70,
      color: "#FF4368"
    },
    {
      time: "2023/04/08",
      val: 20,
      color: "#FF4368 "
    },
    {
      time: "2023/04/09",
      val: 75,
      color: "#1EBFA0"
    }
  ];
  xdata.value = [];
  ydata.value = [];
  serisData.value = [];
  initAllData(value);
};
</script>
<template>
  <div class="topDate">
    <div>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        @change="getBlur"
      >
      </el-date-picker>
    </div>
    <div>
      <RightTop />
    </div>
  </div>

  <Echarts :style="{ height: '300px', width: '100%' }" :option="option" />
</template>
<style scoped lang="scss">
.topDate {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 20px;
  padding: 0 90px 0 40px;
  line-height: 30px;
}
</style>
