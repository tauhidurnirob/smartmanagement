import { FC, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import useClientSize from '../../hooks/useClientSize'
import { INCIDENT_REPORT_TYPE_LIST } from '../../helpers/constants'
import ReportChartBar from '../../modules/common/ReportChartBar'

const ReportTypesColor: any = {
  completed: '#0BB783',
  overdue: '#F64E60',
  open: '#FE9136',
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

const IncidentOverviewChart: FC<Props> = ({ data, selectedTypes }) => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  const maxData = getMaxValue(data)

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: '420px' }}>
      <Typography variant='h3' sx={{ fontSize: 18, textAlign: 'center', mb: 3 }}>
        Total Incident
      </Typography>
      <Box ref={paperRef} sx={{ width: '100%', height: 'calc(100% - 0px)', position: 'relative' }}>
        <Typography
          sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 3, textAlign: 'right', width: '100px' }}
        >
          Completed Incident
        </Typography>
        <Typography
          sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 2, textAlign: 'right', width: '100px' }}
        >
          Overdue Incident
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
          barGap={'15%'}
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
            dataKey='completed'
            fontSize={12}
            xAxisId='1'
            axisLine={false}
            tickLine={false}
            tickMargin={16}
          />
          <XAxis
            dataKey='overdue'
            xAxisId='2'
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
          {(!selectedTypes ||
            selectedTypes.includes(INCIDENT_REPORT_TYPE_LIST[2].value as string) ||
            selectedTypes.length === 0) && (
            <Bar
              type='monotone'
              dataKey='completed'
              strokeWidth={0}
              fill={ReportTypesColor['completed']}
              barSize={20}
              unit=' cases'
              name='Total event closed'
              shape={<ReportChartBar />}
            />
          )}
          {(!selectedTypes ||
            selectedTypes.includes(INCIDENT_REPORT_TYPE_LIST[0].value as string) ||
            selectedTypes.length === 0) && (
            <Bar
              type='monotone'
              dataKey='overdue'
              strokeWidth={0}
              fill={ReportTypesColor['overdue']}
              barSize={20}
              unit=' cases'
              name='Total event overdue'
              shape={<ReportChartBar />}
            />
          )}
        </BarChart>
      </Box>
    </Box>
  )
}

export default IncidentOverviewChart
