import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { ReqAuditFormTemplateList } from './models/auditFormTemplate'
import { IResList } from '../types/common'
import {
  IAuditFormTemplate,
  IRatingTemplate,
  IReqRatingTemplate,
  IReqRatingTemplateCreate,
  IReqRatingTemplateUpdate,
} from '../types/audit'

// Api
export const AuditRatingTemplateApi = createApi({
  reducerPath: 'AuditRatingTemplateApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAuditRatingTemplateList: builder.query<IResList<IRatingTemplate>, IReqRatingTemplate>({
      query: (params) => ({
        url: `/audits/rating-templates`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AuditRatingTemplateList],
      transformResponse: (res: IResList<IRatingTemplate>) => res,
    }),
    getAuditRatingTemplateListByIds: builder.query<IRatingTemplate[], {ids: number[]}>({
      query: (body) => ({
        url: `/audits/rating-templates/batch/read`,
        method: 'post',
        body,
      }),
      transformResponse: (res: IRatingTemplate[]) => res,
    }),
    fetchAuditRatingTemplateListByIds: builder.mutation<IRatingTemplate[], {ids: number[]}>({
      query: (body) => ({
        url: `/audits/rating-templates/batch/read`,
        method: 'post',
        body,
      }),
      transformResponse: (res: IRatingTemplate[]) => res,
    }),
    createAuditRatingTemplate: builder.mutation<IRatingTemplate, IReqRatingTemplateCreate>({
      query: (req) => ({
        url: `/audits/rating-templates`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: IRatingTemplate) => res,
      invalidatesTags: [tagTypes.AuditRatingTemplateList],
    }),
    updateAuditRatingTemplate: builder.mutation<
      IRatingTemplate,
      { id: number; data: IReqRatingTemplateUpdate }
    >({
      query: (req) => ({
        url: `/audits/rating-templates/${req.id}`,
        method: 'PATCH',
        body: req.data,
      }),
      transformResponse: (res: IRatingTemplate) => res,
      invalidatesTags: [tagTypes.AuditRatingTemplateList, tagTypes.AuditRatingTemplateDetails],
    }),
    getAuditRatingTemplateById: builder.query<IRatingTemplate, number>({
      query: (id) => ({
        url: `/audits/rating-templates/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.AuditRatingTemplateDetails],
      transformResponse: (res: IRatingTemplate) => res,
    }),
    deleteAuditRatingTemplateById: builder.mutation({
      query: (id: number) => ({
        url: `/audits/rating-templates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.AuditRatingTemplateList],
    }),
    deleteMultipleAuditRatingTemplate: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/rating-templates/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditRatingTemplateList],
    }),
  }),
})
