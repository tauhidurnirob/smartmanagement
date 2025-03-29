import { Dayjs } from 'dayjs'
import { IReqFilter, IReqPagination } from '../../types/common'

export interface ReqStaffList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  roleIds?: number[]
}

export interface IReqStaffAttendances extends IReqFilter {
  text?: string
  startDate?: string
  endDate?: string
  statuses?: number[]
  roleIds?: number[]
  projectIds?: number[]
  locationIds?: number[]
}

export interface IReqLeaveApplications extends IReqFilter {
  text?: string
  startDate?: string
  endDate?: string
  statuses?: number[]
  roleIds?: number[]
  projectIds?: number[]
  locationIds?: number[]
  leaveCategories?: number[]
  leaveTypes?: number[]
  applicationDate?: string
}

export interface IStaff {
  id: number
  fullName: string
  email: string
  phoneNumber?: string
  role: {
    name: string
  }
  locations: {
    name: string
  }[]
  projects: {
    name: string
  }[]
}

export interface IStaffAttendances {
  status: number
  inTime: string
  outTime: string
  createdAt: string
  staff: {
    id: number
    fullName: string
    email: string
    role: {
      name: string
    }
  }
  location: {
    name: string
    locationCategory: {
      name: string
      project: {
        name: string
      }
    }
  }
}

export interface IGetStaffLeaves {
  id: number
  staffId: number
  appliedAt: Date
  leaveCategoryId: number
  leaveType: number
  startDate: Date
  endDate: Date
  status: number
  description: string
  attachment: any
  reason: string
  staff: {
    id: number
    fullName: string
    role: {
      name: string
    }
  }
  leaveCategory: {
    id: number
    name: string
  }
}
export interface IResCleanerLeaveOverview {
  categoryName: string
  count: number
}