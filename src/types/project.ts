import { ISelectItem } from './common'
import { IFormulaGroup } from './formula'

export interface IProject {
  id: number
  name: string
  remark: string
  formulaGroupId: number
  formulaGroup?: IFormulaGroup
  locationCount?: number
}

export interface IProjectListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
}
