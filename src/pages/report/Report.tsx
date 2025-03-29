import { useMemo, useState } from 'react'
import { Box, Typography, Card, Grid } from '@mui/material'

import FilterLabel from '../../modules/common/FilterLabel'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'
import { ISelectItem } from '../../types/common'
import ReportTypeSelect from '../../modules/report/ReportTypeSelect'
import ReportCharts from '../../modules/report/ReportCharts'

const Report = () => {
  const [filters, setFilters] = useState<{
    reportTypes: ISelectItem[]
    projects: ISelectItem[]
    locations: ISelectItem[]
  }>({
    reportTypes: [],
    projects: [],
    locations: [],
  })

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const reportTypes = useMemo(() => {
    return filters.reportTypes.map((p) => Number(p.value))
  }, [filters.reportTypes])

  const handleChangeReportTypes = (reportTypes: ISelectItem[]) => {
    setFilters({ ...filters, reportTypes })
  }

  const handleChangeProjects = (projects: ISelectItem[]) => {
    setFilters({ ...filters, projects })
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    setFilters({ ...filters, locations })
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
          mt: 5,
          p: 3,
          pr: 5,
        }}
      >
        <Grid container spacing={6.75}>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Report Type' sx={{ color: 'grey.600' }} />
            <ReportTypeSelect
              placeholder='All Report Type'
              hiddenLabel={true}
              selected={filters.reportTypes}
              onChange={handleChangeReportTypes}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Project' sx={{ color: 'grey.600' }} />
            <ProjectSelect
              hiddenLabel={true}
              selected={filters.projects}
              onChange={handleChangeProjects}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Location' sx={{ color: 'grey.600' }} />
            <LocationSelect
              hiddenLabel={true}
              selected={filters.locations}
              onChange={handleChangeLocations}
              projectIds={projectIds}
            />
          </Grid>
        </Grid>
      </Card>
      <Box mt={3.25}>
        <ReportCharts projectIds={projectIds} locationIds={locationIds} reportTypes={reportTypes} />
      </Box>
    </Box>
  )
}

export default Report
