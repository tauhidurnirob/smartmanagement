import { FC, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import useClientSize from '../../hooks/useClientSize'
import { WASHROOM_REPORT_TYPE_LIST } from '../../helpers/constants'
import ReportChartBar from '../../modules/common/ReportChartBar'

const ReportTypesColor: any = {
  complaint: '#0BB783',
  highAmmoniaLevel: '#F64E60',
}

const textColor = '#B5B5C3'

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

const WashroomOverviewChart: FC<Props> = ({ data, selectedTypes }) => {
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
          sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 3, textAlign: 'right', width: '100px' }}
        >
          High ammonia
        </Typography>
        <Typography
          sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 2, textAlign: 'right', width: '100px' }}
        >
          Complaint feedback
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
            color={textColor}
            tickMargin={10}
          />
          <XAxis
            dataKey='highAmmoniaLevel'
            xAxisId='1'
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickMargin={18}
          />
          <XAxis
            dataKey='complaint'
            fontSize={12}
            xAxisId='2'
            axisLine={false}
            tickLine={false}
            tickMargin={11.5}
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
            selectedTypes.includes(WASHROOM_REPORT_TYPE_LIST[0].value as string) ||
            selectedTypes.length === 0) && (
            <Bar
              type='monotone'
              dataKey='complaint'
              strokeWidth={0}
              fill={ReportTypesColor['complaint']}
              barSize={20}
              unit=' cases'
              name='Total Complaint Feedback'
              shape={<ReportChartBar />}
            />
          )}
          {(!selectedTypes ||
            selectedTypes.includes(WASHROOM_REPORT_TYPE_LIST[1].value as string) ||
            selectedTypes.length === 0) && (
            <Bar
              type='monotone'
              dataKey='highAmmoniaLevel'
              strokeWidth={0}
              fill={ReportTypesColor['highAmmoniaLevel']}
              barSize={20}
              unit=' cases'
              name='Total high ammonis'
              shape={<ReportChartBar />}
            />
          )}
        </BarChart>
      </Box>
    </Box>
  )
}

export default WashroomOverviewChart
