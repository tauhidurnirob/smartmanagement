import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IReqDeviceActivityList } from './models'
import { IResList } from '../types/common'
import { IActivityLog, IActivityLogRes } from '../types/activity'

// Api
export const DeviceActivityApi = createApi({
  reducerPath: 'DeviceActivityApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getDeviceActivityList: builder.query<IResList<IActivityLog>, IReqDeviceActivityList>({
      query: (params) => ({
        url: `/devices/device-activities/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceActivityList],
      transformResponse: (res: IResList<IActivityLog>) => res,
    }),
    getDeviceActivityLogList: builder.query<IResList<IActivityLogRes>, IReqDeviceActivityList>({
      query: (params) => ({
        url: `/devices/device-activities/log/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceActivityLogList],
      transformResponse: (res: IResList<IActivityLogRes>) => res,
    }),
    getDeviceActivityDetails: builder.query<IResList<IActivityLog>, IReqDeviceActivityList>({
      query: (params) => ({
        url: `/devices/device-activities/detail`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceActivityList],
      transformResponse: (res: IResList<IActivityLog>) => res,
    }),
  }),
})
