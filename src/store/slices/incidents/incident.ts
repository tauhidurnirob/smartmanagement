import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IIncidentListFilters } from '../../../types/incident'

// Define a type for the slice state
interface IncidentState {
  incidentList: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: IIncidentListFilters
  }
}

// Define the initial state using that type
const initialState: IncidentState = {
  incidentList: {
    pagination: {
      page: INITIAL_PAGE_NUMBER,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderDir: 'desc',
      orderBy: 'updatedAt',
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
      startDate: dayjs().startOf('month'),
      endDate: dayjs().endOf('month'),
    },
  },
}

const IncidentSlice = createSlice({
  name: 'incident',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.incidentList.pagination.page = action.payload
    },
    setLimit: (state, action) => {
      state.incidentList.pagination.limit = action.payload
      state.incidentList.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDir: (state, action) => {
      state.incidentList.pagination.orderDir = action.payload
    },
    setOrderBy: (state, action) => {
      state.incidentList.pagination.orderBy = action.payload
    },
    setFilters: (state, action) => {
      state.incidentList.filters = action.payload
      state.incidentList.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default IncidentSlice
