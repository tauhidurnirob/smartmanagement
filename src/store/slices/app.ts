import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AppState {
  sidebarOpen: boolean
  mobileSidebarOpen: boolean
}

// Define the initial state using that type
const initialState: AppState = {
  sidebarOpen: true,
  mobileSidebarOpen: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setMobileSidebarOpen: (state, action) => {
      state.mobileSidebarOpen = action.payload;
    },
  },
})

export default appSlice