import { createSlice } from '@reduxjs/toolkit'
import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IDeviceScheduleListFilters } from '../../../types/device'

// Define a type for the slice state
interface DeviceScheduleState {
  scheduleList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: IDeviceScheduleListFilters
  }
}

// Define the initial state using that type
const initialState: DeviceScheduleState = {
  scheduleList: {
    pagination: {
      page: INITIAL_PAGE_NUMBER,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'desc',
      orderBy: 'id',
    },
    filters: {
      search: '',
      projects: [],
      locations: [],
      buildings: [],
      levels: [],
      areas: [],
      units: [],
    },
  },
}

const DeviceScheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.scheduleList.pagination.page = action.payload
    },
    setLimit: (state, action) => {
      state.scheduleList.pagination.limit = action.payload
      state.scheduleList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDir: (state, action) => {
      state.scheduleList.pagination.orderDir = action.payload
    },
    setOrderBy: (state, action) => {
      state.scheduleList.pagination.orderBy = action.payload
    },
    setFilters: (state, action) => {
      state.scheduleList.filters = action.payload
      state.scheduleList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default DeviceScheduleSlice
