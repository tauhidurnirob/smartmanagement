import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IReqAuditInsightAvgPerformanceLocations, IReqAuditInsights, IReqAuditTopLocation, IResAuditInsightAvgPerformanceLocations, IResAuditInsightToplocations, IResAuditInsights } from './models'

// Api
export const AuditInsightApi = createApi({
  reducerPath: 'AuditInsightApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    // Audit Insight
    getAuditInsights: builder.query<IResAuditInsights, IReqAuditInsights>({
      query: (params) => ({
        url: `/audits/insights`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AuditInsights],
      transformResponse: (res: IResAuditInsights) => res,
    }),
    getAuditInsightTopLocations: builder.query<IResAuditInsightToplocations, IReqAuditTopLocation>({
      query: (params) => ({
        url: `/audits/insights/top-locations`,
        method: 'POST',
        body: params
      }),
      transformResponse: (res: IResAuditInsightToplocations) => res,
    }),
    getAuditInsightAvgPerformanceLocations: builder.mutation<IResAuditInsightAvgPerformanceLocations, IReqAuditInsightAvgPerformanceLocations>({
      query: (params) => ({
        url: `/audits/insights/average-performance-location`,
        method: 'GET',
        params: params
      }),
      transformResponse: (res: IResAuditInsightAvgPerformanceLocations) => res,
    }),
  }),
})
