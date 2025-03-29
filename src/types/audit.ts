import { IUser } from '../api/models'
import { TDownloadFileFormat, IReqFilter, IReqPagination } from './common'
import { ILocation } from './location'
import { ILocationCategory } from './locationCategory'
import { IProject } from './project'

export enum AUDIT_FORM_CREATE_STEP {
  assignInfo = 1,
  buidForm,
}
export enum FEEDBACK_FORM_CREATE_STEP {
  assignInfo = 1,
  assignRecipient,
  buidForm,
}

export interface IAuditList {
  auditId: number
  name: string
  formType: string
  project: string[]
  updatedAt: string
}

export interface IResAuditOverviewFormTemplateItem {
  id: number
  name: string
  totalDone: number
  lastSubmittedAt: Date | null
}

export interface IAuditOverview {
  count: {
    passed: number
    overallFailure: number
    iuFailure: number
  }
  formTemplates: IResAuditOverviewFormTemplateItem[]
}

export interface IAuditReportItem {
  count: {
    passed: number
    overallFailure: number
    iuFailure: number
  }
  date: string
}

export interface IAuditFormType {
  id: number
  createdAt?: string
  name: string
  isActive: boolean
}

export interface IReqAuditFormTypeUpdate {
  id: number
  name?: string
  isActive?: boolean
}

export interface IReqAuditFormTypeMultipleUpdate {
  id: number
  name: string
  isActive: boolean
}

export interface IReqAuditFormTypeCreate {
  name: string
  isActive: boolean
}

export interface IAudit {
  id: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  submittedAt?: string | null
  userId?: number | null
  locationId: number
  formTemplateId: number
  mtr: number
  performance: number
  penalty: number
  status: number
  audtiElement: string
  location?: ILocation | null
  formTemplate?: IAuditFormTemplate | null
  remarks: string
  user?: IUser | null
  auditNumber?: number | null
  formula?: string
  pdfUrl?: string | null
}

export interface IAuditFormTemplate {
  id: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  name: string
  content: JSON
  remarks: string
  formTypeId: number
  projects: IProject[]
  formType: IAuditFormType | null
  title: string
  subTitle: string
  logoUrl: string
  ratingTemplates: IRatingTemplate[]
}

export interface IAuditSchedule {
  id: number
  createAt: Date
  updateAt: Date
  deletedAt: Date
  name: string
  notificationDescription: string
  frequencyType: string
  repeatOn: string
  timeStart: Date
  projectId: number
  locationId: number
  users: IUser[]
  project?: IProject | null
  location?: ILocation | null
}

// Audit Project Site
export interface IReqAuditProjectSiteList extends IReqPagination {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
  projectIds?: number[]
  locationIds?: number[]
}

export interface IReqAuditProjectSiteMTR {
  mtr: number
  text: string
  projectIds?: number[]
  locationIds?: number[]
}

// Audit Recycle Bin
export interface IAuditRecycleBinSettings {
  deleteAfter: string
}

// Audit Logs
export interface IReqAuditLogList extends Partial<IReqFilter> {
  projectIds?: number[]
  locationIds?: number[]
  text?: string
  startDate?: string
  endDate?: string
  performance?: number[]
  auditNumber?: string[]
  formTypeId?: number
}

export interface IReqAuditLogListDownload extends IReqAuditLogList {
  fileFormat: TDownloadFileFormat
}

export interface IAuditLogMoreFilters {
  performances: number[]
  audits: number[]
}

// Audit Location
export interface IAuditLocationListItem {
  id: number
  updateAt: string
  lat: number
  lng: number
  img: string
  name: string
  address: string
  avgPerformance: number
  latestSubmittedAt: string
}

// Audit Result
export interface IAuditResult {
  id: number
  name: string
  address: string
  mtr: number
  lat: null | number
  lng: null | number
  projectId: number
  locationCategory: ILocationCategory
  audits: IAudit[]
  latestSubmittedAt: string
}

export interface ReqAuditResultList extends IReqFilter {
  formTypeId?: number
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  states?: number[]
  startDate?: string
  endDate?: string
}
export interface ReqAuditResultListDownload {
  formTypeId?: number
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  states?: number[]
  startDate?: string
  endDate?: string
  fileFormat: 'excel' | 'pdf'
}

// Rating Template
export interface IReqRatingTemplate extends IReqFilter {
  text?: string
}
export interface IReqRatingTemplateCreate {
  inspectionUnit: string
  allowUploadImage: boolean
  allowWriteRemark: boolean
  style: 0 | 1 | 2
  ratingStart: number
  ratingEnd: number
  numberOfRating: number
  allowNAOption: boolean
  mapping: RatingMappingItem[]
  elements: IRatingTemplateElementItem[]
}
export interface IReqRatingTemplateUpdate {
  inspectionUnit?: string
  allowUploadImage?: boolean
  allowWriteRemark?: boolean
  allowNAOption?: boolean
  style?: 0 | 1 | 2
  ratingStart?: number
  ratingEnd?: number
  numberOfRating?: number
  mapping?: RatingMappingItem[]
  elements?: IRatingTemplateElementItem[]
}
export interface RatingMappingItem {
  label: string | number
  rating: number
}

export interface IRatingTemplateElementItem {
  name: string
  required: boolean
  naOption?: boolean
  file?: any
  remark?: string
}

export interface IRatingTemplate {
  id?: number
  inspectionUnit: string
  allowUploadImage?: boolean
  allowWriteRemark?: boolean
  allowUploadImageMandatory?: boolean
  allowWriteRemarkMandatory?: boolean
  style: number
  ratingStart?: number
  ratingEnd?: number
  failRating?: number
  numberOfRating?: number
  allowNAOption?: boolean
  mapping?: RatingMappingItem[]
  elements?: IRatingTemplateElementItem[]
  remark?: string
}

export interface IAuditInsightTopFailedItem {
  name: string
  count: number
  total: number
}
export interface IAuditInsightTopFailedlocationItem {
  location: ILocation
  total: number
  failed: number
  failedPercent: number
}
export interface IAuditInsightAvgPerformancelocationItem {
  location: ILocation
  avgPerformance: number
}

export interface IAuditInsightAvgScoreElement {
  name: string
  score: number
}

export interface IAuditInsightAvgPeformanceIU {
  name: string
  performance: number
}
