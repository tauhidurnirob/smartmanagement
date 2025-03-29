import { createSlice } from '@reduxjs/toolkit'
import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IDeviceControlListFilters } from '../../../types/device'

// Define a type for the slice state
interface DeviceControlTemplateState {
  controlList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: IDeviceControlListFilters
  }
}

// Define the initial state using that type
const initialState: DeviceControlTemplateState = {
  controlList: {
    pagination: {
      page: 1,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'asc',
      orderBy: 'name',
    },
    filters: {
      search: '',
      projects: [],
      locations: [],
    },
  },
}

const DeviceControlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setControlListPage: (state, action) => {
      state.controlList.pagination.page = action.payload
    },
    setControlListLimit: (state, action) => {
      state.controlList.pagination.limit = action.payload
      state.controlList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setControlListOrderDir: (state, action) => {
      state.controlList.pagination.orderDir = action.payload
    },
    setControlListOrderBy: (state, action) => {
      state.controlList.pagination.orderBy = action.payload
    },
    setControlListFilters: (state, action) => {
      state.controlList.filters = action.payload
      state.controlList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default DeviceControlSlice
