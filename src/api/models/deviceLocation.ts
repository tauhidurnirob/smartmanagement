import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'

export interface IDeviceLocation {
  location: ILocation
  deviceCounts: number
}

export interface IReqDeviceLocationList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
}

export interface IDeviceLocationOverview {
  location: ILocation
  count: {
    total: number
    offline: number
    online: number
    alert: number
  }
}
