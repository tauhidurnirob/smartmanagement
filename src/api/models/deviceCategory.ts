import { IReqFilter } from '../../types/common'

export interface IDeviceCategory {
  id: number
  deviceCategory: string
  imgUrl?: string
  updatedAt?: string
  createdAt?: string
}

export interface IReqDeviceCategoryList extends IReqFilter {
  text?: string
}

export interface IReqDeviceCategoryUpdate {
  id: number
  deviceCategory?: string
  imgUrl?: string
}

export interface IReqDeviceCategoryCreate {
  deviceCategory: string
  imgUrl?: string
}
export interface ReqCategoryList {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
}