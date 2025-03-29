import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { ILevel, IReqLevelCreate, IReqLevelList, IReqLevelUpdate } from './models'
import { IResList } from '../types/common'

// Api
export const LevelApi = createApi({
  reducerPath: 'LevelApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getLevelList: builder.query<IResList<ILevel>, IReqLevelList>({
      query: (params) => ({
        url: `/levels`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.LevelList],
      transformResponse: (res: IResList<ILevel>) => res,
    }),
    createLevel: builder.mutation<ILevel, IReqLevelCreate>({
      query: (req) => ({
        url: `/levels`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.LevelList],
      transformResponse: (res: ILevel) => res,
    }),
    updateLevel: builder.mutation<ILevel, IReqLevelUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/levels/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.LevelList],
      transformResponse: (res: ILevel) => res,
    }),
    deleteLevelById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/levels/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.LevelList],
    }),
    getLevelById: builder.query<ILevel, number>({
      query: (id) => ({
        url: `/levels/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: ILevel) => res,
    }),
    batchUpdateLevels: builder.mutation<any, IReqLevelUpdate[]>({
      query: (req) => ({
        url: `/levels/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.LevelList],
    }),
    batchCreateLevels: builder.mutation<any, IReqLevelCreate[]>({
      query: (req) => ({
        url: `/levels/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.LevelList],
    }),
    batchDeleteLevels: builder.mutation<any, number[]>({
      query: (ids) => ({
        url: `/levels/batch/delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.LevelList],
    }),
    batchUploadFloorPlans: builder.mutation<any, File[]>({
      query: (files) => {
        const data = new FormData()
        for (const file of files) {
          data.append('files', file)
        }

        return {
          url: `/levels/floorplans/batch-upload`,
          method: 'PUT',
          body: data,
        }
      },
      invalidatesTags: [tagTypes.LevelList],
    }),
  }),
})
