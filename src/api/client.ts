import { http } from "@/utils/http";
import { AddRuleForm, UpdateRuleForm } from '@/views/distributor/utils/distributor'
// 列表信息
export type DistributorListResult = {
  success: boolean;
  data: any[];
};

// 新增信息
export type AddDisriResult = {
  success: boolean;
  data: any[];
};

/**修改信息 */
export type UpdateDisriResult = {
  success: boolean;
  data: any[]
}

/* 查询经销商列表信息 */
export const getDistributorList = (data?: object) => {
  return http.request<DistributorListResult>("get", "/distributorList", { data })
}


/*新增信息 */
export const addDistriibutor = (data?: object) => {
  return http.request<AddDisriResult>("post", "/add", { data })
}

/** 保存修改信息 */
export const updateDistriibutor = (data?: object) => {
  return http.request<UpdateDisriResult>("post", "/update", { data })
}

/**修改时获取详细信息 */
export const getUpdateInfo = (data) => {
  return http.request<UpdateDisriResult>("get", "/updateInfo", { data })
}



