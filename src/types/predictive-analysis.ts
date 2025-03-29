import { Dayjs } from 'dayjs'
import { ISelectItem } from './common'
import { IRole } from './role'
import { IArea, IBuilding, IUnit } from '../api/models'

export interface IPredictiveAnalysisFilters {
  date: Dayjs | null
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
}

export const IPredictiveStatisticItemDetailTimeFormat = 'HH:mm'

// Washroom
export interface IWashroomStatisticItemUnitDetail {
  date: string // HH:mm
  value: number
}

export interface IWashroomStatisticItemUnit {
  unit: IUnit
  items: IWashroomStatisticItemUnitDetail[]
}

export interface IWashroomStatisticItem {
  building: IBuilding
  items: IWashroomStatisticItemUnit[]
}

// Resource Allocation
export interface IResourceAllocationItemAreaDetail {
  date: string // HH:mm
  value: number | null
}

export interface IResourceAllocationItemArea {
  area: IArea
  items: IResourceAllocationItemAreaDetail[]
}

export interface IResourceAllocationItem {
  role: IRole
  items: IResourceAllocationItemArea[]
}
