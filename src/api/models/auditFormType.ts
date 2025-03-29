import { IDirection } from '../../types/common'

export interface ReqAuditFormTypeList {
  page: number
  limit: number
  orderBy?: string
  orderDir?: IDirection
  text?: string
  isAll?: boolean
}
