import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IAudit, IReqAuditLogList, IReqAuditLogListDownload } from '../types/audit'
import { IResList } from '../types/common'

// Api
export const AuditLogApi = createApi({
  reducerPath: 'AuditLogApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAuditLogList: builder.query<IResList<IAudit>, IReqAuditLogList>({
      query: (params) => ({
        url: `/audits/logs`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AuditLogList],
      transformResponse: (res: IResList<IAudit>) => res,
    }),
    deleteAuditLogById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/audits/logs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.AuditLogList, tagTypes.AuditLogListInRecycleBin],
    }),
    deleteMultipleAuditLog: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/logs/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditLogList, tagTypes.AuditLogListInRecycleBin],
    }),
    downloadAuditLogListByFilter: builder.mutation<File, IReqAuditLogListDownload>({
      query: (params) => ({
        url: `/audits/logs/download`,
        method: 'POST',
        body: params,
        responseHandler: async (res) => await res.blob(),
      }),
    }),
    downloadAuditLogListByIds: builder.mutation<File, {ids: number[], fileFormat: 'pdf' | 'excel'}>({
      query: (body) => ({
        url: `/audits/logs/download/selected`,
        method: 'POST',
        body,
        responseHandler: async (res) => await res.blob(),
      }),
    }),
  }),
})
