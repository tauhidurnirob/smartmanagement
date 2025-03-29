import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IDevice,
  IReqDeviceAirRefresherCallService,
  IReqDeviceControlAction,
  IReqDeviceCreate,
  IReqDeviceList,
  IReqDeviceRobotCallService,
  IReqDeviceSettingUpdate,
  IReqDeviceSwap,
  IReqDeviceUpdate,
  IResDeviceOverview,
} from './models'
import { IResList } from '../types/common'

// Api
export const DeviceApi = createApi({
  reducerPath: 'DeviceApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getDeviceList: builder.query<IResList<IDevice>, IReqDeviceList>({
      query: (params) => ({
        url: `/devices/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceList],
      transformResponse: (res: IResList<IDevice>) => res,
    }),
    getSpecificDevice: builder.query<IDevice, number>({
      query: (id) => ({
        url: `/devices/getById/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: IDevice) => res,
    }),
    getDevicesOverview: builder.query<IResDeviceOverview, void>({
      query: () => ({
        url: `/devices/overview`,
        method: 'GET',
      }),
      providesTags: [tagTypes.DeviceOverview],
      transformResponse: (res: IResDeviceOverview) => res,
    }),
    createDevice: builder.mutation<IDevice, IReqDeviceCreate>({
      query: (req) => ({
        url: `/devices`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceList, tagTypes.DeviceOverview],
      transformResponse: (res: IDevice) => res,
    }),
    deleteDeviceById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/devices/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.DeviceList, tagTypes.DeviceOverview],
    }),
    updateDevice: builder.mutation<IDevice, IReqDeviceUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/devices/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.DeviceList, tagTypes.DeviceOverview],
      transformResponse: (res: IDevice) => res,
    }),
    getDeviceById: builder.query<IDevice, number>({
      query: (id) => ({
        url: `/devices/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: IDevice) => res,
    }),
    swapDevice: builder.mutation<any, IReqDeviceSwap>({
      query: (req) => ({
        url: `/devices/swap`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceList],
    }),
    getDeviceRobotByID: builder.query<IDevice, string>({
      query: (id) => ({
        url: `/devices/robot/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: IDevice) => res,
    }),

    callServiceForRobot: builder.mutation<any, IReqDeviceRobotCallService>({
      query: ({id, ...rest}) => ({
        url: `devices/robot/${id}/call-service`,
        method: 'POST',
        body: rest,
        transformResponse: (res: any) => res,
      }),
    }),
    callServiceForAirRefresher: builder.mutation<any, IReqDeviceAirRefresherCallService>({
      query: ({id, ...rest}) => ({
        url: `devices/air-refresher/${id}/call-service`,
        method: 'POST',
        body: rest,
        transformResponse: (res: any) => res,
      }),
    }),
    
    getDeviceSmartBins: builder.mutation<any,void>({
      query: () => ({
        url: `devices/smart-bins`,
        method: 'GET',
        transformResponse: (res: any) => res,
      }),
    }),
    batchUpdateDevices: builder.mutation<any, IReqDeviceUpdate[]>({
      query: (req) => ({
        url: `/devices/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceList, tagTypes.DeviceOverview],
    }),
    updateDeviceSetting: builder.mutation({
      query: ({ id, payload }: { id: number; payload: Partial<IReqDeviceSettingUpdate> }) => ({
        url: `/devices/setting/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [tagTypes.DevicSetting, tagTypes.DevicSettingList],
    }),
    batchCreateDevices: builder.mutation<any, IReqDeviceCreate[]>({
      query: (req) => ({
        url: `/devices/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.DeviceList, tagTypes.DeviceOverview],
    }),
    batchDeleteDevices: builder.mutation<any, number[]>({
      query: (ids) => ({
        url: `/devices/batch/delete`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: [tagTypes.DeviceList, tagTypes.DeviceOverview],
    }),
    batchUploadDevices: builder.mutation({
      query: (payload: File) => {
        const data = new FormData()
        data.append('file', payload)
        return {
          url: `/devices/batch/upload`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: [tagTypes.DeviceList, tagTypes.DeviceOverview],
    }),
    downloadTemplateDeviceUpload: builder.mutation<File, void>({
      query: () => ({
        url: `/devices/download/template`,
        method: 'GET',
        responseHandler: async (res) => await res.blob(),
      }),
    }),
    updateDeviceAction: builder.mutation<void, IReqDeviceControlAction>({
      query: (req) => ({
        url: `/devices/control`,
        method: 'POST',
        body: req,
        invalidatesTags: [tagTypes.DeviceList, tagTypes.DeviceOverview],
      }),
    }),
    updateAmmoniaSensor: builder.mutation<void, {deviceName: string, level: number}>({
      query: (req) => ({
        url: `/devices/updateAmmoniaSensor`,
        method: 'POST',
        params: req,
      }),
    }),
    updateSmartBin: builder.mutation<void, {deviceName: string, weight: number}>({
      query: (req) => ({
        url: `devices/updateSmartBin`,
        method: 'POST',
        params: req,
      }),
    }),
  }),
})
