import { IBuilding } from '../api/models'
import { IReqFilter } from './common'
import { ILocationCategory } from './locationCategory'

export interface IPremiseCategory {
  id: number
  name: string
  address: string
  mtr: number
  lat: number
  lng: number
  locationCategoryId?: number
  buildings?: IBuilding[]
  locationCategory?: ILocationCategory
  remark?: string
}

export interface ILocationSettingsDetail {
  location: IPremiseCategory
}

export interface IResPremiseCategory {
  id: number
  deletedAt: string
  name: string
}

export interface IReqPremiseCategory extends IReqFilter {
  text?: string
}
