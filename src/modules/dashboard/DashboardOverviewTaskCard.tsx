import { FC, useMemo } from 'react'
import { Card, Typography, Box, LinearProgress } from '@mui/material'

import { IDashboardOverviewFilters } from '../../types/dashboard'

interface IProps {
  filters: IDashboardOverviewFilters
}

const DashboardOverviewTaskCard: FC<IProps> = ({ filters }) => {
  const { totalTasks, doneTasks, percent } = useMemo(() => {
    const totalTasks = 1220
    const doneTasks = 567
    const percent = (doneTasks / (totalTasks || 1)) * 100

    return { totalTasks, doneTasks, percent }
  }, [])
  return (
    <Card sx={{ py: 3.75, px: 2.5, height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Typography variant='h4' sx={{ color: 'grey.800' }}>
          Total Task(s) Completed Today: &nbsp;
        </Typography>
        <Typography variant='h4' sx={{ color: 'grey.800', fontWeight: 500 }}>
          {doneTasks}/{totalTasks}
        </Typography>
      </Box>
      <LinearProgress
        variant='determinate'
        value={percent}
        sx={{
          mt: 2.5,
          height: '8px',
          borderRadius: 2.5,
          backgroundColor: 'grey.50',
          '.MuiLinearProgress-bar': { borderRadius: 2.5 },
        }}
      />
    </Card>
  )
}

export default DashboardOverviewTaskCard
