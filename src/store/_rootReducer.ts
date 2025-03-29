/**
 *
 * Root Reducer with all reducers
 *
 */
import { combineReducers } from '@reduxjs/toolkit'

import authSlice from './slices/auth'
import appSlice from './slices/app'
import notificationSlice from './slices/notification'
import alertSlice from './slices/alert'
import Api from '../api'
import { AuditReducers } from './slices/audit'
import { FeedbackReducers } from './slices/feedback'
import { reducer as settings } from './slices/settings'
import { reducer as devices } from './slices/devices'
import { reducer as incidents } from './slices/incidents'
import { reducer as performanceManagements } from './slices/performanceManagements'

export default combineReducers({
  settings,
  devices,
  incidents,
  performanceManagements,
  [authSlice.name]: authSlice.reducer,
  [appSlice.name]: appSlice.reducer,
  [notificationSlice.name]: notificationSlice.reducer,
  [alertSlice.name]: alertSlice.reducer,
  ...AuditReducers,
  ...FeedbackReducers,
  ...Api.reducers,
})
