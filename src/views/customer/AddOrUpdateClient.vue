<script setup lang="ts">
import { ref, reactive, defineEmits, defineExpose } from "vue";
import { AddRuleForm } from "./utils/client";
import { addDistriRules } from "./utils/rules";
import type { ComponentSize, FormInstance } from "element-plus";
import { addDistriibutor } from "@/api/distributor";
import { ElMessage } from "element-plus";
defineOptions({
  name: ""
});
/**弹框是否显示 */
const dialogFormVisible = ref(true);
const flag = ref(true);
const emit = defineEmits(["closeDialog"]);
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<AddRuleForm>({
  name: "",
  city: "",
  dealer: "",
  project: "",
  switchCase: "",
  startTime: "",
  productNum: "",
  status: 1
});

const init = (info: any) => {
  flag.value = info;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      addDistriibutor(fields)
        .then(res => {
          ElMessage({
            message: "新增成功",
            type: "success"
          });
          emit("closeDialog");
        })
        .catch(err => {
          ElMessage({
            message: `${err}`,
            type: "error"
          });
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};

defineExpose({ init });
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title=`flag ? "新建经销商" : "修改经销商"`
    width="700"
    style="padding: 20px 24px 20px 20px"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="addDistriRules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="客户名称" prop="name" required>
        <el-input v-model="ruleForm.name" placeholder="请输入经销商名称" />
      </el-form-item>
      <el-form-item label="所属城市" prop="city" required>
        <el-select v-model="ruleForm.city" placeholder="请选择所属城市">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属经销商" prop="dealer" required>
        <el-select v-model="ruleForm.dealer" placeholder="请选择所属经销商">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属项目" prop="project" required>
        <el-select v-model="ruleForm.project" placeholder="请选择所属项目">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="总开关机箱" prop="switchCase" required>
        <el-select v-model="ruleForm.switchCase" placeholder="请选择总开关机箱">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="startTime">
        <el-date-picker
          v-model="ruleForm.startTime"
          type="date"
          aria-label="请选择创建时间"
          placeholder="请选择创建时间"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="产品数量" prop="productNum">
        <el-input v-model="ruleForm.productNum" placeholder="请输入产品数量" />
      </el-form-item>
      <el-form-item label="客户状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :value="0"
            ><span style="color: #1ebfa0 100%"> 启用</span></el-radio
          >
          <el-radio :value="1">
            <span style="color: #ff4368 100%">停用</span></el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss"></style>
