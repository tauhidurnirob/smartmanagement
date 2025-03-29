import { useMemo } from 'react'
import { Box, Typography, Card, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'

import FilterLabel from '../../modules/common/FilterLabel'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'
import { ISelectItem } from '../../types/common'
import IncidentReportTypeSelect from '../../modules/incident/IncidentReportTypeSelect'
import IncidentReportCharts from './IncidentReportCharts'
import { _getIncidentReportFilters } from '../../store/_selectors'
import _actions from '../../store/_actions'

const IncidentReport = () => {
  const dispatch = useDispatch()

  const filters = _getIncidentReportFilters()
  const setFilters = _actions.incidents.report.setFilters

  const projectIds = useMemo(
    () => filters.projects.map((i) => i.value as number),
    [filters.projects]
  )

  const handleChangeProjects = (projects: ISelectItem[]) => {
    dispatch(setFilters({ ...filters, projects }))
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    dispatch(setFilters({ ...filters, locations }))
  }

  const handleChangeReportTypes = (reportTypes: ISelectItem[]) => {
    dispatch(setFilters({ ...filters, reportTypes }))
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography typography={'h3'}>Reports</Typography>
      </Box>
      <Card
        sx={{
          mt: 2.5,
          p: 3,
          pr: 5,
        }}
      >
        <Grid container spacing={3}>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Report Type' />
            <IncidentReportTypeSelect
              placeholder='All Report'
              hiddenLabel={true}
              selected={filters.reportTypes}
              onChange={handleChangeReportTypes}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Project' />
            <ProjectSelect
              hiddenLabel={true}
              selected={filters.projects}
              onChange={handleChangeProjects}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Location' />
            <LocationSelect
              hiddenLabel={true}
              selected={filters.locations}
              onChange={handleChangeLocations}
              projectIds={projectIds}
            />
          </Grid>
        </Grid>
      </Card>
      <Box mt={3}>
        <IncidentReportCharts />
      </Box>
    </Box>
  )
}

export default IncidentReport
