import { reactive } from "vue";
import { AddRuleForm, FloorRuleForm } from "./client";
import type { FormRules } from "element-plus";
const addDistriRules = reactive(<FormRules<AddRuleForm>>{
  name: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入客户名称"));
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
  dealer: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择所属经销商"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  project: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择所属项目"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  switchCase: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择总开关机箱"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ]
});
const floorRules = reactive(<FormRules<AddRuleForm>>{

  newArea: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择新建区"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  currentArea: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择当前区"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  newRoom: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择新建房间"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
});

export { addDistriRules, floorRules };
