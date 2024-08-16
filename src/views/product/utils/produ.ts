
export interface AddRuleForm {
  id: string;
  number: string;
  dealer: string;
  project: string;
  switchCase: string;
  power: string;
  availableTime: string[]
  chasStatusstatus?: number
}

export interface ChassAddRuleForm {
  id: string;
  dealer: string;
  project: string;
  power: string;
  angle: number;
  status: number;
  chasStatus: number
}

