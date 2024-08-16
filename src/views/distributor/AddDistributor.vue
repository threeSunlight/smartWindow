<script setup lang="ts">
import { ref, reactive, defineEmits } from "vue";
import { AddRuleForm } from "./utils/distributor";
import { addDistriRules } from "./utils/rules";
import { Plus } from "@element-plus/icons-vue";
import type { ComponentSize, FormInstance } from "element-plus";
import { addDistriibutor } from "@/api/distributor";
import { ElMessage } from "element-plus";
defineOptions({
  name: ""
});
/**弹框是否显示 */
const dialogFormVisible = ref(true);

const emit = defineEmits(["closeDialog"]);
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<AddRuleForm>({
  name: "",
  city: "",
  personName: "",
  personPhone: "",
  account: "",
  phoneNum: "",
  password: "",
  status: 1
});

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
</script>

<template>
  <el-dialog
    :before-close="
      () => {
        emit('closeDialog');
      }
    "
    v-model="dialogFormVisible"
    title="新建经销商"
    width="700"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
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
      <el-form-item label="经销商名称" prop="name" required>
        <el-input v-model="ruleForm.name" placeholder="请输入经销商名称" />
      </el-form-item>
      <el-form-item label="所属城市" prop="city" required>
        <el-select v-model="ruleForm.city" placeholder="请选择所属城市">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="负责人姓名" prop="personName" required>
        <el-input
          v-model="ruleForm.personName"
          placeholder="请输入负责人姓名"
        />
      </el-form-item>
      <el-form-item label="负责人电话" prop="personPhone" required>
        <el-input
          v-model="ruleForm.personPhone"
          placeholder="请输入负责人电话"
        />
      </el-form-item>
      <el-form-item label="账号" prop="account" required>
        <el-input v-model="ruleForm.account" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum" required>
        <el-input v-model="ruleForm.phoneNum" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input v-model="ruleForm.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="经销商状态" prop="status">
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
