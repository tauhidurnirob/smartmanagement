import { IProject } from '../../types/project'
import { ReqLocationUpdate } from './location'
import { ReqLocationCategoryCreate } from './locationCategory'

export interface ReqProjectList {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
  includeRecycleBin?: boolean
}

export interface ResProjectList {
  count: number
  rows: IProject[]
}

export interface ReqProjectUpdate {
  id: number
  name?: string
  remark?: string
  locations?: ReqLocationUpdate[]
}

export interface ReqProjectCreate {
  text?: string
  remark?: string
  formulaGroupId: number
  locationCategories?: ReqLocationCategoryCreate[]
}
