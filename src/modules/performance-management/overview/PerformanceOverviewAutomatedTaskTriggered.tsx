import { FC, useMemo } from 'react'
import { Card, Stack, Typography, Box, Grid } from '@mui/material'

interface IProps {
  data?: any
}

const PerformanceOverviewAutomatedTaskTriggered: FC<IProps> = ({}) => {
  const { items } = useMemo(() => {
    const items = [
      { label: 'Daily', value: 5 },
      { label: 'Weekly', value: 35 },
      { label: 'Monthly', value: 145 },
    ]

    return { items }
  }, [])

  return (
    <Card sx={{ pt: 3, px: 4, pb: 7.5 }}>
      <Stack direction='row' gap={{ xs: 2 }} justifyContent={'space-between'}>
        <Typography typography={'h3'} color='grey.800'>
          Average Automated Task Triggered
        </Typography>
      </Stack>
      <Box sx={{ mt: 3.25 }}>
        <Grid container spacing={3}>
          {items.map((item, idx) => {
            const { label, value } = item
            return (
              <Grid key={`automated-task-triggerd-item-${idx}`} item lg={4} xs={12}>
                <Stack
                  direction='column'
                  gap={1}
                  alignItems={'center'}
                  sx={{ border: '1px solid #ADB5BD', borderRadius: 2.5, p: 2 }}
                >
                  <Typography
                    typography={'h6'}
                    color='grey.800'
                    fontWeight={400}
                    sx={{ opacity: 0.8 }}
                  >
                    {label}
                  </Typography>
                  <Typography typography={'h3'} fontSize={40} fontWeight={700} color='grey.800'>
                    {value}
                  </Typography>
                </Stack>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Card>
  )
}

export default PerformanceOverviewAutomatedTaskTriggered
