import { FC, useMemo } from 'react'
import { Box, Grid, Typography, Card, Stack, Button } from '@mui/material'
import { PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#50CD89', '#F1416C', '#FE9136']

const getPieData = (data: any) => {
  const percent = data[0].value / (data.reduce((a: number, b: any) => a + b.value, 0) || 1)
  return { startAngle: 90 - (percent * 360) / 2, percent: percent * 100 }
}

interface IData {
  sensors: number
  robots: number
  nonIot: number
}

interface IProps {
  data: IData
  infoText: string
}
const MaintenanceOverviewCard: FC<IProps> = ({ data, infoText }) => {
  const {totalData, pieData} = useMemo(() => {
    return {
      totalData: (data.sensors + data.robots + data.nonIot),
      pieData: [
      { name: 'Sensors', value: data?.sensors || 0 },
      { name: 'Robots', value: data?.robots || 0 },
      { name: 'Non-IoT', value: data?.nonIot || 0 },
      ]
    }
  }, [data])

  const { startAngle, percent } = getPieData(pieData)

  return (
    <Card sx={{ py: 3, px: 2.75, pb: 4, boxSizing: 'border-box', height: '100%', flex: 1 }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant='h1'>{totalData}</Typography>
        <Button variant='contained'>View All</Button>
      </Stack>
      <Typography color={'text.secondary'} my={2}>{infoText}</Typography>
      <Grid container spacing={2} sx={{px: 4, py: 2}}>
        <Grid item xs={5}>
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
        </Grid>
        <Grid item xs={7}>
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
                        color: (theme) => theme.palette.grey[700],
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
                        {value}
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

export default MaintenanceOverviewCard
