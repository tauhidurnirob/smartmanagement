import { Dayjs } from 'dayjs'

import { IArea, IBuilding, ILevel, IUnit, IUser } from '../api/models'
import { IMedia, IReqFilter, ISelectItem } from './common'
import { ILocation } from './location'
import { IProject } from './project'

export interface ITaskActivity {
  id: number
  bufferTime: string
  name: string
  remark?: string
  slaTime: string
  staffId?: number
  taskType: ETaskType
}
export interface ITaskActivitiesInfoByProject {
  adHocNonUrgent: number
  adHocUrgent: number
  automation: number
  periodic: number
  routine: number
  activities: ITaskActivity[]
  projectId: number
  projectName: string
  totalTaskActivities: number
}

export interface ITaskActivityRes {
  id: number
  projectId: number
  deletedAt: string
  name: string
  remark: string
  staffId: string
  taskType: string
  slaTime: string
  bufferTime: string
}

export enum ETaskType {
  routine = 'Routine',
  periodic = 'Periodic',
  automation = 'Automation',
  adHocUrgent = 'Ad-Hoc - Urgent',
  adHocNonUrgent = 'Ad-Hoc - Non Urgent',
}

// export interface ITask {
//   id: number
//   status: string
//   remark?: string
//   taskActivity?: ITaskActivity
//   createdAt?: string
//   updatedAt?: string
//   deletedAt?: string
//   type?: ETaskType
//   closedAt?: string
//   triggeredAt?: string | null
//   startAt?: string
//   endAt?: string
//   staffs?: IUser[]
//   project: IProject | null
//   location: ILocation | null
//   building?: IBuilding | null
//   level?: ILevel | null
//   area?: IArea | null
//   unit?: IUnit | null
//   medias?: IMedia[]
// }
export interface ITask{
  id: number
  createdAt: string
  name: string
  remark?: string
  date?: string
  uploads: string[]
  assignArea?: string
  taskTypes: string
  taskDays?: string
  startDate?: string
  status: number
  startTime?: string
  alertTime?: string
  responseTime?: string
  slaRevolveTime?: string
  actualRevolveTime?: string
  premiseCategoryId: number
  frequency?: string
  activityResponseType?: string
  automationFlowChart?: object
  locationName: string
  buildingName?: string
  levelName?: string
  areaName?: string
  unitName?: string
  taskStaffs: {
    id: number
    alertId: number
    validity: string
    staffName: string
    taskName: string
  }[]

  location: {
    id: number
    name: string
  }
  building?: {
    id: number
    name: string
  }
  level?: {
    id: number
    name: string
  }
  area?: {
    id: number
    name: string
  }
  unit?: {
    id: number
    name: string
  }
  taskActivity: {
    id: number
    name: string
  }[]
  project?: {
    id: number
    name: string
  }
  premiseCategory?: {
    id: number
    name: string
  }
}
export interface ITaskListFilters {
  search: string
  statuses: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
  startDate: Dayjs
  endDate: Dayjs
  startTime: Dayjs
  endTime: Dayjs
}
export interface IReqTaskListFilters extends IReqFilter{
  text: string
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  levelIds?: number[]
  areaIds?: number[]
  unitIds?: number[]
  taskTypes?: ETaskType
  taskStatus?: number[]
  // startDate: Dayjs
  // endDate: Dayjs
  // startTime: Dayjs
  // endTime: Dayjs
}
export interface IReqAutomationTaskLogListFilters extends IReqFilter{
  taskId: number
}
export interface ITaskCompletionListItem {
  date: string
  scheduled: number
  completed: number
}

export interface ITaskOnDutyCleanderListFilters {
  search: string
  statuses: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
  startDate: Dayjs
  endDate: Dayjs
  startTime: Dayjs
  endTime: Dayjs
}

export interface ITaskOnDutyCleanderListItem {
  staff: IUser
  task: ITask
}

export interface ITaskStaffAttendanceListFilters {
  search: string
  statuses: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  roles: ISelectItem[]
  startDate?: Dayjs
  endDate?: Dayjs
}

export interface IStaffAttendanceMoreFilter {
  roles: ISelectItem[]
  startDate?: Dayjs
  endDate?: Dayjs
}

export enum IAttendanceMoreFilterKeys {
  roles = 'roles',
  startDate = 'startDate',
  endDate = 'endDate',
}

export enum ILeaveListMoreFilterKeys {
  startDate = 'startDate',
  endDate = 'endDate',
  applicationDate = 'applicationDate',
  roles = 'roles',
  leaveCategories = 'leaveCategories',
  leaveTypes = 'leaveTypes',
}

export interface ITaskStaffAttendanceListItem {
  id: number
  staff: IUser
  date: string
  clockedInTime: string | null
  clockedOutTime: string | null
  location?: ILocation
  status: string
}

export interface ITaskStaffLeaveListFilters {
  search: string
  statuses: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  roles: ISelectItem[]
  leaveCategories: ISelectItem[]
  leaveTypes: ISelectItem[]
  startDate?: Dayjs
  endDate?: Dayjs
  applicationDate?: Dayjs
}

export interface IStaffLeaveApplicationMoreFilter {
  startDate?: Dayjs
  endDate?: Dayjs
  applicationDate?: Dayjs
  roles: ISelectItem[]
  leaveCategories: ISelectItem[]
  leaveTypes: ISelectItem[]
}

export interface ITaskStaffLeaveListItem {
  id: number
  staff: IUser
  applicationDate: string
  category: string
  type: string
  startDate: string
  endDate: string
  status: string
  subject?: string
  description?: string
  attachment?: string[]
}

export interface PostCreateTask {
  name?: string
  remark?: string
  locationId?: number
  activityIds?: number
  projectId?: number
  buildingId?: number
  levelId?: number
  areaId?: number
  unitId?: number
  date?: string
  uploads?: string[]
  staffIds?: number[]
  frequency?: string
  assignArea?: string
  premiseCategoryId?: number
  taskTypes?: string
  startDate?: string
  startTime?: string
  endTime?: string
  taskDays?: string
  taskId?: string | number
}
export interface PostCreateTaskRoutine {
  projectId: number
  locationId: number
  subLocationAssigned: string
  remark: string
  staffIds: number[]
  taskActivities: {
    taskActivityId: number
    areaId: number
    startTime?: string
    endTime?: string
    frequency: string[]
    remarks: string
  }[]
}
interface Select {
  label: string
  value: string
}

interface TaskActivity {
  id: number
  name: string
  TaskAndActivity: {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: null | string
    taskId: number
    activityId: number
  }
}

export interface IReqTaskList {
  activityResponseType: any
  actualRevolveTime: any
  alertTime: any
  area: any
  assignArea: string
  automationFlowChart: any
  building: any
  createdAt: string
  date: string
  frequency: string
  id: number
  level: any
  location: {
    id: number
    name: string
  }
  name: string
  premiseCategory: {
    id: number
    name: string
  }
  project: {
    id: number
    name: string
  }
  remark: string
  responseTime: any
  slaRevolveTime: any
  startDate: any
  startTime: any
  status: number
  taskActivity: TaskActivity[]
  taskDays: string
  taskStaffs: TaskStaff[]
  taskTypes: string
  unit: any
  uploads: IMedia[] | []
  premiseCategoryId?: any
}

export interface TaskStaff {
  id: number
  alertId: any
  validity: any
  staffName: string
  taskName: string
  phoneNumber: string
  email: string
  fullName: string
  dob: string
  avatarUri: string
  isActive: boolean
  isAdmin: boolean
  postalCode: string
  lat: number
  lng: number
  gender: number
  userType: string
  nricFin: string
  icUris: any[]
  passportNumber: string
  passportUris: any[]
  nationality: string
  registrationToken: string
  loginType: string
  boothId: string
}

// export interface IReqTaskDetail {
//   taskId?: string
//   name: string
//   remark: string
//   locationId: Select
//   buildingId: Select
//   levelId: Select
//   areaId: Select
//   unitId: Select
//   date: string
//   uploads: string
//   staffIds: Select
//   assignArea: string
//   taskType: Select
//   premiseCategoryId: Select
// }
interface Task {
  id: number
  name: string
  remark: string
  date: string
  uploads: string[]
  assignArea: string
  taskType: string
  status: number
  alertTime: null | string
  responseTime: null | string
  slaRevolveTime: null | string
  actualRevolveTime: null | string
  activityResponseType: null | string
  automationFlowChart: null | string
  taskStaffs: TaskStaff[]
  location: Select
  building: Select
  level: Select
  area: Select
  unit: Select
  taskActivity: TaskActivity[]
  project: Select
  premiseCategory: Select
}

export interface TaskStaff {
  id: number
  alertId: any | number
  validity: any | string
  staffName: string
  taskName: string
}

export interface IReqTaskDetail {
  count: number
  rows: Task[]
}

export interface IReqAutomationFlow {
  data: any
  count: string
  rows: IReqAutomationFlowItem[]
  frequency: string
  taskId: string
}

export interface IReqAutomationFlowItem {
  frequency: string
  id?: string
  type: string
  key: string
  title: Select
  list: string[]
  canAdd: string
  date: string
  deviceList: string
  deviceType: string
  status: string
}

export interface IPremiseList {
  id: number
  name: string
}

export interface PostUploadTasks {
  file: File
}
interface IActivity {
  endTime: string
  id: number
  name: string
  remark: string
  staffId: number
  startTime: string
}
export interface IActivityList {
  count: number
  rows: IActivity[]
}

export interface IGetOneTask {
  id: number
  createdAt: string
  name: string
  remark?: string
  date?: string
  uploads: string[]
  assignArea?: string
  taskTypes: string
  taskDays?: string
  startDate?: string
  status: number
  startTime?: string
  alertTime?: string
  responseTime?: string
  slaRevolveTime?: string
  actualRevolveTime?: string
  premiseCategoryId: number
  frequency?: string
  activityResponseType?: string
  automationFlowChart?: object
  locationName: string
  buildingName?: string
  levelName?: string
  areaName?: string
  unitName?: string
  taskStaffs: {
    id: number
    alertId: number
    validity: string
    staffName: string
    taskName: string
  }[]

  location: {
    id: number
    name: string
  }
  building?: {
    id: number
    name: string
  }
  level?: {
    id: number
    name: string
  }
  area?: {
    id: number
    name: string
  }
  unit?: {
    id: number
    name: string
  }
  taskActivity: {
    id: number
    name: string
  }[]
  project?: {
    id: number
    name: string
  }
  premiseCategory?: {
    id: number
    name: string
  }
}
export interface ITaskCount {
  done: number
  remaining: number
}
export interface IReqCleanerUpdateStatus {
  id: number
  status: number
}
export interface IReqCleanerComment {
  id: number
  comment: string
}

export enum TaskStatus {
  pending = 0,
  progress = 1,
  closed = 2,
  overdue = 3,
  completed = 4
}

export interface AutomationTaskLog {
  id: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  taskId: number
  action: string
}