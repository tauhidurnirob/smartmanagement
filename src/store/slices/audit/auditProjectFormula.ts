import { createSlice } from '@reduxjs/toolkit'
import { INITIAL_PAGE_NUMBER, ROW_PER_PAGE_OPTIONS } from '../../../helpers/constants'
import { OrderDirection } from '../../../types/common'

// Define a type for the slice state
interface AuditProjectFormulaState {
  page: number
  limit: number
  search: string
  orderDir: OrderDirection
  orderBy: string
}

// Define the initial state using that type
const initialState: AuditProjectFormulaState = {
  page: 1,
  limit: ROW_PER_PAGE_OPTIONS[0],
  search: '',
  orderDir: 'desc',
  orderBy: 'id',
}

const auditProjectFormulaSlice = createSlice({
  name: 'auditProjectFormula',
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
      state.page = INITIAL_PAGE_NUMBER
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSearch: (state, action) => {
      state.search = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default auditProjectFormulaSlice