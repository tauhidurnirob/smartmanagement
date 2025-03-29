import { IPagination } from './common'
import { IProject } from './project'

export interface IFormulaGroup {
  id: number
  name: string
  remark: string
  projects?: IProject[]
}

export interface IFormula {
  id: number | null
  name: string
  formula: string
  remark: string
  step: number
  formulaGroupId: number
  formulaGroup?: IFormulaGroup
}

export interface IFormulaList extends IPagination {
  data: IFormula[]
}

export interface IFormulaGroup {
  id: number
  name: string
  remark: string
  formulas: IFormula[]
}
