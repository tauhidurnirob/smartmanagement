import { FC, useMemo, useState } from 'react'
import { To } from 'react-router-dom'
import { Box, Card, Divider, Tabs, Tab, Typography, Button } from '@mui/material'

import ButtonBack from '../common/ButtonBack'

import LocationSettingsDetailLocationInfo from './LocationSettingsDetailLocationInfo'
import LocationSettingsDetailActivityList from './LocationSettingsDetailActivityList'
import Api from '../../api'
import { LoadingButton } from '@mui/lab'
import BackDrop from '../common/BackDrop'
import { toast } from 'react-toastify'

const TAB_LIST = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity-log', label: 'Activity Log' },
]

interface IProps {
  locationId: number
}

const LocationSettingsDetail: FC<IProps> = ({ locationId }) => {
  const {
    data: locationOverview,
    isFetching: isLoadingOverview,
    isUninitialized,
  } = Api.useGetDeviceLocationOverviewByIdQuery(locationId)

  const [turnOffDevicesByLocationId] = Api.useTurnOffDevicesByLocationIdMutation()

  const [selectedTab, setSelectedTab] = useState<number>(0)

  const { locationName, deviceItems } = useMemo(() => {
    const location = locationOverview?.location
    const locationName = location?.name || '-'
    const count = locationOverview?.count

    const totalDeviceCounts = count?.total
    const onlineDeviceCounts = count?.online
    const offlineDeviceCounts = count?.offline
    const alertDeviceCounts = count?.alert

    const deviceItems = [
      { label: 'Total Devices', count: totalDeviceCounts, color: 'grey.800' },
      { label: 'Online Device', count: onlineDeviceCounts, color: 'success.main' },
      { label: 'Offline Device', count: offlineDeviceCounts, color: 'yellow.main' },
      { label: 'Device Alert', count: alertDeviceCounts, color: 'error.main' },
    ]

    return {
      locationName,
      deviceItems,
    }
  }, [locationOverview])

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleAllDevicesOff = () => {
    turnOffDevicesByLocationId(locationId)
      .unwrap()
      .then(() => {
        toast.success('Turned off all devices assigned to location')
      })
      .catch((err) => {
        console.log('Failed to turn off all devices assigned to location: ', err)
        toast.error('Failed to turn off all devices assigned to location')
      })
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={5}>
        Location Setting Details
      </Typography>
      {isUninitialized && isLoadingOverview ? (
        <Card sx={{ mt: 2.5, py: 3, px: 3.75 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Box sx={{ position: 'relative', height: '30px' }}>
              <BackDrop size={30} />
            </Box>
          </Box>
        </Card>
      ) : (
        <Card sx={{ mt: 2.5, pt: 3, px: 3.75 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { lg: 'row', xs: 'column' },
              justifyContent: 'space-between',
              mb: 3,
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant='h3' sx={{ mt: 1.25, color: 'grey.800', mb: 2.25 }}>
                {locationName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 2.75,
                  rowGap: 2,
                }}
              >
                {deviceItems.map((item, idx) => {
                  const { label, count, color } = item
                  return (
                    <Box
                      key={`device-item-${idx}`}
                      sx={{
                        borderRadius: 1.5,
                        border: '1px dashed #E4E6EF',
                        py: 1.5,
                        px: 2.25,
                        minWidth: '148px',
                      }}
                    >
                      <Typography variant='h2' sx={{ fontWeight: 900, color: color }}>
                        {typeof count === 'number' ? count : '-'}
                      </Typography>
                      <Typography variant='h5' sx={{ color: 'grey.400', mt: 0.5 }}>
                        {label}
                      </Typography>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <LoadingButton
                variant='contained'
                color='inherit'
                sx={{
                  px: 2.5,
                  py: 1.5,
                  backgroundColor: 'grey.100',
                  fontSize: 15,
                  lineHeight: '18px',
                  color: 'grey.700',
                  '&:hover': { backgroundColor: 'grey.200' },
                }}
                onClick={handleAllDevicesOff}
              >
                Turn Off
              </LoadingButton>
              <Typography variant='h5' sx={{ mt: 1, color: 'grey.400' }}>
                Turn off all device
              </Typography>
            </Box>
          </Box>

          <Divider light sx={{ borderColor: 'grey.100' }} />
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label='audit recycle bin'
            sx={{ overflowX: 'auto', '.MuiTabs-flexContainer': { gap: 3 } }}
            variant='scrollable'
            scrollButtons='auto'
          >
            {TAB_LIST.map((tab) => {
              return (
                <Tab
                  key={tab.id}
                  label={tab.label}
                  id={tab.id}
                  aria-controls={`audit-form-template-panel-${tab.id}`}
                  sx={{ px: 1, py: 2, minWidth: 0 }}
                />
              )
            })}
          </Tabs>
        </Card>
      )}
      <Box sx={{ mt: 2.5 }}>
        {selectedTab === 0 && <LocationSettingsDetailLocationInfo locationId={locationId} />}
        {selectedTab === 1 && <LocationSettingsDetailActivityList locationId={locationId} />}
      </Box>
    </Box>
  )
}

export default LocationSettingsDetail
