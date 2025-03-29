import { Dayjs } from 'dayjs'
import { ISelectItem } from './common'
import { IArea, IBuilding, IDevice, IDeviceType, ILevel, IUnit, IUser } from '../api/models'
import { IProject } from './project'
import { ILocation } from './location'
import { IImg } from './performance-management'

export interface IMaintenanceListFilters {
  search: string
  statuses: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
  startDate: Dayjs
  endDate: Dayjs
  startTime: Dayjs
  endTime: Dayjs
}

export interface IMaintenance {
  id: number
  name: string
  status: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  remark?: string
  acknowledgedBy?: IUser
  closedBy?: IUser
  startAt?: string | null
  endAt?: string | null
  downTime?: string
  recipents?: IUser[]
  project: IProject | null
  location: ILocation | null
  building?: IBuilding | null
  level?: ILevel | null
  area?: IArea | null
  unit?: IUnit | null
  triggeredAt?: string | null
  deviceType?: IDeviceType | null
  deviceList?: IDevice[]
  procedures?: any
  frequency?: string
}
export interface IMaintenanceStep {
  text: string
  images: IImg[]
}
export interface IMaintenanceProcedure {
  id: number
  name: string
  remark: string
  steps: IMaintenanceStep[]
}

export interface IMaintenanceReportFilters {
  reportTypes: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  startDate: Dayjs
  endDate: Dayjs
}
