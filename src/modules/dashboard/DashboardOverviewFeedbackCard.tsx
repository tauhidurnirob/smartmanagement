import { FC, useMemo, useRef } from 'react'
import { Card, Stack, Typography, Grid, Box } from '@mui/material'
import dayjs from 'dayjs'
import { LoadingButton } from '@mui/lab'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

import { IDashboardOverviewFilters } from '../../types/dashboard'
import useClientSize from '../../hooks/useClientSize'

const data = [
  {
    date: '2023-09-01T00:00:00.000Z',
    complaints: 4000,
    compliments: 2400,
    suggestions: 2400,
    appeals: 2000,
  },
  {
    date: '2023-08-29T00:00:00.000Z',
    complaints: 3000,
    compliments: 1398,
    suggestions: 2210,
    appeals: 2310,
  },
  {
    date: '2023-08-22T00:00:00.000Z',
    complaints: 2000,
    compliments: 9800,
    suggestions: 2290,
    appeals: 2190,
  },
  {
    date: '2023-08-15T00:00:00.000Z',
    complaints: 2780,
    compliments: 3908,
    suggestions: 2000,
    appeals: 3000,
  },
  {
    date: '2023-08-5T00:00:00.000Z',
    complaints: 1890,
    compliments: 4800,
    suggestions: 2181,
    appeals: 3181,
  },
  {
    date: '2023-08-01T00:00:00.000Z',
    complaints: 2390,
    compliments: 3800,
    suggestions: 2500,
    appeals: 3500,
  },
]

const LEGENDS = [
  { label: 'Complaints', color: '#F64E60', key: 'complaints', fill: '#FFE2E5' },
  { label: 'Compliments', color: '#0BB783', key: 'compliments', fill: '#C9F7F5' },
  { label: 'Suggestions', color: '#3699FF', key: 'suggestions', fill: '#E1F0FF' },
  { label: 'Appeals', color: '#8950FC', key: 'appeals', fill: '#EEE5FF' },
]

const Tick = (props: any) => {
  const { x, y, width, height, payload, color } = props
  const value = payload.value
  const day = dayjs(value)
  const month = day.format('MMM')
  const date = day.format('D')
  return (
    <text
      orientation='bottom'
      width={width}
      height={height}
      x={x}
      y={y}
      stroke='none'
      fill={color}
      className='recharts-text recharts-cartesian-axis-tick-value'
      textAnchor='middle'
    >
      <tspan x={x} dy='0.71em'>
        {date}
      </tspan>
      <tspan x={x} y={y + 20} dy='0.71em'>
        {month}
      </tspan>
    </text>
  )
}

interface IProps {
  filters: IDashboardOverviewFilters
}

const DashboardOverviewFeedbackCard: FC<IProps> = ({ filters }) => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  const chartData = useMemo(() => {
    const chartData = data.sort((a, b) => (a.date > b.date ? -1 : -1))

    return chartData
  }, [])
  return (
    <Card>
      <Stack
        display='flex'
        direction={{ lg: 'row', xs: 'row' }}
        flexWrap={{ lg: 'nowrap', xs: 'wrap' }}
        justifyContent={'space-between'}
        sx={{ pl: 3, pr: 2, pt: 3.5, pb: 3 }}
        gap={2}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            typography='h3'
            sx={{ fontSize: 18, fontWeight: 600, color: (theme) => theme.palette.grey[800] }}
          >
            Feedback
          </Typography>
        </Box>
        <Box sx={{ width: 'fit-content' }}>
          <Grid container columnSpacing={2} rowSpacing={1} sx={{ width: '240px' }}>
            {LEGENDS.map((legend, idx) => {
              const { label, color } = legend
              return (
                <Grid key={`legend-item-${idx}`} item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: color,
                      }}
                    />
                    <Typography
                      typography='subtitle1'
                      sx={{
                        fontWeight: 500,
                        color: 'grey.800',
                        lineHeight: 1.5,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Stack>

      <Box sx={{ mt: 1 }}>
        {!chartData.length && (
          <Box p={4}>
            <Typography align='center'>No Available Records</Typography>
          </Box>
        )}
        {!!chartData.length && (
          <Box sx={{ width: '100%', height: '100px', minHeight: '372px' }}>
            <Box ref={paperRef} sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  {...size}
                  data={data}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 27,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis
                    type='category'
                    dataKey='date'
                    fontSize={12}
                    xAxisId='0'
                    color='#B5B5C3'
                    height={45}
                    tick={<Tick />}
                    tickCount={6}
                    interval={1}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  {/* <Tooltip /> */}
                  {LEGENDS.map((legend, idx) => {
                    const { key, fill, color } = legend
                    return (
                      <Area
                        key={`area-chart-item-${idx}`}
                        type='monotone'
                        dataKey={key}
                        stackId={idx}
                        stroke={fill}
                        fill={fill}
                      />
                    )
                  })}
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 3,
          pb: 3,
          px: 5,
        }}
      >
        <LoadingButton
          variant='contained'
          color='primary'
          // onClick={handleDownload}
          sx={{ py: 1 }}
          // loading={downloadLoading}
        >
          Generate Quick Report
        </LoadingButton>
      </Box>
    </Card>
  )
}

export default DashboardOverviewFeedbackCard
