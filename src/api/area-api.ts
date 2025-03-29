import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IArea, IReqAreaCreate, IReqAreaList, IReqAreaUpdate } from './models'
import { IResList } from '../types/common'

// Api
export const AreaApi = createApi({
  reducerPath: 'AreaApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAreaList: builder.query<IResList<IArea>, IReqAreaList>({
      query: (params) => ({
        url: `/areas`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AreaList],
      transformResponse: (res: IResList<IArea>) => res,
    }),
    createArea: builder.mutation<IArea, IReqAreaCreate>({
      query: (req) => ({
        url: `/areas`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.AreaList],
      transformResponse: (res: IArea) => res,
    }),
    updateArea: builder.mutation<IArea, IReqAreaUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/areas/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.AreaList],
      transformResponse: (res: IArea) => res,
    }),
    deleteAreaById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/areas/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.AreaList],
    }),
    getAreaById: builder.query<IArea, number>({
      query: (id) => ({
        url: `/areas/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: IArea) => res,
    }),
    batchUpdateAreas: builder.mutation<any, IReqAreaUpdate[]>({
      query: (req) => ({
        url: `/areas/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.AreaList],
    }),
    batchCreateAreas: builder.mutation<any, IReqAreaCreate[]>({
      query: (req) => ({
        url: `/areas/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.AreaList],
    }),
  }),
})
