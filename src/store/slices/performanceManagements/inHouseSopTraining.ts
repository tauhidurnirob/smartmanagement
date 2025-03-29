import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { OrderDirection } from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import { INITIAL_PAGE_NUMBER } from '../../../helpers/constants'
import { IUser } from '../../../api/models'
import { IInHouseSopTrainingItem } from '../../../types/performance-management'

// Define a type for the slice state
interface InHouseSopTrainingState {
  page: number
  limit: number
  orderDir: OrderDirection
  orderBy: string
  search: string
}

// Define the initial state using that type
const initialState: InHouseSopTrainingState = {
  page: INITIAL_PAGE_NUMBER,
  limit: ROW_PER_PAGE_OPTIONS[0],
  orderDir: 'desc',
  orderBy: 'updatedAt',
  search: '',
}

const InHouseSopTrainingSlice = createSlice({
  name: 'inHouseSopTraining',
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
    setOrderBy: (state, action: PayloadAction<keyof IInHouseSopTrainingItem>) => {
      state.orderBy = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
  },
})

export default InHouseSopTrainingSlice
