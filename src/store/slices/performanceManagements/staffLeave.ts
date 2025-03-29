import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ISelectItem, OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IUser } from '../../../api/models'
import { Dayjs } from 'dayjs'

// Define a type for the slice state
interface LeaveApplicationFilterState {
  page: number
  limit: number
  orderDir: OrderDirection
  orderBy: string
  selectedRoles: ISelectItem[]
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  selectedStatuses: ISelectItem[]
  selectedLeaveCategories: ISelectItem[]
  selectedLeaveTypes: ISelectItem[]
  search: string
  endDate?: Dayjs
  startDate?: Dayjs
  applicationDate?: Dayjs
}

// Define the initial state using that type
const initialState: LeaveApplicationFilterState = {
  page: 1,
  limit: ROW_PER_PAGE_OPTIONS[0],
  orderDir: 'asc',
  orderBy: 'id',
  search: '',
  selectedRoles: [],
  selectedProjects: [],
  selectedLocations: [],
  selectedStatuses: [],
  selectedLeaveCategories: [],
  selectedLeaveTypes: [],
}

const leaveApplicationFilterSlice = createSlice({
  name: 'leaveApplicationFilter',
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
    setSelectedStatuses: (state, action: PayloadAction<ISelectItem[]>) => {
      state.selectedStatuses = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedLeaveCategories: (state, action: PayloadAction<ISelectItem[]>) => {
      state.selectedLeaveCategories = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedLeaveTypes: (state, action: PayloadAction<ISelectItem[]>) => {
      state.selectedLeaveTypes = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setStartDate: (state, action: PayloadAction<Dayjs>) => {
      state.startDate = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setEndDate: (state, action: PayloadAction<Dayjs>) => {
      state.endDate = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setApplicationDate: (state, action: PayloadAction<Dayjs>) => {
      state.applicationDate = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default leaveApplicationFilterSlice
