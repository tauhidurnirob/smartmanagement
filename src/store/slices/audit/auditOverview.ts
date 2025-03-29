import { createSlice } from '@reduxjs/toolkit'
import { ISelectItem } from '../../../types/common'
import dayjs, { Dayjs } from 'dayjs'
import { DOWNLOAD_FILE_TYPES } from '../../../helpers/constants'

// Define a type for the slice state
interface AuditOverviewState {
  selectedForm: number
  selectedReportTypes: ISelectItem[]
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  search: string
  chartStartDate: Dayjs
  chartEndDate: Dayjs
  chartFileType: ISelectItem
  mapLocation: any | null
  mapLocations: ISelectItem[]
  mapProjects: ISelectItem[]
  mapStartDate: Dayjs | null
  mapEndDate: Dayjs | null
  mapReportTypes: ISelectItem[]
}

// Define the initial state using that type
const initialState: AuditOverviewState = {
  selectedForm: 0,
  selectedReportTypes: [],
  selectedProjects: [],
  selectedLocations: [],
  search: '',
  chartStartDate: dayjs().startOf('month'),
  chartEndDate: dayjs(),
  chartFileType: DOWNLOAD_FILE_TYPES[0],
  mapLocation: null,
  mapLocations: [],
  mapProjects: [],
  mapStartDate: dayjs().startOf('month'),
  mapEndDate: dayjs(),
  mapReportTypes: [],
}

const auditOverviewSlice = createSlice({
  name: 'auditOverview',
  initialState,
  reducers: {
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload
    },
    setSelectedReportTypes: (state, action) => {
      state.selectedReportTypes = action.payload
    },
    setSelectedProjects: (state, action) => {
      state.selectedProjects = action.payload
    },
    setSelectedLocations: (state, action) => {
      state.selectedLocations = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setChartStartDate: (state, action) => {
      state.chartStartDate = action.payload
    },
    setChartEndDate: (state, action) => {
      state.chartEndDate = action.payload
    },
    setChartFileType: (state, action) => {
      state.chartFileType = action.payload
    },
    setMapLocation: (state, action) => {
      state.mapLocation = action.payload
    },
    setMapLocations: (state, action) => {
      state.mapLocations = action.payload
    },
    setMapProjects: (state, action) => {
      state.mapProjects = action.payload
    },
    setMapReportTypes: (state, action) => {
      state.mapReportTypes = action.payload
    },
    setMapStartDate: (state, action) => {
      state.mapStartDate = action.payload
    },
    setMapEndDate: (state, action) => {
      state.mapEndDate = action.payload
    },
  },
})

export default auditOverviewSlice
