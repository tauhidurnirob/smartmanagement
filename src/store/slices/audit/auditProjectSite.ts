import { createSlice } from '@reduxjs/toolkit'
import { ISelectItem } from '../../../types/common'
import { ILocation } from '../../../types/location'

// Define a type for the slice state
interface AuditProjectSiteState {
  search: string
  selectedProjects: ISelectItem[]
  selectedLocations: ISelectItem[]
  projectSites: ILocation[]
  page: number
  totalCount: number
}

// Define the initial state using that type
const initialState: AuditProjectSiteState = {
  search: '',
  selectedProjects: [],
  selectedLocations: [],
  projectSites: [],
  page: 1,
  totalCount: 0
}

const auditProjectSiteSlice = createSlice({
  name: 'auditProjectSite',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setSelectedProjects: (state, action) => {
      state.selectedProjects = action.payload;
    },
    setSelectedLocations: (state, action) => {
      state.selectedLocations = action.payload;
    },
    setProjectSites: (state, action) => {
      state.projectSites = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
})

export default auditProjectSiteSlice