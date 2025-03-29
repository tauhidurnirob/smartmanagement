import { FC, useMemo } from 'react'
import { Stack, Typography, Box, Grid } from '@mui/material'
import dayjs from 'dayjs'
import LinearProgressWithLabel from '../../common/LinearProgressWithLabel'

interface IProps {
  data?: any
}

const PerformanceOverviewTaskActivityLog: FC<IProps> = ({}) => {
  const { items, maxTime, curTime, leftItems, rightItems } = useMemo(() => {
    const items = [
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'AI triggered air freshener sensor',
        description: 'Air freshener activated',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Checking Ammonia Level',
        description: 'AI predicted the ammonia level is low now',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
    ]

    const maxTime = 15 // [mins]
    const curTime = 12 // [mins]

    const leftItems = [
      { label: 'Alert Time', value: '7 July, 9:28 PM' },
      { label: 'Response Time', value: '7 July, 9:28 PM' },
      { label: 'Acknowledge By', value: 'Samantha Lee' },
      { label: 'SLA Resolve Time', value: '60 mins' },
      { label: 'Actual Resolve Time', value: '52 mins' },
      { label: 'Exceeded SLA Response Time', value: '_' }
    ]

    const rightItems = [
      { label: 'Project', value: 'TP' },
      { label: 'Location', value: 'Temasek Polytechnic' },
      { label: 'Building', value: 'Building 1' },
      { label: 'Level', value: 'Level 1' },
      { label: 'Area', value: 'Toilet' },
      { label: 'Unit', value: 'Washroom 101' },
    ]

    return { items, maxTime, curTime, leftItems, rightItems }
  }, [])

  return (
    <Stack
      sx={{
        pt: 3,
        pl: 3,
        pb: 3,
        pr: 3,
      }}
    >
      <Box>
        <LinearProgressWithLabel maxValue={maxTime} value={curTime} />
        <Grid container sx={{py: 3}}>
          <Grid item lg={6} xs={12}>
            <Grid container direction={'column'} rowSpacing={2.5}>
              {leftItems.map((item, idx) => {
                const label = item.label
                const value = item.value
                return (
                  <Grid key={idx} item container spacing={1}>
                    <Grid item lg={5} xs={12}>
                      <Typography typography={'h4'} color='grey.800' fontWeight={500}>{label}</Typography>
                    </Grid>
                    <Grid item lg={7} xs={12}>
                      <Typography typography={'h5'} color='grey.700' fontWeight={400}>
                        {value}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
          >
            <Grid container direction={'column'} rowSpacing={2.5}>
              {rightItems.map((item, idx) => {
                const label = item.label
                const value: any = item.value
                return (
                  <Grid key={idx} item container spacing={1}>
                    <Grid item lg={5} xs={12}>
                      <Typography typography={'h4'} color='grey.800' fontWeight={500}>{label}</Typography>
                    </Grid>
                    <Grid item lg={7} xs={12}>
                      <Typography typography={'h5'} color='grey.700' fontWeight={400}>
                        {value}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
        <Stack direction='column' rowGap={2.25} mt={2.5}>
          {items.map((item, idx) => {
            const { label, description, createdAt } = item
            return (
              <Stack
                key={`performance-automation-report-item-${idx}`}
                direction='column'
                rowGap={0.5}
              >
                <Stack direction='row' pl={'62px'} alignItems={'center'}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                    }}
                  />
                  <Typography typography={'h4'} color='grey.800' fontWeight={700} ml={2.25}>
                    {label}
                  </Typography>
                </Stack>
                <Stack direction='row'>
                  <Stack direction='column' sx={{ width: '53px' }}>
                    <Typography
                      typography={'h6'}
                      color='grey.400'
                      fontWeight={700}
                      textAlign={'right'}
                    >
                      {dayjs(createdAt).format('D MMM')}
                    </Typography>
                    <Typography
                      typography={'h6'}
                      color='grey.400'
                      fontWeight={700}
                      textAlign={'right'}
                    >
                      {dayjs(createdAt).format('h:m A')}
                    </Typography>
                  </Stack>
                  <Box sx={{ ml: 1.75, borderLeft: '2px solid #E2E8F0' }}>
                    <Typography typography={'h6'} color='primary.main' fontWeight={700} ml={3}>
                      {description}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            )
          })}
        </Stack>
      </Box>
    </Stack>
  )
}

export default PerformanceOverviewTaskActivityLog
