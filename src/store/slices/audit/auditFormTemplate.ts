import { createSlice } from '@reduxjs/toolkit'
import { ISelectItem, OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'

// Define a type for the slice state
interface AuditFormTemplateState {
  page: number
  limit: number
  orderDir: OrderDirection
  orderBy: string
  selectedFormTypes: ISelectItem[]
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  search: string
}

// Define the initial state using that type
const initialState: AuditFormTemplateState = {
  page: 1,
  limit: ROW_PER_PAGE_OPTIONS[0],
  orderDir: 'asc',
  orderBy: 'id',
  selectedFormTypes: [],
  selectedProjects: [],
  selectedLocations: [],
  search: '',
}

const auditFormTemplateSlice = createSlice({
  name: 'auditFormTemplate',
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
    setSelectedFormTypes: (state, action) => {
      state.selectedFormTypes = action.payload
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
  },
})

export default auditFormTemplateSlice
