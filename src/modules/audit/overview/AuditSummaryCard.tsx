import { FC, useMemo } from 'react'
import { Box, Grid, Typography, Card, Stack } from '@mui/material'
import { PieChart, Pie, Cell } from 'recharts'

import { IAuditOverview } from '../../../types/audit'

const COLORS = ['#50CD89', '#F1416C', '#FE9136']

const getPieData = (data: any) => {
  const percent = data[0].value / (data.reduce((a: number, b: any) => a + b.value, 0) || 1)
  return { startAngle: 90 - (percent * 360) / 2, percent: percent * 100 }
}

interface IProps {
  overview?: IAuditOverview
}
const AuditSummaryCard: FC<IProps> = ({ overview }) => {
  const pieData = useMemo(() => {
    const count = overview?.count
    const totalCount = (count?.passed || 0) + (count?.overallFailure || 0) + (count?.iuFailure || 0)
    return [
      { name: 'Average Passed', value: (((count?.passed || 0)/totalCount) || 0) },
      { name: 'Average Failed', value: ((((count?.overallFailure || 0) + (count?.iuFailure || 0))/totalCount) || 0) }
    ]
  }, [overview])

  const { startAngle, percent } = getPieData(pieData)

  return (
    <Card sx={{ py: 3, px: 2.75, pb: 4, boxSizing: 'border-box', height: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant='h4' sx={{ color: (theme) => theme.palette.grey[900] }}>
              Audit Submitted
            </Typography>
            {/* <Typography
              variant='subtitle2'
              sx={{
                color: (theme) => theme.palette.grey[700],
                textAlign: 'center',
                fontWeight: 500,
                mt: 0.5,
              }}
            >
              Your average inspection score has <br />
              increase by 0.01% Keep it up!
            </Typography> */}
            <Box sx={{ mt: 3.25, position: 'relative' }}>
              <PieChart width={114} height={114}>
                <Pie
                  data={pieData}
                  cx={52}
                  cy={52}
                  innerRadius={40}
                  outerRadius={57}
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
              <Typography
                variant='h3'
                sx={{
                  color: (theme) => theme.palette.grey[900],
                  position: 'absolute',
                  top: 'calc(50% - 10px)',
                  left: '0',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {percent.toFixed(2)}%
              </Typography>
            </Box>
            <Typography
              variant='subtitle1'
              sx={{
                color: (theme) => theme.palette.grey[700],
                mt: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Average Inspection Score
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'column'}>
            <Stack sx={{ gap: 0.5, mt: 3.25 }}>
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
                      variant='subtitle1'
                      sx={{
                        color: (theme) => theme.palette.grey[800],
                      }}
                    >
                      {name}
                    </Typography>
                    <Box
                      sx={{
                        py: 0.75,
                        px: 1.25,
                        backgroundColor: (theme) => theme.palette.grey[50],
                        borderRadius: 1.5,
                      }}
                    >
                      <Typography
                        variant='subtitle2'
                        sx={{
                          color: COLORS[index],
                          fontWeight: 700,
                        }}
                      >
                        {value?.toFixed(2)}
                      </Typography>
                    </Box>
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  )
}

export default AuditSummaryCard
