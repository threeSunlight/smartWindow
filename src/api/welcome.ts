import { http } from "@/utils/http";
// 折线图
export type LineResult = {
  success: boolean;
  data: [{
    /** 日期 */
    time: string;
    /** y轴数据 */
    val: number;
    /** 每个折线段的颜色 */
    color: string;
  }];
};

//饼图
export type DoughnutResult = {
  success: boolean;
  data: [{
    name: string,
    value: number,
    color: string
  }]
}

/**地图背景颜色修改 */
export type MapResult = {
  success: boolean;
  data: [{
    name: string
    color: string
  }]
}

/* 根据传入的日期查询出当前时间段折线数据 */
export const getDoubghnutData = (data?: object) => {
  return http.request<DoughnutResult>("get", "/doughnut", { data })
}


/* 根据传入的日期查询出当前时间段折线数据 */
export const getLineData = (data?: object) => {
  return http.request<LineResult>("get", "/lint", { data })
}

/** 获取地图背景颜色 */
export const getMapDate = (data?: object) => {
  return http.request<MapResult>("get", "/map", { data })
}


