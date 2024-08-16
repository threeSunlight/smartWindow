import { http } from "@/utils/http";
import { AddRuleForm, UpdateRuleForm } from '@/views/distributor/utils/distributor'
// 列表信息
export type ListResult = {
  success: boolean;
  data: any[];
};

// 新增信息
export type AddResult = {
  success: boolean;
  data: any[];
};

/**修改信息 */
export type UpdateResult = {
  success: boolean;
  data: any[]
}

/**停用 */
export type BlockUpResult = {
  success: boolean;
  data: any[]
}

/**导出 */
export type Dowload = {
  success: boolean;
  data: any[]
}
/* 查询产品管理列表信息 */
export const getList = (data?: object) => {
  return http.request<ListResult>("get", "/distributorList", { data })
}


/*新增信息 */
export const addInfo = (data?: object) => {
  return http.request<AddResult>("post", "/add", { data })
}

/** 保存修改信息 */
export const updateInfo = (data?: object) => {
  return http.request<UpdateResult>("post", "/update", { data })
}

/**修改时获取详细信息 */
export const getUpdateInfo = (data?: object) => {
  return http.request<UpdateResult>("get", "/updateInfo", { data })
}

/**停用 */
export const blockUp = (data?: object) => {
  return http.request<BlockUpResult>("get", "/updateInfo", { data })
}


/**导出 */
export const getdowload = (data?: object) => {
  return http.request<Dowload>("get", "/updateInfo", { data })
}

