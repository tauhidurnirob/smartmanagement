import { useMemo, useRef, useEffect } from 'react'
import { Stack, Typography, Box, Grid, Card, Button } from '@mui/material'
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import dayjs from 'dayjs'

import useClientSize from '../../hooks/useClientSize'
import Api from '../../api'
import BackDrop from '../common/BackDrop'

const IncidentCard = ({
  data,
  color,
  backgroundColor,
}: {
  backgroundColor: string
  color: string
  data: any[]
}) => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  return (
    <Box
      ref={paperRef}
      sx={{ width: '100%', height: '100%', minHeight: '230px', position: 'relative' }}
    >
      <AreaChart
        {...size}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: -32,
          bottom: -10,
        }}
      >
        <XAxis
          dataKey='date'
          fontSize={9}
          axisLine={false}
          tickLine={false}
          color='#B5B5C3'
          tickCount={6}
          tickMargin={7}
          fontWeight={700}
        />
        <YAxis
          fontSize={9}
          axisLine={false}
          tickLine={false}
          tickCount={6}
          color='#B5B5C3'
          tickMargin={2}
          fontWeight={700}
        />
        <Tooltip />
        <Area
          type='monotoneX'
          dataKey='count'
          stroke={color}
          fill={backgroundColor}
          width={size.width}
        />
      </AreaChart>
    </Box>
  )
}

const TodayIncidents = ({ label = "Today's Incident" }: { label?: string }) => {
  const {
    data: overviewData,
    isFetching: isLoading,
    isUninitialized,
    refetch,
  } = Api.useGetIncidentOverviewQuery()

  const items = useMemo(() => {
    const colors = [
      { color: '#2BA579', backgroundColor: '#E8FFF3' },
      { color: '#FFA621', backgroundColor: '#FFF5E7' },
      { color: '#F1416C', backgroundColor: '#FFF5F8' },
    ]
    return (overviewData || []).map((t, idx) => {
      const { incidentType, incidents } = t
      const totalCount = incidents.reduce((s, a) => s + a.count, 0)
      const colorInfo = colors[idx % 3]
      return {
        type: incidentType.name,
        data: incidents.map((i) => ({ ...i, date: dayjs(i.date).format('DD MMM') })),
        count: totalCount,
        ...colorInfo,
      }
    })
  }, [overviewData])

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  return (
    <Stack>
      <Typography variant='h3'>{label}</Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, p: 2 }}>
          <Box sx={{ position: 'relative', height: '30px' }}>
            <BackDrop size={30} />
          </Box>
        </Box>
      ) : (
        <Box mt={2}>
          <Grid container spacing={5}>
            {items.map((item, idx) => {
              const { type, data, color, backgroundColor, count } = item
              return (
                <Grid key={idx} item lg={4} xs={12}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      px: 2.75,
                      pt: 2.75,
                      pb: 2,
                      minHeight: '330px',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        textAlign: 'right',
                        zIndex: 1,
                      }}
                    >
                      <Typography variant='h2' sx={{ lineHeight: '36px' }}>
                        {count.toString().padStart(2, '0')}
                      </Typography>
                      <Typography
                        variant='h5'
                        sx={{ mt: 0.5, fontWeight: 700, color: (theme) => theme.palette.grey[300] }}
                      >
                        {type || ''}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <IncidentCard data={data} color={color} backgroundColor={backgroundColor} />
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 3.5 }}>
                      <Button color='primary' variant='contained' size='small' onClick={() => {}}>
                        View All
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      )}
    </Stack>
  )
}

export default TodayIncidents
