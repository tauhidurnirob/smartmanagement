export interface IRouteInfo {
  path: string
  icon?: any
  label: string
  children?: IRouteInfo[]
  permissions?: string[]
  childrenLabel?: string
}
