import { createSlice } from '@reduxjs/toolkit'
import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IDeviceListFilters } from '../../../types/device'
import { IDevice } from '../../../api/models'

// Define a type for the slice state
interface DeviceOverviewTemplateState {
  deviceList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: keyof IDevice
    }
    filters: IDeviceListFilters
  }
}

// Define the initial state using that type
const initialState: DeviceOverviewTemplateState = {
  deviceList: {
    pagination: {
      page: 1,
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

const DeviceOverviewSlice = createSlice({
  name: 'overview',
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

export default DeviceOverviewSlice
