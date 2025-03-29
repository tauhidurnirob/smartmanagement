import { FC, useEffect, useMemo } from 'react'
import { Stack, Typography, Button, Box } from '@mui/material'
import Api from '../../../api'
import { _getPerformanceOverviewState, _getPerformanceTriggeredAutomationState } from '../../../store/_selectors'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { ETaskType, IReqTaskListFilters } from '../../../types/task'
import useDebounce from '../../../hooks/useDebounce'
import { useDispatch } from 'react-redux'
import _actions from '../../../store/_actions'
import BackDrop from '../../common/BackDrop'


const LIST_LIMIT = 30
interface IProps {
  data?: any,
  onClick: (id: number) => void,
  onViewClick: (id: number) => void,
  selectedId?: number | undefined
}

const PerformanceOverviewTriggeredAutomation: FC<IProps> = ({onClick, selectedId, onViewClick}) => {
  const dispatch = useDispatch()
  const {filters} = _getPerformanceOverviewState()
  const paginationState = _getPerformanceTriggeredAutomationState()
  const actions = _actions.performanceManagements.performanceTriggeredAutomation

  const [getTasks, { isLoading, isFetching }] = Api.useLazyGetTaskListQuery()

  const debouncedSearch = useDebounce(filters.search, 500)

  const { totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(paginationState.totalCount / LIST_LIMIT)

    return {
      totalPages,
      hasNextPage: paginationState.page < totalPages,
    }
  }, [paginationState.totalCount, paginationState.page])

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const buildingIds = useMemo(() => {
    return filters.buildings.map((p) => Number(p.value))
  }, [filters.buildings])

  const levelIds = useMemo(() => {
    return filters.levels.map((p) => Number(p.value))
  }, [filters.levels])

  const areaIds = useMemo(() => {
    return filters.areas.map((p) => Number(p.value))
  }, [filters.areas])

  const unitIds = useMemo(() => {
    return filters.units.map((p) => Number(p.value))
  }, [filters.units])

  const loadData = (page: number) => {
    const params: IReqTaskListFilters = {
      page: page,
      limit: LIST_LIMIT,
      orderBy: 'createdAt',
      orderDir: 'desc',
      projectIds: projectIds,
      locationIds: locationIds,
      text: debouncedSearch,
      taskTypes: ETaskType.automation,
      buildingIds: buildingIds,
      levelIds: levelIds,
      areaIds: areaIds,
      unitIds: unitIds
    }
    getTasks(params)
      .unwrap()
      .then((res) => {
        if (page > 1) {
          dispatch(actions.setTasks([...paginationState.tasks, ...res.rows]))
        } else {
          dispatch(actions.setTasks(res.rows))
          dispatch(_actions.performanceManagements.performanceTriggeredAutomation.setSelectedId(res?.rows?.[0]?.id))
        }
        dispatch(actions.setPage(page))
        dispatch(actions.setTotalCount(res.count))
      })
      .catch((err) => {
        console.log('Failed to get triggered automation list: ', err.data.message || err.error)
        dispatch(actions.setTasks([]))
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
    loadData(1)
  }, [projectIds, locationIds, debouncedSearch])
  

  return (
    <Stack sx={{ pt: 3, pl: 2.25, pb: 3 }}>
      <Typography typography={'h3'} color='grey.800' mb={2} pl={1.25}>
        Triggered Automation
      </Typography>
      <Stack
        direction='column'
        rowGap={{ lg: 0.5, xs: 0.5 }}
        sx={{ maxHeight: '350px', overflow: 'auto' }}
      >
        {paginationState.tasks?.map((item, idx) => {
          const { id, project, location, taskActivity, building, level, area, unit } = item
          return (
            <Stack
              key={`performance-completion-status-item-${idx}`}
              direction='row'
              sx={{
                pt: 1,
                pl: 1.25,
                pr: 1,
                pb: 1,
                borderRadius: 3,
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
                backgroundColor: selectedId === id ? 'primary.light' : '',
                cursor: 'pointer'
              }}
              justifyContent={'space-between'}
              alignItems={'center'}
              columnGap={2}
              rowGap={2}
              onClick={() => onClick(id)}
            >
              <Stack direction='column'>
                <Typography typography={'h4'} color='grey.800' fontWeight={700} mb={1}>
                  {taskActivity?.[0]?.name}
                </Typography>
                <Typography typography={'h5'} color='grey.800' fontWeight={500}>
                  {`${project?.name} > ${location?.name} > ${building?.name} > ${level?.name} > ${area?.name} > ${unit?.name}`}
                </Typography>
              </Stack>
              {/* <Button
                variant='contained'
                color='primary'
                onClick={() => onViewClick(idx)}
              >
                View
              </Button> */}
            </Stack>
          )
        })}
        {(isLoading || isFetching || hasNextPage) && (
          <Box sx={{ position: 'relative', minHeight: '40px', mt: 1 }} ref={sentryRef}>
            <BackDrop size='20px' />
          </Box>
        )}
      </Stack>
    </Stack>
  )
}

export default PerformanceOverviewTriggeredAutomation
