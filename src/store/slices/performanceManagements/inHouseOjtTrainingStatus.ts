import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ISelectItem, OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'

// Define a type for the slice state
interface InHouseOjtTrainingStatusState {
  page: number
  limit: number
  orderDir: OrderDirection
  orderBy: string
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  status: ISelectItem[]
}

// Define the initial state using that type
const initialState: InHouseOjtTrainingStatusState = {
  page: INITIAL_PAGE_NUMBER,
  limit: ROW_PER_PAGE_OPTIONS[0],
  orderDir: 'desc',
  orderBy: 'updatedAt',
  search: '',
  projects: [],
  locations: [],
  status: [],
}

const InHouseOjtTrainingStatusSlice = createSlice({
  name: 'inHouseOjtTrainingStatus',
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
    setSelectedProjects: (state, action: PayloadAction<ISelectItem[]>) => {
      state.projects = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSelectedLocations: (state, action: PayloadAction<ISelectItem[]>) => {
      state.locations = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setStatus: (state, action: PayloadAction<ISelectItem[]>) => {
      state.status = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default InHouseOjtTrainingStatusSlice
