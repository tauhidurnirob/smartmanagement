import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISelectItem } from '../../../types/common'
import dayjs, { Dayjs } from 'dayjs'
import { IPerformanceOverviewFilters } from '../../../types/performance-management'

// Define a type for the slice state
interface PerformanceOverviewState {
  filters: IPerformanceOverviewFilters
}

// Define the initial state using that type
const initialState: PerformanceOverviewState = {
  filters: {
    search: '',
    projects: [],
    locations: [],
    buildings: [],
    levels: [],
    areas: [],
    units: [],
    startDate: dayjs().startOf('day'),
    endDate: dayjs().endOf('day')
  }
}

const performanceOverviewSlice = createSlice({
  name: 'performanceOverview',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload
    },
  },
})

export default performanceOverviewSlice