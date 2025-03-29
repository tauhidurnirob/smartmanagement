import { createSlice } from '@reduxjs/toolkit'
import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IDeviceLinkageListFilters } from '../../../types/device'
import { IDeviceLinkage } from '../../../api/models'

// Define a type for the slice state
interface DeviceLinkageTemplateState {
  linkageList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: keyof IDeviceLinkage
    }
    filters: IDeviceLinkageListFilters
  }
}

// Define the initial state using that type
const initialState: DeviceLinkageTemplateState = {
  linkageList: {
    pagination: {
      page: 1,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'asc',
      orderBy: 'linkageName',
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

const DeviceLinkageSlice = createSlice({
  name: 'linkage',
  initialState,
  reducers: {
    setDeviceLinkageListPage: (state, action) => {
      state.linkageList.pagination.page = action.payload
    },
    setDeviceLinkageListLimit: (state, action) => {
      state.linkageList.pagination.limit = action.payload
      state.linkageList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setDeviceLinkageListOrderDir: (state, action) => {
      state.linkageList.pagination.orderDir = action.payload
    },
    setDeviceLinkageListOrderBy: (state, action) => {
      state.linkageList.pagination.orderBy = action.payload
    },
    setDeviceLinkageListFilters: (state, action) => {
      state.linkageList.filters = action.payload
      state.linkageList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default DeviceLinkageSlice
