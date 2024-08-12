<script setup lang="ts">
import * as echarts from "echarts";
import Echarts from "./Echarts.vue";
import { reactive, ref } from "vue";
import chinamap from "../map/china.json";
import { getMapDate } from "@/api/welcome";
import MapLeft from "./MapLeft.vue";
defineOptions({
  name: "MapEchart"
});
echarts.registerMap("china", chinamap);
let regionsData = reactive([]);
const initMapData = async () => {
  try {
    // let result = await getMapDate()
    let morkData = [
      {
        name: "四川",
        color: "#1ebfa0"
      },
      {
        name: "陕西",
        color: "#1ebfa0"
      },
      {
        name: "湖北",
        color: "#1ebfa0"
      },
      {
        name: "湖南",
        color: "#1ebfa0"
      },
      {
        name: "广西",
        color: "#1ebfa0"
      },
      {
        name: "广东",
        color: "#1ebfa0"
      },
      {
        name: "福建",
        color: "#1ebfa0"
      },
      {
        name: "河南",
        color: "#ff4368"
      },
      {
        name: "重庆",
        color: "#ff8c03"
      }
    ];
    morkData.forEach(item => {
      regionsData.push({
        name: item.name,
        itemStyle: {
          areaColor: item.color,
          borderColor: "#fff"
        }
      });
    });
  } catch (error) {}
};
initMapData();
const option = reactive({
  geo: {
    show: true,
    map: "china",
    label: {
      show: true,
      fontSize: "12px"
    },
    itemStyle: {
      normal: {
        areaColor: "rgba(37, 157, 255, 0.2)",
        borderWidth: 1,
        borderColor: "#f8911b"
      }
    },
    regions: regionsData
  }
});
</script>

<template>
  <MapLeft />
  <Echarts
    :style="{ height: '700px', width: '100%', marginTop: '-40px' }"
    :option="option"
  />
</template>

<style lang="scss" scoped></style>
