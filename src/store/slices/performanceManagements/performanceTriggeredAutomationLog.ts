import { createSlice } from '@reduxjs/toolkit'
import { AutomationTaskLog } from '../../../types/task'

// Define a type for the slice state
interface PerformanceTriggeredAutomationLog {
  logs: AutomationTaskLog[]
  page: number
  totalCount: number
}

// Define the initial state using that type
const initialState: PerformanceTriggeredAutomationLog = {
  logs: [],
  page: 1,
  totalCount: 0
}

const performanceTriggeredAutomationLogSlice = createSlice({
  name: 'performanceTriggeredAutomationLog',
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    }
  },
})

export default performanceTriggeredAutomationLogSlice