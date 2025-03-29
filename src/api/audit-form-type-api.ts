import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IResList } from '../types/common'
import {
  IAuditFormType,
  IReqAuditFormTypeCreate,
  IReqAuditFormTypeMultipleUpdate,
  IReqAuditFormTypeUpdate,
} from '../types/audit'
import { ReqAuditFormTypeList } from './models/auditFormType'

// Api
export const AuditFormTypeApi = createApi({
  reducerPath: 'AuditFormTypeApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAuditFormTypeList: builder.query<IResList<IAuditFormType>, ReqAuditFormTypeList>({
      query: (params) => ({
        url: `/audits/form-types`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AuditFormTypeList],
      transformResponse: (res: IResList<IAuditFormType>) => res,
    }),
    updateAuditFormType: builder.mutation<IAuditFormType, IReqAuditFormTypeUpdate>({
      query: (req) => ({
        url: `/audits/form-types/${req.id}`,
        method: 'PATCH',
        body: req,
      }),
      transformResponse: (res: IAuditFormType) => res,
      invalidatesTags: [tagTypes.AuditFormTypeList],
    }),
    createAuditFormType: builder.mutation<IAuditFormType, IReqAuditFormTypeCreate>({
      query: (req) => ({
        url: `/audits/form-types`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: IAuditFormType) => res,
      invalidatesTags: [tagTypes.AuditFormTypeList],
    }),
    deleteAuditFormType: builder.mutation<number[], number>({
      query: (id: number) => ({
        url: `/audits/form-types/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: number[]) => res,
      invalidatesTags: [tagTypes.AuditFormTypeList],
    }),
    deleteAuditFormTypesByIds: builder.mutation<number[], number[]>({
      query: (ids: number[]) => ({
        url: `/audits/form-types/batch/delete`,
        method: 'POST',
        params: { ids },
      }),
      transformResponse: (res: number[]) => res,
      invalidatesTags: [tagTypes.AuditFormTypeList],
    }),
    updateMultipleAuditFormTypes: builder.mutation<number[], IReqAuditFormTypeMultipleUpdate[]>({
      query: (forms: IReqAuditFormTypeMultipleUpdate[]) => ({
        url: `/audits/form-types/batch/update`,
        method: 'PATCH',
        body: forms,
      }),
      transformResponse: (res: number[]) => res,
      invalidatesTags: [tagTypes.AuditFormTypeList],
    }),
    createMultipleAuditFormTypes: builder.mutation<number[], IReqAuditFormTypeCreate[]>({
      query: (forms: IReqAuditFormTypeCreate[]) => ({
        url: `/audits/form-types/batch/create`,
        method: 'POST',
        body: forms,
      }),
      transformResponse: (res: number[]) => res,
      invalidatesTags: [tagTypes.AuditFormTypeList],
    }),
  }),
})
