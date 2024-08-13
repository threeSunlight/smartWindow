export interface AddRuleForm {
  name: string;
  city: string;
  personName: string;
  personPhone: string;
  account: string;
  phoneNum: string;
  password: string;
  status?: number
}

export interface UpdateRuleForm {
  name: string;
  city: string;
  personName: string;
  personPhone: string;
  startTime?: string;
  quantityNum: string;
  projectNum?: string;
  clientNum?: string;
  equipment?: string;
  status?: number

}
