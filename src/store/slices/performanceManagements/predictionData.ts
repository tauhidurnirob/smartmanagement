import { createSlice } from '@reduxjs/toolkit'

import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IPredictionDataListFilters } from '../../../types/performance'

// Define a type for the slice state
interface PredictionDataState {
  list: {
    pagination: {
      page: number
      limit: number
      orderDir: OrderDirection
      orderBy: string
    }
    filters: IPredictionDataListFilters
  }
}

// Define the initial state using that type
const initialState: PredictionDataState = {
  list: {
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

const PredictionDataSlice = createSlice({
  name: 'predictionData',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.list.pagination.page = action.payload
    },
    setLimit: (state, action) => {
      state.list.pagination.limit = action.payload
      state.list.pagination.page = INITIAL_PAGE_NUMBER
    },
    setOrderDir: (state, action) => {
      state.list.pagination.orderDir = action.payload
    },
    setOrderBy: (state, action) => {
      state.list.pagination.orderBy = action.payload
    },
    setFilters: (state, action) => {
      state.list.filters = action.payload
      state.list.pagination.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default PredictionDataSlice
