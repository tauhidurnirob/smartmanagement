import { Dayjs } from 'dayjs'
import { IReqFilter, ISelectItem } from './common'
import { ETaskType, ITaskActivity } from './task'

export interface IPerformanceOverviewFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
  startDate: Dayjs | null
  endDate: Dayjs | null
}

export interface IInHouseSopTrainingItem {
  id: number
  name: string
  description: string
  learningDuration: string
}

export interface IImg {
  url: string
  file?: File
}

export interface ISopTrainingList {
  text: string
  images: IImg[]
}

export interface IOjtTrainingCreate {
  name: string
  project: ISelectItem[]
  location: ISelectItem[]
  role: ISelectItem[]
  sopTraining: ISelectItem[]
  frequency: ISelectItem[]
  duration: ISelectItem[]
  reminder: ISelectItem[]
  startDate: Dayjs | null
  startTime: Dayjs | null
  status?: string
}

export interface IInHouseOjtTrainingStatusItem {
  id: number
  ojt: string
  name: string
  role: string
  project: string
  location: string
  completed: number
  inCompleted: number
  status: string
}

export interface IAdhocTask {
  id: number
  // createAt: Date
  // updateAt: Date
  // deletedAt: Date
  activity: string
  category: string
  project: string
  location: string
  user: string
  frequency?: string
  startDate?: string
}

export interface IPredictionDataItem {
  id: number
  project: string
  location: string
  cleaners: number
  robots: number
}

export interface ISlaTime {
  days: number | null
  hours: number | null
  minutes: number | null
}

export interface ITaskRoutine {
  id: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  routineId: number
  routineTaskActivityId: number
  projectId: number
  locationId: number
  areaId: number
  taskActivityId: number
  staffId: number
  startTime: string
  endTime: string
  frequency: string
  remarks: string
  routine: {
    subLocationAssigned: string
  }
  project: {
    name: string
  }
  location: {
    name: string
  }
  staff: {
    fullName: string
    role: {
      id: number
      name: string
    }
  }
  taskActivity: {
    name: string
  }
}

export interface ITaskList {
  id: number
  name: string
  remark: string
  date: string
  uploads: string[]
  assignArea: string
  taskTypes: ETaskType
  taskDays: string
  startDate: string
  status: number
  startTime: string | null
  alertTime: string | null
  responseTime: string | null
  slaRevolveTime: string | null
  actualRevolveTime: string | null
  premiseCategoryId: number
  frequency: string
  activityResponseType: string | null
  automationFlowChart: string | null
  taskActivity: ITaskActivity[]
  location: { id: number; name: string }
  premiseCategory: { id: number; name: string }
  project: { id: number; name: string }
  taskStaffs: {
    id: number
    staff: { id: number; fullName: string }
  }[]
}
export interface IPerformanceSopTrainingCreateEdit {
  sopName: string
  remark: string
  timeTakenSop: ISelectItem | null
  sopTrainingList: ISopTrainingList[]
}

export interface ISopTrainingReqBody {
  sopTrainingPicture: {
    uri: string
  }[]
  listText: string
}

export interface IPerformanceInhouseSopReqBody {
  sopName: string
  remark: string
  timeTakenSop: string
  sopTrainingList: ISopTrainingReqBody[]
}

export interface ISopUpdate {
  id: number
  body: IPerformanceInhouseSopReqBody
}

export interface ISopTrainingPictures {
  id: number
  uri: string
  sopTrainingListId: number
}

export interface ISopTrainingListRes {
  id: number
  sopTrainingId: number
  listText: string
  sopTrainingPicture: ISopTrainingPictures[]
}

export interface ISopTraining {
  id: number
  sopName: string
  remark: string
  timeTakenSop: string
}

export interface ISopTrainingRes extends ISopTraining {
  sopTrainingList: ISopTrainingListRes[]
}

export interface IReqSopOverview extends IReqFilter {
  text: string
}

export interface IOjtTrainingReqBody {
  ojtName: string
  projectId: number
  locationId: number
  roleId: number
  startDate: string
  startTime: string
  sopTrainingId: number
  frequency?: string
  durationOfCompletion?: string
  reminder?: string
  status?: string
}

export interface IOtjTrainingUpdateReq {
  id: number
  body: Partial<IOjtTrainingReqBody>
}

export interface IOjtTrainingRes extends IOjtTrainingReqBody {
  id: number
}

export interface IReqOjtOverview extends IReqFilter {
  text?: string
  status?: string
  projectIds?: number[]
  locationIds?: number[]
}

export interface IOtjOverviewRes {
  id: number
  createdAt: string
  sopTrainingId: number
  projectId: number
  locationId: number
  roleId: number
  ojtName: string
  frequency: string
  durationOfCompletion: string
  reminder: string
  status: string
  startDate: string
  startTime: string
  projectName: string
  locationName: string
  roleName: string
  sopName: string
}

export interface IOjtBySopRes {
  id: number
  sopName: string
  complete: number
  incomplete: number
}

export interface IOjtDetails {
  id: number
  projectId: number
  roleId: number
  locationId: number
  ojtName: string
  frequency: string
  durationOfCompletion: string
  reminder: string
  sopTrainingId: number
  status: string
  startDate: string
  startTime: string
}
