import { IReqFilter } from '../../types/common'
import { ETaskType } from '../../types/task'

export enum ETaskTypeForAdhock {
  'Periodic' = 'Periodic',
  'Routine' = 'Routine',
  'Adhock' = 'Adhock',
  'Automation' = 'Automation',
}

export interface IReqTaskActivityList extends IReqFilter {
  text?: string
  projectIds?: number[]
}

export interface IReqTaskActivities extends IReqFilter {
  text?: string
  taskType?: ETaskTypeForAdhock
}

export interface IReqTaskActivitiesByProjectId {
  text?: string
  projectId: number
}

interface ITaskActivityForCreate {
  name: string
  taskType: ETaskType
  slaTime: string
  bufferTime: string
}
export interface IReqTaskActivitiesCreate {
  projectId: number
  taskActivities: ITaskActivityForCreate[]
}
export interface IReqTaskRoutineList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  roleIds?: number[]
  frequency?: string
}
export interface IReqTaskPeriodicList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  month?: number
  year?: number
  premiseCategoryId?: number[]
  taskActivityIds?: number[]
  startDate?: string
  startTime?: string
}

export type TaskCompletionStatus = Record<string, Record<'complete' | 'incomplete', number>>

export interface ITaskCompletionStatus {
  label: string
  total: number
  value: number
}
