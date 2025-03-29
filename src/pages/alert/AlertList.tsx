import { useEffect, useMemo, useState } from 'react'
import { Box, Grid, Stack } from '@mui/material'
import dayjs from 'dayjs'

import AlertListByProjectFilterbar from '../../modules/alert/AlertListByProjectFilterbar'
import { IAlertListByProjectFilters } from '../../types/alert'
import { tmpAlertListByProject } from '../../modules/alert/dummy'
import AlertListItem from '../../modules/alert/AlertListItem'
import Api from '../../api'
import { _getAlertFilters } from '../../store/_selectors'
import useDebounce from '../../hooks/useDebounce'
import { IAlertData, IReqAlertList } from '../../api/models/alert'
import { DATE_FORMAT_FOR_DB } from '../../constants/common'
import alertSlice from '../../store/slices/alert'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import BackDrop from '../../modules/common/BackDrop'
import { useDispatch } from 'react-redux'
import AlertDetailDialog from '../../modules/alert/AlertDetailDialog'
import { useLocation, useNavigate } from 'react-router-dom'

const LIST_LIMIT = 10

const AlertList = () => {
  const filters = _getAlertFilters()
  const actions = alertSlice.actions
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const idParam = queryParams.get('alert_id')
  const [locationName, setLocationName] = useState<string>('')
  const [getOneAlert] = Api.useLazyGetOneAlertQuery()
  const [alert, setAlert] = useState<IAlertData | null>(null)
  const [markOneAsRead, { isLoading: isReading }] = Api.useMarkOneAlertAsReadMutation()

  const {
    page,
    limit,
    text,
    projects,
    locations,
    buildings,
    levels,
    areas,
    units,
    startDate,
    endDate,
    alerts,
    alertCount,
  } = filters

  // const data = tmpAlertListByProject

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

  const [fetchData, { isLoading, isFetching }] = Api.useLazyGetAlertsQuery()

  const { totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(alertCount / LIST_LIMIT)

    return {
      totalPages,
      hasNextPage: page < totalPages,
    }
  }, [alertCount, page])

  const loadData = (page: number) => {
    const params: IReqAlertList = {
      limit,
      page,
      areaIds,
      buildingIds,
      levelIds,
      unitIds,
      locationIds,
      projectIds,
      endDate: dayjs(endDate).format(DATE_FORMAT_FOR_DB),
      startDate: dayjs(startDate).format(DATE_FORMAT_FOR_DB),
      text: debouncedSearch,
    }

    fetchData(params)
      .unwrap()
      .then((res) => {
        if (page > 1) {
          dispatch(actions.setAlerts([...alerts, ...res.rows]))
        } else {
          dispatch(actions.setAlerts(res.rows))
        }
        dispatch(actions.setPage(page))
        dispatch(actions.setAlertCount(res.count))
      })
      .catch((err) => {
        console.log('Failed to get Alert list: ', err.data.message || err.error)
        dispatch(actions.setAlerts([]))
        dispatch(actions.setPage(1))
        dispatch(actions.setAlertCount(0))
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

  const handleOpenAlert = (alert: IAlertData) => {
    setAlert(alert)
    markOneAsRead(alert.id)
  }

  const handleCloseAlert = () => {
    setAlert(null)
    navigate('/alert')
  }

  useEffect(() => {
    if (idParam) {
      getOneAlert(Number(idParam))
        .unwrap()
        .then((res) => {
          handleOpenAlert(res)
          setLocationName(res.location.name)
        })
        .catch((err) => {
          console.log('Failed to get OJT list: ', err.data.message || err.error)
        })
    }
  }, [idParam])

  return (
    <Box>
      <AlertListByProjectFilterbar filters={filters} /* onChange={handleChangeFilters} */ />
      <Stack direction={'column'} gap={1.5} mt={2}>
        {alerts.map((item, idx) => {
          return <AlertListItem key={`alert-list-project-item-${idx}`} alertInfo={item} />
        })}
        <Grid item xs={12}>
          {(isLoading || isFetching || hasNextPage) && (
            <Box sx={{ position: 'relative', minHeight: '40px', mt: 1 }} ref={sentryRef}>
              <BackDrop size='20px' />
            </Box>
          )}
        </Grid>
      </Stack>
      {alert && (
        <AlertDetailDialog locationName={locationName} alert={alert} onClose={handleCloseAlert} />
      )}
    </Box>
  )
}

export default AlertList
