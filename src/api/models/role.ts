import { IRole, IRolePermission, IRolePermissionInfo } from '../../types/role'

export interface ReqRoleList {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
}

export interface ResRoleList {
  count: number
  rows: IRole[]
}

export interface ReqRoleUpdate {
  id: number
  data: {
    name?: string
    permission?: IRolePermissionInfo
    isStaff?: boolean
    isAuditor?: boolean
    isCleaner?: boolean
    isSupervisor?: boolean
  }
}

export interface ReqRoleCreate {
  name: string
  permission: IRolePermissionInfo
  isStaff: boolean
  isAuditor: boolean
  isCleaner: boolean
  isSupervisor: boolean
}
