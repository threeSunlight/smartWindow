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
import AddDistributor from "./AddDistributor.vue";
import UpdateDistributor from "./UpdateDistributor.vue";
import { getDistributorList } from "@/api/distributor";
/* 顶部搜索 */
let distriValue = ref("");
/** 表格数据列表 */
const tableData = reactive([]);
/**控制新弹框显示 */
const addDistributorVisible = ref(false);
/**获取新增ref属性 */
const addDistributor = ref(null);
/**控制修弹框显示 */
const updateDistributorVisible = ref(false);
/**获取修改ref属性 */
const updateDistributor = ref(null);
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
const addDistor = () => {
  addDistributorVisible.value = true;
};

/**停用 */
const stopDistor = () => {};

/**导出 */
const downloadIItem = () => {};

/**编辑 */
const handleEdit = (index, row) => {
  updateDistributorVisible.value = true;
  nextTick(() => {
    updateDistributor.value.init();
  });
};

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

/**关闭弹框 */
const closeDialog = () => {
  updateDistributorVisible.value = false;
  addDistributorVisible.value = false;
};
</script>

<template>
  <div class="distri">
    <el-card style="margin-bottom: 10px" shadow="always">
      <div class="cardClass">
        <div>
          <el-button type="primary" :icon="Plus" plain @click="addDistor"
            >新建</el-button
          >
          <el-button type="primary" :icon="Edit" plain @click="handleEdit(1, 2)"
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
          <span>经销商列表</span>
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
        <el-table-column prop="quantityNum" label="设备数量" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="peopleName" label="负责人" />
        <el-table-column prop="startTime" label="创建时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
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
  <AddDistributor
    ref="addDistributor"
    v-if="addDistributorVisible"
    @closeDialog="closeDialog"
  />
  <UpdateDistributor
    ref="updateDistributor"
    v-if="updateDistributorVisible"
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
