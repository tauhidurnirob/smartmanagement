import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IResList } from '../types/common'
import { ITaskList } from '../types/performance-management'
import { IReqCleanerComment, IReqCleanerUpdateStatus, ITaskCount } from '../types/task'
import { IGetStaffLeaves, IResCleanerLeaveOverview } from './models/staff'
import { IResCleanerNotification } from '../types/notification'


// Api
export const CleanerApi = createApi({
  reducerPath: 'CleanerApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({

    getTaskCount: builder.query<ITaskCount, number>({
        query: (id) => ({
          url: `/cleaner/${id}/task-count`,
          method: 'GET',
        }),
        transformResponse: (res: ITaskCount) => res,
      }),
 
    getTaskList: builder.query<IResList<ITaskList>, { queryData: { typeId: string }, id: number }>({
        query: ({ queryData, id }) => ({
          url: `/cleaner/${id}/task-lists?typeId=${queryData.typeId}`,
          method: 'GET',
        }),
        transformResponse: (res: IResList<ITaskList>) => res,
      }),
    updateCleanerStatus: builder.mutation<any, IReqCleanerUpdateStatus>({
    query: (req) => {
        const { id, ...rest } = req
        return {
        url: `/cleaner/${id}/update-status`,
        method: 'PATCH',
        body: rest,
        }
     },
    }),
    getCleanerLeaves: builder.query<IResList<IGetStaffLeaves>, number>({
        query: (id) => ({
          url: `/cleaner/${id}/leaves`,
          method: 'GET',
        }),
        transformResponse: (res: IResList<IGetStaffLeaves>) => res,
    }),
    getCleanerLeaveOverview: builder.query<IResList<IResCleanerLeaveOverview>, number>({
        query: (id) => ({
          url: `/cleaner/${id}/leave-overview`,
          method: 'GET',
        }),
        transformResponse: (res: IResList<IResCleanerLeaveOverview>) => res,
    }),
    getCleanerNotification: builder.query<IResList<IResCleanerNotification>, number>({
        query: (id) => ({
          url: `/cleaner/${id}/notifications`,
          method: 'GET',
        }),
        transformResponse: (res: IResList<IResCleanerNotification>) => res,
    }),
    getCleanerTaskPerDate: builder.query<IResList<any>, number>({
        query: (id) => ({
          url: `/cleaner/${id}/task-per-date`,
          method: 'GET',
        }),
        transformResponse: (res: IResList<any>) => res,
    }),
    getCleanerActivities: builder.query<IResList<any>, number>({
        query: (id) => ({
          url: `/cleaner/${id}/activities`,
          method: 'GET',
        }),
        transformResponse: (res: IResList<any>) => res,
    }),
    cleanerCompleteTask: builder.query<void, number>({
        query: (id) => ({
          url: `/cleaner/${id}/complete-task`,
          method: 'PATCH',
        }),
    }),
    createComment: builder.mutation<any, IReqCleanerComment>({
        query: (req) => {
            const { id, ...rest } = req
            return {
            url: `/cleaner/${id}/add-comment`,
            method: 'POST',
            body: rest,
            }
         },
        }),
 }),
})
