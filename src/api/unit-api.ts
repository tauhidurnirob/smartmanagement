import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import {
  IUnit,
  IReqUnitCreate,
  IReqUnitList,
  IReqUnitUpdate,
  IReqUnitWashroomList,
  IProjectWashroomList, IDeviceType, ReqLocationUpdate, ISensors,
} from './models'
import { IResList } from '../types/common'
import { ILocation } from '../types/location'

// Api
export const UnitApi = createApi({
  reducerPath: 'UnitApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    getUnitList: builder.query<IResList<IUnit>, IReqUnitList>({
      query: (params) => ({
        url: `/units`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.UnitList],
      transformResponse: (res: IResList<IUnit>) => res,
    }),
    createUnit: builder.mutation<IUnit, IReqUnitCreate>({
      query: (req) => ({
        url: `/units`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.UnitList],
      transformResponse: (res: IUnit) => res,
    }),
    updateUnit: builder.mutation<IUnit, IReqUnitUpdate>({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/units/${id}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.UnitList],
      transformResponse: (res: IUnit) => res,
    }),
    deleteUnitById: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/units/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [tagTypes.UnitList],
    }),
    getUnitById: builder.query<IUnit, number>({
      query: (id) => ({
        url: `/units/${id}/detail`,
        method: 'GET',
      }),
      transformResponse: (res: IUnit) => res,
    }),
    getDeviceTypeByFilterWithLocation: builder.query<IDeviceType, any>({
      query: () => ({
        url: `/washroom/getThresholdSettings`,
        method: 'GET',
      }),
      transformResponse: (res: IDeviceType) => res,
    }),
    getProjectUnitList: builder.query<IResList<IProjectWashroomList>, IReqUnitWashroomList>({
      query: (params) => ({
        url: `/washroom/getByFilter`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IResList<IProjectWashroomList>) => res,
    }),
    getWashroomOverview: builder.query<any, any>({
      query: (params) => ({
        url: `/washroom/overview`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: any) => {
        const temp = [];
        const rows = res.rows;
        for(let i = 0; i < rows.length; i++){
          const unit: any = rows[i];
          const rowTemp: { devices: any, unit: {id: number, name: string, area: any} } = {
            devices: unit && unit.deviceUnit && unit?.deviceUnit.map((item: any) => {
              const device = item && item.device || {};
              return {
                "deviceId": device?.id || 0,
                "name": device?.deviceName || "",
                "status": "normal",
                "value": device?.value || 0,
                "sensors": [
                  {
                    "value": device?.value || 0,
                    "position": {
                      "x": device?.positionX || 0,
                      "y": device?.positionY || 0
                    }
                  }
                ]
              };
            }),
            unit: {
              id: unit?.id,
              name: unit?.name,
              area: unit?.area
            }
          };
          temp.push(rowTemp);
        }
        return temp;
      },
    }),
    batchUpdateUnits: builder.mutation<any, IReqUnitUpdate[]>({
      query: (req) => ({
        url: `/units/batch/update`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.UnitList],
    }),
    batchCreateUnits: builder.mutation<any, IReqUnitCreate[]>({
      query: (req) => ({
        url: `/units/batch/create`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.UnitList],
    }),
    updateLocationThreshold: builder.mutation<ILocation, ReqLocationUpdate>({
      query: (req) => ({
        url: `/washroom/threshold/${req.id}`,
        method: 'PATCH',
        body: req,
      }),
      invalidatesTags: [tagTypes.AuditLocationListQuery],
      transformResponse: (res: ILocation) => res,
    }),
    getWashroomDeviceSensors: builder.mutation<ISensors[], ReqLocationUpdate>({
      query: (req) => ({
        url: `/washroom/device-sensors/${req.id}`,
        method: 'GET'
      }),
      invalidatesTags: [tagTypes.AuditLocationListQuery],
      transformResponse: (res: ISensors[]) => res,
    }),
  }),
})
