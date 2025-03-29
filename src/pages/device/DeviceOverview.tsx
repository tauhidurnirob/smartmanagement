import { useMemo, useState } from 'react'
import { Box, Button, Card, Grid, Typography } from '@mui/material'
import { EDeviceStatus } from '../../helpers/constants'
import getDeviceStatusInfo from '../../helpers/getDeviceStatusInfo'
import DeviceList from '../../modules/device/DeviceList'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'

const DeviceOverview = () => {
  const { data: deviceOverview, isFetching: isLoading } = Api.useGetDevicesOverviewQuery()

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const { totalCounts } = useMemo(() => {
    const totalCounts = [
      { status: EDeviceStatus.Online, value: deviceOverview?.online || 0 },
      { status: EDeviceStatus.Offline, value: deviceOverview?.offline || 0 },
      { status: EDeviceStatus.BatteryLow, value: deviceOverview?.batteryLow || 0 },
      { status: EDeviceStatus.Error, value: deviceOverview?.error || 0 },
    ]

    return {
      totalCounts,
    }
  }, [deviceOverview])

  return (
    <Box>
      <Typography variant='h3'>Overview</Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Box sx={{ position: 'relative', height: '30px' }}>
            <BackDrop size={30} />
          </Box>
        </Box>
      ) : (
        <Grid container spacing={2.5} sx={{ mt: 4.25 }}>
          {totalCounts.map((count, idx) => {
            const { status, value } = count
            const statusInfo = getDeviceStatusInfo(status as string)
            return (
              <Grid key={`device-status-count-${idx}`} item lg={3} xs={12}>
                <Card sx={{ pt: 2.5, px: 3.75, pb: 3.75 }}>
                  <Typography variant='h5' sx={{ fontSize: '1.875rem', color: 'grey.700' }}>
                    {statusInfo.label}
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      fontWeight: 700,
                      fontSize: '2.625rem',
                      color: statusInfo.color,
                      mt: 3,
                      lineHeight: 'normal',
                    }}
                  >
                    {value}
                  </Typography>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    sx={{ mt: 3.75 }}
                    onClick={() => setSelectedStatus(status)}
                  >
                    View All
                  </Button>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
      <Box sx={{ mt: 8 }}>
        <DeviceList selectedStatus={selectedStatus} />
      </Box>
    </Box>
  )
}

export default DeviceOverview
