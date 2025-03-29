import {
  IAuditInsightAvgPeformanceIU,
  IAuditInsightAvgPerformancelocationItem,
  IAuditInsightAvgScoreElement,
  IAuditInsightTopFailedItem,
  IAuditInsightTopFailedlocationItem,
} from '../../types/audit'
import { ILocation } from '../../types/location'

export interface IReqAuditInsights {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  formTypeId?: number
  startDate?: string
  endDate?: string
}

export interface IResAuditInsights {
  topFailedElements: IAuditInsightTopFailedItem[]
  topFailedIUs: IAuditInsightTopFailedItem[]
  topAvgScoreByElement: IAuditInsightAvgScoreElement[]
  topAvgPerformanceByIU: IAuditInsightAvgPeformanceIU[]
}

export interface IResAuditInsightToplocations {
  topFailed: IAuditInsightTopFailedlocationItem[]
  topPerformance: IAuditInsightAvgPerformancelocationItem[]
}
export interface IReqAuditInsightAvgPerformanceLocations {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  startDate?: string
  endDate?: string
  formTypeId?: number
}
export interface IResAuditInsightAvgPerformanceLocations {
  count: number
  rows: IAuditInsightAvgPerformancelocationItem[]
}

export interface IReqAuditTopLocation {
  formTypeId?: number;
  text?: string;
  projectIds?: number[];
  locationIds?: number[];
  startDate?: string;
  endDate?: string;
}