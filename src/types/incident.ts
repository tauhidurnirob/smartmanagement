import { Dayjs } from 'dayjs'
import { ISelectItem } from './common'
import { IIncident, IUser } from '../api/models'
import { EIncidentEventType, EIncidentStatus } from '../helpers/constants'

export interface IIncidentTypeListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
}

export interface IIncidentCreateTime {
  value: string
  unit: ISelectItem
}

export interface IIncidentCreateRecipientItem {
  user: ISelectItem[]
  tat: IIncidentCreateTime
  reminder: IIncidentCreateTime
}

export interface IIncidentCreateCCRecipientItem {
  user: ISelectItem[]
}

export interface IIncidentListFilters {
  search: string
  types: ISelectItem[]
  statuses: ISelectItem[]
  projects?: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
  year?: any
  startDate: Dayjs
  endDate: Dayjs
}

export interface IIncidentEVent {
  id: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  incidentId: number
  type: EIncidentEventType
  comment?: string
  userId?: number
  fromStatus?: EIncidentStatus
  toStatus?: EIncidentStatus
  user?: IUser
  incident?: IIncident
}

export interface IIncidentReportFilters {
  reportTypes: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  startDate: Dayjs
  endDate: Dayjs
}
