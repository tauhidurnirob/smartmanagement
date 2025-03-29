import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../api/models/user'

// Define a type for the slice state
interface AuthState {
  user: null | IUser
  token: null | string
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.userInfo
      state.token = payload.token
    },
    updateUser: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export default authSlice
