import { IUser } from './user'
import { EDeviceStatus } from '../../helpers/constants'
import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'
import { IArea } from './area'
import { IBuilding } from './building'
import { ILevel } from './level'
import { IUnit } from './unit'

export interface IDeviceUnit {
  id: number
  updatedAt?: string
  createdAt?: string
  deletedAt?: string

  mapUserId?: number
  swapUserId?: number
  isMap: boolean

  projectId: number
  locationId: number
  buildingId: number
  levelId: number
  areaId: number
  unitId: number

  project?: IProject
  location?: ILocation
  building?: IBuilding
  level?: ILevel
  area?: IArea
  unit?: IUnit
  swapUser?: IUser
}

export interface IReqDeviceUnitCreate {
  projectId: number
  locationId: number
  buildingId: number
  levelId: number
  areaId: number
  unitId: number
}
