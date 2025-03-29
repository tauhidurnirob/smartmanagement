import { IReqFilter } from '../../types/common'
import { ILevel } from './level'

export interface IArea {
  id: number
  name: string
  levelId: number
  level?: ILevel
}

export interface IReqAreaList extends IReqFilter {
  text?: string
}

export interface IReqAreaUpdate {
  id: number
  name?: string
  levelId?: number
}

export interface IReqAreaCreate {
  name: string
  levelId: number
}
