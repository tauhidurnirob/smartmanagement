export interface IRolePermissionInfo {
  permissions: string[]
}

export interface IRole {
  id: number
  name: string
  permission: IRolePermissionInfo
  isStaff?: boolean
  isAuditor?: boolean
  isCleaner?: boolean
  isSupervisor?: boolean
  userCount?: number
}

export interface IRolePermissionItem {
  label: string
  enabled?: boolean
  key: string
}

export interface IRoleSubPermissionItem {
  label: string
  enabled?: boolean
  key: string
  items: IRolePermissionItem[]
}

export interface IRolePermission {
  label: string
  key: string
  items?: IRolePermissionItem[]
  subPermissions?: IRoleSubPermissionItem[]
}
