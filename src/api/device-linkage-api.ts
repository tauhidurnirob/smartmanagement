import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IDeviceLinkage,
  IReqDeviceLinkageCreate,
  IReqDeviceLinkageList,
  IReqDeviceLinkageUpdate,
} from './models'
import { IResList } from '../types/common'

// Api
export const DeviceLinkageApi = createApi({
  reducerPath: 'DeviceLinkageApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getDeviceLinkageList: builder.query<IResList<IDeviceLinkage>, IReqDeviceLinkageList>({
      query: (params) => ({
        url: `/devices/device-linkages/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceLinkageList],
      transformResponse: (res: IResList<IDeviceLinkage>) => res,
    }),
    createDeviceLinkage: builder.mutation<IDeviceLinkage, IReqDeviceLinkageCreate>({
      query: (req) => ({
        url: `/devices/device-linkages`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceLinkageList],
      transformResponse: (res: IDeviceLinkage) => res,
    }),
    deleteDeviceLinkageById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/devices/device-linkages/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.DeviceLinkageList],
    }),
    updateDeviceLinkage: builder.mutation<IDeviceLinkage, IReqDeviceLinkageUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/devices/device-linkages/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.DeviceLinkageList],
      transformResponse: (res: IDeviceLinkage) => res,
    }),
    getDeviceLinkageById: builder.query<IDeviceLinkage, number>({
      query: (id) => ({
        url: `/devices/device-linkages/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: IDeviceLinkage) => res,
    }),
    batchUpdateDeviceLinkages: builder.mutation<any, IReqDeviceLinkageUpdate[]>({
      query: (req) => ({
        url: `/devices/device-linkages/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceLinkageList],
    }),
    batchCreateDeviceLinkages: builder.mutation<any, IReqDeviceLinkageCreate[]>({
      query: (req) => ({
        url: `/devices/device-linkages/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceLinkageList],
    }),
    batchDeleteDeviceLinkages: builder.mutation<any, number[]>({
      query: (ids) => ({
        url: `/devices/device-linkages/batch/delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.DeviceLinkageList],
    }),
  }),
})
