import { createSlice } from '@reduxjs/toolkit'
import { ISelectItem } from '../../../types/common'
import dayjs, { Dayjs } from 'dayjs'
import { INITIAL_PAGE_NUMBER, ROW_PER_PAGE_OPTIONS } from '../../../helpers/constants'

// Define a type for the slice state
interface AuditResultState {
  page: number
  limit: number
  selectedForm: number | null
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  search: string
  filters: { states: number[] }
  startDate: Dayjs | null
  endDate: Dayjs | null
}

// Define the initial state using that type
const initialState: AuditResultState = {
  page: 1,
  limit: ROW_PER_PAGE_OPTIONS[0],
  selectedForm: 0,
  selectedProjects: [],
  selectedLocations: [],
  search: '',
  filters: { states: [] },
  startDate: dayjs().startOf('month'),
  endDate: dayjs(),
}

const auditResultSlice = createSlice({
  name: 'auditResult',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
      state.page = INITIAL_PAGE_NUMBER
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

export default auditResultSlice
