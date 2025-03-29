import React from 'react'
import { SxProps, Theme } from '@mui/material'

import { IFormula } from './formula'
import {
  IAuditFormTemplate,
  IAuditList,
  IAudit,
  IAuditSchedule,
  IResAuditOverviewFormTemplateItem,
  IRatingTemplate,
} from './audit'
import { ILocation } from './location'
import { IDeviceSchedule } from './device'
import { IMaintenance, IMaintenanceProcedure } from './maintenance'
import { IFeedback } from './feedback'
import { CHIP_TYPES } from '../helpers/constants'
import { IActivityLog } from './activity'
import {
  ITask,
  ITaskActivitiesInfoByProject,
  ITaskOnDutyCleanderListItem,
  ITaskStaffAttendanceListItem,
} from './task'
import {
  IDevice,
  IDeviceType,
  IUser,
  IDeviceGroup,
  IDeviceLinkage,
  IIncidentType,
  IDeviceLocation,
  IIncident,
} from '../api/models'
import { IProjectSLAItem } from './performance'
import {
  IInHouseOjtTrainingStatusItem,
  IAdhocTask,
  IPredictionDataItem,
  ITaskList,
  ISopTraining,
} from './performance-management'
import { IGetStaffLeaves, IStaffAttendances } from '../api/models/staff'
import { IWashroomTableData } from './washroom'

export type TDownloadFileFormat = 'pdf' | 'excel'

export interface ITypeItemWithColor {
  label: string
  value: string | number
  chipType: CHIP_TYPES
}

export interface ISelectItem {
  label: string
  value: string | number | null
  item?: any
  categoryItem?: any
  isCategory?: boolean
  id?: number
  name?: string
}

export interface ISelectItemWithCategory {
  label: string
  value: string | number | null
  category: string
  categoryItem?: ISelectItem
}

export interface ISelectItemWithColor extends ISelectItem {
  color: string
  chipType?: CHIP_TYPES
}

export interface ISelectList {
  count: number
  data: ISelectItem[]
}

export interface ISelectListWithCategory {
  count: number
  data: ISelectItemWithCategory[]
}

export interface IPagination {
  page: number
  itemsPerPage: number
  totalCount: number
}

export interface ICommonList<T> extends IPagination {
  data: (T | any)[]
}

export type OrderDirection = 'asc' | 'desc'

export interface IReqPagination {
  page: number
  limit: number
  sortBy?: string
  sortDir?: string
}

export interface IReqFilter {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
}

export interface IResList<T> {
  rows: T[]
  count: number
}

// Table
export type TableData =
  | IFormula
  | IAuditList
  | IAudit
  | IAuditSchedule
  | IAuditFormTemplate
  | IResAuditOverviewFormTemplateItem
  | IRatingTemplate
  | IIncident
  | IIncidentType
  | ILocation
  | IDevice
  | IMaintenance
  | IMaintenanceProcedure
  | IFeedback
  | IDeviceLinkage
  | IDeviceGroup
  | IDeviceSchedule
  | IDeviceLocation
  | IActivityLog
  | ITask
  | IUser
  | ITaskOnDutyCleanderListItem
  | ITaskStaffAttendanceListItem
  | IProjectSLAItem
  | IInHouseOjtTrainingStatusItem
  | IAdhocTask
  | IPredictionDataItem
  | ITaskActivitiesInfoByProject
  | IStaffAttendances
  | IGetStaffLeaves
  | ITaskList
  | ISopTraining
  | IWashroomTableData

export type TableDataFieldName =
  | keyof IFormula
  | keyof IAuditList
  | keyof IAudit
  | keyof IAuditSchedule
  | keyof IAuditFormTemplate
  | keyof IResAuditOverviewFormTemplateItem
  | keyof IIncident
  | keyof IIncidentType
  | keyof ILocation
  | keyof IDevice
  | keyof IMaintenance
  | keyof IMaintenanceProcedure
  | keyof IFeedback
  | keyof IDeviceLinkage
  | keyof IDeviceGroup
  | keyof IDeviceSchedule
  | keyof IDeviceLocation
  | keyof IActivityLog
  | keyof ITask
  | keyof IUser
  | keyof ITaskOnDutyCleanderListItem
  | keyof ITaskStaffAttendanceListItem
  | keyof IProjectSLAItem
  | keyof IInHouseOjtTrainingStatusItem
  | keyof IAdhocTask
  | keyof IPredictionDataItem
  | keyof ITaskActivitiesInfoByProject
  | keyof IGetStaffLeaves
  | keyof ITaskList
  | keyof ISopTraining

export interface ITableHeadCell {
  id: string | TableDataFieldName
  name: string | React.ReactNode
  disablePadding?: boolean
  tableCellSx?: SxProps<Theme>
  tableHeaderCellSx?: SxProps<Theme>
  render?: (item: TableData) => React.ReactNode
}

export interface ITableActionCell {
  render: (item: TableData) => React.ReactNode
}

export type IDirection = 'asc' | 'desc'

export interface ITab {
  label: string
  value: string
}

export interface IHotspot {
  x: number
  y: number
  content: React.ReactNode
  sx?: SxProps
}

export interface IDeviceHotspot {
  x: number
  y: number
  type?: IDeviceType
  isOn?: boolean
  status?: string
  deviceId?: number
  isSelected?: boolean
}

export interface IUnitPoint {
  x: number
  y: number
}

export interface IMedia {
  type: 'image' | 'video' | string
  url: string
  file?: File
}
