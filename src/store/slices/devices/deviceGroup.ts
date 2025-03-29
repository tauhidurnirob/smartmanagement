import { createSlice } from '@reduxjs/toolkit'
import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IDeviceGroupListFilters } from '../../../types/device'
import { IDeviceGroup } from '../../../api/models'

// Define a type for the slice state
interface DeviceGroupTemplateState {
  groupList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: keyof IDeviceGroup
    }
    filters: IDeviceGroupListFilters
  }
}

// Define the initial state using that type
const initialState: DeviceGroupTemplateState = {
  groupList: {
    pagination: {
      page: 1,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'asc',
      orderBy: 'groupName',
    },
    filters: {
      search: '',
      projects: [],
      locations: [],
    },
  },
}

const DeviceGroupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setDeviceGroupListPage: (state, action) => {
      state.groupList.pagination.page = action.payload
    },
    setDeviceGroupListLimit: (state, action) => {
      state.groupList.pagination.limit = action.payload
      state.groupList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setDeviceGroupListOrderDir: (state, action) => {
      state.groupList.pagination.orderDir = action.payload
    },
    setDeviceGroupListOrderBy: (state, action) => {
      state.groupList.pagination.orderBy = action.payload
    },
    setDeviceGroupListFilters: (state, action) => {
      state.groupList.filters = action.payload
      state.groupList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default DeviceGroupSlice
