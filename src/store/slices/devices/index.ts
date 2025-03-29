import { combineReducers } from 'redux'

import deviceOverview from './deviceOverview'
import deviceControl from './deviceControl'
import deviceSwap from './deviceSwap'
import deviceGroup from './deviceGroup'
import deviceSchedule from './deviceSchedule'
import deviceLinkage from './deviceLinkage'
import deviceLocation from './deviceLocation'

const reducer = combineReducers({
  [deviceOverview.name]: deviceOverview.reducer,
  [deviceControl.name]: deviceControl.reducer,
  [deviceSwap.name]: deviceSwap.reducer,
  [deviceGroup.name]: deviceGroup.reducer,
  [deviceSchedule.name]: deviceSchedule.reducer,
  [deviceLinkage.name]: deviceLinkage.reducer,
  [deviceLocation.name]: deviceLocation.reducer,
})

const actions = {
  [deviceOverview.name]: deviceOverview.actions,
  [deviceControl.name]: deviceControl.actions,
  [deviceSwap.name]: deviceSwap.actions,
  [deviceGroup.name]: deviceGroup.actions,
  [deviceSchedule.name]: deviceSchedule.actions,
  [deviceLinkage.name]: deviceLinkage.actions,
  [deviceLocation.name]: deviceLocation.actions,
}

export { reducer, actions }
