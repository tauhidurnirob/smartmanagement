import { Dayjs } from 'dayjs'
import { IReqFilter, ISelectItem } from './common'
import { IProject } from './project'
import { IUnit } from '../api/models'

export interface INotification {
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

export interface INotificationListByProjectFilters {
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

export interface INotificationListMoreFilters {
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

export enum ENotificationMoreFilterKeys {
  buildings = 'buildings',
  levels = 'levels',
  areas = 'areas',
  units = 'units',
}

export interface IProjectNotification {
  device: INotification[]
  // maintenance: INotification[]
  // incident: INotification[]
  // feedback: INotification[]
  audit: INotification[]
}

export interface INotificationListItemByProject {
  project: IProject
  notifications: IProjectNotification
}

export interface IReqNotifications extends IReqFilter {
  text: string
  startDate: string
  endDate: string
  projectIds: number[]
  locationIds: number[]
  buildingIds: number[]
  levelIds: number[]
  areaIds: number[]
  unitIds: number[]
}

export interface INotificationData {
  id: number
  text: string
  createdAt: string
  isRead: number
  building: {
    id: number
    name: string
  }
  level: {
    id: number
    name: string
  }
  area: {
    id: number
    name: string
  }
  unit: {
    id: number
    name: string
  }
  user?: {
    fullName: string
  },
  userAudit?: {
    fullName: string
  }
}

export interface IResNotification {
  id: number
  name: string
  address: string
  audit: {
    count: number
    data: INotificationData[]
  }
  device: {
    count: number
    data: INotificationData[]
  }
}
export interface IResCleanerNotification{
    id: number
    taskId: number
    text: string
    userId: number
    locationId: number
    buildingId: number
    levelId: number
    areaId: number
    unitId: number
    isRead: boolean
    userFullName: string | null
    locationName: string | null
    buildingName: string | null
    levelName: string | null
    areaName: string | null
    unitName: string | null
}
