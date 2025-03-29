import { IReqFilter } from '../../types/common'
import { IArea } from './area'
import { IBuilding } from './building'

export interface ILevel {
  id: number
  name: string
  plan?: string
  floorPlanImgUrl?: string
  floorPlanRemarks?: string
  buildingId?: number
  building?: IBuilding
  areas?: IArea[]
  remark?: string
}

export interface IReqLevelList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
}

export interface IReqLevelUpdate {
  id: number
  name?: string
  plan?: string
  floorPlanImgUrl?: string
  floorPlanRemarks?: string
  buildingId?: number
  remark?: string
}

export interface IReqLevelCreate {
  name: string
  plan?: string
  floorPlanImgUrl?: string
  floorPlanRemarks?: string
  buildingId: number
  remark?: string
}
