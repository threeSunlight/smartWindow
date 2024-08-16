import { reactive } from "vue";
import { AddRuleForm, ChassAddRuleForm } from "./produ";
import type { FormRules } from "element-plus";
const Rules = reactive(<FormRules<AddRuleForm>>{
  id: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入产品编号"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  number: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入入库数量"));
        } else {
          callback();
        }
      },
      trigger: "blur"
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
          callback(new Error("请选择所属机箱"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  power: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择权限分配"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  availableTime: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择可用时间"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ]
});
const ChoseRules = reactive(<FormRules<ChassAddRuleForm>>{
  id: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入产品编号"));
        } else {
          callback();
        }
      },
      trigger: "blur"
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
  power: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请选择权限分配"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  angle: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入默认开启角度"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});


export { Rules, ChoseRules };
