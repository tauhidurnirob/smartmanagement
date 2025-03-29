import { createSlice } from '@reduxjs/toolkit'
import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IDeviceLocationListFilters } from '../../../types/device'

// Define a type for the slice state
interface DeviceLocationState {
  locationList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: IDeviceLocationListFilters
  }
}

// Define the initial state using that type
const initialState: DeviceLocationState = {
  locationList: {
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
    },
  },
}

const DeviceLocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.locationList.pagination.page = action.payload
    },
    setLimit: (state, action) => {
      state.locationList.pagination.limit = action.payload
      state.locationList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDir: (state, action) => {
      state.locationList.pagination.orderDir = action.payload
    },
    setOrderBy: (state, action) => {
      state.locationList.pagination.orderBy = action.payload
    },
    setFilters: (state, action) => {
      state.locationList.filters = action.payload
      state.locationList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default DeviceLocationSlice
