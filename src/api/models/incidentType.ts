import { IArea, IBuilding, ILevel, IUnit, IUser } from '.'
import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'

export enum EIncidentTypeTimeUnit {
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
  Years = 'years',
}

export interface IIncidentTime {
  unit: number
  value: number
}

export interface IIncidentRecipient {
  id: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  recipientId: number
  tatTime: number
  tatUnit: EIncidentTypeTimeUnit
  reminderTime: number
  reminderUnit: EIncidentTypeTimeUnit
  recipient?: IUser | null
}

export interface IIncidentCCRecipient {
  id: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  ccRecipientId: number
  ccRecipient?: IUser | null
}

export interface IIncidentType {
  id: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  name?: string
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  project?: IProject | null
  location?: ILocation | null
  building?: IBuilding | null
  level?: ILevel | null
  area?: IArea | null
  unit?: IUnit | null
  recipients?: IIncidentRecipient[]
  ccRecipients?: IIncidentCCRecipient[]
}

export interface IReqIncidentRecipientCreate {
  recipientId: number
  tatTime: number
  tatUnit: EIncidentTypeTimeUnit
  reminderTime: number
  reminderUnit: EIncidentTypeTimeUnit
}

export interface IReqIncidentCCRecipientCreate {
  ccRecipientId: number
}

export interface IReqIncidentTypeCreate {
  name: string
  projectId: number
  locationId: number
  buildingId?: number | null
  levelId?: number | null
  areaId?: number | null
  unitId?: number | null
  recipients: IReqIncidentRecipientCreate[]
  ccRecipients: IReqIncidentCCRecipientCreate[]
}

export interface IReqIncidentTypeUpdate {
  id: number
  name?: string
  projectId?: number
  locationId?: number
  buildingId?: number | null
  levelId?: number | null
  areaId?: number | null
  unitId?: number | null
  recipients?: IReqIncidentRecipientCreate[]
  ccRecipients?: IReqIncidentCCRecipientCreate[]
}

export interface IReqIncidentTypeList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
}
