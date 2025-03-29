import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IReqDeviceScheduleCreate,
  IReqDeviceScheduleList,
  IReqDeviceScheduleUpdate,
} from './models'
import { IResList } from '../types/common'
import { IDeviceSchedule } from '../types/device'

// Api
export const DeviceScheduleApi = createApi({
  reducerPath: 'DeviceScheduleApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getDeviceScheduleList: builder.query<IResList<IDeviceSchedule>, IReqDeviceScheduleList>({
      query: (params) => ({
        url: `/devices/device-schedules/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceScheduleList],
      transformResponse: (res: IResList<IDeviceSchedule>) => res,
    }),
    getDeviceScheduleById: builder.query<IDeviceSchedule, number>({
      query: (id) => ({
        url: `/devices/device-schedules/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.DeviceScheduleDetails],
      transformResponse: (res: IDeviceSchedule) => res,
    }),
    createDeviceSchedule: builder.mutation<IDeviceSchedule, IReqDeviceScheduleCreate>({
      query: (req) => ({
        url: `/devices/device-schedules`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceScheduleList],
      transformResponse: (res: IDeviceSchedule) => res,
    }),
    updateDeviceSchedule: builder.mutation<IDeviceSchedule, IReqDeviceScheduleUpdate>({
      query: (req) => {
        const {id, ...rest} = req
        return ({
          url: `/devices/device-schedules/${id}`,
          method: 'PATCH',
          body: rest,
        })
      },
      invalidatesTags: [tagTypes.DeviceScheduleList, tagTypes.DeviceScheduleDetails],
      transformResponse: (res: IDeviceSchedule) => res,
    }),
    deleteDeviceScheduleById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/devices/device-schedules/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.DeviceScheduleList],
    }),
    batchDeleteDeviceSchedules: builder.mutation<any, number[]>({
      query: (ids) => ({
        url: `/devices/device-schedules/batch/delete`,
        method: 'DELETE',
        params: { ids },
      }),
      invalidatesTags: [tagTypes.DeviceScheduleList],
    }),
  }),
})
