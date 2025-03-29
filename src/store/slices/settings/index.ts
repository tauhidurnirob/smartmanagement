import { combineReducers } from 'redux'

import settingProject from './project'
import settingUsersQuerySlice from './users'

const reducer = combineReducers({
  [settingProject.name]: settingProject.reducer,
  [settingUsersQuerySlice.name]: settingUsersQuerySlice.reducer,
})

const actions = {
  [settingProject.name]: settingProject.actions,
  [settingUsersQuerySlice.name]: settingUsersQuerySlice.actions,
}

export { reducer, actions }
