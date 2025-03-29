import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IAuditScheduleCreate, ReqAuditScheduleList, ResAuditScheduleList } from './models'
import { IAuditSchedule } from '../types/audit'

// Api
export const AuditScheduleApi = createApi({
  reducerPath: 'AuditScheduleApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getAuditScheduleList: builder.query<ResAuditScheduleList, ReqAuditScheduleList>({
      query: (params) => ({
        url: `/audits/schedules`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: ResAuditScheduleList) => res,
      providesTags: [tagTypes.AuditScheduleList],
    }),
    getAuditScheduleById: builder.query({
      query: (id: number) => ({
        url: `/audits/schedules/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: IAuditSchedule) => res,
      providesTags: [tagTypes.AuditSchedule],
    }),
    createAuditSchedule: builder.mutation({
      query: (payload: Partial<IAuditScheduleCreate>) => ({
        url: `/audits/schedules`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [tagTypes.AuditSchedule, tagTypes.AuditScheduleList],
    }),
    updateAuditSchedule: builder.mutation({
      query: ({ id, payload }: { id: number; payload: Partial<IAuditScheduleCreate> }) => ({
        url: `/audits/schedules/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [tagTypes.AuditSchedule, tagTypes.AuditScheduleList],
    }),
    deleteAuditScheduleById: builder.mutation({
      query: (id: number) => ({
        url: `/audits/schedules/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        tagTypes.AuditSchedule,
        tagTypes.AuditScheduleList,
        tagTypes.AuditScheduleListInRecycleBin,
      ],
    }),
    deleteMultipleAuditSchedule: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/schedules/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [
        tagTypes.AuditSchedule,
        tagTypes.AuditScheduleList,
        tagTypes.AuditScheduleListInRecycleBin,
      ],
    }),
  }),
})
