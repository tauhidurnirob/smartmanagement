import { IUser } from '../api/models'

export interface IActivityLog {
  id: number
  createdAt: string
  action: string
  actorId: number
  actor?: IUser
  recordId: string
  parameters?: string
}

export interface IActivityLogRes {
  action: string;
  createdAt: string;
  deviceId: number;
  id: number;
  user?: {
    fullName: string;
  }
  userId?: number;
}

export interface IUserActivityLog {
  id: number
  createdAt: string
  userId: number
  type: string
  description: string
  title: string
  locationId: number | null
  locationName: string | null
  buildingName: string | null
  levelName: string | null
  areaName: string | null
  unitName: string | null
  userName: string | null
}
