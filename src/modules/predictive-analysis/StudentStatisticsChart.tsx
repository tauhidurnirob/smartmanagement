import { FC, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { CartesianGrid, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts'

import useClientSize from '../../hooks/useClientSize'

const ReportTypesColor = {
  student: '#4339F2',
  teacher: '#FF3A29',
  technician: '#FFB200',
  staff: '#34B53A',
}

const LEGEND = [
  { label: 'Student', color: ReportTypesColor.student },
  { label: 'Teacher', color: ReportTypesColor.teacher },
  { label: 'Technician', color: ReportTypesColor.technician },
  { label: 'Staff', color: ReportTypesColor.staff },
]

interface Props {
  data: any
}

const getMaxMinValue = (data: any) => {
  let max = 0
  let min = +Infinity
  data.forEach((el: any) => {
    const maxData = Math.max(...[el.student, el.teacher, el.technician, el.staff])
    const minData = Math.min(...[el.student, el.teacher, el.technician, el.staff])
    max = maxData > max ? maxData : max
    min = minData < min ? minData : min
  })
  return { max, min }
}

const StudentStatisticsChart: FC<Props> = ({ data }) => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  const { max: maxData, min: minData } = getMaxMinValue(data)

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {LEGEND.map((leg, idx) => {
          const { label, color } = leg
          return (
            <Box
              key={`legend-item-${idx}`}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                gap: 0.75,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: color,
                }}
              />
              <Typography variant='h6' sx={{ color: 'grey.700', fontWeight: 400 }}>
                {label}
              </Typography>
            </Box>
          )
        })}
      </Box>
      <Box
        ref={paperRef}
        sx={{ width: '100%', height: '100%', position: 'relative', mt: 3, minHeight: '270px' }}
      >
        <LineChart
          {...size}
          data={data}
          margin={{
            top: 0,
            right: 20,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeOpacity={0.1} stroke='#000000' />
          <YAxis
            type='number'
            tickCount={7}
            axisLine={false}
            tickLine={false}
            domain={[minData, maxData]}
            fontSize={14}
            color='#00000066'
          />
          <Tooltip />
          <XAxis
            dataKey='date'
            fontSize={14}
            xAxisId='0'
            axisLine={false}
            tickLine={false}
            color='#00000066'
            tickMargin={10}
          />
          <Line
            dataKey='student'
            type='linear'
            stroke={ReportTypesColor.student}
            dot={false}
            strokeWidth={4}
          />
          <Line
            dataKey='teacher'
            type='linear'
            stroke={ReportTypesColor.teacher}
            dot={false}
            strokeWidth={4}
          />
          <Line
            dataKey='technician'
            type='linear'
            stroke={ReportTypesColor.technician}
            dot={false}
            strokeWidth={4}
          />
          <Line
            dataKey='staff'
            type='linear'
            stroke={ReportTypesColor.staff}
            dot={false}
            strokeWidth={4}
          />
          {/* <Brush
            height={25}
            dataKey={'date'}
            startIndex={data.length <= 5 ? 0 : data.length - 6}
            endIndex={data.length - 1}
          /> */}
        </LineChart>
      </Box>
    </Box>
  )
}

export default StudentStatisticsChart
