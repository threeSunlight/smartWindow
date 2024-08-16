export interface FloorRuleForm {
  newArea: string;
  currentArea: string;
  newRoom: string;
  domains: DomainItem[];
  status?: number
  newAreas: DomainItem[];
}
export interface DomainItem {
  key: number
  value: string
}
export interface AddRuleForm {
  name: string;
  city: string;
  dealer: string;
  project: string;
  switchCase: string;
  startTime: string;
  productNum?: string
  status?: number
}
