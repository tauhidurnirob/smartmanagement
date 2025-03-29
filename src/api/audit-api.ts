import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IAuditLocationListItem, IAuditOverview, IAuditReportItem } from '../types/audit'
import { IResList } from '../types/common'
import { IDownloadAllAuditByLocationParams, IReqAuditDownloadAuditWithoutValue, ReqAuditListByLocation, ReqAuditLocationList, ReqAuditReportList, ReqAuditReportListDownload, ResAuditListByLocation } from './models/audit'

// Api
export const AuditApi = createApi({
  reducerPath: 'AuditApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAuditLocationList: builder.query<IResList<IAuditLocationListItem>, ReqAuditLocationList>({
      query: (params) => ({
        url: `/audits/locations`,
        method: 'GET',
        params,
      }),
      providesTags: [tagTypes.AuditLocationList],
      transformResponse: (res: IResList<IAuditLocationListItem>) => res,
    }),
    getAuditListByLocation: builder.query<ResAuditListByLocation, ReqAuditListByLocation>({
      query: (params) => {
        const {id, ...rest} = params
        return ({
          url: `/audits/locations/${id}`,
          method: 'GET',
          params: rest
        })
      },
      providesTags: [tagTypes.AuditListByLocation],
      transformResponse: (res: ResAuditListByLocation) => res,
    }),
    getAuditOverview: builder.query<IAuditOverview, ReqAuditLocationList>({
      query: (params) => ({
        url: `/audits/overview`,
        method: 'GET',
        params
      }),
      providesTags: [tagTypes.AuditOverview],
      transformResponse: (res: IAuditOverview) => res,
    }),
    getAuditReports: builder.query<IAuditReportItem[], ReqAuditReportList>({
      query: (params) => ({
        url: `/audits/reports`,
        method: 'GET',
        params,
      }),
      providesTags: [tagTypes.AuditReportList],
      transformResponse: (res: IAuditReportItem[]) => res,
    }),
    downloadAllAuditByLocationId: builder.mutation<File, IDownloadAllAuditByLocationParams>({
      query: ({locationId, ...rest}) => ({
        url: `audits/locations/${locationId}/download`,
        method: 'POST',
        body: rest,
        responseHandler: async (res) => await res.blob(),
      }),
    }),
    downloadAuditById: builder.mutation<File, {id: number}>({
      query: ({id}) => ({
        url: `audits/${id}/download`,
        method: 'GET',
        responseHandler: async (res) => await res.blob(),
      }),
    }),
    downloadAuditReport: builder.mutation<File, ReqAuditReportListDownload>({
      query: (params) => ({
        url: `audits/reports/download`,
        method: 'GET',
        params,
        responseHandler: async (res) => await res.blob(),
      }),
    }),
    downloadAuditWithoutValue: builder.mutation<File, IReqAuditDownloadAuditWithoutValue>({
      query: (body) => ({
        url: `/audits/download/pdf-without-value`,
        method: 'POST',
        body,
        responseHandler: async (res) => await res.blob(),
      }),
    }),
  }),
})
