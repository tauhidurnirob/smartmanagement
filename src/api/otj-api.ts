import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'
import tagTypes from './tagTypes'
import {
  IOjtBySopRes,
  IOjtDetails,
  IOjtTrainingReqBody,
  IOjtTrainingRes,
  IOtjOverviewRes,
  IOtjTrainingUpdateReq,
  IReqOjtOverview,
} from '../types/performance-management'
import { IResList } from '../types/common'

// Api
export const OtjApi = createApi({
  reducerPath: 'OtjApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    createOtj: builder.mutation<IOjtTrainingRes, IOjtTrainingReqBody>({
      query: (req) => ({
        url: `/inhouse-training/ojt`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.OjtList],
    }),
    updateOtj: builder.mutation<IOjtTrainingRes, IOtjTrainingUpdateReq>({
      query: ({ id, body }) => ({
        url: `/inhouse-training/ojt/${id}`,
        method: 'PUT',
        body,
      })
    }),
    deleteOtj: builder.mutation<number, number>({
      query: (id) => ({
        url: `/inhouse-training/ojt/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.OjtList],
    }),
    getOtjs: builder.query<IResList<IOtjOverviewRes>, IReqOjtOverview>({
      query: (params) => ({
        url: `/inhouse-training/ojt/overview`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.OjtList],
    }),
    getOtjBySop: builder.query<IOjtBySopRes[], void>({
      query: () => ({
        url: `/inhouse-training/ojt-by-sop`,
        method: 'GET',
      }),
      providesTags: [tagTypes.OjtList],
    }),
    getOtjById: builder.query<IOjtDetails, { id: number }>({
      query: ({ id }) => ({
        url: `/inhouse-training/single-ojt/${id}`,
        method: 'GET',
      }),
      providesTags: (result, _, { id }) =>
        result ? [{ type: tagTypes.OjtList, id }] : [{ type: tagTypes.OjtList }],
    }),
  }),
})
