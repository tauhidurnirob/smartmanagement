import { FC, useMemo } from 'react'
import { Box, Card, IconButton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { Closecross } from '../../assets/icons/close-cross'
import { ArrowRightCircle } from '../../assets/icons/arrow-right-circle'
import { IAuditLocationListItem } from '../../types/audit'
import { DATE_FORMAT_WITHOUT_MIN } from '../../constants/common'
import { DEVICE_BATTERY_STATUS_LIST } from '../../helpers/constants'
import { toast } from 'react-toastify'

interface IProps {
  location: IAuditLocationListItem
  open: boolean
  onClose: () => void
}

const DashboardMapMarkerLocationDetail: FC<IProps> = ({ open, location, onClose }) => {
  const navigate = useNavigate()

  const details = useMemo(() => {
    const avgPerformance = location.avgPerformance
    const deviceStatus = DEVICE_BATTERY_STATUS_LIST[0]

    const details = [
      { label: 'Average Performance:', value: `${avgPerformance}%` },
      { label: 'Device Status:', value: `${deviceStatus.label}` },
      { label: 'Washroom Device Status:', value: `Normal` },
      { label: 'Overdue Incident:', value: null },
      { label: 'Overdue Maintenance:', value: null },
      { label: 'Complaint Feedback:', value: null },
    ]
    return details
  }, [location])

  const handleGotoDetail = () => {
    const locationId = location?.id
    if (!locationId) {
      toast.error('This is not assigned to any location!')
      return
    }
    const month = dayjs(location?.latestSubmittedAt).format('M')
    const year = dayjs(location?.latestSubmittedAt).format('YYYY')
    navigate({
      pathname: `/dashboard/overview/${locationId}`,
      search: `?${createSearchParams({
        month: month,
        year: year,
      })}`,
    })
  }

  return (
    <Card
      sx={{
        position: 'absolute',
        left: '0px',
        marginLeft: 0,
        bottom: 'calc(100% + 10px)',
        zIndex: 10,
        width: '300px',
        pt: 2.5,
        pb: 2,
        pl: 3,
        pr: 2.5,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        visibility: open ? 'visible' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 300,
      }}
    >
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8, p: 0.5 }}
        onClick={() => {
          onClose()
        }}
      >
        <Closecross sx={{ fontSize: 20, color: 'grey.700' }} />
      </IconButton>
      <Typography variant='h4' sx={{ fontWeight: 700, color: 'grey.800' }}>
        {location.name}
      </Typography>
      <Typography variant='h6' sx={{ fontWeight: 500, color: 'grey.500', mt: 0.5 }}>
        {dayjs(location.latestSubmittedAt).format(DATE_FORMAT_WITHOUT_MIN)}
      </Typography>
      <Box sx={{ display: 'flex', mt: 1.5, alignItems: 'flex-end', gap: 1 }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 0.5,
          }}
        >
          {details.map((item, idx) => {
            const { label, value } = item
            return (
              <Box
                key={`dashboard-map-location-detail-item-${idx}`}
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              >
                <Typography variant='h6' sx={{ fontWeight: 500, color: 'grey.800' }}>
                  {label}
                </Typography>
                <Box
                  sx={{
                    ml: 2,
                    py: 0.5,
                    ...(value
                      ? {
                          px: 1.5,
                          bgcolor: 'success.light',
                          borderRadius: 2,
                        }
                      : {}),
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ fontWeight: 700, color: value ? 'success.main' : 'grey.800' }}
                  >
                    {value || '-'}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
        <IconButton sx={{ ml: 'auto', p: 0 }} onClick={handleGotoDetail}>
          <ArrowRightCircle sx={{ color: 'grey.700', fontSize: 19 }} />
        </IconButton>
      </Box>
    </Card>
  )
}

export default DashboardMapMarkerLocationDetail
