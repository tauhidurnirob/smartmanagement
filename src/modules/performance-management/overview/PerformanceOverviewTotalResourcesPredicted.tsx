import { FC, useMemo } from 'react'
import { Card, Stack, Typography, Grid, Box, Button, Divider, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { PieChart, Pie, Cell } from 'recharts'

import { CircleWarningIcon } from '../../../assets/icons/circle-warning'

const COLORS = ['#3699FF', '#50CD89']
const CIRCLE_WIDTH = 36
const CIRCLE_RADIUS = 97

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'grey.700',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'grey.700',
  },
}))

const getPieData = (data: any) => {
  const percent = data[0].value / (data.reduce((a: number, b: any) => a + b.value, 0) || 1)
  return { startAngle: 90 - (percent * 360) / 2, percent: percent * 100 }
}

interface IProps {
  data?: any
}

const PerformanceOverviewTotalResourcesPredicted: FC<IProps> = ({}) => {
  const { pieData, predictions } = useMemo(() => {
    const pieData = [
      { name: 'Cleaner', value: 3478 },
      { name: 'Robot', value: 826 },
    ]

    const predictions = [
      { label: 'Cleaner', value: 823452, color: COLORS[0] },
      { label: 'Robot', value: 524567, color: COLORS[1] },
    ]

    return { pieData, predictions }
  }, [])

  const { startAngle } = getPieData(pieData)

  return (
    <Card>
      <Stack
        direction='row'
        gap={{ xs: 2 }}
        sx={{ p: 3, pl: 4.25 }}
        justifyContent={'space-between'}
      >
        <Typography typography={'h3'} color='grey.800'>
          Total Resources Predicted
        </Typography>
        <BootstrapTooltip
          title={
            <Typography
              variant='h6'
              fontSize={10}
              sx={{ color: '#ffffff' }}
              fontWeight={400}
              textAlign={'center'}
            >
              AI prediction of total resources
              <br /> needed for certain location
            </Typography>
          }
          placement='top'
          slotProps={{
            arrow: {
              sx: {
                color: 'grey.700',
              },
            },
          }}
        >
          <CircleWarningIcon sx={{ color: 'grey.600' }} />
        </BootstrapTooltip>
      </Stack>
      <Stack sx={{ pt: 3.25, pl: 2.5, pb: 2, pr: 2.5 }} direction='column'>
        <Stack direction='row' alignItems={'center'} columnGap={4.5}>
          <PieChart width={CIRCLE_RADIUS * 2} height={CIRCLE_RADIUS * 2}>
            <Pie
              data={pieData}
              cx={CIRCLE_RADIUS - 5}
              cy={CIRCLE_RADIUS - 5}
              innerRadius={CIRCLE_RADIUS - CIRCLE_WIDTH}
              outerRadius={CIRCLE_RADIUS}
              fill='#50CD89'
              paddingAngle={0}
              dataKey='value'
              startAngle={startAngle}
              endAngle={360 + startAngle}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>

          <Box>
            <Grid container columnSpacing={3} rowSpacing={2}>
              {pieData.map((item, idx) => {
                const { name, value } = item
                return (
                  <Grid key={`performance-prediction-item-${idx}`} item lg={6} xs={12}>
                    <Stack direction='column' gap={0.5}>
                      <Typography typography={'h6'} color='grey.600' fontWeight={400}>
                        {name}
                      </Typography>
                      <Typography typography={'h2'} color='grey.900' fontWeight={600}>
                        {value}
                      </Typography>
                    </Stack>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Stack>
      </Stack>
      <Stack sx={{ pt: 2.5, pl: 4.5, pb: 2, pr: 2.5 }} direction={'column'} gap={3}>
        <Stack direction={'column'}>
          <Stack
            direction={'row'}
            flexWrap={'nowrap'}
            sx={{ ml: '213px', borderBottom: '1px dashed #E4E6EF' }}
          >
            <Grid container columnSpacing={0}>
              <Grid item xs={6}>
                <Typography
                  variant='h6'
                  color='grey.400'
                  fontWeight={700}
                  sx={{ borderRight: '1px dashed #E4E6EF', pb: 0.5 }}
                  textAlign={'center'}
                >
                  Predicted
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant='h6'
                  color='grey.400'
                  fontWeight={700}
                  textAlign={'center'}
                  sx={{ pb: 0.5 }}
                >
                  Actual
                </Typography>
              </Grid>
            </Grid>
          </Stack>
          {predictions.map((pred, idx) => {
            const { label, value, color } = pred
            return (
              <Stack
                key={`performance-prediction-item-list-${idx}`}
                direction={'row'}
                flexWrap={'nowrap'}
              >
                <Stack direction='row' alignItems={'center'} sx={{ minWidth: '213px', pt: 2 }}>
                  <Box
                    sx={{
                      width: 23,
                      height: 23,
                      borderRadius: '50%',
                      backgroundColor: color,
                    }}
                  />
                  <Typography typography={'h4'} color='grey.800' fontWeight={700} ml={2.25}>
                    {label}
                  </Typography>
                </Stack>
                <Grid container columnSpacing={0} alignItems={'center'}>
                  <Grid item xs={6}>
                    <Typography
                      variant='h6'
                      color='grey.800'
                      fontWeight={500}
                      fontSize={25}
                      sx={{ pb: 0.5, pt: 2 }}
                      textAlign={'center'}
                    >
                      {value}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        px: 3,
                        py: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '1px dashed #E4E6EF',
                      }}
                    >
                      <TextField
                        type='number'
                        // value={value}
                        // onChange={(e) => handleChangeValue(key, e.target.value)}
                        sx={{
                          flex: 1,
                          '.MuiInputBase-root': { border: 'none', borderRadius: 0 },
                          input: {
                            height: '29px',
                            fontSize: '1.5rem',
                            p: '2px',
                            pr: { lg: 1.12, xs: 3 },
                            textAlign: 'center',
                            border: 'none',
                            borderRadius: 0,
                          },
                          '.MuiOutlinedInput-notchedOutline': { border: 'none', borderRadius: 0 },
                        }}
                      />

                      <Divider light sx={{ mt: 1.25, borderColor: 'grey.700' }} />
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            )
          })}
        </Stack>
        <Box sx={{ textAlign: 'right' }}>
          <Button variant='contained' color='primary'>
            Save Actual Data
          </Button>
        </Box>
      </Stack>
    </Card>
  )
}

export default PerformanceOverviewTotalResourcesPredicted
