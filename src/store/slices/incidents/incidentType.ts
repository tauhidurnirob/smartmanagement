import { createSlice } from '@reduxjs/toolkit'
import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IIncidentTypeListFilters } from '../../../types/incident'

// Define a type for the slice state
interface IncidentTypeState {
  typeList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: IIncidentTypeListFilters
  }
}

// Define the initial state using that type
const initialState: IncidentTypeState = {
  typeList: {
    pagination: {
      page: INITIAL_PAGE_NUMBER,
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

const IncidentTypeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.typeList.pagination.page = action.payload
    },
    setLimit: (state, action) => {
      state.typeList.pagination.limit = action.payload
      state.typeList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDir: (state, action) => {
      state.typeList.pagination.orderDir = action.payload
    },
    setOrderBy: (state, action) => {
      state.typeList.pagination.orderBy = action.payload
    },
    setFilters: (state, action) => {
      state.typeList.filters = action.payload
      state.typeList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default IncidentTypeSlice
