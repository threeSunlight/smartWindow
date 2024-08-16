<script setup lang="ts">
import { ref, reactive, defineEmits, defineExpose } from "vue";
import { ChassAddRuleForm } from "./utils/produ";
import { ChoseRules } from "./utils/rules";
import type { ComponentSize, FormInstance } from "element-plus";
import { addDistriibutor } from "@/api/distributor";
import { ElMessage } from "element-plus";

defineOptions({
  name: "ChassisAddorUpdate"
});
/**弹框是否显示 */
const dialogFormVisible = ref(true);
const flag = ref(true);
const emit = defineEmits(["closeDialog"]);
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ChassAddRuleForm>({
  id: "",
  dealer: "",
  project: "",
  power: "",
  status: 1,
  chasStatus: 1,
  angle: 1
});

const init = (info: any) => {
  if (flag) {
    flag.value = info;
  } else {
    flag.value = false;
  }
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
    :title="flag ? '产品入库' : '产品分配'"
    width="700"
    style="padding: 20px 24px 20px 20px"
    :before-close="
      () => {
        emit('closeDialog');
      }
    "
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="ChoseRules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="机箱编号" prop="id" v-show="!flag" required>
        <el-input v-model="ruleForm.id" placeholder="请输入产品编号" disabled />
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
      <el-form-item label="权限分配" prop="power" required>
        <el-select v-model="ruleForm.power" placeholder="请选择权限分配">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="默认开启角度" prop="angle" required>
        <el-input-number v-model="ruleForm.angle" />
      </el-form-item>
      <el-form-item label="开窗角度权限" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :value="0"
            ><span style="color: #1ebfa0 100%">启用</span></el-radio
          >
          <el-radio :value="1">
            <span style="color: #ff4368 100%">停用</span></el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="机箱状态" prop="chasStatus">
        <el-radio-group v-model="ruleForm.chasStatus">
          <el-radio :value="0"
            ><span style="color: #1ebfa0 100%">启用</span></el-radio
          >
          <el-radio :value="1">
            <span style="color: #ff4368 100%">停用</span></el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          @click="
            () => {
              emit('closeDialog');
            }
          "
          >取消</el-button
        >
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss"></style>
