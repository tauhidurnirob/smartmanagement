import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IDeviceType,
  IReqDeviceTypeCreate,
  IReqDeviceTypeList,
  IReqDeviceTypeUpdate,
} from './models'
import { IResList } from '../types/common'

// Api
export const DeviceTypeApi = createApi({
  reducerPath: 'DeviceTypeApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getDeviceTypeList: builder.query<IResList<IDeviceType>, IReqDeviceTypeList>({
      query: (params) => ({
        url: `/devices/device-types/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceTypeList],
      transformResponse: (res: IResList<IDeviceType>) => res,
    }),
    getDeviceTypeByID: builder.query<IDeviceType, number>({
      query: (id) => ({
        url: `/devices/device-types/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: IDeviceType) => res,
    }),
    createDeviceType: builder.mutation<IDeviceType, IReqDeviceTypeCreate>({
      query: (req) => ({
        url: `/devices/device-types`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceTypeList],
      transformResponse: (res: IDeviceType) => res,
    }),
    deleteDeviceTypeById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/devices/device-types/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.DeviceTypeList],
    }),
    updateDeviceType: builder.mutation<IDeviceType, IReqDeviceTypeUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/devices/device-types/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.DeviceTypeList],
      transformResponse: (res: IDeviceType) => res,
    }),
    getDeviceTypeById: builder.query<IDeviceType, number>({
      query: (id) => ({
        url: `/devices/device-types/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: IDeviceType) => res,
    }),
    batchUpdateDeviceTypes: builder.mutation<any, IReqDeviceTypeUpdate[]>({
      query: (req) => ({
        url: `/devices/device-types/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceTypeList],
    }),
    batchCreateDeviceTypes: builder.mutation<any, IReqDeviceTypeCreate[]>({
      query: (req) => ({
        url: `/devices/device-types/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceTypeList],
    }),
    batchDeleteDeviceTypes: builder.mutation<any, number[]>({
      query: (ids) => ({
        url: `/devices/device-types/batch/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.DeviceTypeList],
    }),
    batchUploadDeviceTypes: builder.mutation({
      query: (payload: File) => {
        const data = new FormData()
        data.append('file', payload)
        return {
          url: `/devices/device-types/batch/upload`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: [tagTypes.DeviceTypeList],
    }),
    downloadTemplateDeviceTypeUpload: builder.mutation<File, void>({
      query: () => ({
        url: `/devices/device-types/download/template`,
        method: 'GET',
        responseHandler: async (res) => await res.blob(),
      }),
    }),
  }),
})
