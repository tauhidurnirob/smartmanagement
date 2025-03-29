import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IReqAuditProjectSiteList, IReqAuditProjectSiteMTR } from '../types/audit'
import { IResList } from '../types/common'
import { ILocation } from '../types/location'

// Api
export const AuditProejctSiteApi = createApi({
  reducerPath: 'AuditProejctSiteApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    // Audit Project Site
    getAuditProjectSiteList: builder.query<IResList<ILocation>, IReqAuditProjectSiteList>({
      query: (params) => ({
        url: `/audits/project-sites`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AuditProjectSiteList],
      transformResponse: (res: IResList<ILocation>) => res,
    }),
    setMtrForAllLocations: builder.mutation<void, IReqAuditProjectSiteMTR>({
      query: (req) => ({
        url: `/audits/project-sites/parent-thresholds`,
        method: 'POST',
        body: req,
      }),
    }),
    deleteProjectSiteById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/audits/project-sites/${id}`,
        method: 'DELETE',
      }),
    }),
    downloadTemplateProjectSiteUpload: builder.mutation<File, void>({
      query: () => ({
        url: `/audits/project-sites/download/template`,
        method: 'GET',
        responseHandler: async (res) => await res.blob(),
      }),
    }),
    batchUploadProjectSite: builder.mutation({
      query: (payload: File) => {
        const data = new FormData()
        data.append('file', payload)
        return {
          url: `/audits/project-sites/batch/upload`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: [
        tagTypes.Project,
        tagTypes.Location
      ],
    }),
  }),
})
