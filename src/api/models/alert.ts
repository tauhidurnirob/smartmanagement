import { IReqFilter } from '../../types/common'

export interface IAlertData {
  id: number
  createdAt: string
  title: string
  comments: string
  isRead: boolean
  description: boolean
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
}

export interface IResAlert {
  id: number
  locationName: string
  alerts: IAlertData[]
}
export interface INotificationAlertData {
  id: number
  createdAt: string
  title: string
  comments: string
  isRead: boolean
  description: boolean
  location: {
    id: number
    name: string
  }
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
}

export interface IReqAlertList extends IReqFilter {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  levelIds?: number[]
  areaIds?: number[]
  unitIds?: number[]
  startDate?: string
  endDate?: string
}

export interface IReqRemind {
  alertId: number
  comment?: string
  recipients?: {
    userId: number
    responseTime: string
  }[]
  recipientCCIds?: number[]
}
export interface IReqAlert {
  id?: number,
  title: string;
  description: string;
  comments: string;
  deviceId: number;
  userId: number;
  locationId: number;
  buildingId: number;
  areaId: number;
  levelId: number;
  unitId: number;
  isRead: boolean;
  staffIds?: number[];
}
export interface IResAlertCreate {
  taskStaffAlert: string[];
  alert: string;
}
export interface IReqRemark {
  remarks: string;
}
export interface AlertIdsPayload {
  ids: number[];
}
