import { createSlice } from '@reduxjs/toolkit'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { OrderDirection } from '../../../types/common'
import { IGetOneTask, ITaskListFilters } from '../../../types/task'
import dayjs from 'dayjs'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'

interface TaskListOverviewState {
    taskList: {
      pagination: {
        page: number
        limit: number
        orderDir: OrderDirection
        orderBy: keyof IGetOneTask
      }
      filters: ITaskListFilters
    }
  }
  
  // Define the initial state using that type
  const initialState: TaskListOverviewState = {
    taskList: {
      pagination: {
        page: 1,
        limit: ROW_PER_PAGE_OPTIONS[0],
        orderDir: 'desc',
        orderBy: 'startDate',
      },
      filters: {
        search: '',
        statuses: [],
        projects: [],
        locations: [],
        buildings: [],
        levels: [],
        areas: [],
        units: [],
        startDate: dayjs().startOf('month'),
        endDate: dayjs(),
        startTime: dayjs().startOf('day'),
        endTime: dayjs(),
      },
    },
  }
const taskListOverviewSlice = createSlice({
  name: 'taskListOverview',
  initialState,
  reducers: {
      setTaskListPage: (state, action) => {
        state.taskList.pagination.page = action.payload
      },
      setTaskListLimit: (state, action) => {
        state.taskList.pagination.limit = action.payload
        state.taskList.pagination.page = INITIAL_PAGE_NUMBER
      },
      setTaskListOrderDir: (state, action) => {
        state.taskList.pagination.orderDir = action.payload
      },
      setTaskListOrderBy: (state, action) => {
        state.taskList.pagination.orderBy = action.payload
      },
      setTaskListFilters: (state, action) => {
        state.taskList.filters = action.payload
        state.taskList.pagination.page = INITIAL_PAGE_NUMBER
      },
  },
})

export default taskListOverviewSlice
