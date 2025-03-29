import { createSlice } from '@reduxjs/toolkit'
import { ISelectItem, OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IProjectListFilters } from '../../../types/project'

// Define a type for the slice state
interface AuditFormTemplateState {
  list: {
    page: number
    limit: number
    orderDir: OrderDirection
    orderBy: string
    filters: IProjectListFilters
  }
}

// Define the initial state using that type
const initialState: AuditFormTemplateState = {
  list: {
    page: 1,
    limit: ROW_PER_PAGE_OPTIONS[0],
    orderDir: 'asc',
    orderBy: 'name',
    filters: {
      projects: [],
      locations: [],
      search: '',
    },
  },
}

const SettingProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setListPage: (state, action) => {
      state.list.page = action.payload
    },
    setListLimit: (state, action) => {
      state.list.limit = action.payload
      state.list.page = INITIAL_PAGE_NUMBER
    },
    setListOrderDir: (state, action) => {
      state.list.orderDir = action.payload
    },
    setListOrderBy: (state, action) => {
      state.list.orderBy = action.payload
    },
    setListFilters: (state, action) => {
      state.list.filters = action.payload
      state.list.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default SettingProjectSlice
