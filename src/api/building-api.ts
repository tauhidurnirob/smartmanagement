import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IBuilding, IReqBuildingCreate, IReqBuildingList, IReqBuildingUpdate } from './models'
import { IResList } from '../types/common'

// Api
export const BuildingApi = createApi({
  reducerPath: 'BuildingApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getBuildingList: builder.query<IResList<IBuilding>, IReqBuildingList>({
      query: (params) => ({
        url: `/buildings`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.BuildingList],
      transformResponse: (res: IResList<IBuilding>) => res,
    }),
    createBuilding: builder.mutation<IBuilding, IReqBuildingCreate>({
      query: (req) => ({
        url: `/buildings`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.BuildingList],
      transformResponse: (res: IBuilding) => res,
    }),
    deleteBuildingById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/buildings/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.BuildingList],
    }),
    updateBuilding: builder.mutation<IBuilding, IReqBuildingUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/buildings/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.BuildingList],
      transformResponse: (res: IBuilding) => res,
    }),
    getBuildingById: builder.query<IBuilding, number>({
      query: (id) => ({
        url: `/buildings/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: IBuilding) => res,
    }),
    batchUpdateBuildings: builder.mutation<any, IReqBuildingUpdate[]>({
      query: (req) => ({
        url: `/buildings/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.BuildingList],
    }),
    batchCreateBuildings: builder.mutation<any, IReqBuildingCreate[]>({
      query: (req) => ({
        url: `/buildings/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.BuildingList],
    }),
  }),
})
