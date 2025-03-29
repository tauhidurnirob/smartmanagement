import { FC, useMemo } from 'react'
import { Card, Stack, Typography, Box } from '@mui/material'
import { PieChart, Pie, Cell } from 'recharts'

import { CircleWarningIcon } from '../../../assets/icons/circle-warning'

const COLORS = ['#3699FF', '#50CD89', '#F269C4']
const CIRCLE_RADIUS = 110

const getPieData = (data: any) => {
  const sum = data.reduce((a: number, b: any) => a + b.value, 0)
  const percents = data.map((i: any) => i.value / (sum || 1))
  const percent = percents[0]

  const startAngle = 90 - (percent * 360) / 2
  let angle = startAngle

  const angles = data.map((i: any, idx: number) => {
    const curAngle = percents[idx] * 360
    const startAngle = angle
    const endAngle = angle + curAngle
    angle = angle + curAngle
    const gapAngle = 0
    return {
      startAngle: startAngle + gapAngle / 2,
      endAngle: endAngle - gapAngle / 1,
      pieData: [{ name: i.name, value: i.value }],
      color: i.color,
      outerRadius: i.outerRadius,
    }
  })
  return {
    startAngle,
    angles,
  }
}

interface IProps {
  data?: any
}

const PerformanceOverviewAutomatedTaskCompleted: FC<IProps> = ({}) => {
  const { pieData } = useMemo(() => {
    const pieData = [
      { name: 'Cleaner', value: 53, outerRadius: 61, color: COLORS[0] },
      { name: 'Robot', value: 145, outerRadius: 110, color: COLORS[1] },
      { name: 'Device', value: 120, outerRadius: 88, color: COLORS[2] },
    ]

    return { pieData }
  }, [])

  const { angles } = getPieData(pieData)

  return (
    <Card>
      <Stack
        direction='row'
        gap={{ xs: 2 }}
        sx={{ p: 3, pl: 4.25 }}
        justifyContent={'space-between'}
      >
        <Typography typography={'h3'} color='grey.800'>
          Automated Task Completed
        </Typography>
        <CircleWarningIcon sx={{ color: 'grey.600' }} />
      </Stack>
      <Stack sx={{ pt: 2, pl: 2.5, pb: 2, pr: 2.5 }} direction='column'>
        <Stack direction='row' alignItems={'center'} columnGap={4.5}>
          <PieChart width={CIRCLE_RADIUS * 2} height={CIRCLE_RADIUS * 2}>
            {angles.map((angle: any, idx: number) => {
              const { startAngle, endAngle, pieData, outerRadius, color } = angle
              return (
                <Pie
                  key={`automated-task-completed-item-${idx}`}
                  data={pieData}
                  cx={CIRCLE_RADIUS - 5}
                  cy={CIRCLE_RADIUS - 5}
                  outerRadius={outerRadius}
                  fill='#50CD89'
                  paddingAngle={10}
                  dataKey='value'
                  startAngle={startAngle}
                  endAngle={endAngle}
                  cornerRadius={0}
                >
                  <Cell fill={color} />
                </Pie>
              )
            })}
          </PieChart>

          <Box sx={{ width: '100%' }}>
            <Stack gap={3} direction={'column'}>
              {pieData.map((item, index) => {
                const { name, value } = item
                return (
                  <Stack
                    key={index}
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{ pb: 0.5, borderBottom: '1px dashed #E4E6EF' }}
                  >
                    <Typography
                      variant='h3'
                      fontWeight={500}
                      sx={{
                        color: 'grey.800',
                      }}
                    >
                      Completed by {name}
                    </Typography>
                    <Box
                      sx={{
                        py: 0.75,
                        px: 1.25,
                        backgroundColor: 'grey.50',
                        borderRadius: 1.5,
                      }}
                    >
                      <Typography
                        variant='h3'
                        sx={{
                          color: COLORS[index],
                          fontWeight: 700,
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  </Stack>
                )
              })}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Card>
  )
}

export default PerformanceOverviewAutomatedTaskCompleted
