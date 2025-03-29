import { useState } from 'react'
import { Box, Typography, Card, Grid, Stack } from '@mui/material'
import dayjs from 'dayjs'

import PredictiveAnalysisFilterbar from '../../modules/predictive-analysis/PredictiveAnalysisFilterbar'
import {
  IPredictiveAnalysisFilters,
  IPredictiveStatisticItemDetailTimeFormat,
  IResourceAllocationItemArea,
  IResourceAllocationItemAreaDetail,
} from '../../types/predictive-analysis'
import { tmpResourceAllocationList } from '../../modules/predictive-analysis/dummy'
import { IRole } from '../../types/role'

const getTimeList = (items: IResourceAllocationItemArea[]) => {
  const strTimes: string[] = []
  for (const item of items) {
    const { items: areaItems } = item
    for (const areaItem of areaItems) {
      const { date } = areaItem
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

const getTotalDataList = (items: IResourceAllocationItemArea[]) => {
  const totalData: { [key: string]: number } = {}

  for (const item of items) {
    const { items: areaItems } = item
    for (const areaItem of areaItems) {
      const { date, value } = areaItem

      if (typeof totalData[date] === 'undefined') totalData[date] = 0

      totalData[date] += value || 0
    }
  }

  return Object.keys(totalData).map((key) => ({ date: key, value: totalData[key] }))
}

const getTimeValueFromItems = (date: string, items: IResourceAllocationItemAreaDetail[]) => {
  const item = items.find((i) => i.date === date)
  return item?.value || '-'
}

const ResourcesAllocation = () => {
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
      <Typography variant='h3'>Resources Allocation</Typography>
      <Box sx={{ mt: 3 }}>
        <PredictiveAnalysisFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box sx={{ mt: 4.5, display: 'flex', flexDirection: 'column', gap: 7.5 }}>
        {tmpResourceAllocationList.map((stat, roleIdx) => {
          const { role, items } = stat
          const roleName = role?.name || '-'
          const timeList = getTimeList(items)
          const totalDetail = {
            area: { name: 'Total' } as IRole,
            items: getTotalDataList(items),
          }

          return (
            <Box key={`washroom-statistic-item-${roleIdx}`}>
              <Typography variant='h3' fontWeight={500}>
                {roleName}
              </Typography>
              <Card sx={{ mt: 1.5, pl: 1.25, pt: 1, overflowX: 'auto' }}>
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
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          pr: 1.75,
                        }}
                      >
                        <Box
                          sx={{
                            px: 1.5,
                            pt: 0.25,
                            bgcolor: '#5F6276',
                            borderRadius: '50px',
                            width: '132px',
                            mx: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant='h5' fontWeight={700} color='#fff'>
                            Duty in:
                          </Typography>
                        </Box>
                      </Box>
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
                          <Grid key={`role-${roleIdx}-header-item-${timeIdx}`} item xs={4}>
                            <Box
                              sx={{
                                px: 1.5,
                                pt: 0.25,
                                bgcolor: '#5F6276',
                                borderRadius: '50px',
                                mx: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '132px',
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
                  {[...items, totalDetail].map((areaItem, areaIdx) => {
                    const { area, items: valueItems } = areaItem
                    const areaName = area?.name || '-'
                    const isTotal = areaIdx === items.length
                    return (
                      <Box
                        key={`role-${roleIdx}-area-item-${areaIdx}`}
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
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              pr: 1.75,
                            }}
                          >
                            <Box
                              sx={{
                                px: 1.5,
                                pt: 0.25,
                                bgcolor: isTotal ? '#5F6276' : '#50CD89',
                                borderRadius: '50px',
                                width: '132px',
                                mx: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography variant='h5' fontWeight={700} color='#fff'>
                                {areaName}
                              </Typography>
                            </Box>
                          </Box>
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
                                  key={`role-${roleIdx}-area-item-${areaIdx}-item-${timeIdx}`}
                                  item
                                  xs={4}
                                >
                                  <Typography
                                    variant='h5'
                                    fontWeight={500}
                                    fontSize={25}
                                    color={isTotal ? '#50CD89' : 'grey.700'}
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

export default ResourcesAllocation
