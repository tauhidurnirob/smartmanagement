import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { DOWNLOAD_FILE_TYPES } from '../../../helpers/constants'
import { IIncidentReportFilters } from '../../../types/incident'
import { ISelectItem } from '../../../types/common'

// Define a type for the slice state
interface incidentReportState {
  filters: IIncidentReportFilters
  fileType: ISelectItem
}

// Define the initial state using that type
const initialState: incidentReportState = {
  filters: {
    reportTypes: [],
    projects: [],
    locations: [],
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
  },
  fileType: DOWNLOAD_FILE_TYPES[0],
}

const incidentReportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    setFileType: (state, action) => {
      state.fileType = action.payload
    },
  },
})

export default incidentReportSlice
