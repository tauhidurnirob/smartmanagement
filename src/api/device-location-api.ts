import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IDeviceLocation, IDeviceLocationOverview, IReqDeviceLocationList } from './models'
import { IResList } from '../types/common'

// Api
export const DeviceLocationApi = createApi({
  reducerPath: 'DeviceLocationApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getDeviceLocationList: builder.query<IResList<IDeviceLocation>, IReqDeviceLocationList>({
      query: (params) => ({
        url: `/devices/device-locations/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceLocationList],
      transformResponse: (res: IResList<IDeviceLocation>) => res,
    }),
    getDeviceLocationOverviewById: builder.query<IDeviceLocationOverview, number>({
      query: (id) => ({
        url: `/devices/device-locations/${id}/overview`,
        method: 'GET',
      }),
      providesTags: [tagTypes.DeviceLocationOverview],
      transformResponse: (res: IDeviceLocationOverview) => res,
    }),
    turnOffDevicesByLocationId: builder.mutation<void, number>({
      query: (id) => ({
        url: `/devices/device-locations/${id}/turn-off`,
        method: 'POST',
      }),
      invalidatesTags: [
        tagTypes.DeviceLocationList,
        tagTypes.DeviceLocationOverview,
        tagTypes.DeviceList,
      ],
    }),
  }),
})
