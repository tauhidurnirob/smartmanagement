import { IReqFilter } from '../../types/common'

export interface IReqDeviceActivityList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  deviceTypeIds?: number[]
  levelIds?: number[]
  areaIds?: number[]
  unitIds?: number[]
  deviceIds?: number[]
}
