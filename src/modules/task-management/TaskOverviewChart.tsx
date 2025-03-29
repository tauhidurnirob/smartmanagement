import { FC, useRef, useState } from 'react'
import { Box, Typography, Card } from '@mui/material'
import { CartesianGrid, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts'

import useClientSize from '../../hooks/useClientSize'
import { tmpTaskCompletionList } from './dummy'
import TaskCompletionTimeframeSelect from './TaskCompletionTimeframeSelect'
import { ISelectItem } from '../../types/common'
import { TASK_COMPLETION_TIMEFRAMES } from '../../helpers/constants'

const ReportTypesColor = {
  scheduled: '#B7B7B7',
  completed: '#2BA579',
}

const LEGEND = [
  { label: 'Scheduled', color: ReportTypesColor.scheduled },
  { label: 'Completed', color: ReportTypesColor.completed },
]

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

const TaskOverviewChart: FC = () => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  const data = tmpTaskCompletionList

  const { max: maxData, min: minData } = getMaxMinValue(data)

  const [timeFrame, setTimeFrame] = useState<ISelectItem>(TASK_COMPLETION_TIMEFRAMES[0])

  const handleChangeTimeFrame = (timeFrame: ISelectItem) => {
    setTimeFrame(timeFrame)
  }

  return (
    <Card sx={{ pt: 3.5, pb: 2, px: 3.75 }}>
      <Box sx={{ width: '100%', height: '100%', minHeight: '300px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant='h3' sx={{ color: 'grey.900', fontWeight: 500 }}>
              Task Completion Performance
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 2,
                mt: 1.5,
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
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: color,
                      }}
                    />
                    <Typography
                      variant='h5'
                      sx={{ color: color, fontWeight: 400, lineHeight: 1.1, mt: 0.2 }}
                    >
                      {label}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>
          <TaskCompletionTimeframeSelect
            hiddenLabel
            selected={timeFrame}
            onChange={handleChangeTimeFrame}
          />
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
              right: 0,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke='#F5F5F7' vertical={false} />
            <YAxis
              type='number'
              tickCount={6}
              axisLine={false}
              tickLine={false}
              domain={[minData, maxData]}
              fontSize={14}
              color='#0C0B0B'
              fontWeight={500}
            />
            <Tooltip />
            <XAxis
              dataKey='date'
              fontSize={14}
              xAxisId='0'
              axisLine={false}
              tickLine={false}
              color='#0C0B0B'
              tickMargin={10}
            />
            <Line
              dataKey='scheduled'
              type='monotone'
              stroke={ReportTypesColor.scheduled}
              dot={false}
              strokeWidth={3}
              filter={
                'drop-shadow(0px 11.368160247802734px 18.4732608795166px rgba(12, 10, 32, 0.14))'
              }
            />
            <Line
              dataKey='completed'
              type='monotone'
              stroke={ReportTypesColor.completed}
              dot={false}
              strokeWidth={3}
              filter={
                'drop-shadow(0px 11.368160247802734px 18.4732608795166px rgba(12, 10, 32, 0.14))'
              }
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
    </Card>
  )
}

export default TaskOverviewChart
