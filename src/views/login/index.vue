<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@/layout/hooks/useNav";
import { FormInstance, ElMessage } from "element-plus";
import { $t, transformI18n } from "@/plugins/i18n";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { bg, titlebg } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from "vue";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import globalization from "@/assets/svg/globalization.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import Check from "@iconify-icons/ep/check";
import User from "@iconify-icons/ri/user-3-fill";
import { getVerCode } from "@/api/user";

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const { t } = useI18n();
const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();

const ruleForm = reactive({
  username: "",
  password: "",
  verificationCode: "",
  keeplogin: true
});

/**区分当前是验证码登录还是密码登录 true: 密码登录 false: 验证码登录 */
const passwordOrCode = ref(true);

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .loginByUsername({
          username: ruleForm.username,
          password: ruleForm.password,
          code: ruleForm.verificationCode
        })
        .then(res => {
          if (res.success) {
            // 获取后端路由
            return initRouter().then(() => {
              router.push(getTopMenu(true).path).then(() => {
                message(t("login.pureLoginSuccess"), { type: "success" });
              });
            });
          } else {
            message(t("login.pureLoginFail"), { type: "error" });
          }
        })
        .finally(() => (loading.value = false));
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin(ruleFormRef.value);
  }
}

/**获取验证码 */
const getCode = () => {
  getVerCode()
    .then(res => {
      ElMessage({
        showClose: true,
        message: "验证码发送成功,请查看手机",
        type: "success"
      });
    })
    .catch(err => {
      ElMessage({
        showClose: true,
        message: `${err}`,
        type: "error"
      });
    });
};
onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
      <!-- 国际化 -->
      <el-dropdown trigger="click">
        <globalization
          class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300"
        />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'zh')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]"
              @click="translationCh"
            >
              <IconifyIconOffline
                v-show="locale === 'zh'"
                class="check-zh"
                :icon="Check"
              />
              简体中文
            </el-dropdown-item>
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
              @click="translationEn"
            >
              <span v-show="locale === 'en'" class="check-en">
                <IconifyIconOffline :icon="Check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="login-container">
      <div class="img">
        <p>
          <span>Welcome !</span>
          <br />
          <span>智能电动窗管理平台</span>
        </p>
      </div>
      <div class="login-box">
        <div class="login-form">
          <div class="login-form-title-content">
            <img :src="titlebg" class="avatar" />
            <span class="login-form-title">智能电动窗</span>
          </div>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: transformI18n($t('login.pureUsernameReg')),
                    trigger: 'blur'
                  }
                ]"
                prop="username"
              >
                <el-input
                  v-model="ruleForm.username"
                  clearable
                  :placeholder="t('login.pureUsername')"
                  :prefix-icon="
                    useRenderIcon(User, {
                      color: '#3666F4'
                    })
                  "
                />
              </el-form-item>
            </Motion>

            <!-- <Motion  :delay="150"> -->
            <el-form-item v-if="passwordOrCode" prop="password">
              <el-input
                v-model="ruleForm.password"
                clearable
                show-password
                :placeholder="t('login.purePassword')"
                :prefix-icon="
                  useRenderIcon(Lock, {
                    color: '#3666F4'
                  })
                "
              />
            </el-form-item>
            <!-- </Motion> -->

            <!-- <Motion  :delay="150"> -->
            <el-form-item v-if="!passwordOrCode" prop="verificationCode">
              <el-input
                v-model="ruleForm.verificationCode"
                clearable
                show-password
                :placeholder="t('login.pureVerificationCode')"
                :prefix-icon="
                  useRenderIcon(Lock, {
                    color: '#3666F4'
                  })
                "
              >
                <template #suffix>
                  <el-button link type="primary" @click="getCode"
                    >获取验证码</el-button
                  >
                </template>
              </el-input>
            </el-form-item>
            <!-- </Motion> -->

            <Motion :delay="150">
              <div class="loginButton">
                <el-button link type="primary"
                  ><el-checkbox
                    v-model="ruleForm.keeplogin"
                    size="small"
                  />保持登录</el-button
                >
                <el-button
                  link
                  type="primary"
                  @click="() => (passwordOrCode = !passwordOrCode)"
                  >{{ !passwordOrCode ? "密码登录" : "验证码登录" }}
                </el-button>
              </div>
            </Motion>

            <Motion :delay="250" class="botomLogin">
              <el-button
                class="w-full mt-4"
                color="#3666F4"
                size="large"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
              >
                {{ t("login.pureLogin") }}
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
    inset;
  cursor: default;
  border-bottom: 1px solid #e4e4e4;
  height: 50px;
  .el-input inner {
    cursor: default !important;
  }
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
