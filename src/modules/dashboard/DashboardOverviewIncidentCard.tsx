import { FC, useMemo } from 'react'
import { Card, Typography, Box, Grid } from '@mui/material'
import { PieChart, Pie, Cell } from 'recharts'

import { IDashboardOverviewFilters } from '../../types/dashboard'
import { DashboardIncidentItemIcon } from '../../assets/icons/dashboard-incident-item'
import deepCopy from '../../helpers/deepCopy'

const PIE_RADIUS = 100.5 // [px]
const PIE_WIDTH = 20 // [px]

const getPieData = (data: any) => {
  const percent = data[0].value / (data.reduce((a: number, b: any) => a + b.value, 0) || 1)
  return { startAngle: 90 - percent * 360, percent: percent * 100 }
}

interface IProps {
  filters: IDashboardOverviewFilters
}

const DashboardOverviewIncidentCard: FC<IProps> = ({ filters }) => {
  const { pieData, totalCount, items } = useMemo(() => {
    const counts = {
      closed: 20,
      overdue: 11,
      inProgress: 5,
      pending: 10,
    }
    const closed = counts.closed
    const overdue = counts.overdue
    const inProgress = counts.inProgress
    const pending = counts.pending
    const totalCount = closed + overdue + inProgress + pending
    const pieData = [
      { name: 'Closed', value: counts.closed, color: '#5E6278', itemOrder: 4, iconFill: '#E4E6EF' },
      {
        name: 'Overdue',
        value: counts.overdue,
        color: '#F1416C',
        itemOrder: 2,
        iconFill: '#FFF5F8',
      },
      {
        name: 'In Progress',
        value: counts.inProgress,
        color: '#F1BC00',
        itemOrder: 3,
        iconFill: '#FFF8DD',
      },
      {
        name: 'Pending Acknowledgment',
        value: counts.pending,
        color: '#2BA579',
        itemOrder: 1,
        iconFill: '#E8FFF3',
      },
    ]
    const items = deepCopy(pieData)
      .sort((a, b) => (a.itemOrder > b.itemOrder ? 1 : -1))
      .map((e) => ({ ...e, percent: (e.value / totalCount) * 100 }))

    return {
      pieData,
      totalCount,
      items,
    }
  }, [])

  const { startAngle } = getPieData(pieData)

  return (
    <Card sx={{ pt: 4.25, px: 3.75, pb: 8 }}>
      <Typography variant='h4' sx={{ color: 'grey.800' }}>
        Incident
      </Typography>
      <Box sx={{ mt: 7, position: 'relative', justifyContent: 'center', display: 'flex' }}>
        <PieChart width={PIE_RADIUS * 2} height={PIE_RADIUS * 2}>
          <Pie
            data={pieData}
            cx={PIE_RADIUS - 5}
            cy={PIE_RADIUS - 5}
            innerRadius={PIE_RADIUS - PIE_WIDTH}
            outerRadius={PIE_RADIUS}
            fill='#50CD89'
            paddingAngle={0}
            dataKey='value'
            startAngle={startAngle}
            endAngle={360 + startAngle}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <Typography
          variant='h3'
          sx={{
            color: 'grey.800',
            position: 'absolute',
            top: 'calc(50% - 10px)',
            left: '0',
            textAlign: 'center',
            width: '100%',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {totalCount}
        </Typography>
      </Box>
      <Grid container columnSpacing={2.5} rowSpacing={4.5} sx={{ mt: 1.5, pl: 3.5 }}>
        {items.map((item, idx) => {
          const { color, iconFill, value, percent, name } = item
          return (
            <Grid key={`dashboard-incident-item-${idx}`} item sm={idx % 2 ? 5 : 7} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <DashboardIncidentItemIcon
                  sx={{ path: { fill: color }, rect: { fill: iconFill }, fontSize: 44 }}
                />
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
                    <Typography
                      variant='h3'
                      sx={{
                        color: 'grey.800',
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {percent.toFixed()}%
                    </Typography>
                    <Typography
                      variant='h5'
                      sx={{
                        color: 'grey.800',
                      }}
                    >
                      ({value})
                    </Typography>
                  </Box>
                  <Typography
                    variant='h6'
                    sx={{
                      color: 'grey.400',
                      lineHeight: 1,
                      mt: 0.5,
                    }}
                  >
                    {name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Card>
  )
}

export default DashboardOverviewIncidentCard
