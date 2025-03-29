import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ISelectItem, OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IUser } from '../../../api/models'

// Define a type for the slice state
interface StaffFilterState {
  page: number
  limit: number
  orderDir: OrderDirection
  orderBy: string
  selectedRoles: ISelectItem[]
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  search: string
}

// Define the initial state using that type
const initialState: StaffFilterState = {
  page: INITIAL_PAGE_NUMBER,
  limit: ROW_PER_PAGE_OPTIONS[0],
  orderDir: 'asc',
  orderBy: 'id',
  selectedRoles: [],
  selectedProjects: [],
  selectedLocations: [],
  search: '',
}

const staffFilterSlice = createSlice({
  name: 'staffFilter',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setOrderDir: (state, action: PayloadAction<OrderDirection>) => {
      state.orderDir = action.payload
    },
    setOrderBy: (state, action: PayloadAction<keyof IUser>) => {
      state.orderBy = action.payload
    },
    setSelectedRoles: (state, action: PayloadAction<ISelectItem[]>) => {
      state.selectedRoles = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedProjects: (state, action: PayloadAction<ISelectItem[]>) => {
      state.selectedProjects = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedLocations: (state, action: PayloadAction<ISelectItem[]>) => {
      state.selectedLocations = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default staffFilterSlice
