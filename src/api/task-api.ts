import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-api'

import tagTypes from './tagTypes'
import { IReqFilter, IResList } from '../types/common'
import {
  AutomationTaskLog,
  IActivityList,
  IGetOneTask,
  IReqAutomationFlow,
  IReqAutomationTaskLogListFilters,
  IReqTaskListFilters,
  ITask,
  PostCreateTask,
  PostCreateTaskRoutine,
} from '../types/task'
import { IReqTaskPeriodicList, IReqTaskRoutineList } from './models'
import { ITaskList, ITaskRoutine } from '../types/performance-management'
import { IResPremiseCategory } from '../types/premiseCategory'

// Api
export const TaskApi = createApi({
  reducerPath: 'TaskApi',
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    createTask: builder.mutation<Partial<PostCreateTask>, PostCreateTask>({
      query: (req) => ({
        url: `/tasks`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.TaskList],
    }),
    getTaskById: builder.query<IGetOneTask, { taskId: number }>({
      query: (req) => ({
        url: `/tasks/${req.taskId}`,
        method: 'GET',
      }),
      providesTags: (result, err, { taskId }) =>
        result
          ? [{ type: tagTypes.TaskListPeriodic, id: taskId }]
          : [{ type: tagTypes.TaskListPeriodic }],
    }),
    getTaskList: builder.query<IResList<ITask>, IReqTaskListFilters>({
      query: (params) => ({
        url: `/tasks`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.TaskList],
      transformResponse: (res: IResList<ITask>) => res,
    }),
    getTaskListRoutine: builder.query<IResList<ITaskRoutine>, IReqTaskRoutineList>({
      query: (params) => ({
        url: `/tasks/routine/getbyFilter`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IResList<ITaskRoutine>) => res,
      providesTags: [tagTypes.TaskListRoutine],
    }),
    createTaskRoutine: builder.mutation<Partial<PostCreateTaskRoutine>, PostCreateTaskRoutine>({
      query: (req) => ({
        url: `/tasks/routine`,
        method: 'POST',
        body: req,
      }),
      invalidatesTags: [tagTypes.TaskListRoutine],
      transformResponse: (res: Partial<PostCreateTaskRoutine>) => res,
    }),
    getTaskListPeriodic: builder.query<IResList<ITaskList>, IReqTaskPeriodicList>({
      query: (params) => ({
        url: `/tasks/periodic`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IResList<ITaskList>) => res,
      providesTags: [tagTypes.TaskListPeriodic, tagTypes.TaskList],
    }),
    getDeviceType: builder.query({
      query: (params) => ({
        url: `/devices/device-types/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceTypeList],
      transformResponse: (res: IReqAutomationFlow) => res,
    }),
    getDeviceList: builder.query({
      query: (params) => ({
        url: `/devices/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.DeviceTypeList],
      transformResponse: (res: { count: number; rows: any[] }) => res,
    }),
    postAutomationFlow: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/tasks/${id}/automation-flow`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [tagTypes.PostAutomationFlow],
      transformResponse: (res: IReqAutomationFlow) => res,
    }),
    GetAutomationFlow: builder.query({
      query: (req) => ({
        url: `/tasks/${req.id}/automation-flow`,
        method: 'GET',
        params: req.body,
      }),
      providesTags: [tagTypes.PostAutomationFlow],
      transformResponse: (res: IReqAutomationFlow) => res,
    }),
    UpdateAutomationFlow: builder.mutation({
      query: (req) => {
        const { id, ...rest } = req
        return {
          url: `/tasks/${id}/automation-flow`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.PostAutomationFlow],
      transformResponse: (res: IReqAutomationFlow) => res,
    }),
    deleteTask: builder.mutation({
      query: (id: number) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.TaskList, tagTypes.TaskById, tagTypes.TaskListPeriodic],
    }),
    getTaskActivitiesList: builder.query({
      query: (params) => ({
        url: `/tasks/activities`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: IActivityList) => res,
      providesTags: [tagTypes.TaskActivitiesList],
    }),
    getTaskPremiseList: builder.query<IResList<IResPremiseCategory>, IReqFilter>({
      query: (params) => ({
        url: `/tasks/premise-category`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.TaskPremiseList],
    }),
    updateTaskFormById: builder.mutation<
      Partial<PostCreateTask>,
      { id: number; body: Partial<PostCreateTask> }
    >({
      query: (req: { id: number; body: Partial<PostCreateTask> }) => {
        return {
          url: `/tasks/${req.id}`,
          method: 'PATCH',
          body: req.body,
        }
      },
      invalidatesTags: (result, err, { id }) => [{ type: tagTypes.TaskListPeriodic, id }],
    }),
    getAdHocTaskList: builder.query({
      query: (params) => ({
        url: `/tasks/ad-hock`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.TaskList],
    }),
    getTaskStaffList: builder.query({
      query: (params) => ({
        url: `/tasks/staffs/for-web`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.TasksStaffList],
    }),
    batchUploadAdHock: builder.mutation({
      query: (payload: File) => {
        const data = new FormData()
        data.append('file', payload)
        return {
          url: `/tasks/uploadExcel`,
          method: 'POST',
          body: data,
        }
      },
    }),
    updateTask: builder.mutation<Partial<PostCreateTask>, PostCreateTask>({
      query: (req) => {
        const { taskId, ...rest } = req
        return {
          url: `/tasks/${taskId}`,
          method: 'PATCH',
          body: rest,
        }
      },
      invalidatesTags: [tagTypes.TaskList],
      transformResponse: (res: Partial<PostCreateTask>) => res,
    }),
    taskActivities: builder.query({
      query: () => ({
        url: `/tasks/activities`,
        method: 'GET',
      }),
      providesTags: [tagTypes.TaskActivitiesList],
      transformResponse: (res) => res,
    }),
    batchDeleteTasks: builder.mutation({
      query: (ids: number[]) => ({
        url: `/tasks/batch/delete`,
        params: { ids },
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.TaskList, tagTypes.TaskListPeriodic],
    }),
    getDevicesById: builder.query({
      query: (id: number) => ({
        url: `devices/getById/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.DevicesById],
    }),
    getRobotGetAvailableTasks: builder.query({
      query: (params: { robotType: string }) => ({
        url: `/devices/robot/get-available-tasks?robotType=${params.robotType}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.robotGetAvailableTasks],
    }),
    airRefresherCallService: builder.mutation({
      query: (params: {
        id: number
        body: {
          command: string
          args: {
            args: {
              task_name: string
            }
            command: string
          }
        }
      }) => ({
        url: `devices/air-refresher/${params.id}/call-service`,
        params: params.body,
        method: 'POST',
      }),
      invalidatesTags: [tagTypes.AirRefresherCallService],
    }),
    userSendNotification: builder.mutation({
      query: (params: {
        id: number
        body: {
          title: 'string'
          message: 'string'
          type: 'string'
        }
      }) => ({
        url: `user/${params.id}/sendNotification`,
        params: params.body,
        method: 'POST',
      }),
      invalidatesTags: [tagTypes.UserSendNotification],
    }),
    getAutomationTaskLogList: builder.query<
      IResList<AutomationTaskLog>,
      IReqAutomationTaskLogListFilters
    >({
      query: (params) => ({
        url: `/tasks/automation-logs/getByFilter`,
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.AutomationTasklogList],
    }),
  }),
})
