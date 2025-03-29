import { IReqFilter, IUnitPoint } from '../../types/common'
import { IArea } from './area'

export interface IUnit {
  id: number
  name: string
  points?: IUnitPoint[]
  areaId: number
  area?: IArea
}

export interface IReqUnitList extends IReqFilter {
  text?: string
}

export interface IReqUnitWashroomList extends IReqFilter {
  text?: string
}

export interface IReqUnitUpdate {
  id: number
  name?: string
  points?: IUnitPoint[]
  areaId?: number
}

export interface IVOriginalValue {
  amm?: number
  aqi?: number
  rh?: number
  rssi?: string
  temp?: number
}

export interface ISensorPosition {
  x?: number
  y?: number
}

export interface ISensors {
  deviceId: number
  id: number
  sensorValue: number
  status?: string
  value?: string
  label?: string
  name?: string
  vOriginalValue?: IVOriginalValue[]
  position?: ISensorPosition
}

export interface IReqUnitCreate {
  name: string
  points?: IUnitPoint[]
  areaId: number
}

export interface IProjectWashroomList {
  projectName: string;
  locationName: string;
  washroomName: string;
  totalDevice: number;
  onlineDevice: number;
  offlineDevice: number;
  deviceList: [];
}
