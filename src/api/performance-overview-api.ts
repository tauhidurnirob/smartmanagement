import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IResList } from '../types/common'
import { ITaskActivitiesInfoByProject } from '../types/task'
import { TaskCompletionStatus } from './models'

// Api
export const PerformanceTaskOverviewApi = createApi({
  reducerPath: 'PerformanceTaskOverviewApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getTaskCompletionStatus: builder.query<TaskCompletionStatus, void>({
      query: () => ({
        url: `/tasks/status/completion`,
        method: 'GET',
      }),
      providesTags: [tagTypes.TaskOverview],
    }),
  }),
})
