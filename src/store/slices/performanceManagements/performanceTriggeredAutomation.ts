import { createSlice } from '@reduxjs/toolkit'
import { ITask } from '../../../types/task'

// Define a type for the slice state
interface PerformanceTriggeredAutomation {
  tasks: ITask[]
  page: number
  totalCount: number
  selectedId: number | undefined
}

// Define the initial state using that type
const initialState: PerformanceTriggeredAutomation = {
  tasks: [],
  page: 1,
  totalCount: 0,
  selectedId: undefined
}

const performanceTriggeredAutomationSlice = createSlice({
  name: 'performanceTriggeredAutomation',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
})

export default performanceTriggeredAutomationSlice