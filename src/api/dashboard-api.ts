import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IResList } from '../types/common'
import { IReqDashboard, IResDashboardData } from './models/dashboard'

// Api
export const DashboardApi = createApi({
  reducerPath: 'DashboardApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({

    getDashboard: builder.query<IResDashboardData, void>({
        query: (id) => ({
          url: `/dashboard`,
          method: 'GET',
        }),
        transformResponse: (res: IResDashboardData) => res,
      }),
 
    getDeviceListByLocation: builder.query<IResList<any>, { queryData: { buildingId?: number,levelId?: number,areaId?: number,unitId?: number }, locID: number }>({
        query: ({ queryData, locID }) => ({
          url: `/dashboard/${locID}/devices`,
          method: 'GET',
        }),
        transformResponse: (res: IResList<any>) => res,
    }),
    getIncidentListByLocation: builder.query<IResList<any>, { queryData: { buildingId?: number,levelId?: number,areaId?: number,unitId?: number }, locID: number }>({
        query: ({ queryData, locID }) => ({
        url: `/dashboard/${locID}/incidents`,
        method: 'GET',
        }),
        transformResponse: (res: IResList<any>) => res,
    }),
    getMainenanceListByLocation: builder.query<IResList<any>, { queryData: { buildingId?: number,levelId?: number,areaId?: number,unitId?: number }, locID: number }>({
        query: ({ queryData, locID }) => ({
        url: `/dashboard/${locID}/maintenances`,
        method: 'GET',
        }),
        transformResponse: (res: IResList<any>) => res,
    }),
    getFeedbacksListByLocation: builder.query<IResList<any>, { queryData: { buildingId?: number,levelId?: number,areaId?: number,unitId?: number }, locID: number }>({
        query: ({ queryData, locID }) => ({
        url: `/dashboard/${locID}/feedbacks`,
        method: 'GET',
        }),
        transformResponse: (res: IResList<any>) => res,
    }),
    getDashboardByDate: builder.query<IResList<any>, IReqDashboard>({
        query: (params) => ({
          url: `/dashboard/by-date`,
          method: 'GET',
          params: params,
        }),
        transformResponse: (res: IResList<any>) => res,
      }),
 }),
})
