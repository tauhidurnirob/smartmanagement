import { useState } from 'react'
import { Box, Typography, Card, Grid, Stack } from '@mui/material'
import dayjs from 'dayjs'

import PredictiveAnalysisFilterbar from '../../modules/predictive-analysis/PredictiveAnalysisFilterbar'
import {
  IPredictiveAnalysisFilters,
  IWashroomStatisticItemUnit,
  IWashroomStatisticItemUnitDetail,
  IPredictiveStatisticItemDetailTimeFormat,
} from '../../types/predictive-analysis'
import { tmpWashroomStatisticList } from '../../modules/predictive-analysis/dummy'

const getTimeList = (items: IWashroomStatisticItemUnit[]) => {
  const strTimes: string[] = []
  for (const item of items) {
    const { items: unitItems } = item
    for (const unitItem of unitItems) {
      const { date } = unitItem
      if (!strTimes.includes(date)) strTimes.push(date)
    }
  }

  const formattedTimeList = strTimes
    .sort((a, b) => (a > b ? 1 : -1))
    .map((time) => {
      return {
        date: time,
        formattedTime: dayjs(time, IPredictiveStatisticItemDetailTimeFormat).format('hh:mm a'),
      }
    })
  return formattedTimeList
}

const getTimeValueFromItems = (date: string, items: IWashroomStatisticItemUnitDetail[]) => {
  const item = items.find((i) => i.date === date)
  return item?.value || '-'
}

const WashroomStatistics = () => {
  const [filters, setFilters] = useState<IPredictiveAnalysisFilters>({
    date: null,
    locations: [],
    buildings: [],
    levels: [],
  })

  const handleChangeFilters = (filters: IPredictiveAnalysisFilters) => {
    setFilters({ ...filters })
  }

  return (
    <Box>
      <Typography variant='h3'>Washroom Statistics</Typography>
      <Box sx={{ mt: 3 }}>
        <PredictiveAnalysisFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box sx={{ mt: 4.5, display: 'flex', flexDirection: 'column', gap: 7.5 }}>
        {tmpWashroomStatisticList.map((stat, buildingIdx) => {
          const { building, items } = stat
          const buildingName = building?.name || '-'
          const timeList = getTimeList(items)
          return (
            <Box key={`washroom-statistic-item-${buildingIdx}`}>
              <Typography variant='h3' fontWeight={500}>
                {buildingName}
              </Typography>
              <Card sx={{ mt: 1.5, pl: 4.25, pt: 1, overflowX: 'auto' }}>
                <Box sx={{ minWidth: '800px' }}>
                  <Box
                    sx={{
                      height: '50px',
                      alignItems: 'center',
                      flexWrap: 'nowrap',
                      columnGap: 4,
                      display: 'flex',
                    }}
                  >
                    <Stack direction={'row'} sx={{ height: '100%' }}>
                      <Grid
                        container
                        spacing={0}
                        wrap='nowrap'
                        alignItems={'center'}
                        sx={{ width: 'fit-content' }}
                      >
                        <Grid item xs={4} sx={{ minWidth: '100px' }}>
                          <Typography variant='h6' fontWeight={700} color='grey.400'>
                            Level
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ minWidth: '100px' }}>
                          <Typography variant='h6' fontWeight={700} color='grey.400'>
                            Washroom
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ minWidth: '100px' }}>
                          <Typography variant='h6' fontWeight={700} color='grey.400'>
                            Type
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box
                        sx={{
                          height: '100%',
                          borderRight: '1px dashed #EBECF3',
                          width: '4px',
                          borderLeft: '1px dashed #EBECF3',
                        }}
                      />
                    </Stack>
                    <Grid container spacing={0} wrap='nowrap' alignItems={'center'}>
                      {timeList.map((time, timeIdx) => {
                        const { formattedTime } = time
                        return (
                          <Grid key={`building-${buildingIdx}-header-item-${timeIdx}`} item xs={4}>
                            <Box
                              sx={{
                                px: 1.5,
                                pt: 0.25,
                                bgcolor: '#50CD89',
                                borderRadius: '50px',
                                width: 'fit-content',
                                mx: 'auto',
                              }}
                            >
                              <Typography variant='h5' fontWeight={700} color='#fff'>
                                {formattedTime}
                              </Typography>
                            </Box>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Box>
                  {items.map((unitItem, unitIdx) => {
                    const { unit, items: valueItems } = unitItem
                    const levelName = unit?.area?.level?.name || '-'
                    const areaName = unit?.area?.name || '-'
                    const unitName = unit?.name || '-'
                    return (
                      <Box
                        key={`building-${buildingIdx}-unit-item-${unitIdx}`}
                        sx={{
                          height: '70px',
                          flexWrap: 'nowrap',
                          columnGap: 4,
                          display: 'flex',
                        }}
                      >
                        <Stack
                          direction={'row'}
                          sx={{ height: '100%', borderTop: '1px dashed #EBECF3' }}
                        >
                          <Grid
                            container
                            spacing={0}
                            wrap='nowrap'
                            alignItems={'center'}
                            sx={{ width: 'fit-content' }}
                          >
                            <Grid item xs={4} sx={{ minWidth: '100px' }}>
                              <Typography
                                variant='h4'
                                fontSize={15}
                                fontWeight={700}
                                color='grey.800'
                              >
                                {levelName}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ minWidth: '100px' }}>
                              <Typography
                                variant='h4'
                                fontSize={15}
                                fontWeight={700}
                                color='grey.800'
                              >
                                {areaName}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ minWidth: '100px' }}>
                              <Typography
                                variant='h4'
                                fontSize={15}
                                fontWeight={700}
                                color='grey.800'
                              >
                                {unitName}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              height: '100%',
                              borderRight: '1px dashed #EBECF3',
                              width: '4px',
                              borderLeft: '1px dashed #EBECF3',
                            }}
                          />
                        </Stack>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderTop: '1px dashed #EBECF3',
                            width: '100%',
                          }}
                        >
                          <Grid container spacing={0} wrap='nowrap' alignItems={'center'}>
                            {timeList.map((time, timeIdx) => {
                              const { date } = time
                              const value = getTimeValueFromItems(date, valueItems)
                              return (
                                <Grid
                                  key={`building-${buildingIdx}-unit-item-${unitIdx}-item-${timeIdx}`}
                                  item
                                  xs={4}
                                >
                                  <Typography
                                    variant='h5'
                                    fontWeight={500}
                                    fontSize={25}
                                    color='grey.700'
                                    textAlign={'center'}
                                  >
                                    {value}
                                  </Typography>
                                </Grid>
                              )
                            })}
                          </Grid>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </Card>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default WashroomStatistics
