import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'

export interface IBuilding {
  id: number
  name: string
  levelCount: number
  locationId: number
  location?: ILocation
}

export interface IReqBuildingList extends IReqFilter {
  text?: string
}

export interface IReqBuildingUpdate {
  id: number
  name?: string
  levelCount?: number
}

export interface IReqBuildingCreate {
  name: string
  levelCount?: number
  locationId: number
}
