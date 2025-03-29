import { FC, useEffect, useMemo } from 'react'
import { Stack, Typography, Button, Box, Grid } from '@mui/material'
import dayjs from 'dayjs'
import LinearProgressWithLabel from '../../common/LinearProgressWithLabel'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDispatch } from 'react-redux'
import { _getPerformanceTriggeredAutomationLogState, _getPerformanceTriggeredAutomationState } from '../../../store/_selectors'
import Api from '../../../api'
import { IReqAutomationTaskLogListFilters } from '../../../types/task'
import _actions from '../../../store/_actions'
import BackDrop from '../../common/BackDrop'


const LIST_LIMIT = 30

interface IProps {
  data?: any
}

const PerformanceOverviewAutomationReport: FC<IProps> = ({}) => {
  const { items, maxTime, curTime } = useMemo(() => {
    const items = [
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'AI triggered air freshener sensor',
        description: 'Air freshener activated',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Checking Ammonia Level',
        description: 'AI predicted the ammonia level is low now',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
      {
        label: 'Ammonia level high',
        description: 'AI triggered Robot to attend',
        createdAt: '2023-07-07 21:28:00',
      },
    ]

    const maxTime = 15 // [mins]
    const curTime = 12 // [mins]

    return { items, maxTime, curTime }
  }, [])

  const dispatch = useDispatch()
  const {selectedId} = _getPerformanceTriggeredAutomationState()
  const paginationState = _getPerformanceTriggeredAutomationLogState()

  const actions = _actions.performanceManagements.performanceTriggeredAutomationLog

  const [getTasks, { isLoading, isFetching }] = Api.useLazyGetAutomationTaskLogListQuery()


  const { totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(paginationState.totalCount / LIST_LIMIT)

    return {
      totalPages,
      hasNextPage: paginationState.page < totalPages,
    }
  }, [paginationState.totalCount, paginationState.page])


  const loadData = (page: number) => {
    const params: IReqAutomationTaskLogListFilters = {
      page: page,
      limit: LIST_LIMIT,
      orderBy: 'createdAt',
      orderDir: 'desc',
      taskId: Number(selectedId)
    }
    getTasks(params)
      .unwrap()
      .then((res) => {
        if (page > 1) {
          dispatch(actions.setLogs([...paginationState.logs, ...res.rows]))
        } else {
          dispatch(actions.setLogs(res.rows))
        }
        dispatch(actions.setPage(page))
        dispatch(actions.setTotalCount(res.count))
      })
      .catch((err) => {
        console.log('Failed to get triggered automation log list: ', err.data.message || err.error)
        dispatch(actions.setLogs([]))
        dispatch(actions.setPage(1))
        dispatch(actions.setTotalCount(0))
      })
  }

  const handleReload = () => {
    loadData(1)
  }

  const loadMore = () => {
    loadData(Math.min(totalPages, paginationState.page + 1))
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 10px 0px',
  })

  useEffect(() => {
    if(selectedId) {
      loadData(1)
    }
  }, [selectedId])

  return (
    <Stack
      sx={{
        pt: 3,
        pl: 3,
        pb: 3,
        pr: 3,
        borderLeft: { lg: '1px solid #AEAEAE', xs: 'none' },
        borderTop: { lg: 'none', xs: '1px solid #AEAEAE' },
      }}
    >
      {/* <Stack
        direction='row'
        justifyContent={'space-between'}
        alignItems={'center'}
        columnGap={2}
        rowGap={2}
        mb={2}
      >
        <Typography typography={'h3'} color='grey.800' pl={0.5}>
          Device Automation Report
        </Typography>
        <Button variant='contained' color='primary'>
          View Details
        </Button>
      </Stack> */}
      <Box sx={{ maxHeight: '350px', overflow: 'auto' }}>
        {/* <LinearProgressWithLabel maxValue={maxTime} value={curTime} /> */}
        {/* <Grid container spacing={3} mt={-2}>
          <Grid item lg={6} xs={12}>
            <Stack
              direction='row'
              gap={1}
              flexWrap={'wrap'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography typography={'h4'} color='grey.800' fontWeight={500}>
                SLA Resolve Time
              </Typography>
              <Typography typography={'h5'} color='grey.700' fontWeight={400}>
                {maxTime} mins
              </Typography>
            </Stack>
          </Grid>

          <Grid item lg={6} xs={12}>
            <Stack direction='column' gap={1}>
              <Stack
                direction='row'
                gap={1}
                flexWrap={'wrap'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography typography={'h4'} color='grey.800' fontWeight={500}>
                  Actual Resolve Time
                </Typography>
                <Typography typography={'h5'} color='grey.700' fontWeight={400}>
                  -
                </Typography>
              </Stack>
              <Stack
                direction='row'
                gap={1}
                flexWrap={'wrap'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography typography={'h4'} color='grey.800' fontWeight={500}>
                  Exceeded SLA Resolve Time
                </Typography>
                <Typography typography={'h5'} color='grey.700' fontWeight={400}>
                  -
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid> */}
        <Typography typography={'h3'} color='grey.900' mt={2.25} fontWeight={500}>
          Activity Log
        </Typography>
        <Stack direction='column' rowGap={2.25} mt={2.5} >
          {
            paginationState.logs?.length === 0 &&
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Typography color='textSecondary' variant='h6'>
                No Available Records
              </Typography>
            </Box>
          }
          {paginationState.logs?.map((item, idx) => {
            const { action, createdAt } = item
            return (
              <Stack
                key={`performance-automation-report-item-${idx}`}
                direction='row'
              >
                <Stack direction='row'>
                  <Stack direction='column'>
                    <Typography
                      typography={'h6'}
                      color='grey.400'
                      fontWeight={700}
                      textAlign={'right'}
                    >
                      {dayjs(createdAt).format('D MMM')}
                    </Typography>
                    <Typography
                      typography={'h6'}
                      color='grey.400'
                      fontWeight={700}
                      textAlign={'right'}
                    >
                      {dayjs(createdAt).format('h:m:s A')}
                    </Typography>
                  </Stack>
                  <Stack direction='row' pl={'20px'} alignItems={'center'}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                      }}
                    />
                    <Typography typography={'h4'} color='grey.800' fontWeight={700} ml={2.25}>
                      {action}
                    </Typography>
                  </Stack>
                  {/* <Box sx={{ ml: 1.75, borderLeft: '2px solid #E2E8F0' }}>
                    <Typography typography={'h6'} color='primary.main' fontWeight={700} ml={3}>
                      {description}
                    </Typography>
                  </Box> */}
                </Stack>
              </Stack>
            )
          })}
        </Stack>
        {(isLoading || isFetching || hasNextPage) && (
          <Box sx={{ position: 'relative', minHeight: '40px', mt: 1 }} ref={sentryRef}>
            <BackDrop size='20px' />
          </Box>
        )}
      </Box>
    </Stack>
  )
}

export default PerformanceOverviewAutomationReport
