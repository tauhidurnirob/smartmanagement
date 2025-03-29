import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INITIAL_PAGE_NUMBER, ROW_PER_PAGE_OPTIONS } from '../../helpers/constants'
import { ISelectItem } from '../../types/common'
import { Dayjs } from 'dayjs'
import { IResNotification } from '../../types/notification'
import { INotificationAlertData, IResAlert } from '../../api/models/alert'

// Define a type for the slice state
interface AlertState {
  page: number
  limit: number
  text: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
  startDate: Dayjs | null
  endDate: Dayjs | null
  alerts: IResAlert[]
  alertCount: number
  notificationAlerts: INotificationAlertData[]
  notificationAlertCount: number
}

// Define the initial state using that type
const initialState: AlertState = {
  page: INITIAL_PAGE_NUMBER,
  limit: ROW_PER_PAGE_OPTIONS[0],
  text: '',
  projects: [],
  locations: [],
  buildings: [],
  levels: [],
  areas: [],
  units: [],
  startDate: null,
  endDate: null,
  alerts: [],
  alertCount: 0,
  notificationAlerts: [],
  notificationAlertCount: 0,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setProject: (state, action: PayloadAction<ISelectItem[]>) => {
      state.projects = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setLocation: (state, action: PayloadAction<ISelectItem[]>) => {
      state.locations = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setBuilding: (state, action: PayloadAction<ISelectItem[]>) => {
      state.buildings = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setLevel: (state, action: PayloadAction<ISelectItem[]>) => {
      state.levels = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setArea: (state, action: PayloadAction<ISelectItem[]>) => {
      state.areas = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setUnit: (state, action: PayloadAction<ISelectItem[]>) => {
      state.units = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setStartDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.startDate = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setEndDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.endDate = action.payload
      state.page = INITIAL_PAGE_NUMBER
    },
    setAlerts: (state, action: PayloadAction<IResAlert[]>) => {
      state.alerts = action.payload
    },
    setAlertCount: (state, action: PayloadAction<number>) => {
      state.alertCount = action.payload
    },
    setNotificationAlerts: (state, action: PayloadAction<INotificationAlertData[]>) => {
      state.notificationAlerts = action.payload
    },
    setNotificationAlertCount: (state, action: PayloadAction<number>) => {
      state.notificationAlertCount = action.payload
    },
  },
})

export default alertSlice
