import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IReqAuditFormTemplateCreate, IReqAuditFormTemplateUpdate, ReqAuditFormTemplateList } from './models/auditFormTemplate'
import { IResList } from '../types/common'
import { IAuditFormTemplate } from '../types/audit'

// Api
export const AuditFormTemplateApi = createApi({
  reducerPath: 'AuditFormTemplateApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAuditFormTemplateList: builder.query<IResList<IAuditFormTemplate>, ReqAuditFormTemplateList>(
      {
        query: (params) => ({
          url: `/audits/form-templates`,
          method: 'GET',
          params: params,
        }),
        providesTags: [tagTypes.AuditFormTemplateList],
        transformResponse: (res: IResList<IAuditFormTemplate>) => res,
      }
    ),
    getAuditFormTemplateById: builder.query({
      query: (id: number) => ({
        url: `/audits/form-templates/${id}`,
        method: 'GET',
      }),
      
      providesTags: [tagTypes.AuditFormTemplateDetails],
      transformResponse: (res: IAuditFormTemplate) => res,
    }),
    deleteAuditFormTemplateById: builder.mutation({
      query: (id: number) => ({
        url: `/audits/form-templates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        tagTypes.AuditFormTemplate,
        tagTypes.AuditFormTemplateList,
        tagTypes.AuditFormTemplateListInRecycleBin,
      ],
    }),
    deleteMultipleAuditFormTemplate: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/form-templates/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [
        tagTypes.AuditFormTemplate,
        tagTypes.AuditFormTemplateList,
        tagTypes.AuditFormTemplateListInRecycleBin,
      ],
    }),
    createAuditFormTemplate: builder.mutation<IAuditFormTemplate, IReqAuditFormTemplateCreate>({
      query: (req: IReqAuditFormTemplateCreate) => ({
        url: `/audits/form-templates`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [
        tagTypes.AuditFormTemplate,
        tagTypes.AuditFormTemplateList,
        tagTypes.AuditFormTemplateListInRecycleBin,
      ],
    }),
    updateAuditFormTemplateById: builder.mutation<IAuditFormTemplate, IReqAuditFormTemplateUpdate>({
      query: (req: IReqAuditFormTemplateUpdate) => ({
        url: `/audits/form-templates/${req.id}`,
        method: 'PATCH',
        body: req.body,
      }),
      invalidatesTags: [
        tagTypes.AuditFormTemplate,
        tagTypes.AuditFormTemplateList,
        tagTypes.AuditFormTemplateDetails,
        tagTypes.AuditFormTemplateListInRecycleBin,
      ],
    }),
  }),
})
