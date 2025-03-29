import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IDeviceCategory, IReqDeviceActivityList, ReqCategoryList } from './models'
import { IResList } from '../types/common'
import { IActivityLog } from '../types/activity'

// Api
export const DeviceCategoryApi = createApi({
  reducerPath: 'DeviceCategoryApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getDeviceCategoryById: builder.query<IDeviceCategory, number>({
        query: (id) => ({
          url: `/devices/device-categories/${id}`,
          method: 'GET',
        }),
        transformResponse: (res: IDeviceCategory) => res,
      }),
    addDeviceCategory: builder.mutation<IDeviceCategory, IDeviceCategory>({
        query: (req) => ({
          url: `/devices/device-categories`,
          method: 'POST',
          body: req,
        }),
        invalidatesTags: [tagTypes.DeviceCategoryList],
        transformResponse: (res: IDeviceCategory) => res,
      }),
      updateDeviceCategory: builder.mutation<void, IDeviceCategory>({
        query: (req) => {
          const { id, ...rest } = req
          return {
            url: `/devices/device-categories/${id}`,
            method: 'PUT',
            body: rest,
          }
        },
        invalidatesTags: [tagTypes.DeviceCategoryList],
      }), 
      deleteDeviceCategoryById: builder.mutation<void, number>({
        query: (id) => {
          return {
            url: `/devices/device-categories/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: [tagTypes.DeviceCategoryList],
      }),
      getDeviceCategoryList: builder.query<IResList<IDeviceCategory>, ReqCategoryList>({
        query: (params) => ({
          url: `/devices/getByFilter`,
          method: 'GET',
          params: params,
        }),
        providesTags: [tagTypes.DeviceList],
        transformResponse: (res: IResList<IDeviceCategory>) => res,
      }),
  }),
})
