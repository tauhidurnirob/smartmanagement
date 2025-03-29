import { ILocation } from '../../types/location'
import { ILocationCategory } from '../../types/locationCategory'
import { ReqLocationCreate } from './location'

// LocationCategory List
export interface ReqLocationCategoryList {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
  includeRecycleBin?: boolean
}

export interface ResLocationCategoryList {
  count: number
  rows: ILocationCategory[]
}

// Update a locationCategory
export interface ReqLocationCategoryUpdate {
  id: number
  name?: string
}

// Create a locationCategory
export interface ReqLocationCategoryCreate {
  name?: string
  locations?: ReqLocationCreate[]
}
