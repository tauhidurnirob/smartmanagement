import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IReqLocationUserActivityList,
  ReqLocationList,
  ReqLocationUpdate,
  ResLocationList,
} from './models'
import { ILocation } from '../types/location'
import { IResList } from '../types/common'
import { IUserActivityLog } from '../types/activity'

// Api
export const LocationApi = createApi({
  reducerPath: 'LocationApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getLocationList: builder.query<ResLocationList, ReqLocationList>({
      query: (params) => ({
        url: `/locations`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AuditLocationListQuery],
      transformResponse: (res: ResLocationList) => res,
    }),
    updateLocation: builder.mutation<ILocation, ReqLocationUpdate>({
      query: (req) => ({
        url: `/locations/${req.id}`,
        method: 'PATCH',
        body: req,
      }),
      invalidatesTags: [tagTypes.AuditLocationListQuery],
      transformResponse: (res: ILocation) => res,
    }),
    getLocationById: builder.query<ILocation, number>({
      query: (id) => ({
        url: `/locations/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: ILocation) => res,
    }),
    deleteLocationsByIds: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/locations/batch/delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditLocationListQuery],
    }),
    getUserActivityListInLocation: builder.query<
      IResList<IUserActivityLog>,
      IReqLocationUserActivityList
    >({
      query: (params) => {
        const { locationId, ...data } = params
        return {
          url: `/locations/${locationId}/activity`,
          method: 'GET',
          params: data,
        }
      },
      providesTags: [tagTypes.UserActivityListInLocation],
      transformResponse: (res: IResList<IUserActivityLog>) => res,
    }),
  }),
})
