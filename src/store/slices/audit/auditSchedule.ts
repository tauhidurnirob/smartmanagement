import { createSlice } from '@reduxjs/toolkit'
import { ISelectItem, OrderDirection } from '../../../types/common'
import { IDateRange } from '../../../modules/common/CustomDateRange'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { AUDIT_SCHEDULE_FREQUENCYS, INITIAL_PAGE_NUMBER } from '../../../helpers/constants'

// Define a type for the slice state
interface AuditScheduleState {
  page: number
  limit: number
  orderDir: OrderDirection
  orderBy: string
  selectedFrequency: ISelectItem
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  search: string
  dateRange: IDateRange
}

// Define the initial state using that type
const initialState: AuditScheduleState = {
  page: 1,
  limit: ROW_PER_PAGE_OPTIONS[0],
  orderDir: 'desc',
  orderBy: 'id',
  selectedProjects: [],
  selectedLocations: [],
  selectedFrequency: AUDIT_SCHEDULE_FREQUENCYS[0],
  search: '',
  dateRange: {
    startDate: null,
    endDate: null,
  },
}

const auditScheduleSlice = createSlice({
  name: 'auditSchedule',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setOrderDir: (state, action) => {
      state.orderDir = action.payload
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload
    },
    setSelectedProjects: (state, action) => {
      state.selectedProjects = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedLocations: (state, action) => {
      state.selectedLocations = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedFrequency: (state, action) => {
      state.selectedFrequency = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSearch: (state, action) => {
      state.search = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default auditScheduleSlice
