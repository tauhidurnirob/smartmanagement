import { FC, useMemo, useRef } from 'react'
import { Card, Typography, Grid, Box } from '@mui/material'
import { Bar, BarChart, Brush, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

import { IDashboardOverviewFilters } from '../../types/dashboard'
import { CHIP_TYPES, DEVICE_STATUS_LIST } from '../../helpers/constants'
import getChipColor from '../../helpers/getChipColor'
import useClientSize from '../../hooks/useClientSize'
import ReportChartBar from '../common/ReportChartBar'

const ReportTypesColor: any = {
  online: '#50CD89',
  offline: '#5E6278',
  batteryLow: '#F8BC19',
  error: '#F1416C',
}

const MAX_Y_GRAPH_COUNT = 50
const BAR_WIDTH = 10

const getMaxValue = (data: any) => {
  let res = 0
  data.forEach((el: any) => {
    const maxData = Math.max(...[el.online, el.offline, el.betteryLow, el.error])
    res = maxData > res ? maxData : res
  })
  return res
}

interface IProps {
  filters: IDashboardOverviewFilters
}

const DashboardOverviewDeviceCard: FC<IProps> = ({ filters }) => {
  const paperRef = useRef<any>(null)

  const size = useClientSize(paperRef)

  const { counts } = useMemo(() => {
    const counts = [
      {
        label: DEVICE_STATUS_LIST[0].label,
        color: getChipColor(DEVICE_STATUS_LIST[0].chipType as CHIP_TYPES).color,
        value: 1235,
      },
      {
        label: DEVICE_STATUS_LIST[1].label,
        color: getChipColor(DEVICE_STATUS_LIST[1].chipType as CHIP_TYPES).color,
        value: 2,
      },
      {
        label: DEVICE_STATUS_LIST[2].label,
        color: getChipColor(DEVICE_STATUS_LIST[2].chipType as CHIP_TYPES).color,
        value: 2,
      },
      {
        label: DEVICE_STATUS_LIST[3].label,
        color: getChipColor(DEVICE_STATUS_LIST[3].chipType as CHIP_TYPES).color,
        value: 2,
      },
    ]
    return { counts }
  }, [])

  const { data, maxData } = useMemo(() => {
    const data = [
      { date: '08:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '09:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '10:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '11:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '12:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '13:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '14:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '15:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '16:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
      { date: '17:00', online: 20, offline: 10, batteryLow: 15, error: 3 },
    ]
    const maxData = getMaxValue(data)
    return { data, maxData }
  }, [])

  return (
    <Card sx={{ pt: 4.25, px: 3.75, pb: 1.5, height: '100%' }}>
      <Typography variant='h4' sx={{ color: 'grey.800' }}>
        Device
      </Typography>
      <Grid container columnSpacing={2.25} rowSpacing={2.25} sx={{ mt: 2.25 }}>
        {counts.map((count, idx) => {
          const { label, color, value } = count
          return (
            <Grid key={`dashboard-device-item-${idx}`} item lg={3} md={6} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  py: 2,
                  px: 1.5,
                  borderRadius: 1.5,
                  border: (theme) => `1px dashed ${theme.palette.grey[100]}`,
                }}
              >
                <Typography
                  variant='h4'
                  sx={{
                    color: 'grey.700',
                    lineHeight: '24px',
                    fontWeight: 500,
                    textAlign: 'center',
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    fontSize: '35px',
                    color: color as string,
                    lineHeight: '34px',
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                >
                  {value}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
      <Box sx={{ width: '100%', height: '310px', mt: 4.5 }}>
        <Box ref={paperRef} sx={{ width: '100%', height: '100%', position: 'relative' }}>
          <BarChart
            {...size}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barGap={3}
          >
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='date'
              fontSize={12}
              xAxisId='0'
              axisLine={false}
              tickLine={false}
              color='#B5B5C3'
              tickMargin={10}
            />
            <YAxis
              type='number'
              tickCount={7}
              domain={[0, maxData < MAX_Y_GRAPH_COUNT ? MAX_Y_GRAPH_COUNT : maxData]}
              axisLine={false}
              tickLine={false}
              hide={true}
            />
            <Tooltip />
            <Bar
              type='monotone'
              dataKey='online'
              strokeWidth={0}
              fill={ReportTypesColor['online']}
              barSize={BAR_WIDTH}
              shape={<ReportChartBar />}
            />
            {/* <Bar
              type='monotone'
              dataKey='offline'
              strokeWidth={0}
              fill={ReportTypesColor['offline']}
              barSize={BAR_WIDTH}
              shape={<ReportChartBar />}
            /> */}
            <Bar
              type='monotone'
              dataKey='batteryLow'
              strokeWidth={0}
              fill={ReportTypesColor['batteryLow']}
              barSize={BAR_WIDTH}
              shape={<ReportChartBar />}
            />
            <Bar
              type='monotone'
              dataKey='error'
              strokeWidth={0}
              fill={ReportTypesColor['error']}
              barSize={BAR_WIDTH}
              shape={<ReportChartBar />}
            />
          </BarChart>
        </Box>
      </Box>
    </Card>
  )
}

export default DashboardOverviewDeviceCard
