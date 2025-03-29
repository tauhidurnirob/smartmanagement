import { FC, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import useClientSize from '../../hooks/useClientSize'
import ReportChartBar from '../common/ReportChartBar'

const ReportTypesColor: any = {
  received: '#F64E60',
  alert: '#F64E60',
  online: '#0BB783',
  offline: '#3699FF',
  swap: '#8950FC',
  error: '#A5742B',
}

interface Props {
  data: any
  selectedTypes?: Array<string>
}

const getMaxValue = (data: any) => {
  let res = 0
  data.forEach((el: any) => {
    const maxData = Math.max(...[el.passed, el.overallFailure, el.iuFailure])
    res = maxData > res ? maxData : res
  })
  return res
}

const MAX_Y_GRAPH_COUNT = 50
const LABEL_INTERVAL = 9 + 14 // [px]
const sxLeftLabel = {
  position: 'absolute',
  left: -25,
  bottom: 0,
  fontSize: 11,
  lineHeight: '14px',
  color: '#000000',
  fontWeight: 600,
  textAlign: 'right',
  minWidth: '80px',
}

const DeviceOverviewChart: FC<Props> = ({ data, selectedTypes }) => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  const maxData = getMaxValue(data)

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: '420px' }}>
      <Typography variant='h3' sx={{ fontSize: 18, textAlign: 'center', mb: 3 }}>
        Total number of cases received
      </Typography>
      <Box ref={paperRef} sx={{ width: '100%', height: 'calc(100% - 0px)', position: 'relative' }}>
        <Typography
          sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 4, textAlign: 'right', width: '100px' }}
        >
          Received
        </Typography>
        <Typography
          sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 3, textAlign: 'right', width: '100px' }}
        >
          Device Alert
        </Typography>
        <Typography
          sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 2, textAlign: 'right', width: '100px' }}
        >
          Device Swap
        </Typography>
        <BarChart
          {...size}
          data={data}
          margin={{
            top: 0,
            right: 30,
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
            tickMargin={12}
          />
          <XAxis
            dataKey='received'
            fontSize={12}
            xAxisId='1'
            axisLine={false}
            tickLine={false}
            color='#B5B5C3'
            tickMargin={24}
          />
          <XAxis
            dataKey='alert'
            xAxisId='2'
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickMargin={17}
          />
          <XAxis
            dataKey='swap'
            xAxisId='3'
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            type='number'
            tickCount={5}
            domain={[0, maxData < MAX_Y_GRAPH_COUNT ? MAX_Y_GRAPH_COUNT : maxData]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Bar
            type='monotone'
            dataKey='online'
            strokeWidth={0}
            fill={ReportTypesColor['online']}
            barSize={20}
            unit=''
            name='Device Online'
            shape={<ReportChartBar />}
          />
          <Bar
            type='monotone'
            dataKey='offline'
            strokeWidth={0}
            fill={ReportTypesColor['offline']}
            barSize={20}
            unit=''
            name='Device Offline'
            shape={<ReportChartBar />}
          />
          <Bar
            type='monotone'
            dataKey='swap'
            strokeWidth={0}
            fill={ReportTypesColor['swap']}
            barSize={20}
            unit=''
            name='Device Swap'
            shape={<ReportChartBar />}
          />
          <Bar
            type='monotone'
            dataKey='alert'
            strokeWidth={0}
            fill={ReportTypesColor['alert']}
            barSize={20}
            unit=''
            name='Device Alert'
            shape={<ReportChartBar />}
          />
          <Bar
            type='monotone'
            dataKey='error'
            strokeWidth={0}
            fill={ReportTypesColor['error']}
            barSize={20}
            unit=''
            name='Device Error'
            shape={<ReportChartBar />}
          />
        </BarChart>
      </Box>
    </Box>
  )
}

export default DeviceOverviewChart
