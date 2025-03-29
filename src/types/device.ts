import { IDeviceType, IUnit, IDevice, IDeviceCategory } from '../api/models'
import { ISelectItem } from './common'
import { ILocation } from './location'

export interface IDeviceListFilters {
  search: string
  types: ISelectItem[]
  statuses: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

export interface IDeviceControlListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
}

export interface IDeviceLinkageListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

export interface IDeviceLinkageConditionItem {
  devices: IDevice[]
  status: string
}

export interface IDeviceGroupListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
}

interface ILocInfo {
  id: number
  name: string
}
interface IDeviceInfo {
  id: number
  identificationNo: string
}
interface IDeviceTypeInfo extends IDeviceType {
  deviceCategory: IDeviceCategory
}
export interface IDeviceSchedule {
  id: number
  createdAt?: string
  deletedAt?: string
  updatedAt?: string
  scheduleName: string
  frequencyType: string
  repeatOn: string
  timeStart: string
  createdUserId: number
  updatedUserId: number | null
  projectId: number
  locationId: number
  buildingId: number
  levelId: number
  areaId: number
  unitId: number
  deviceTypeId: number
  deviceType: IDeviceTypeInfo
  isOn: boolean
  isAll: boolean
  status: string
  remark: string
  project: ILocInfo
  location: ILocInfo
  building: ILocInfo
  level: ILocInfo
  area: ILocInfo
  unit: ILocInfo
  devices: IDeviceInfo[]
}

export interface IDeviceScheduleListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

export interface IDeviceLocationListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
}
