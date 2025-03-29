import { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  LinearProgress,
  AvatarGroup,
  Avatar,
  Button,
} from '@mui/material'

import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { ISelectItem } from '../../types/common'
import LocationSelect from '../location/LocationSelect'
import getAvatarNameFromString from '../../helpers/getAvatarNameFromString'
import getColorFromString from '../../helpers/getColorFromString'
import TaskOverviewChart from './TaskOverviewChart'
import { useNavigate } from 'react-router-dom'

interface IFilter {
  projects: ISelectItem[]
  locations: ISelectItem[]
}

const TaskOverview = () => {
  const [filters, setFilters] = useState<IFilter>({ projects: [], locations: [] })
  const navigate = useNavigate()

  const { totalTasks, doneTasks, percent } = useMemo(() => {
    const totalTasks = 1220
    const doneTasks = 567
    const percent = (doneTasks / (totalTasks || 1)) * 100

    return { totalTasks, doneTasks, percent }
  }, [])

  const { cleanerNames, totalCleaners } = useMemo(() => {
    const cleanerNames = [
      'Asfas',
      'Asfas',
      'Asfas',
      'Asfas',
      'Asfas',
      'Asfas',
      'Asfas',
      'Asfas',
      'Sqwr',
      'Sqwr',
      'Psafasd',
      'Psafasd',
      'Psafasd',
      'Psafasd',
      'Psafasd',
      'Psafasd',
    ]
    const totalCleaners = 40

    return { cleanerNames, totalCleaners }
  }, [])

  const handleChangeProjects = (projects: ISelectItem[]) => {
    setFilters({ ...filters, projects })
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    setFilters({ ...filters, locations })
  }

  const handleGoToOnDuty = () => {
    navigate('/task-management/overview/on-duty')
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography typography={'h3'}>Overview</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <ProjectSelect
            hiddenLabel={true}
            selected={filters.projects}
            onChange={handleChangeProjects}
            sx={{ width: '297px', '& > div > div': { backgroundColor: '#ffffff' } }}
          />
          <LocationSelect
            hiddenLabel={true}
            selected={filters.locations}
            onChange={handleChangeLocations}
            sx={{ width: '297px', '& > div > div': { backgroundColor: '#ffffff' } }}
          />
        </Box>
      </Box>
      <Grid container columnSpacing={3.25} rowSpacing={3} sx={{ mt: -1.25 }}>
        <Grid item lg={4} xs={12}>
          <Grid container columnSpacing={3.25} rowSpacing={3} direction={'column'}>
            <Grid item xs={12}>
              <Card sx={{ py: 3, px: 3.75 }}>
                <Typography variant='h4' sx={{ fontSize: '2.125rem', fontWeight: 700 }}>
                  100
                </Typography>
                <Typography variant='h4' sx={{ fontWeight: 500, color: 'grey.400', mt: 0.5 }}>
                  Total Cleaner(s) on Duty Now
                </Typography>
                <AvatarGroup
                  total={totalCleaners}
                  max={13}
                  sx={{
                    mt: 3,
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                    '.MuiAvatarGroup-avatar:first-child': {
                      width: '30px',
                      height: '30px',
                      bgcolor: 'grey.900',
                      fontSize: '11px',
                      color: 'grey.50',
                      zIndex: totalCleaners,
                      fontWeight: 700,
                    },
                  }}
                >
                  {cleanerNames.map((name, idx) => {
                    const aName = getAvatarNameFromString(name)
                    const bgColor = getColorFromString(name)
                    return (
                      <Avatar
                        key={`cleaner-${idx}`}
                        sx={{
                          color: '#ffffff',
                          bgcolor: bgColor,
                          width: '30px',
                          height: '30px',
                          zIndex: idx,
                          fontSize: '13px',
                          fontWeight: 700,
                        }}
                      >
                        {aName}
                      </Avatar>
                    )
                  })}
                </AvatarGroup>
                <Box sx={{ mt: 3.75 }}>
                  <Button
                    color='primary'
                    variant='contained'
                    size='small'
                    onClick={() => handleGoToOnDuty()}
                  >
                    View All
                  </Button>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ py: 3, px: 3.75 }}>
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={8} xs={12}>
          <TaskOverviewChart />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TaskOverview
