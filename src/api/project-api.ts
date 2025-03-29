import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { ReqProjectCreate, ReqProjectList, ReqProjectUpdate, ResProjectList } from './models'
import { IProject } from '../types/project'

// Api
export const ProjectApi = createApi({
  reducerPath: 'ProjectApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getProjectList: builder.query<ResProjectList, ReqProjectList>({
      query: (params) => ({
        url: `/projects`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.ProjectList],
      transformResponse: (res: ResProjectList) => res,
    }),
    createProject: builder.mutation<IProject, ReqProjectCreate>({
      query: (req) => ({
        url: `/projects`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.ProjectList],
      transformResponse: (res: IProject) => res,
    }),
    updateProject: builder.mutation<IProject, ReqProjectUpdate>({
      query: (req) => ({
        url: `/projects/${req.id}`,
        method: 'PATCH',
        params: req,
      }),
      invalidatesTags: [tagTypes.ProjectList],
      transformResponse: (res: IProject) => res,
    }),
    getProjectById: builder.query<IProject, number>({
      query: (id) => ({
        url: `/projects/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: IProject) => res,
    }),
    batchUpdateProjects: builder.mutation<any, ReqProjectUpdate[]>({
      query: (req) => ({
        url: `/projects/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.ProjectList],
    }),
  }),
})
