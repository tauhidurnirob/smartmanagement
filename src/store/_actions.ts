/**
 *
 * Export all actions here
 *
 */
import authSlice from './slices/auth'
import appSlice from './slices/app'
import * as settings from './slices/settings'
import * as devices from './slices/devices'
import * as incidents from './slices/incidents'
import * as performanceManagements from './slices/performanceManagements'

export default {
  ...authSlice.actions,
  ...appSlice.actions,
  settings: settings.actions,
  devices: devices.actions,
  incidents: incidents.actions,
  performanceManagements: performanceManagements.actions,
}
