import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IDeviceGroup,
  IReqDeviceGroupCreate,
  IReqDeviceGroupList,
  IReqDeviceGroupUpdate,
} from './models'
import { IResList } from '../types/common'

// Api
export const DeviceGroupApi = createApi({
  reducerPath: 'DeviceGroupApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getDeviceGroupList: builder.query<IResList<IDeviceGroup>, IReqDeviceGroupList>({
      query: (params) => ({
        url: `/devices/device-groups/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceGroupList],
      transformResponse: (res: IResList<IDeviceGroup>) => res,
    }),
    createDeviceGroup: builder.mutation<IDeviceGroup, IReqDeviceGroupCreate>({
      query: (req) => ({
        url: `/devices/device-groups`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceGroupList],
      transformResponse: (res: IDeviceGroup) => res,
    }),
    deleteDeviceGroupById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/devices/device-groups/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.DeviceGroupList],
    }),
    updateDeviceGroup: builder.mutation<IDeviceGroup, IReqDeviceGroupUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/devices/device-groups/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.DeviceGroupList],
      transformResponse: (res: IDeviceGroup) => res,
    }),
    getDeviceGroupById: builder.query<IDeviceGroup, number>({
      query: (id) => ({
        url: `/devices/device-groups/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: IDeviceGroup) => res,
    }),
    batchUpdateDeviceGroups: builder.mutation<any, IReqDeviceGroupUpdate[]>({
      query: (req) => ({
        url: `/devices/device-groups/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceGroupList],
    }),
    batchCreateDeviceGroups: builder.mutation<any, IReqDeviceGroupCreate[]>({
      query: (req) => ({
        url: `/devices/device-groups/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceGroupList],
    }),
    batchDeleteDeviceGroups: builder.mutation<any, number[]>({
      query: (ids) => ({
        url: `/devices/device-groups/batch/delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.DeviceGroupList],
    }),
  }),
})
