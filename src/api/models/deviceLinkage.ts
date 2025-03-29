import { IBuilding, IDevice, IDeviceType, IUser } from '.'
import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'
import { IArea } from './area'
import { ILevel } from './level'
import { IUnit } from './unit'

export interface IDeviceLinkageDetail {
  id: number
  deviceLinkageMapId: number
  deviceId: number
  device?: IDevice
}

export interface IDeviceLinkageMap {
  id: number
  type: string
  isOn: boolean
  isAll: boolean
  deviceLinkageId: number
  deviceTypeId: number
  deviceType?: IDeviceType
  deviceLinkage?: IDeviceLinkage
  deviceLinkageDetails?: IDeviceLinkageDetail[]
}

export interface IDeviceLinkage {
  id: number
  updatedAt?: string
  createdAt?: string
  linkageName: string
  projectId: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  createdUserId?: number
  updatedUserId?: number
  remark: string
  project?: IProject
  location?: ILocation
  building?: IBuilding
  level?: ILevel
  area?: IArea
  unit?: IUnit
  updatedUser?: IUser
  createdUser?: IUser
  deviceLinkageMaps?: IDeviceLinkageMap[]
}

export interface IReqDeviceLinkageList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  levelIds?: number[]
  areaIds?: number[]
  unitIds?: number[]
}

export interface IReqDeviceLinkageMapCreate {
  type: string
  isOn: boolean
  isAll: boolean
  deviceTypeId: number
  deviceIds?: number[]
}

export interface IReqDeviceLinkageCreate {
  linkageName: string
  projectId: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  remark: string
  deviceLinkageMaps: IReqDeviceLinkageMapCreate[]
}

export interface IReqDeviceLinkageMapUpdate {
  type: string
  isOn: boolean
  isAll: boolean
  deviceTypeId: number
  deviceIds?: number[]
}

export interface IReqDeviceLinkageUpdate {
  id: number
  linkageName?: string
  projectId?: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  remark?: string
  deviceLinkageMaps?: IReqDeviceLinkageMapUpdate[]
}
