import { Dayjs } from 'dayjs'
import { ISelectItem } from './common'
import { ILocation } from './location'
import { IProject } from './project'
import { ITask } from './task'

export interface ITaskAllocationSLAListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
}

export interface IProjectSLAItem {
  id: number
  projectId: number
  locationId: number
  tasks: ITask[]
  project?: IProject
  location?: ILocation
}
export interface IPredictionDataListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
}

export interface ITaskAllocationRoutineListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  roles: ISelectItem[]
  frequency: string
}
export interface ITaskAllocationPeriodicListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  month: ISelectItem | null
  year: ISelectItem | null
  premises: ISelectItem[]
  activity: ISelectItem[]
  startDate: Dayjs | null
  startTime: Dayjs | null
}