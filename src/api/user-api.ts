import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'
import {
  IUser,
  ReqUserChangePasswordByEmail,
  ReqUserLogin,
  ReqUserRequestPassword,
  ReqUserValidateOtp,
  IChangeEmailPayload,
  IChangePasswordPayload,
  IReqUserSettingUpdate,
  IReqUserList,
  IReqUserSettingCreate,
  IReqUserBatchDelete,
  IReqUserActivityList,
  IreqRefreshTokenPayload,
} from './models'
import tagTypes from './tagTypes'
import { IResList } from '../types/common'
import { IActivityLog } from '../types/activity'

// Api
export const UserApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (payload: ReqUserLogin) => ({
        url: `/auth/login`,
        method: 'POST',
        params: { appType: 'web' },
        body: payload,
      }),
    }),
    resendOTP: builder.mutation({
      query: (payload: ReqUserRequestPassword) => ({
        url: `/auth/resend-otp-code`,
        method: 'POST',
        body: payload,
      }),
    }),
    requestPassword: builder.mutation({
      query: (payload: ReqUserRequestPassword) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body: payload,
      }),
    }),
    validateOTP: builder.mutation({
      query: (payload: ReqUserValidateOtp) => ({
        url: `/auth/validate-otp`,
        method: 'POST',
        body: payload,
      }),
    }),
    changePasswordByEmail: builder.mutation({
      query: (payload: ReqUserChangePasswordByEmail) => ({
        url: `/auth/change-password`,
        method: 'POST',
        body: payload,
      }),
    }),
    uploadImage: builder.mutation({
      query: (payload: File) => {
        const data = new FormData()
        data.append('file', payload)
        return {
          url: `/upload`,
          method: 'POST',
          body: data,
        }
      },
    }),
    changeEmail: builder.mutation({
      query: (payload: IChangeEmailPayload) => ({
        url: `/auth/changeEmail`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [tagTypes.User],
    }),
    changePassword: builder.mutation({
      query: (payload: IChangePasswordPayload) => ({
        url: `/auth/changePasswordWeb`,
        method: 'POST',
        body: payload,
      }),
    }),
    getUserById: builder.query({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.User],
    }),
    updateUserById: builder.mutation({
      query: (payload: IReqUserSettingUpdate) => ({
        url: `/users/${payload.id}`,
        method: 'PUT',
        body: payload.data,
      }),
      invalidatesTags: [tagTypes.User, tagTypes.UserList],
    }),
    deleteUsers: builder.mutation({
      query: (payload: IReqUserBatchDelete) => ({
        url: `/users/batch/delete`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: [tagTypes.User, tagTypes.UserList],
    }),
    createUser: builder.mutation({
      query: (payload: IReqUserSettingCreate) => ({
        url: `/users/create`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [tagTypes.User, tagTypes.UserList],
    }),
    getUserList: builder.query<IResList<IUser>, IReqUserList>({
      query: (params) => ({
        url: `/users`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.UserList],
      transformResponse: (res: IResList<IUser>) => res,
    }),
    getUserActivityList: builder.query<IResList<IActivityLog>, IReqUserActivityList>({
      query: (params) => {
        const { userId, ...data } = params
        return {
          url: `/users/${userId}/activity`,
          method: 'GET',
          params: data,
        }
      },
      providesTags: [tagTypes.UserActivityList],
      transformResponse: (res: IResList<IActivityLog>) => res,
    }),
    batchUploadUsers: builder.mutation({
      query: (payload: File) => {
        const data = new FormData()
        data.append('file', payload)
        return {
          url: `/users/batch/upload`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: [tagTypes.UserList, tagTypes.User],
    }),
    downloadTemplateUserUpload: builder.mutation<File, void>({
      query: () => ({
        url: `/users/download/template`,
        method: 'GET',
        responseHandler: async (res) => await res.blob(),
      }),
    }),
    getRefreshToken: builder.mutation({
      query: ({ payload, queryData }: { payload: IreqRefreshTokenPayload, queryData: { appType: string } }) => ({
        url: `/auth/refresh-token?appType=${queryData.appType}`,
        method: 'POST',
        body: payload,
      }),
    }),
    registerUser: builder.mutation({
      query: (payload: IUser) => ({
        url: `/auth/register`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

