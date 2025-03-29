import { useState } from 'react'
import { Box, Typography, Grid, Card } from '@mui/material'
import dayjs from 'dayjs'

import PerformanceOverviewFilterbar from '../../modules/performance-management/overview/PerformanceOverviewFilterbar'
import { IPerformanceOverviewFilters } from '../../types/performance-management'
import PerformanceOverviewCompletionStatus from '../../modules/performance-management/overview/PerformanceOverviewCompletionStatus'
import PerformanceOverviewSLAPerformanceList from '../../modules/performance-management/overview/PerformanceOverviewSLAPerformanceList'
import PerformanceOverviewTriggeredAutomation from '../../modules/performance-management/overview/PerformanceOverviewTriggeredAutomation'
import PerformanceOverviewAutomationReport from '../../modules/performance-management/overview/PerformanceOverviewAutomationReport'
import TaskList from '../../modules/task-management/TaskList'
import PerformanceOverviewTotalResourcesPredicted from '../../modules/performance-management/overview/PerformanceOverviewTotalResourcesPredicted'
import PerformanceOverviewAutomatedTaskCompleted from '../../modules/performance-management/overview/PerformanceOverviewAutomatedTaskCompleted'
import PerformanceOverviewAutomatedTaskTriggered from '../../modules/performance-management/overview/PerformanceOverviewAutomatedTaskTriggered'
import PerformanceOverviewAutomationDetails from '../../modules/performance-management/overview/PerformanceOverviewAutomationDetails'
import { _getPerformanceOverviewState, _getPerformanceTriggeredAutomationState } from '../../store/_selectors'
import _actions from '../../store/_actions'
import { useDispatch } from 'react-redux'

const PerformanceOverview = () => {
  const [triggeredAutomationId, setTriggeredAutomationId] = useState<number | undefined>(undefined)
  const [automationDetailsId, setAutomationDetailsId] = useState<number | undefined>(undefined)

  const dispatch = useDispatch()

  const automationState = _getPerformanceTriggeredAutomationState()
  const {filters} = _getPerformanceOverviewState()

  const handleChangeFilters = (newFilters: IPerformanceOverviewFilters) => {
    dispatch(_actions.performanceManagements.performanceOverview.setFilters((filters: IPerformanceOverviewFilters) => ({ ...filters, ...newFilters })))
  }

  return (
    <Box>
      <Typography typography={'h3'} mb={3}>
        Overview
      </Typography>
      <Box sx={{ mt: 2 }}>
        <PerformanceOverviewFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box sx={{ mt: 2.75 }}>
        <Grid container columnSpacing={1.25}>
          <Grid item lg={4} xs={12}>
            <PerformanceOverviewCompletionStatus />
          </Grid>
          <Grid item lg={8} xs={12}>
            <PerformanceOverviewSLAPerformanceList />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <Grid container columnSpacing={2.25}>
            <Grid item lg={5} xs={12}>
              <PerformanceOverviewTriggeredAutomation
                selectedId = {automationState.selectedId}
                onClick={((id) => dispatch(_actions.performanceManagements.performanceTriggeredAutomation.setSelectedId(id)))}
                onViewClick={(id) => setAutomationDetailsId(id)}
              />
            </Grid>
            <Grid item lg={7} xs={12}>
              <PerformanceOverviewAutomationReport />
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box sx={{ mt: 10 }}>
        <TaskList isPerformance={true} />
      </Box>
      {/* <Box sx={{ mt: 7.5 }}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <PerformanceOverviewTotalResourcesPredicted />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PerformanceOverviewAutomatedTaskCompleted />
              </Grid>
              <Grid item xs={12}>
                <PerformanceOverviewAutomatedTaskTriggered />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box> */}
      <PerformanceOverviewAutomationDetails
        open={!!automationDetailsId}
        onClose={() => setAutomationDetailsId(undefined)}
      />
    </Box>
  )
}

export default PerformanceOverview
