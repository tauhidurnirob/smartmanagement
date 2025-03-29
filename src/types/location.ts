import { IBuilding } from '../api/models'
import { ILocationCategory } from './locationCategory'

export interface ILocation {
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
  locationId?: number
}

export interface ILocationSettingsDetail {
  location: ILocation
}
