import { IArea, IUnit } from '../api/models'
import { ISelectItem } from './common'

export interface IWashroomOverviewFilters {
  search: string
  statuses: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

export interface IWashroomDeviceSensor {
  value?: number
  position?: { x: number; y: number }
  label?: string
  status?: string
}

export interface IWashroomDevice {
  deviceId?: number
  name: string
  status: string
  value?: number
  sensors?: IWashroomDeviceSensor[]
  isPercent?: boolean
}

export interface IWashroomOverviewListItem {
  unit: IUnit
  devices: IWashroomDevice[]
}

export interface IWashroomLocationListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
}

export interface IWashroomThresholdValuesEdit {
  high: string
  medium: string
  normal: string
}

export interface IWashroomAmmoniaSensorThresholdListFilters {
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

export interface IWashroomPeopleCounterThresholdListFilters {
  frequency: ISelectItem | null
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

export interface IWashroomThresholdValues {
  high: number
  medium: number
  normal: number
}

export interface IWashroomAreaThreshold {
  areaId: number
  area: IArea
  thresholds: IWashroomThresholdValues
}

export interface IWashroomTableData {
  projectName: string;
  locationName: string;
  washroomName: string;
}
