import { EDeviceControlAction, EDeviceStatus } from '../../helpers/constants'
import { IReqFilter } from '../../types/common'
import { IDeviceCategory } from './deviceCategory'
import { IDeviceType } from './deviceType'
import { IDeviceUnit, IReqDeviceUnitCreate } from './deviceUnit'

export interface IDevice {
  id: number
  updatedAt?: string
  createdAt?: string
  deletedAt?: string
  deviceCategoryId: number
  deviceTypeId: number
  lastActionUserId?: number
  identificationNo: string
  imgUrl?: string
  sensorValue?: number
  status?: EDeviceStatus
  action?: string
  positionX?: number
  positionY?: number
  isOn?: boolean
  isOffline?: boolean
  lastPingAt?: string
  lastOnAt?: string
  lastOffAt?: string
  lastSignInIp?: string
  batteryPercent?: number

  deviceCategory?: IDeviceCategory
  deviceType?: IDeviceType
  deviceUnit?: IDeviceUnit
  vOriginalValue?: JSON
}

export interface IReqDeviceList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  deviceTypeIds?: number[]
  levelIds?: number[]
  areaIds?: number[]
  unitIds?: number[]
  statuses?: string[]
  action?: string
  turnTypes?: string[]
}

export interface IReqDeviceCreate {
  deviceCategoryId: number
  deviceTypeId: number
  lastActionUserId?: number
  identificationNo: string
  imgUrl?: string
  positionX: number
  positionY: number
  deviceUnit: IReqDeviceUnitCreate
  status?: EDeviceStatus
}

export interface IReqDeviceUpdate {
  id: number
  deviceCategoryId?: number
  deviceTypeId?: number
  lastActionUserId?: number
  identificationNo?: string
  imgUrl?: string
  positionX?: number
  positionY?: number
  deviceUnit?: IReqDeviceUnitCreate
  status?: EDeviceStatus
}

export interface IResDeviceOverview {
  online: number
  offline: number
  batteryLow: number
  error: number
}

export interface IReqDeviceControlAction {
  deviceId: number
  action: EDeviceControlAction
}

export interface IReqDeviceSwap {
  currentIdentityNo: string
  newIdentityNo?: string
  swapUserId?: number
}

export interface IReqDeviceScheduleCreate {
  scheduleName: string
  frequencyType: string
  createdUserId: number
  repeatOn: string
  timeStart: string
  projectId: number
  locationId: number
  buildingId: number
  levelId: number
  areaId: number
  unitId: number
  deviceTypeId: number
  deviceIds: number[]
  isOn: boolean
  isAll: boolean
}

export interface IReqDeviceScheduleList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  levelIds?: number[]
  areaIds?: number[]
  unitIds?: number[]
}
export interface IReqDeviceScheduleUpdate {
  id: number
  scheduleName: string
  frequencyType: string
  updatedUserId: number
  repeatOn: string
  timeStart: string
  projectId: number
  locationId: number
  buildingId: number
  levelId: number
  areaId: number
  unitId: number
  deviceTypeId: number
  deviceIds: number[]
  isOn: boolean
  isAll: boolean
}
export interface IReqDeviceSettingUpdate {
  intervalTime: number
}
export interface IReqDeviceRobotCallService {
  args: {
    task_name: string
  }
  command: string
  id?: string
}
export interface IReqDeviceAirRefresherCallService {
  args: {
    DEVICE: string
  }
  command: string
  id?: string
}