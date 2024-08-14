<script setup lang="ts">
import { ref, reactive, defineEmits } from "vue";
import { FloorRuleForm, DomainItem } from "./utils/client";
import { floorRules } from "./utils/rules";
import { Plus, Minus } from "@element-plus/icons-vue";
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
const ruleForm = reactive<FloorRuleForm>({
  newArea: "",
  currentArea: "",
  newRoom: "",
  domains: [
    {
      key: 1,
      value: ""
    }
  ],
  status: 0
});

/**楼梯新增 */
const addDomain = () => {
  ruleForm.domains.push({
    key: Date.now(),
    value: ""
  });
};
/**楼梯减掉 */
const removeDomain = (item: DomainItem) => {
  const index = ruleForm.domains.indexOf(item);
  if (index !== -1) {
    ruleForm.domains.splice(index, 1);
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
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="楼层管理"
    width="700"
    style="padding: 20px 24px 20px 20px"
  >
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="ruleForm"
      label-width="auto"
      class="demo-dynamic"
      :rules="floorRules"
    >
      <el-form-item label="新建区" prop="newArea" required>
        <el-select v-model="ruleForm.newArea" placeholder="请选择新建区">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="当前区" prop="currentArea" required>
        <el-select v-model="ruleForm.currentArea" placeholder="请选择当前区">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="新建房间" prop="newRoom" required>
        <el-select v-model="ruleForm.newRoom" placeholder="请选择新建房间">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
        <el-button @click="addDomain" :icon="Plus" circle />
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in ruleForm.domains"
        :key="domain.key"
        label=""
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: '楼梯间不能为空',
          trigger: 'blur'
        }"
        required
      >
        <el-input v-model="domain.value" />
        <el-button
          type="primary"
          :icon="Minus"
          circle
          @click.prevent="removeDomain(domain)"
        />
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
