import { useState } from 'react'
import dayjs from 'dayjs'
import { Box, Typography, Grid } from '@mui/material'

import DashboardOverviewFilterbar from '../../modules/dashboard/DashboardOverviewFilterbar'
import { IDashboardOverviewFilters } from '../../types/dashboard'
import DashboardOverviewMap from '../../modules/dashboard/DashboardOverviewMap'
import DashboardOverviewIncidentCard from '../../modules/dashboard/DashboardOverviewIncidentCard'
import DashboardOverviewDeviceCard from '../../modules/dashboard/DashboardOverviewDeviceCard'
import DashboardAuditReport from '../../modules/dashboard/DashboardAuditReport'
import DashboardOverviewTaskCard from '../../modules/dashboard/DashboardOverviewTaskCard'
import DashboardOverviewFeedbackCard from '../../modules/dashboard/DashboardOverviewFeedbackCard'

const DashboardOverview = () => {
  const [filters, setFilters] = useState<IDashboardOverviewFilters>({
    search: '',
    projects: [],
    locations: [],
    startDate: dayjs().add(-1, 'month'),
    endDate: dayjs(),
  })

  const handleChangeFilters = (filters: IDashboardOverviewFilters) => {
    setFilters({ ...filters })
  }

  return (
    <Box>
      <Typography variant='h3'>Overview</Typography>

      <Box sx={{ mt: 3.5 }}>
        <DashboardOverviewFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box sx={{ mt: 3.5 }}>
        <DashboardOverviewMap filters={filters} />
      </Box>
      <Box mt={3.5}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item lg={5} xs={12}>
            <DashboardOverviewIncidentCard filters={filters} />
          </Grid>
          <Grid item lg={7} xs={12}>
            <DashboardOverviewDeviceCard filters={filters} />
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item lg={8} xs={12}>
            <DashboardAuditReport filters={filters} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Grid container direction={'column'} rowSpacing={2.25}>
              <Grid item xs={12}>
                <DashboardOverviewTaskCard filters={filters} />
              </Grid>
              <Grid item xs={12}>
                <DashboardOverviewFeedbackCard filters={filters} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default DashboardOverview
