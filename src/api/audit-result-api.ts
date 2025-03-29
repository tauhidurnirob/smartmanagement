import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IResList } from '../types/common'
import { IAuditResult, ReqAuditResultList, ReqAuditResultListDownload } from '../types/audit'

// Api
export const AuditResultApi = createApi({
  reducerPath: 'AuditResultApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAuditResultList: builder.query<IResList<IAuditResult>, ReqAuditResultList>({
      query: (params) => ({
        url: `/audits/results`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AuditResultList],
      transformResponse: (res: IResList<IAuditResult>) => res,
    }),
    downloadAuditResult: builder.mutation<File, ReqAuditResultListDownload>({
      query: (params) => ({
        url: `audits/results/download`,
        method: 'POST',
        body: params,
        responseHandler: async (res) => await res.blob(),
      }),
    })
  }),
})
