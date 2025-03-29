import { useMemo, useState } from 'react'
import { Box, Card, Stack, Grid, Typography, Button, Divider } from '@mui/material'

import StudentStatisticsChart from '../../modules/predictive-analysis/StudentStatisticsChart'
import PredictiveAnalysisFilterbar from '../../modules/predictive-analysis/PredictiveAnalysisFilterbar'
import { IPredictiveAnalysisFilters } from '../../types/predictive-analysis'

const tmpData = [
  { date: '1/12', student: 200, teacher: 200, technician: 200, staff: 200 },
  { date: '2/12', student: 225, teacher: 235, technician: 225, staff: 210 },
  { date: '3/12', student: 220, teacher: 275, technician: 250, staff: 230 },
  { date: '4/12', student: 220, teacher: 250, technician: 280, staff: 240 },
  { date: '5/12', student: 270, teacher: 280, technician: 310, staff: 280 },
  { date: '6/12', student: 240, teacher: 320, technician: 370, staff: 330 },
  { date: '7/12', student: 340, teacher: 360, technician: 380, staff: 350 },
  { date: '8/12', student: 320, teacher: 350, technician: 390, staff: 330 },
  { date: '9/12', student: 300, teacher: 330, technician: 380, staff: 300 },
  { date: '10/12', student: 340, teacher: 340, technician: 350, staff: 260 },
  { date: '11/12', student: 400, teacher: 350, technician: 390, staff: 310 },
  { date: '12/12', student: 375, teacher: 360, technician: 420, staff: 370 },
  { date: '13/12', student: 425, teacher: 390, technician: 470, staff: 450 },
]

const columns = [
  { label: 'School', width: 3 },
  { label: 'Predicted', width: 3 },
  { label: 'Feedback', width: 3 },
  { label: 'Actual', width: 3 },
]

const StudentStatistics = () => {
  const [filters, setFilters] = useState<IPredictiveAnalysisFilters>({
    date: null,
    locations: [],
    buildings: [],
    levels: [],
  })

  const { predictOverview, students } = useMemo(() => {
    const predictOverview = [
      { label: 'Predicted', value: 2654 },
      { label: 'Actual', value: null },
      { label: 'Feedback', value: null },
    ]

    const students = [
      { school: 'Primary', color: '#50CD89', predicted: 624, feedback: 525, actual: null },
      { school: 'Secondary', color: '#F8BC19', predicted: 524, feedback: null, actual: null },
      { school: 'O Level', color: '#F1416C', predicted: 524, feedback: null, actual: null },
    ]

    return { predictOverview, students }
  }, [])

  const handleChangeFilters = (filters: IPredictiveAnalysisFilters) => {
    setFilters({ ...filters })
  }

  return (
    <Box>
      <Typography variant='h3'>Student Statistics</Typography>
      <Box sx={{ mt: 3 }}>
        <PredictiveAnalysisFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box sx={{ mt: 3.5 }}>
        <Grid container spacing={2.25}>
          <Grid item lg={6} xs={12}>
            <Card>
              <Grid container spacing={0}>
                <Grid item lg={6} xs={12} sx={{ borderBottom: '1px solid #EBEDF3' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', px: 2.5, pt: 4.25, pb: 4 }}>
                    <Typography variant='h3'>TP</Typography>
                    <Typography variant='h5' sx={{ color: 'grey.700', mt: 1, fontWeight: 400 }}>
                      Predicted Disembarkation Volume
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6} xs={12} sx={{ borderBottom: '1px solid #EBEDF3' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      pr: 2.5,
                      pt: 2,
                      pl: 3.25,
                      pb: 0.5,
                      borderLeft: { lg: '1px solid #EBEDF3', xs: 'none' },
                      height: '100%',
                      gap: 1,
                    }}
                  >
                    {predictOverview.map((item, idx) => {
                      const { label, value } = item
                      return (
                        <Stack
                          key={`predictive-item-${idx}`}
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          flexDirection={'row'}
                          flexWrap={'wrap'}
                          gap={1}
                        >
                          <Typography variant='h5' sx={{ color: 'grey.700', fontWeight: 400 }}>
                            {label}
                          </Typography>
                          <Typography
                            variant='h5'
                            sx={{
                              color: 'grey.700',
                              fontSize: 25,
                              textAlign: 'center',
                              width: '4rem',
                            }}
                          >
                            {typeof value === 'number' ? value : '-'}
                          </Typography>
                        </Stack>
                      )
                    })}
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ pt: 1.75, pb: 2.75, pr: 1.5, pl: 0.5 }}>
                <StudentStatisticsChart data={tmpData} />
              </Box>
            </Card>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Card sx={{ height: '100%' }}>
              <Stack
                direction={'row'}
                flexWrap={'wrap'}
                gap={2}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ pt: 2.75, px: 3, pb: 2.5 }}
              >
                <Typography variant='h3' color='grey.800'>
                  Students
                </Typography>
                <Button color='primary' variant='contained' size='large' sx={{ px: 2, py: 1.5 }}>
                  Save Feedback
                </Button>
              </Stack>
              <Divider light />
              <Stack direction={'column'} sx={{ pt: 2, pr: 3, pl: 4, pb: 2 }}>
                <Box
                  sx={{
                    borderRadius: 1,
                    background: '#FFF',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    py: 0.75,
                    px: 1,
                  }}
                >
                  <Typography variant='h5' color='primary.main'>
                    Feedback counts are currently generated based on actual counts provided. Click
                    “Save Feedback” button to update your data feedback
                  </Typography>
                </Box>
                <Stack direction={'column'} sx={{ mt: 4.5 }}>
                  <Grid container spacing={5}>
                    {columns.map((item, idx) => {
                      const { label, width } = item
                      return (
                        <Grid key={`column-item-${idx}`} item xs={width}>
                          <Typography
                            variant='h6'
                            color='grey.400'
                            fontWeight={700}
                            sx={{ textAlign: 'center' }}
                          >
                            {label}
                          </Typography>
                        </Grid>
                      )
                    })}
                  </Grid>
                  <Divider light sx={{ mt: 2, mb: 2, borderStyle: 'dashed' }} />
                  <Grid container direction={'column'} spacing={5}>
                    {students.map((stud, idx) => {
                      const { school, predicted, feedback, actual, color } = stud
                      return (
                        <Grid key={`student-item-${idx}`} item xs={12}>
                          <Grid container rowSpacing={1} columnSpacing={3.25} alignItems={'center'}>
                            <Grid item xs={columns[0].width}>
                              <Box sx={{ borderRadius: '50px', px: 1.5, py: 0.5, bgcolor: color }}>
                                <Typography
                                  variant='h5'
                                  color='#ffffff'
                                  fontWeight={700}
                                  textAlign='center'
                                >
                                  {school}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={columns[1].width}>
                              <Typography
                                variant='h5'
                                color='grey.700'
                                fontSize={25}
                                fontWeight={500}
                                textAlign='center'
                              >
                                {typeof predicted === 'number' ? predicted : <>&nbsp;</>}
                              </Typography>
                            </Grid>
                            <Grid item xs={columns[2].width}>
                              <Typography
                                variant='h5'
                                color='grey.700'
                                fontSize={25}
                                fontWeight={500}
                                textAlign='center'
                              >
                                {typeof feedback === 'number' ? feedback : <>&nbsp;</>}
                              </Typography>
                              <Divider light sx={{ mt: 0.1, borderColor: 'grey.700' }} />
                            </Grid>
                            <Grid item xs={columns[3].width}>
                              <Typography
                                variant='h5'
                                color='grey.700'
                                fontSize={25}
                                fontWeight={500}
                                textAlign='center'
                              >
                                {typeof actual === 'number' ? actual : <>&nbsp;</>}
                              </Typography>
                              <Divider light sx={{ mt: 0.1, borderColor: 'grey.700' }} />
                            </Grid>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default StudentStatistics
