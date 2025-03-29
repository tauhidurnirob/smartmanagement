import { Dayjs } from 'dayjs'
import { ISelectItem } from './common'
import { IProject } from './project'
import { IUnit } from '../api/models'

export interface IAlert {
  id: number
  title: string
  description: string
  unitId?: number
  unit?: IUnit
  createdAt?: string
  updatedAt?: string
  isRead?: boolean
  comment?: string
}

export interface IAlertListByProjectFilters {
  text: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
  startDate: Dayjs | null
  endDate: Dayjs | null
}

export interface IAlertListItemByProject {
  project: IProject
  alerts: IAlert[]
}

export interface IAlertResponse {
  value: string
  unit: ISelectItem | null
}

export interface IAlertRecipientItem {
  user: ISelectItem[]
  response: IAlertResponse
}
