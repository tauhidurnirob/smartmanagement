import { IField } from "../../modules/audit/audit-form-template/form-builder/FormBuilder"

export interface ReqAuditFormTemplateList {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  formTypeIds?: number[]
}

export interface IReqAuditFormTemplateUpdate {
  id: number
  body: {
    name?: string
    content?: IField[]
    remark?: string
    formTypeId?: number
    projectIds?: number[]
    ratingTemplateIds?: number[]
    title?: string
    subTitle?: string
    logoUrl?: string
  }
}

export interface IReqAuditFormTemplateCreate {
  name: string
  content: IField[]
  remark: string
  formTypeId: number
  projectIds: number[]
  ratingTemplateIds: number[]
  title: string
  subTitle: string
  logoUrl: string
}
