import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'

// Location List
export interface ReqLocationList {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
  includeRecycleBin?: boolean
  projectIds?: number[]
  locationIds?: number[]
}

export interface ResLocationList {
  count: number
  rows: ILocation[]
}

// Update a location
export interface ReqLocationUpdate {
  id: number
  mtr?: number
  address?: string
  name?: string
  deviceTypeId?: number
  high?: number
  medium?: number
  normal?: number
  isAllLocation?: boolean
}

// Create a location
export interface ReqLocationCreate {
  name?: string
  address?: string
  mtr?: number
}

export interface IReqLocationUserActivityList extends IReqFilter {
  locationId: number
}
