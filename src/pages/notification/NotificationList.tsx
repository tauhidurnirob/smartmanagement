import { useEffect, useMemo, useState } from 'react'
import { Box, Grid, Stack } from '@mui/material'
import dayjs from 'dayjs'

// import { tmpNotificationListByProject } from '../../modules/notification/dummy'
import NotificationListItem from '../../modules/notification/NotificationListItem'
import NotificationListByProjectFilterbar from '../../modules/notification/NotificationListByProjectFilterbar'
import { INotificationListByProjectFilters, IReqNotifications } from '../../types/notification'
import Api from '../../api'
import { _getNotificationFilters } from '../../store/_selectors'
import useDebounce from '../../hooks/useDebounce'
import { DATE_FORMAT_FOR_DB } from '../../constants/common'
import notificationSlice from '../../store/slices/notification'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import BackDrop from '../../modules/common/BackDrop'
import { useDispatch } from 'react-redux'

const LIST_LIMIT = 10

const NotificationList = () => {
  const filters = _getNotificationFilters()
  const actions = notificationSlice.actions
  const dispatch = useDispatch()

  const {
    areas,
    buildings,
    endDate,
    levels,
    limit,
    locations,
    page,
    projects,
    startDate,
    text,
    units,
    notificationCount,
    notifications,
  } = filters

  const debouncedSearch = useDebounce(text, 500)
  const projectIds = useMemo(() => {
    return projects.map((p) => Number(p.value))
  }, [projects])

  const locationIds = useMemo(() => {
    return locations.map((p) => Number(p.value))
  }, [locations])

  const buildingIds = useMemo(() => {
    return buildings.map((p) => Number(p.value))
  }, [buildings])

  const levelIds = useMemo(() => {
    return levels.map((p) => Number(p.value))
  }, [levels])

  const areaIds = useMemo(() => {
    return areas.map((p) => Number(p.value))
  }, [areas])

  const unitIds = useMemo(() => {
    return units.map((p) => Number(p.value))
  }, [units])

  const [fetchData, { isLoading, isFetching }] = Api.useLazyGetNotificationsQuery()

  const { totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(notificationCount / LIST_LIMIT)

    return {
      totalPages,
      hasNextPage: page < totalPages,
    }
  }, [notificationCount, page])

  const loadData = (page: number) => {
    const params: IReqNotifications = {
      limit,
      page,
      areaIds,
      buildingIds,
      levelIds,
      unitIds,
      locationIds,
      projectIds,
      endDate: dayjs(endDate || dayjs().startOf('date')).format(DATE_FORMAT_FOR_DB),
      startDate: dayjs(startDate || dayjs().startOf('month')).format(DATE_FORMAT_FOR_DB),
      text: debouncedSearch,
    }

    fetchData(params)
      .unwrap()
      .then((res) => {
        if (page > 1) {
          dispatch(actions.setNotifications([...notifications, ...res.rows]))
        } else {
          dispatch(actions.setNotifications(res.rows))
        }
        dispatch(actions.setPage(page))
        dispatch(actions.setNotificationCount(res.count))
      })
      .catch((err) => {
        console.log('Failed to get OJT list: ', err.data.message || err.error)
        dispatch(actions.setNotifications([]))
        dispatch(actions.setPage(1))
        dispatch(actions.setNotificationCount(0))
      })
  }

  useEffect(() => {
    loadData(1)
  }, [projectIds, locationIds, debouncedSearch])

  const loadMore = () => {
    loadData(Math.min(totalPages, page + 1))
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 10px 0px',
  })

  return (
    <Box>
      <NotificationListByProjectFilterbar filters={filters} /* onChange={handleChangeFilters} */ />
      <Stack direction={'column'} gap={1.5} mt={2}>
        {notifications.map((item, idx) => {
          return (
            <NotificationListItem
              key={`notification-list-project-item-${idx}`}
              notificationInfo={item}
            />
          )
        })}
        <Grid item xs={12}>
          {(isLoading || isFetching || hasNextPage) && (
            <Box sx={{ position: 'relative', minHeight: '40px', mt: 1 }} ref={sentryRef}>
              <BackDrop size='20px' />
            </Box>
          )}
        </Grid>
      </Stack>
    </Box>
  )
}

export default NotificationList
