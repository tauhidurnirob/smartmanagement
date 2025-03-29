import { FC, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import useClientSize from '../../hooks/useClientSize'
import ReportChartBar from '../common/ReportChartBar'
import { ISelectItem } from '../../types/common'

const ReportTypesColor: any = {
  audit: '#F64E60',
  deviceIoTNotification: '#0BB783',
  maintenance: '#3699FF',
  incident: '#8950FC',
  feedback: '#A5742B',
}

interface Props {
  data: any
  reportTypes: number[]
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

const ReportOverviewChart: FC<Props> = ({ data, reportTypes }) => {
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
          sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 2, textAlign: 'right', width: '100px' }}
        >
          Received
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
            tickMargin={11}
          />
          <YAxis
            type='number'
            tickCount={6}
            domain={[0, maxData < MAX_Y_GRAPH_COUNT ? MAX_Y_GRAPH_COUNT : maxData]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          {(reportTypes.length === 0 || reportTypes.includes(0)) && (
            <Bar
              type='monotone'
              dataKey='audit'
              strokeWidth={0}
              fill={ReportTypesColor['audit']}
              barSize={20}
              unit=''
              name='Audit Data'
              shape={<ReportChartBar />}
            />
          )}
          {(reportTypes.length === 0 || reportTypes.includes(1)) && (
            <Bar
              type='monotone'
              dataKey='deviceIoTNotification'
              strokeWidth={0}
              fill={ReportTypesColor['deviceIoTNotification']}
              barSize={20}
              unit=''
              name='Device IoT Notification'
              shape={<ReportChartBar />}
            />
          )}
          {(reportTypes.length === 0 || reportTypes.includes(2)) && (
            <Bar
              type='monotone'
              dataKey='maintenance'
              strokeWidth={0}
              fill={ReportTypesColor['maintenance']}
              barSize={20}
              unit=''
              name='Maintenance Data'
              shape={<ReportChartBar />}
            />
          )}
          {(reportTypes.length === 0 || reportTypes.includes(3)) && (
            <Bar
              type='monotone'
              dataKey='incident'
              strokeWidth={0}
              fill={ReportTypesColor['incident']}
              barSize={20}
              unit=''
              name='Incident Data'
              shape={<ReportChartBar />}
            />
          )}
          {(reportTypes.length === 0 || reportTypes.includes(4)) && (
            <Bar
              type='monotone'
              dataKey='feedback'
              strokeWidth={0}
              fill={ReportTypesColor['feedback']}
              barSize={20}
              unit=''
              name='Feedback Data'
              shape={<ReportChartBar />}
            />
          )}
        </BarChart>
      </Box>
    </Box>
  )
}

export default ReportOverviewChart
