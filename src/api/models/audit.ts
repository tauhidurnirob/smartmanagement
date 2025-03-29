import { IAudit } from '../../types/audit'
import { ILocation } from '../../types/location'

export interface ReqAuditLocationList {
  text?: string
  projectIds?: number[]
  auditStates?: number[]
  locationIds?: number[]
  startDate?: string
  endDate?: string
}

export interface ReqAuditReportList {
  timeFrame?: string
  startDate?: string
  endDate?: string
  projectIds?: number[]
  locationIds?: number[]
  auditStates?: number[]
  formTypeId?: number
}
export interface ReqAuditReportListDownload extends ReqAuditReportList {
  fileFormat: 'pdf' | 'excel'
}

export interface ResAuditListByLocation {
  location: ILocation | null
  audits: IAudit[]
}
export interface ReqAuditListByLocation {
  id: number,
  year: string,
  month: string,
  formTypeId: number
}

export interface IDownloadAllAuditByLocationParams {
  locationId: number
  fileFormat: string
  startDate: string
  endDate: string 
}
export interface IReqAuditDownloadAuditWithoutValue {
  formTypeName: string
  formTemplateName: string
  locationName: string
  content: any
  logoUrl: string
}