import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IGetStaffLeaves,
  IReqLeaveApplications,
  IReqStaffAttendances,
  IStaff,
  IStaffAttendances,
  ReqStaffList,
} from './models/staff'
import { IResList } from '../types/common'

// Api
export const StaffApi = createApi({
  reducerPath: 'StaffApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getStaffList: builder.query<IResList<IStaff>, ReqStaffList>({
      query: (params) => ({
        url: `tasks/staffs/for-web`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.StaffList],
    }),
    getStaffAttendances: builder.query<IResList<IStaffAttendances>, IReqStaffAttendances>({
      query: (params) => ({
        url: `tasks/staffs/attendances`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AttendanceList],
    }),
    getStaffLeaves: builder.query<IResList<IGetStaffLeaves>, IReqLeaveApplications>({
      query: (params) => ({
        url: `tasks/leaves`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.LeaveList],
    }),
    getSingleStaffLeave: builder.query<IGetStaffLeaves, { id: number }>({
      query: (params) => ({
        url: `tasks/leaves/${params.id}`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.Leave],
    }),
  }),
})
