import { createSlice } from '@reduxjs/toolkit'
import { ISelectItem, OrderDirection } from '../../../types/common'
import dayjs, { Dayjs } from 'dayjs'
import { IAuditLogMoreFilters } from '../../../types/audit'
import { INITIAL_PAGE_NUMBER, ROW_PER_PAGE_OPTIONS } from '../../../helpers/constants'
import { IIncidentListFilters } from '../../../types/incident'

// Define a type for the slice state
interface AuditLogsState {
  page: number
  limit: number
  orderDir: OrderDirection
  orderBy: string
  selectedForm: number
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  search: string
  filters: any
  startDate: Dayjs | null
  endDate: Dayjs | null
}

// Define the initial state using that type
const initialState: AuditLogsState = {
  page: 1,
  limit: ROW_PER_PAGE_OPTIONS[0],
  orderDir: 'desc',
  orderBy: 'submittedAt',
  selectedForm: 0,
  selectedProjects: [],
  selectedLocations: [],
  search: '',
  filters: {
    performances: [],
    audits: [],
  },
  startDate: dayjs().startOf('month'),
  endDate: dayjs(),
}

const auditLogSlice = createSlice({
  name: 'auditLogs',
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
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedProjects: (state, action) => {
      state.selectedProjects = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedLocations: (state, action) => {
      state.selectedLocations = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSearch: (state, action) => {
      state.search = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setFilters: (state, action) => {
      state.filters = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default auditLogSlice
