import { IArea, IBuilding, IIncidentType, ILevel, IUnit, IUser } from '.'
import { EIncidentMediaType } from '../../helpers/constants'
import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'

export interface IIncidentOverviewItem {
  incidentType: IIncidentType
  incidents: { date: string; count: number }[]
}

export interface IIncidentMedia {
  type: EIncidentMediaType
  url: string
}

export interface IIncidentPosition {
  x: number
  y: number
}

export interface IIncident {
  id: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  triggeredAt?: string | null
  endedAt?: string | null
  incidentTypeId?: number
  status?: string
  remarks?: string
  recipients: IUser[]
  medias?: IIncidentMedia[]
  position: IIncidentPosition
  projectId?: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  closedBy?: number
  acknowledgedBy?: number
  incidentType?: IIncidentType
  project?: IProject
  location?: ILocation
  building?: IBuilding | null
  level?: ILevel | null
  area?: IArea | null
  unit?: IUnit | null
  closer?: IUser | null
  acknowledger?: IUser | null
}

export interface IReqIncidentList extends IReqFilter {
  text?: string
  incidentTypeIds?: number[]
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  levelIds?: number[]
  areaIds?: number[]
  unitIds?: number[]
  startDate?: string
  endDate?: string
  statuses?: string[]
}

export interface IReqIncidentCreate {
  triggeredAt?: string | null
  endAt?: string | null
  incidentTypeId?: number
  status?: string
  remarks?: string
  recipientIds?: number[]
  projectId?: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  medias: IIncidentMedia[]
  position: IIncidentPosition
}

export interface IReqIncidentUpdate {
  id: number
  triggeredAt?: string | null
  endAt?: string | null
  incidentTypeId?: number
  status?: string
  remarks?: string
  recipients?: IUser[]
  medias?: IIncidentMedia[]
  position?: IIncidentPosition
  projectId?: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  recipientIds?: number[]
}

export interface IReqIncidentEventList extends IReqFilter {
  incidentId: number
}

export interface IReqIncidentComment {
  incidentId: number
  comment: string
}

export interface IReqIncidentComplete {
  incidentId: number
  file: File
  comment: string
}

export interface IReqIncidentReport {
  types?: string[]
  projectIds?: number[]
  locationIds?: number[]
  startDate?: string
  endDate?: string
}

export interface IResIncidentReportsItem {
  date: string
  count: {
    overdue: number
    closed: number
  }
}
