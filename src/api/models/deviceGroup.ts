import { IBuilding, IUser } from '.'
import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'
import { IArea } from './area'
import { IDevice } from './device'
import { IDeviceType } from './deviceType'
import { ILevel } from './level'
import { IUnit } from './unit'

export interface IDeviceGroupDetail {
  id: number
  deviceId: number
  device?: IDevice
}

export interface IDeviceMap {
  deviceTypeId: number
  deviceIds?: number[]
  isAll: boolean
  deviceType?: IDeviceType
  deviceGroupDetails?: IDeviceGroupDetail[]
}

export interface IReqDeviceMapCreate {
  deviceTypeId: number
  deviceIds?: number[]
  isAll: boolean
}

export interface IReqDeviceMapUpdate {
  deviceTypeId: number
  deviceIds?: number[]
  isAll: boolean
}

export interface IDeviceGroup {
  id: number
  updatedAt?: string
  createdAt?: string
  groupName: string
  projectId: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  createdUserId?: number
  remark: string
  deviceGroupMaps: IDeviceMap[]
  project?: IProject
  location?: ILocation
  building?: IBuilding
  level?: ILevel
  area?: IArea
  unit?: IUnit
  createdUser?: IUser
}

export interface IReqDeviceGroupList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
}

export interface IReqDeviceGroupUpdate {
  id: number
  groupName?: string
  projectId?: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  createdUserId?: number
  remark?: string
  deviceGroupMaps?: IReqDeviceMapCreate[]
}

export interface IReqDeviceGroupCreate {
  groupName: string
  projectId: number
  locationId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  remark: string
  deviceGroupMaps: IReqDeviceMapCreate[]
}
