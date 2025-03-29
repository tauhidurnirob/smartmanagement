import { combineReducers } from 'redux'

import incidentType from './incidentType'
import incident from './incident'
import incidentReport from './incidentReport'

const reducer = combineReducers({
  [incidentType.name]: incidentType.reducer,
  [incident.name]: incident.reducer,
  [incidentReport.name]: incidentReport.reducer,
})

const actions = {
  [incidentType.name]: incidentType.actions,
  [incident.name]: incident.actions,
  [incidentReport.name]: incidentReport.actions,
}

export { reducer, actions }
