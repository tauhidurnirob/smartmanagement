import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IResList } from '../types/common'
import { ITaskActivitiesInfoByProject, ITaskActivityRes } from '../types/task'
import {
  IReqTaskActivities,
  IReqTaskActivitiesByProjectId,
  IReqTaskActivitiesCreate,
  IReqTaskActivityList,
} from './models'

// Api
export const PerformanceTaskActivityApi = createApi({
  reducerPath: 'PerformanceTaskActivityApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getTaskActivityList: builder.query<
      IResList<ITaskActivitiesInfoByProject>,
      IReqTaskActivityList
    >({
      query: (params) => ({
        url: `/tasks/activities/overview`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.TaskActivityList],
      transformResponse: (res: IResList<ITaskActivitiesInfoByProject>) => res,
    }),
    getTaskActivities: builder.query<IResList<ITaskActivityRes>, IReqTaskActivities>({
      query: (params) => ({
        url: `/tasks/activities`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.TaskActivityList],
    }),
    getTaskActivitiesByProjectId: builder.query<
      ITaskActivitiesInfoByProject,
      IReqTaskActivitiesByProjectId
    >({
      query: (params) => {
        const { projectId, ...rest } = params
        return {
          url: `/tasks/activities/getbyprojectId/${projectId}`,
          method: 'GET',
          params: rest,
        }
      },
      providesTags: [tagTypes.TaskActivityListById],
      transformResponse: (res: ITaskActivitiesInfoByProject) => res,
    }),
    createTaskActivities: builder.mutation<ITaskActivitiesInfoByProject, IReqTaskActivitiesCreate>({
      query: (req) => ({
        url: `/tasks/activities`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.TaskActivityList, tagTypes.TaskActivityListById],
      transformResponse: (res: ITaskActivitiesInfoByProject) => res,
    }),
  }),
})
