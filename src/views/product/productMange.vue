<script setup lang="ts">
defineOptions({
  name: "ProductMange"
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
import productStorage from "./productStorage.vue";
import { getList } from "@/api/product";
import type { FormInstance } from "element-plus";
/* 顶部搜索 */
const ruleFormRef = ref<FormInstance>();
const formInline = reactive({
  id: "",
  dealer: "",
  project: "",
  switchCase: ""
});
/**顶部查询按钮 */
const onSubmit = () => {
  console.log("submit!");
  // getList 调用 列表接口
};
/**重置 */
const resetForm = (formEl: FormInstance | undefined) => {
  formInline.id = "";
  formInline.dealer = "";
  formInline.project = "";
  formInline.switchCase = "";
};

/** 表格数据列表 */
const tableData = reactive([]);
/**控制新弹框显示 */
const productStorageVisible = ref(false);
/**获取新增ref属性 */
const productStorageRef = ref(null);
/**多选 */
const multipleSelection = ref([]);
/**分页 */
const paginaTion = reactive({
  pageSize: 1,
  PageCount: 1,
  total: 30
});
/**获取列表信息 */
const getProductList = async () => {
  try {
    // let result = await getList();
    // tableData =
  } catch (error) {
    console.log(error);
  }
};
getProductList();
/**新增信息 */

/**停用 */
const stopDistor = () => {};

/**导出 */
const downloadIItem = () => {};

/**入库或编辑 */
const addOrUpdatestorage = (row: any) => {
  productStorageVisible.value = true;
  nextTick(() => {
    productStorageRef.value.init(row);
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
  productStorageVisible.value = false;
};
</script>

<template>
  <div class="distri">
    <el-card style="margin-bottom: 10px" shadow="always">
      <el-form
        ref="ruleFormRef"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item>
          <el-input
            v-model="formInline.id"
            placeholder="请输入名称或产品编号查找"
            clearable
            :suffix-icon="Search"
          />
        </el-form-item>
        <el-form-item label="所属经销商">
          <el-select
            v-model="formInline.dealer"
            placeholder="请选择所属经销商"
            clearable
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select v-model="formInline.project" placeholder="请选择所属项目">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属机箱">
          <el-select
            v-model="formInline.switchCase"
            placeholder="请选择总开关机箱"
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit()"
            >查询</el-button
          >
          <el-button
            type="primary"
            :icon="Refresh"
            @click="resetForm(ruleFormRef)"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <div class="cardClass">
        <div>
          <el-button
            type="primary"
            :icon="Plus"
            plain
            @click="addOrUpdatestorage(true)"
            >入库</el-button
          >
          <el-button
            type="primary"
            :disabled="multipleSelection.length !== 1"
            :icon="Edit"
            plain
            @click="addOrUpdatestorage(multipleSelection)"
            >分配</el-button
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
      </div>
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="card-header">
          <span>产品列表</span>
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
        <el-table-column prop="number" label="编号" />
        <el-table-column prop="dealer" label="所属经销商" />
        <el-table-column prop="project" label="所属项目" />
        <el-table-column prop="switchCase" label="所属机箱" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status">开启</el-tag>
            <el-tag type="danger" v-else>关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              plain
              @click="addOrUpdatestorage(scope.row)"
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
  <productStorage
    ref="productStorageRef"
    v-if="productStorageVisible"
    @closeDialog="closeDialog"
  />
</template>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
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
