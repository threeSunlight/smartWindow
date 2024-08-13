import { reactive } from "vue";
import { AddRuleForm, UpdateRuleForm } from "./distributor";
import type { FormRules } from "element-plus";
const addDistriRules = reactive(<FormRules<AddRuleForm>>{
  name: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入经销商名称"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  city: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择所属城市"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  personName: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入负责人姓名"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  personPhone: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入负责人电话"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  account: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入账号"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  phoneNum: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});

const updateDistriRules = reactive(<FormRules<UpdateRuleForm>>{
  name: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入经销商名称"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  city: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择所属城市"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  personName: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入负责人姓名"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  personPhone: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入负责人电话"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});

export { addDistriRules, updateDistriRules };
