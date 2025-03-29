import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { ReqRoleCreate, ReqRoleList, ReqRoleUpdate, ResRoleList } from './models'
import { IRole } from '../types/role'

// Api
export const RoleApi = createApi({
  reducerPath: 'RoleApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getRoleList: builder.query<ResRoleList, ReqRoleList>({
      query: (params) => ({
        url: `/roles`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.RoleList],
      transformResponse: (res: ResRoleList) => res,
    }),
    createRole: builder.mutation<IRole, ReqRoleCreate>({
      query: (req) => ({
        url: `/roles`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.RoleList],
      transformResponse: (res: IRole) => res,
    }),
    deleteRoleById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.RoleList],
    }),
    updateRole: builder.mutation<IRole, ReqRoleUpdate>({
      query: (req) => ({
        url: `/roles/${req.id}`,
        method: 'PUT',
        body: req.data,
      }),
      invalidatesTags: [tagTypes.RoleList],
      transformResponse: (res: IRole) => res,
    }),
    getRoleById: builder.query<IRole, number>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: IRole) => res,
    }),
  }),
})
