import { createSlice } from '@reduxjs/toolkit'

import { ISelectItem, OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER, MONTHS } from '../../../helpers/constants'
import { ITaskAllocationPeriodicListFilters, ITaskAllocationRoutineListFilters, ITaskAllocationSLAListFilters } from '../../../types/performance'
import { generateYearOptions } from '../../../helpers/generateYearOptions'
import dayjs from 'dayjs'

// Define a type for the slice state
const yearItems = generateYearOptions()
const mon = MONTHS.find((f) => Number(f.value) === Number(dayjs().month()) + 1) as ISelectItem
const toDay = dayjs().format('ddd').toLowerCase()

interface TaskAllocationState {
  slaList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: ITaskAllocationSLAListFilters
  }
  routineList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: ITaskAllocationRoutineListFilters
  }
  periodicList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: ITaskAllocationPeriodicListFilters
  }
  adhockList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: ITaskAllocationSLAListFilters
  }
}

// Define the initial state using that type
const initialState: TaskAllocationState = {
  slaList: {
    pagination: {
      page: INITIAL_PAGE_NUMBER,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'desc',
      orderBy: 'updatedAt',
    },
    filters: {
      search: '',
      projects: [],
      locations: [],
    },
  },
  routineList: {
    pagination: {
      page: INITIAL_PAGE_NUMBER,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'desc',
      orderBy: 'createdAt',
    },
    filters: {
      search: '',
      projects: [],
      locations: [],
      roles: [],
      frequency: toDay,
    },
  },
  periodicList: {
    pagination: {
      page: INITIAL_PAGE_NUMBER,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'desc',
      orderBy: 'createdAt',
    },
    filters: {
      search: '',
      projects: [],
      locations: [],
      month: mon,
      year: yearItems[0],
      premises: [],
      activity: [],
      startDate: null,
      startTime: null
    },
  },
  adhockList: {
    pagination: {
      page: INITIAL_PAGE_NUMBER,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'desc',
      orderBy: 'updatedAt',
    },
    filters: {
      search: '',
      projects: [],
      locations: [],
    },
  },
}

const TaskAllocationSlice = createSlice({
  name: 'taskAllocation',
  initialState,
  reducers: {
    setPageForSLAList: (state, action) => {
      state.slaList.pagination.page = action.payload
    },
    setLimitForSLAList: (state, action) => {
      state.slaList.pagination.limit = action.payload
      state.slaList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDirForSLAList: (state, action) => {
      state.slaList.pagination.orderDir = action.payload
    },
    setOrderByForSLAList: (state, action) => {
      state.slaList.pagination.orderBy = action.payload
    },
    setFiltersForSLAList: (state, action) => {
      state.slaList.filters = action.payload
      state.slaList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setPageForRoutineList: (state, action) => {
      state.routineList.pagination.page = action.payload
    },
    setLimitForRoutineList: (state, action) => {
      state.routineList.pagination.limit = action.payload
      state.routineList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDirForRoutineList: (state, action) => {
      state.routineList.pagination.orderDir = action.payload
    },
    setOrderByForRoutineList: (state, action) => {
      state.routineList.pagination.orderBy = action.payload
    },
    setFiltersForRoutineList: (state, action) => {
      state.routineList.filters = action.payload
      state.routineList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setPageForPeriodicList: (state, action) => {
      state.periodicList.pagination.page = action.payload
    },
    setLimitForPeriodicList: (state, action) => {
      state.periodicList.pagination.limit = action.payload
      state.periodicList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDirForPeriodicList: (state, action) => {
      state.periodicList.pagination.orderDir = action.payload
    },
    setOrderByForPeriodicList: (state, action) => {
      state.periodicList.pagination.orderBy = action.payload
    },
    setFiltersForPeriodicList: (state, action) => {
      state.periodicList.filters = action.payload
      state.periodicList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setPageForAdhockList: (state, action) => {
      state.adhockList.pagination.page = action.payload
    },
    setLimitForAdhockList: (state, action) => {
      state.adhockList.pagination.limit = action.payload
      state.adhockList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDirForAdhockList: (state, action) => {
      state.adhockList.pagination.orderDir = action.payload
    },
    setOrderByForAdhockList: (state, action) => {
      state.adhockList.pagination.orderBy = action.payload
    },
    setFiltersForAdhockList: (state, action) => {
      state.adhockList.filters = action.payload
      state.adhockList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default TaskAllocationSlice
