<script setup lang="ts">
defineOptions({
  name: "Distributor"
});
import {
  Plus,
  Close,
  Download,
  Search,
  Refresh,
  Edit
} from "@element-plus/icons-vue";
import { ref, reactive, nextTick } from "vue";
import AddOrUpdateClient from "./AddOrUpdateClient.vue";
import { getDistributorList } from "@/api/distributor";
/* 顶部搜索 */
let distriValue = ref("");
/** 表格数据列表 */
const tableData = reactive([]);
/**控制新弹框显示 */
const addDistributorVisible = ref(false);
/**获取新增ref属性 */
const addDistributor = ref(null);
/**多选 */
const multipleSelection = ref([]);
/**分页 */
const paginaTion = reactive({
  pageSize: 1,
  PageCount: 1,
  total: 30
});
/**获取列表信息 */
const getList = async () => {
  try {
    // let result = await getDistributorList();
    // tableData =
  } catch (error) {
    console.log(error);
  }
};
getList();

/**新增信息 */
const addOrUpdateDistor = (row: any) => {
  addDistributorVisible.value = true;
  nextTick(() => {
    addDistributor.value.init(row);
  });
};

/**停用 */
const stopDistor = () => {};

/**导出 */
const downloadIItem = () => {};

/**多选信息 */
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};

/**分页信息 */
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  // 调用接口
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

/** 楼层管理 */
const handleFloor = (index: any, row: any) => {};
/**关闭弹框 */
const closeDialog = () => {
  addDistributorVisible.value = false;
};
</script>

<template>
  <div class="distri">
    <el-card style="margin-bottom: 10px" shadow="always">
      <div class="cardClass">
        <div>
          <el-button
            type="primary"
            :icon="Plus"
            plain
            @click="addOrUpdateDistor(true)"
            >新建</el-button
          >
          <el-button
            type="primary"
            :icon="Edit"
            plain
            @click="addOrUpdateDistor(false)"
            >编辑</el-button
          >
          <el-button type="primary" :icon="Close" plain @click="stopDistor"
            >停用</el-button
          >
          <el-button
            type="primary"
            :icon="Download"
            plain
            @click="downloadIItem"
            >导出</el-button
          >
        </div>
        <div>
          <el-input
            v-model="distriValue"
            style="width: 240px; margin-right: 14px"
            placeholder="请输入要查询的名称"
            :suffix-icon="Search"
          />
          <el-button type="primary" :icon="Search" plain>查询</el-button>
          <el-button type="primary" :icon="Refresh" plain>重置</el-button>
        </div>
      </div>
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="card-header">
          <span>客户列表</span>
        </div>
      </template>
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" property="id" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="dealer" label="所属经销商" />
        <el-table-column prop="project" label="所属项目" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="deviceName" label="设备数量" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="addOrUpdateDistor(scope.row)">
              编辑
            </el-button>
            <el-button
              size="small"
              @click="handleFloor(scope.$index, scope.row)"
            >
              楼层管理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tableButton">
        <el-pagination
          :page-size="paginaTion.pageSize"
          :pager-count="paginaTion.PageCount"
          layout="prev, pager, next"
          :total="paginaTion.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
  <AddOrUpdateClient
    ref="addDistributor"
    v-if="addDistributorVisible"
    @closeDialog="closeDialog"
  />
</template>

<style lang="scss" scoped>
.distri {
  .cardClass {
    display: flex !important;
    justify-content: space-between !important;
  }
  .tableButton {
    margin-top: 14px;
    float: right;
    padding-bottom: 10px;
  }
}
</style>
