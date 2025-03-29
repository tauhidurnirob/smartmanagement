import * as React from 'react'
import { Popover, Typography, IconButton, Box, Button, Stack, Chip, Grid } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { BellIcon } from '../../assets/icons/Bell'
// import { tmpAlertList } from './dummy'
import { AlertIcon } from '../../assets/icons/alert'
import Api from '../../api'
import BackDrop from '../common/BackDrop'
import { _getAlertFilters } from '../../store/_selectors'
import alertSlice from '../../store/slices/alert'
import { useDispatch } from 'react-redux'
import { IReqAlertList } from '../../api/models/alert'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useNavigate } from 'react-router-dom'

const LIST_LIMIT = 10

const HeaderAlertPopover = () => {
  const { page, limit, notificationAlerts, notificationAlertCount } = _getAlertFilters()
  const actions = alertSlice.actions
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()

  const [fetchData, { isLoading, isFetching }] = Api.useLazyGetAlertsForNotificationQuery()

  const { totalPages, hasNextPage } = React.useMemo(() => {
    const totalPages = Math.ceil(notificationAlertCount / LIST_LIMIT)

    return {
      totalPages,
      hasNextPage: page < totalPages,
    }
  }, [notificationAlertCount, page])

  const loadData = (page: number) => {
    const params: IReqAlertList = {
      limit,
      page,
    }

    fetchData(params)
      .unwrap()
      .then((res) => {
        if (page > 1) {
          dispatch(actions.setNotificationAlerts([...notificationAlerts, ...res.rows]))
        } else {
          dispatch(actions.setNotificationAlerts(res.rows))
        }
        dispatch(actions.setPage(page))
        dispatch(actions.setNotificationAlertCount(res.count))
      })
      .catch((err) => {
        console.log('Failed to get OJT list: ', err.data.message || err.error)
        dispatch(actions.setNotificationAlerts([]))
        dispatch(actions.setPage(1))
        dispatch(actions.setNotificationAlertCount(0))
      })
  }

  React.useEffect(() => {
    loadData(1)
  }, [])

  const loadMore = () => {
    loadData(Math.min(totalPages, page + 1))
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 10px 0px',
  })

  const handleOpenAlert = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleViewAlert = (id: number) => {
    navigate(`/alert?alert_id=${id}`)
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'header-alert-popover' : undefined

  return (
    <Box>
      <IconButton onClick={handleOpenAlert}>
        <BellIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ mt: 1 }}
        slotProps={{
          paper: {
            sx: {
              p: 2.5,
              minWidth: '400px',
              maxHeight: 'calc(100vh - 300px)',
              overflow: 'auto',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='text'
            size='small'
            sx={{ p: 1, '&:hover': { textDecoration: 'underline' } }}
          >
            View All Alerts
          </Button>
        </Box>
        <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
          {notificationAlerts.map((alertInfo, idx) => {
            const { area, building, level, unit, title, location, id } = alertInfo

            const unitName = unit?.name || '-'
            const areaName = area?.name || '-'
            const levelName = level?.name || '-'
            const buildingName = building?.name || '-'
            const locationName = location?.name || '-'

            return (
              <Box
                key={`alert-item-${idx}`}
                sx={{
                  p: 2,
                  pb: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 1,
                  '&:not(:last-child)': {
                    borderBottom: (theme) => `1px solid ${theme.palette.grey[100]}`,
                  },
                }}
              >
                <AlertIcon sx={{ color: 'error.main' }} />
                <Box>
                  <Typography variant={'h4'} color={'grey.900'} fontWeight={500} lineHeight={1.5}>
                    {title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 1.5,
                      mt: 1,
                    }}
                  >
                    <Chip
                      label={locationName}
                      sx={{
                        borderRadius: 1.5,
                        bgcolor: 'grey.50',
                        px: 2,
                        py: 0.75,
                        color: 'grey.500',
                        fontWeight: 700,
                        span: { p: 0 },
                      }}
                    />
                  </Box>
                  <Typography variant={'h6'} color={'grey.700'} fontWeight={500} mt={1}>
                    {buildingName} - {levelName} - {areaName} - {unitName}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant='text'
                      endIcon={<ArrowForwardIcon />}
                      color='error'
                      sx={{ textDecoration: 'underline' }}
                      onClick={() => handleViewAlert(id)}
                    >
                      View
                    </Button>
                  </Box>
                </Box>
              </Box>
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
      </Popover>
    </Box>
  )
}

export default HeaderAlertPopover
