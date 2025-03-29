import { IReqFilter } from '../../types/common'
import { IDeviceCategory } from './deviceCategory'

export interface IDeviceType {
  id: number
  deviceType: string
  deviceCategoryId: number
  imgUrl?: string
  updatedAt?: string
  createdAt?: string
  deviceCategory?: IDeviceCategory
  locationThresholds?: []
  rows?: [any]
}

export interface IReqDeviceTypeList extends IReqFilter {
  text?: string
}

export interface IReqDeviceTypeUpdate {
  id: number
  deviceType?: string
  deviceCategoryId?: number
  imgUrl?: string
}

export interface IReqDeviceTypeCreate {
  deviceType: string
  deviceCategoryId: number
  imgUrl?: string
}
