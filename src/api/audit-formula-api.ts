import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  ReqAuditFormulaCreate,
  ReqAuditFormulaGroupCreate,
  ReqAuditFormulaGroupList,
  ReqAuditFormulaGroupUpdate,
  ReqAuditFormulaList,
  ReqAuditFormulaMultipleDelete,
  ReqAuditFormulaUpdate,
} from './models/auditFormula'
import { IResList } from '../types/common'
import { IFormula, IFormulaGroup } from '../types/formula'

// Api
export const AuditFormulaApi = createApi({
  reducerPath: 'AuditFormulaApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAuditFormulaList: builder.query<IResList<IFormula>, ReqAuditFormulaList>({
      query: (params) => ({
        url: `/audits/formulas`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IResList<IFormula>) => res,
    }),
    createAuditFormula: builder.mutation<IFormula, ReqAuditFormulaCreate>({
      query: (req) => ({
        url: `/audits/formulas`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: IFormula) => res,
    }),
    updateAuditFormula: builder.mutation<IFormula, ReqAuditFormulaUpdate>({
      query: (req) => ({
        url: `/audits/formulas/${req.id}`,
        method: 'PATCH',
        body: req,
      }),
      transformResponse: (res: IFormula) => res,
    }),
    createMultipleAuditFormulas: builder.mutation<IFormula, ReqAuditFormulaCreate[]>({
      query: (req) => ({
        url: `/audits/formulas/batch/create`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: IFormula) => res,
    }),
    updateMultipleAuditFormulas: builder.mutation<IFormula, ReqAuditFormulaUpdate[]>({
      query: (req) => ({
        url: `/audits/formulas/batch/update`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: IFormula) => res,
      invalidatesTags: [tagTypes.AuditFormulaGroupList],
    }),
    deleteAuditFormulas: builder.mutation<number[], ReqAuditFormulaMultipleDelete>({
      query: (req) => ({
        url: `/audits/formulas/delete`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: number[]) => res,
    }),
    getAuditFormulaGroupList: builder.query<IResList<IFormulaGroup>, ReqAuditFormulaGroupList>({
      query: (params) => ({
        url: `/audits/formula-groups`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IResList<IFormulaGroup>) => res,
      providesTags: [tagTypes.AuditFormulaGroupList],
    }),
    createAuditFormulaGroup: builder.mutation<IFormulaGroup, ReqAuditFormulaGroupCreate>({
      query: (req) => ({
        url: `/audits/formula-groups`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: IFormulaGroup) => res,
      invalidatesTags: [tagTypes.AuditFormulaGroupList],
    }),
    updateAuditFormulaGroup: builder.mutation<IFormulaGroup, ReqAuditFormulaGroupUpdate>({
      query: (req) => {
        const { id, ...body } = req
        return {
          url: `/audits/formula-groups/${id}`,
          method: 'PATCH',
          body: body,
        }
      },
      transformResponse: (res: IFormulaGroup) => res,
      invalidatesTags: [tagTypes.AuditFormulaGroupList],
    }),
    deleteAuditFromulaGroupById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/audits/formula-groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.AuditFormulaGroupList],
    }),
    deleteAuditFormulaGroups: builder.mutation<number[], ReqAuditFormulaMultipleDelete>({
      query: (req) => ({
        url: `/audits/formula-groups/delete`,
        method: 'POST',
        body: req,
      }),
      transformResponse: (res: number[]) => res,
      invalidatesTags: [tagTypes.AuditFormulaGroupList],
    }),
  }),
})
