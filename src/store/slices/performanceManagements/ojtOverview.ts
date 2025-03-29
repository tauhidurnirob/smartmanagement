import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IResList, ISelectItem, OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IUser } from '../../../api/models'
import { IOtjOverviewRes } from '../../../types/performance-management'

// Define a type for the slice state
interface OjtFilterState {
  page: number
  limit: number
  orderDir: OrderDirection
  orderBy: string
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  search: string
  status?: string
  ojts: IOtjOverviewRes[]
  totalOjtsCount: number
}

// Define the initial state using that type
const initialState: OjtFilterState = {
  page: INITIAL_PAGE_NUMBER,
  limit: ROW_PER_PAGE_OPTIONS[0],
  orderDir: 'asc',
  orderBy: 'id',
  selectedProjects: [],
  selectedLocations: [],
  search: '',
  ojts: [],
  totalOjtsCount: 0,
}

const ojtFilterSlice = createSlice({
  name: 'ojtFilter',
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
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setOjts: (state, action: PayloadAction<IOtjOverviewRes[]>) => {
      state.ojts = action.payload
    },
    setTotalOjtsCount: (state, action: PayloadAction<number>) => {
      state.totalOjtsCount = action.payload
    },
  },
})

export default ojtFilterSlice
