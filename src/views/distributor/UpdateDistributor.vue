<script setup lang="ts">
import { ref, reactive, defineEmits, defineExpose } from "vue";
import { UpdateRuleForm } from "./utils/distributor";
import { updateDistriRules } from "./utils/rules";
import { Plus } from "@element-plus/icons-vue";
import type { ComponentSize, FormInstance, UploadProps } from "element-plus";
import { getUpdateInfo, updateDistriibutor } from "@/api/distributor";
defineOptions({
  name: ""
});
/**弹框是否显示 */
const dialogFormVisible = ref(true);
const emit = defineEmits(["closeDialog"]);
const imageUrl = ref("");
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();

const init = async (info: any) => {
  // let result = await getUpdateInfo(info);
  //ruleForm
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = rawFile => {
  if (rawFile.type !== "image/jpeg") {
    //ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    // ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const ruleForm = reactive<UpdateRuleForm>({
  name: "",
  city: "",
  personName: "",
  personPhone: "",
  startTime: "",
  quantityNum: "",
  projectNum: "",
  clientNum: "",
  equipment: "",
  status: 1
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
defineExpose({ init });
</script>

<template>
  <el-dialog
    :before-close="
      () => {
        emit('closeDialog');
      }
    "
    v-model="dialogFormVisible"
    title="信息编辑"
    width="700"
    style="padding: 20px 24px 20px 20px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="updateDistriRules"
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
      <el-form-item label="创建时间" prop="startTime">
        <el-date-picker
          v-model="ruleForm.startTime"
          type="date"
          aria-label="请选择创建时间"
          placeholder="请选择创建时间"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="库存数量" prop="quantityNum">
        <el-input v-model="ruleForm.quantityNum" placeholder="请输入库存数量" />
      </el-form-item>
      <el-form-item label="项目数量" prop="projectNum">
        <el-input v-model="ruleForm.projectNum" placeholder="请输入项目数量" />
      </el-form-item>
      <el-form-item label="客户数量" prop="clientNum">
        <el-input v-model="ruleForm.clientNum" placeholder="请输入客户数量" />
      </el-form-item>
      <el-form-item label="已售设备" prop="equipment">
        <el-input v-model="ruleForm.equipment" placeholder="请输入已售设备" />
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
      <el-form-item label="经销商启动图" prop="distriImg">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
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

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
