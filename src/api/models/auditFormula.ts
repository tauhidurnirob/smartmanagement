export interface ReqAuditFormulaList {
  page: number
  limit: number
  sortBy?: string
  sortDir?: string
  text?: string
}
export interface ReqAuditFormulaGroupList {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
}

export interface ReqAuditFormulaCreate {
  name: string
  formula: string
  projectIds?: number[]
}

export interface ReqAuditFormulaUpdate {
  id: number
  name?: string
  formula?: string
  projectIds?: number[]
}

export interface ReqAuditFormulaMultipleDelete {
  ids: number[]
}
export interface ReqAuditFormulaGroupCreate {
  name: string
  remark: string
}
export interface ReqAuditFormulaGroupUpdate {
  id: number
  name: string
  remark: string
}