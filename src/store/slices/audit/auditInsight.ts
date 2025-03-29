import { createSlice } from '@reduxjs/toolkit'
import { ISelectItem } from '../../../types/common'
import dayjs, { Dayjs } from 'dayjs'

// Define a type for the slice state
interface AuditInsightState {
  selectedFormType: number | null
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  search: string
  startDate: Dayjs | null
  endDate: Dayjs | null
}

// Define the initial state using that type
const initialState: AuditInsightState = {
  selectedFormType: null,
  selectedProjects: [],
  selectedLocations: [],
  search: '',
  startDate: dayjs().startOf('month'),
  endDate: dayjs(),
}

const auditInsightSlice = createSlice({
  name: 'auditInsight',
  initialState,
  reducers: {
    setSelectedFormType: (state, action) => {
      state.selectedFormType = action.payload;
    },
    setSelectedProjects: (state, action) => {
      state.selectedProjects = action.payload;
    },
    setSelectedLocations: (state, action) => {
      state.selectedLocations = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
})

export default auditInsightSlice