import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'
import tagTypes from './tagTypes'
import {
  IPerformanceInhouseSopReqBody,
  IReqSopOverview,
  ISopTraining,
  ISopTrainingRes,
  ISopUpdate,
} from '../types/performance-management'
import { IResList } from '../types/common'

// Api
export const SopApi = createApi({
  reducerPath: 'SopApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    createSop: builder.mutation<ISopTrainingRes, IPerformanceInhouseSopReqBody>({
      query: (req) => ({
        url: `/inhouse-training/sop`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.SopList],
    }),
    updateSop: builder.mutation<ISopTrainingRes, ISopUpdate>({
      query: ({ id, body }) => ({
        url: `/inhouse-training/sop/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [tagTypes.SopList],
    }),
    getSops: builder.query<IResList<ISopTraining>, IReqSopOverview>({
      query: (params) => ({
        url: `/inhouse-training/sop/overview`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.SopList],
    }),
    getSopById: builder.query<ISopTrainingRes, { id: number }>({
      query: ({ id }) => ({
        url: `/inhouse-training/single-sop/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, { id }) =>
        result ? [{ type: tagTypes.SopList, id }] : [tagTypes.SopList],
    }),
  }),
})
