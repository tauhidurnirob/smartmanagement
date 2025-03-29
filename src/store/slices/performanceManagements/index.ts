import { combineReducers } from 'redux'

import taskAllocation from './taskAllocation'
import InHouseSopTraining from './inHouseSopTraining'
import InHouseOjtTrainingStatus from './inHouseOjtTrainingStatus'
import staffFilterSlice from './staff'
import PredictionDataSlice from './predictionData'
import attendanceFilterSlice from './staffAttendance'
import leaveApplicationFilterSlice from './staffLeave'
import ojtFilterSlice from './ojtOverview'
import taskListOverviewSlice from './taskListOverview'
import performanceOverviewSlice from './performanceOverview'
import performanceTriggeredAutomationSlice from './performanceTriggeredAutomation'
import performanceTriggeredAutomationLogSlice from './performanceTriggeredAutomationLog'

const reducer = combineReducers({
  [taskListOverviewSlice.name]: taskListOverviewSlice.reducer,
  [taskAllocation.name]: taskAllocation.reducer,
  [InHouseSopTraining.name]: InHouseSopTraining.reducer,
  [InHouseOjtTrainingStatus.name]: InHouseOjtTrainingStatus.reducer,
  [staffFilterSlice.name]: staffFilterSlice.reducer,
  [PredictionDataSlice.name]: PredictionDataSlice.reducer,
  [attendanceFilterSlice.name]: attendanceFilterSlice.reducer,
  [leaveApplicationFilterSlice.name]: leaveApplicationFilterSlice.reducer,
  [ojtFilterSlice.name]: ojtFilterSlice.reducer,
  [performanceOverviewSlice.name]: performanceOverviewSlice.reducer,
  [performanceTriggeredAutomationSlice.name]: performanceTriggeredAutomationSlice.reducer,
  [performanceTriggeredAutomationLogSlice.name]: performanceTriggeredAutomationLogSlice.reducer,
})
const actions = {
  [taskListOverviewSlice.name]: taskListOverviewSlice.actions,
  [taskAllocation.name]: taskAllocation.actions,
  [InHouseSopTraining.name]: InHouseSopTraining.actions,
  [InHouseOjtTrainingStatus.name]: InHouseOjtTrainingStatus.actions,
  [staffFilterSlice.name]: staffFilterSlice.actions,
  [PredictionDataSlice.name]: PredictionDataSlice.actions,
  [attendanceFilterSlice.name]: attendanceFilterSlice.actions,
  [leaveApplicationFilterSlice.name]: leaveApplicationFilterSlice.actions,
  [ojtFilterSlice.name]: ojtFilterSlice.actions,
  [performanceOverviewSlice.name]: performanceOverviewSlice.actions,
  [performanceTriggeredAutomationSlice.name]: performanceTriggeredAutomationSlice.actions,
  [performanceTriggeredAutomationLogSlice.name]: performanceTriggeredAutomationLogSlice.actions,
}
const _taskListOverviewActions = {
  ...taskListOverviewSlice.actions
}
export { reducer, actions, _taskListOverviewActions }
