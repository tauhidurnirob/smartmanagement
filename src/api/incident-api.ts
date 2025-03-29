import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IIncident,
  IIncidentOverviewItem,
  IReqIncidentComment,
  IReqIncidentComplete,
  IReqIncidentCreate,
  IReqIncidentEventList,
  IReqIncidentList,
  IReqIncidentReport,
  IReqIncidentUpdate,
  IResIncidentReportsItem,
} from './models'
import { IReqFilter, IResList } from '../types/common'
import { IIncidentEVent } from '../types/incident'

// Api
export const IncidentApi = createApi({
  reducerPath: 'IncidentApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getIncidentOverview: builder.query<IIncidentOverviewItem[], void>({
      query: () => ({
        url: `/incidents/overview`,
        method: 'GET',
      }),
      providesTags: [tagTypes.IncidentOverview],
      transformResponse: (res: IIncidentOverviewItem[]) => res,
    }),
    getIncidentList: builder.query<IResList<IIncident>, IReqIncidentList>({
      query: (params) => ({
        url: `/incidents`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.IncidentList],
      transformResponse: (res: IResList<IIncident>) => res,
    }),
    createIncident: builder.mutation<IIncident, IReqIncidentCreate>({
      query: (req) => ({
        url: `/incidents`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.IncidentOverview, tagTypes.IncidentList, tagTypes.IncidentDetail],
      transformResponse: (res: IIncident) => res,
    }),
    deleteIncidentById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/incidents/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.IncidentOverview, tagTypes.IncidentList, tagTypes.IncidentDetail],
    }),
    updateIncident: builder.mutation<IIncident, IReqIncidentUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/incidents/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [
        tagTypes.IncidentEventList,
        tagTypes.IncidentOverview,
        tagTypes.IncidentList,
        tagTypes.IncidentDetail,
      ],
      transformResponse: (res: IIncident) => res,
    }),
    getIncidentById: builder.query<IIncident, number>({
      query: (id) => ({
        url: `/incidents/${id}/detail`,
        method: 'GET',
      }),
      providesTags: [tagTypes.IncidentDetail],
      transformResponse: (res: IIncident) => res,
    }),
    batchUpdateIncidents: builder.mutation<any, IReqIncidentUpdate[]>({
      query: (req) => ({
        url: `/incidents/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [
        tagTypes.IncidentEventList,
        tagTypes.IncidentOverview,
        tagTypes.IncidentList,
        tagTypes.IncidentDetail,
      ],
    }),
    batchCreateIncidents: builder.mutation<any, IReqIncidentCreate[]>({
      query: (req) => ({
        url: `/incidents/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [
        tagTypes.IncidentEventList,
        tagTypes.IncidentOverview,
        tagTypes.IncidentList,
        tagTypes.IncidentDetail,
      ],
    }),
    batchDeleteIncidents: builder.mutation<any, number[]>({
      query: (ids) => ({
        url: `/incidents/batch/delete`,
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: [
        tagTypes.IncidentEventList,
        tagTypes.IncidentOverview,
        tagTypes.IncidentList,
        tagTypes.IncidentDetail,
      ],
    }),
    acknowledgeIncident: builder.mutation<any, number>({
      query: (id) => ({
        url: `/incidents/${id}/acknowledge`,
        method: 'POST',
      }),
      invalidatesTags: [
        tagTypes.IncidentEventList,
        tagTypes.IncidentOverview,
        tagTypes.IncidentList,
        tagTypes.IncidentDetail,
      ],
    }),
    completeIncident: builder.mutation<any, IReqIncidentComplete>({
      query: (req) => {
        const { incidentId: id, file, comment } = req
        const data = new FormData()
        data.append('file', file)
        data.append('comment', comment)
        return {
          url: `/incidents/${id}/complete`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: [
        tagTypes.IncidentEventList,
        tagTypes.IncidentOverview,
        tagTypes.IncidentList,
        tagTypes.IncidentDetail,
      ],
    }),
    commentIncident: builder.mutation<any, IReqIncidentComment>({
      query: (req) => {
        const { incidentId: id, comment } = req
        return {
          url: `/incidents/${id}/comment`,
          method: 'POST',
          body: { comment },
        }
      },
      invalidatesTags: [
        tagTypes.IncidentEventList,
        tagTypes.IncidentOverview,
        tagTypes.IncidentList,
        tagTypes.IncidentDetail,
      ],
    }),

    getIncidentEvents: builder.query<IResList<IIncidentEVent>, IReqIncidentEventList>({
      query: (req) => {
        const { incidentId: id, ...rest } = req
        return {
          url: `/incidents/${id}/event-trails`,
          method: 'GET',
          params: rest,
        }
      },
      providesTags: [tagTypes.IncidentEventList],
      transformResponse: (res: IResList<IIncidentEVent>) => res,
    }),

    downloadIncidentReportExcel: builder.mutation<File, IReqIncidentReport>({
      query: (req) => {
        return {
          url: `/incidents/reports/download/excel`,
          method: 'GET',
          params: req,
          responseHandler: async (res) => await res.blob(),
        }
      },
    }),

    getIncidentReport: builder.query<IResIncidentReportsItem[], IReqIncidentReport>({
      query: (req) => {
        return {
          url: `/incidents/reports`,
          method: 'GET',
          params: req,
        }
      },
      providesTags: [tagTypes.IncidentReportList],
      transformResponse: (res: IResIncidentReportsItem[]) => res,
    }),
  }),
})
