import { createSlice } from '@reduxjs/toolkit'
import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IDeviceListFilters } from '../../../types/device'

// Define a type for the slice state
interface DeviceSwapState {
  deviceList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: IDeviceListFilters
  }
}

// Define the initial state using that type
const initialState: DeviceSwapState = {
  deviceList: {
    pagination: {
      page: INITIAL_PAGE_NUMBER,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'asc',
      orderBy: 'identificationNo',
    },
    filters: {
      search: '',
      types: [],
      statuses: [],
      projects: [],
      locations: [],
      buildings: [],
      levels: [],
      areas: [],
      units: [],
    },
  },
}

const DeviceSwapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setDeviceListPage: (state, action) => {
      state.deviceList.pagination.page = action.payload
    },
    setDeviceListLimit: (state, action) => {
      state.deviceList.pagination.limit = action.payload
      state.deviceList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setDeviceListOrderDir: (state, action) => {
      state.deviceList.pagination.orderDir = action.payload
    },
    setDeviceListOrderBy: (state, action) => {
      state.deviceList.pagination.orderBy = action.payload
    },
    setDeviceListFilters: (state, action) => {
      state.deviceList.filters = action.payload
      state.deviceList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default DeviceSwapSlice
