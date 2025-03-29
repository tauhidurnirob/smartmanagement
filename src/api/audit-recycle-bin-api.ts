import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IAuditFormTemplate,
  IAudit,
  IAuditRecycleBinSettings,
  IAuditSchedule,
  IReqAuditLogList,
  IReqAuditProjectSiteList,
} from '../types/audit'
import {
  ReqAuditRecycleBinSettingUpdate,
  ReqAuditScheduleList,
  ReqAuditFormTemplateList,
} from './models'
import { IResList } from '../types/common'
import { ILocation } from '../types/location'

// Api
export const AuditRecycleBinApi = createApi({
  reducerPath: 'AuditRecycleBinApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    // Settings
    getAuditRecycleBinSetting: builder.query<IAuditRecycleBinSettings, void>({
      query: () => ({
        url: `/audits/recycle-bin/settings`,
        method: 'GET',
      }),
      providesTags: [tagTypes.AuditRecycleBinSettings],
      transformResponse: (res: IAuditRecycleBinSettings) => res,
    }),
    updateAuditRecycleBinSetting: builder.mutation<
      IAuditRecycleBinSettings,
      ReqAuditRecycleBinSettingUpdate
    >({
      query: (req) => ({
        url: `/audits/recycle-bin/settings`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.AuditRecycleBinSettings],
      transformResponse: (res: IAuditRecycleBinSettings) => res,
    }),
    // Audit Logs
    getAuditLogListInRecycleBin: builder.query<IResList<IAudit>, IReqAuditLogList>({
      query: (params) => ({
        url: `/audits/recycle-bin/audit-logs`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IResList<IAudit>) => res,
      providesTags: [tagTypes.AuditLogListInRecycleBin],
    }),
    restoreAuditLogListInRecycleBin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/recycle-bin/audit-logs/restore`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditLogListInRecycleBin, tagTypes.AuditLogList],
    }),
    deleteAuditLogListPermanentlyInRecycleBin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/recycle-bin/audit-logs/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditLogListInRecycleBin],
    }),
    // Audit Schedule
    getAuditScheduleListInRecycleBin: builder.query<IResList<IAuditSchedule>, ReqAuditScheduleList>(
      {
        query: (params) => ({
          url: `/audits/recycle-bin/schedules`,
          method: 'GET',
          params: params,
        }),
        transformResponse: (res: IResList<IAuditSchedule>) => res,
        providesTags: [tagTypes.AuditScheduleListInRecycleBin],
      }
    ),
    restoreAuditScheduleListInRecycleBin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/recycle-bin/schedules/restore`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditScheduleListInRecycleBin, tagTypes.AuditScheduleList],
    }),
    deleteAuditScheduleListPermanentlyInRecycleBin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/recycle-bin/schedules/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditScheduleListInRecycleBin],
    }),
    // Audit Proejct Site
    getAuditProjectSiteListInRecycleBin: builder.query<
      IResList<ILocation>,
      IReqAuditProjectSiteList
    >({
      query: (params) => ({
        url: `/audits/recycle-bin/project-sites`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IResList<ILocation>) => {
        return res
      },
      providesTags: [tagTypes.AuditProjectSiteListInRecycleBin],
    }),
    restoreAuditProjectSiteListInRecycleBin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/recycle-bin/project-sites/restore`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditProjectSiteListInRecycleBin, tagTypes.AuditProjectSiteList],
    }),
    deleteAuditProjectSiteListPermanentlyInRecycleBin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/recycle-bin/project-sites/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditProjectSiteListInRecycleBin],
    }),
    // Audit Form Templates
    getAuditFormTemplateListInRecycleBin: builder.query<
      IResList<IAuditFormTemplate>,
      ReqAuditFormTemplateList
    >({
      query: (params) => ({
        url: `/audits/recycle-bin/form-templates`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IResList<IAuditFormTemplate>) => res,
      providesTags: [tagTypes.AuditFormTemplateListInRecycleBin],
    }),
    restoreAuditFormTemplateListInRecycleBin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/recycle-bin/form-templates/restore`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditFormTemplateListInRecycleBin, tagTypes.AuditFormTemplateList],
    }),
    deleteAuditFormTemplateListPermanentlyInRecycleBin: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/audits/recycle-bin/form-templates/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.AuditFormTemplateListInRecycleBin],
    }),
  }),
})
