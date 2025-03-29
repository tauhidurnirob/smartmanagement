import { Dayjs } from 'dayjs'
import { IAuditSchedule } from '../../types/audit'

export interface IAuditScheduleCreate extends IAuditSchedule {
  userIds: number[]
  projectId: number
  locationId: number
}
export interface ReqAuditScheduleList {
  page: number
  limit: number
  orderBy: string
  orderDir: string
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  frequencyType?: string
  startDate?: string | null
  endDate?: string | null
}

export interface ResAuditScheduleList {
  count: number
  rows: IAuditSchedule[]
}
