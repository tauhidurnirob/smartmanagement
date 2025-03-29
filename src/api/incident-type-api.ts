import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IIncidentType,
  IReqIncidentTypeCreate,
  IReqIncidentTypeList,
  IReqIncidentTypeUpdate,
} from './models'
import { IResList } from '../types/common'

// Api
export const IncidentTypeApi = createApi({
  reducerPath: 'IncidentTypeApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getIncidentTypeList: builder.query<IResList<IIncidentType>, IReqIncidentTypeList>({
      query: (params) => ({
        url: `/incidents/incident-types`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.IncidentTypeList],
      transformResponse: (res: IResList<IIncidentType>) => res,
    }),
    createIncidentType: builder.mutation<IIncidentType, IReqIncidentTypeCreate>({
      query: (req) => ({
        url: `/incidents/incident-types`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [
        tagTypes.IncidentTypeList,
        tagTypes.IncidentTypeDetail,
        tagTypes.IncidentOverview,
      ],
      transformResponse: (res: IIncidentType) => res,
    }),
    deleteIncidentTypeById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/incidents/incident-types/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [
        tagTypes.IncidentTypeList,
        tagTypes.IncidentTypeDetail,
        tagTypes.IncidentOverview,
      ],
    }),
    updateIncidentType: builder.mutation<IIncidentType, IReqIncidentTypeUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/incidents/incident-types/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [
        tagTypes.IncidentTypeList,
        tagTypes.IncidentTypeDetail,
        tagTypes.IncidentOverview,
      ],
      transformResponse: (res: IIncidentType) => res,
    }),
    getIncidentTypeById: builder.query<IIncidentType, number>({
      query: (id) => ({
        url: `/incidents/incident-types/${id}/detail`,
        method: 'GET',
      }),
      providesTags: [tagTypes.IncidentTypeDetail],
      transformResponse: (res: IIncidentType) => res,
    }),
    batchUpdateIncidentTypes: builder.mutation<any, IReqIncidentTypeUpdate[]>({
      query: (req) => ({
        url: `/incidents/incident-types/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [
        tagTypes.IncidentTypeList,
        tagTypes.IncidentTypeDetail,
        tagTypes.IncidentOverview,
      ],
    }),
    batchCreateIncidentTypes: builder.mutation<any, IReqIncidentTypeCreate[]>({
      query: (req) => ({
        url: `/incidents/incident-types/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [
        tagTypes.IncidentTypeList,
        tagTypes.IncidentTypeDetail,
        tagTypes.IncidentOverview,
      ],
    }),
    batchDeleteIncidentTypes: builder.mutation<any, number[]>({
      query: (ids) => ({
        url: `/incidents/incident-types/batch/delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [
        tagTypes.IncidentTypeList,
        tagTypes.IncidentTypeDetail,
        tagTypes.IncidentOverview,
      ],
    }),
  }),
})
