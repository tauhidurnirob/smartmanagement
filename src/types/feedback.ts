import { Dayjs } from 'dayjs'
import { ISelectItem } from './common'
import { ILocation } from './location'
import { IProject } from './project'
import { IArea, IBuilding, ILevel, IUnit, IUser } from '../api/models'

export interface IFeedback {
  id: number
  createAt?: string
  updateAt?: string
  deletedAt?: string
  typeId?: number
  sourceId?: number
  submittedAt?: string
  closedAt?: string
  salutation?: string
  firstName?: string
  lastName?: string
  contactNumber?: string
  email?: string
  locationId?: string
  remark?: string
  status?: string
  project?: IProject
  location?: ILocation
  feedbackType?: string
  tat?: string
  source?: string
  images?: string[]
  building?: IBuilding
  level?: ILevel
  area?: IArea
  unit?: IUnit
}

export interface IFeedbackListFilters {
  search: string
  statuses: ISelectItem[]
  projects: ISelectItem[]
  feedbackTypes: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
  startDate: Dayjs
  endDate: Dayjs
}
export interface IFeedbackFormTemplateListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  types: ISelectItem[]
}

export interface IFeedbackFormTemplate {
  id: number
  name: string
  type: string
  project: IProject
  location: ILocation
  updatedAt: string
  responseRate: string
}

export interface IFeedbackInboxTab {
  label: string
  value: string
  icon: any
}

export interface IEmail {
  id: number
  sender: string
  subject: string
  content: string
  receivedAt: string
  label?: string
  sendTo?: Partial<IUser>[]
}

export interface IInboxFilter {
  selectedIds: number[]
  status: ISelectItem[]
  labels: ISelectItem[]
  search: string
  startDate: Dayjs | null
  endDate: Dayjs | null
  page: number
}

export interface IFeedbackeportFilters {
  reportTypes: ISelectItem[]
  projects: ISelectItem[]
  locations: ISelectItem[]
  startDate: Dayjs
  endDate: Dayjs
}

export interface IFeedbackLocation {
  id: number
  project: IProject
  location: ILocation
  feedbackReceived: number
  formId: number
}
