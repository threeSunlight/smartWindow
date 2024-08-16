<script setup lang="ts">
import { ref, reactive, defineEmits, defineExpose } from "vue";
import { AddRuleForm } from "./utils/produ";
import { Rules } from "./utils/rules";
import type { ComponentSize, FormInstance } from "element-plus";
import { addDistriibutor } from "@/api/distributor";
import { ElMessage } from "element-plus";
import moment from "moment";

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
  id: "",
  number: "",
  dealer: "",
  project: "",
  switchCase: "",
  power: "",
  availableTime: [],
  status: 1
});

const init = (info: any) => {
  if (flag) {
    flag.value = info;
  } else {
    flag.value = false;
  }
};
/**设置年限 */
const handlerSetTime = (value: number) => {
  /**获取当前时间 */
  let current = moment().format("YYYY-MM-DD");
  console.log(current, "当前时间");
  let result = moment().add(value, "year").format("YYYY-MM-DD");
  console.log(result, "result");
  ruleForm.availableTime = [`${current}`, `${result}`];
};
const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  }
];
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
      :rules="Rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="产品编号" prop="id" v-show="!flag" required>
        <el-input v-model="ruleForm.id" placeholder="请输入产品编号" disabled />
      </el-form-item>
      <el-form-item label="入库数量" prop="number" required>
        <el-input v-model="ruleForm.number" placeholder="请输入入库数量" />
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
      <el-form-item label="所属机箱" prop="switchCase" required>
        <el-select v-model="ruleForm.switchCase" placeholder="请选择所属机箱">
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
      <el-form-item label="可用时间" prop="availableTime">
        <el-date-picker
          v-model="ruleForm.availableTime"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :shortcuts="shortcuts"
          size="default"
        />
        <div v-show="!flag">
          <el-button plain size="small" @click="handlerSetTime(0.5)"
            >半年</el-button
          >
          <el-button plain size="small" @click="handlerSetTime(1)"
            >一年</el-button
          >
          <el-button plain size="small" @click="handlerSetTime(2)"
            >两年</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="客户状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
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
