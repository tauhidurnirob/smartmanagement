import { FC, useMemo, useState } from 'react'
import { Card, Grid, Stack, Box, Typography, Divider, Button } from '@mui/material'
import { IWashroomOverviewListItem } from '../../types/washroom'
import { ChevronUpDuotoneIcon } from '../../assets/icons/chevron-up-duotone'
import getWashroomDeviceStatusInfo from '../../helpers/getWashroomDeviceStatusInfo'
import ImageHotspots from '../common/image-hotspot/ImageHotspot'
import { IHotspot } from '../../types/common'
import { SensorSignalWifiIcon } from '../../assets/icons/sensor-signal-wifi'
import Api from '../../api'
import { ISensors } from '../../api/models'

interface IProps {
  item: IWashroomOverviewListItem
}

const WashroomOverviewListItem: FC<IProps> = ({ item }) => {
  const [showMore, setShowMore] = useState(false)
  const [selectedDeviceIdx, setSelectedDeviceIdx] = useState<number | null>(null)
  const [selectedDeviceSensors, setSelectedDeviceSensors] = useState<ISensors[] | null>(null)
  const [getWashroomDeviceSensors] = Api.useGetWashroomDeviceSensorsMutation()

  const { unit, area, level, building, location, project, devices } = useMemo(() => {
    const unit = item.unit
    const area = unit.area
    const level = area?.level
    const building = level?.building
    const location = building?.location
    const locationCategory = location?.locationCategory
    const project = locationCategory?.project
    const devices = item.devices || []

    return {
      unit,
      area,
      level,
      building,
      location,
      locationCategory,
      project,
      devices,
    }
  }, [item])

  const { hotspots } = useMemo(() => {
    const sensors = selectedDeviceSensors || []
    const hotspots: IHotspot[] = sensors
      .filter((e) => e.position)
      .map((sensor, idx) => {
        return {
          x: sensor?.position?.x || 0,
          y: sensor?.position?.y || 0,
          content: (
            <Box
              sx={{
                p: 0.5,
                borderRadius: 1.5,
                height: '28px',
                position: 'relative',
                background: 'white',
              }}
            >
              <SensorSignalWifiIcon sx={{ fontSize: 20, color: 'success.main', lineHeight: 1 }} />
              <Box
                sx={{
                  position: 'absolute',
                  borderRadius: '50%',
                  border: '1px solid #D9D9D9',
                  background: '#F5F8FA',
                  width: '17px',
                  height: '17px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: '-12px',
                  left: 'calc(50% - 8px)',
                }}
              >
                <Typography variant='h6' sx={{ fontWeight: 600, lineHeight: 1, color: 'grey.800' }}>
                  {idx + 1}
                </Typography>
              </Box>
            </Box>
          ),
          sx: { background: 'transparent' },
        }
      })
    return { hotspots }
  }, [item, selectedDeviceSensors])

  const handleChangeShowMore = async () => {
    if (!showMore) {
      if (selectedDeviceIdx === null) {
        setSelectedDeviceIdx(0)
        await syncDeviceSensors(0)
      }
    }

    setShowMore(!showMore)
  }

  const handleSelectDevice = async (idx: number) => {
    setSelectedDeviceIdx(idx);
    await syncDeviceSensors(idx)
  }

  const syncDeviceSensors = async (idx: number) => {
    const selectedDevice = selectedDeviceIdx !== null ? item.devices[selectedDeviceIdx] || [] : []
    if ('deviceId' in selectedDevice) {
      const selectedDeviceSensors = await getWashroomDeviceSensors({
        id: selectedDevice?.deviceId || 0,
      }).unwrap()
      setSelectedDeviceSensors(selectedDeviceSensors)
    }
  }

  return (
    <Card>
      <Box
        sx={{
          pt: 1.5,
          pb: 2.25,
          pl: 5.25,
          pr: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant='h2'
            color='grey.900'
            sx={{ fontSize: '1.125rem', lineHeight: '30px' }}
          >
            {location?.name || '-'}
          </Typography>
          <Stack
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: 'row',
              flexWrap: 'wrap',
              mt: 1,
              '& > div:not(:last-child)': {
                borderRight: (theme) => `1px solid ${theme.palette.grey[300]}`,
              },
            }}
          >
            {[building?.name || '-', level?.name || '-', area?.name || '-', unit?.name || '-'].map(
              (name, idx) => {
                return (
                  <Box
                    key={`unit-item-name-${idx}`}
                    sx={{ pr: 2, display: 'flex', alignTtems: 'center', height: 'fit-content' }}
                  >
                    <Typography
                      variant='h5'
                      color='grey.300'
                      sx={{ fontWeight: 700, lineHeight: '15px' }}
                    >
                      {name}
                    </Typography>
                  </Box>
                )
              }
            )}
          </Stack>
        </Box>
        <Box
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: 4,
            background: (theme) => theme.palette.grey[100],
            height: 'fit-content',
          }}
        >
          <Typography variant='h6' color='grey.800' sx={{ fontWeight: 600, textAlign: 'center' }}>
            {project?.name || '-'}
          </Typography>
        </Box>
      </Box>
      <Divider light />
      <Box
        sx={{
          pt: 1.5,
          pb: 0.5,
          px: 4.5,
        }}
      >
        <Box>
          <Grid container columnGap={1} rowGap={1}>
            {devices.map((device, idx) => {
              const deviceName = device.name || '-'
              const isPercent = device.isPercent
              const deviceValue = device?.value
              const deviceStatus = device?.status
              const sensorStatusInfo = getWashroomDeviceStatusInfo(deviceStatus || '')
              const isSelected = idx === selectedDeviceIdx
              return (
                <Grid key={`washroom-item-device-item-${idx}`} item lg={true} md={2} sm={3} xs={4}>
                  <Box
                    sx={{
                      border: (theme) => `1px dashed ${theme.palette.grey[200]}`,
                      borderRadius: 1.5,
                      pt: 1.5,
                      px: 0,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      variant='h6'
                      sx={{ px: 1, fontSize: 25, fontWeight: 700, color: sensorStatusInfo.color }}
                    >
                      {deviceValue || '-'}
                      {isPercent ? '%' : ''}
                    </Typography>
                    <Box
                      sx={
                        showMore
                          ? {
                              px: 1,
                              pt: 0.5,
                              border: (theme) => `1px solid ${theme.palette.primary.light}`,
                              borderRadius: 1.25,
                              cursor: 'pointer',
                              color: isSelected ? 'primary.main' : '#B5B5C3',
                              background: (theme) =>
                                isSelected ? theme.palette.primary.light : '#E1E1E1',
                              '&:hover': {
                                background: (theme) => theme.palette.primary.light,
                                color: 'primary.main',
                              },
                            }
                          : { px: 1, pt: 0.5, color: '#B5B5C3' }
                      }
                      onClick={() => handleSelectDevice(idx)}
                    >
                      <Typography variant='h6' sx={{ fontWeight: 600, color: 'inherit' }}>
                        {deviceName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        {showMore && (
          <Grid container spacing={3.75} sx={{ mt: 0 }}>
            <Grid item lg={4}>
              <Box sx={{ height: '250px' }}>
                <ImageHotspots
                  src={'/assets/images/washroom/washroom-floor-plan.png'}
                  alt={'floor-image'}
                  hotspots={hotspots}
                  hideZoomControls={true}
                  hideFullscreenControl={true}
                  disableSelectHotspot={true}
                  disableDraggable={true}
                  onAddHotspot={() => {}}
                  sx={{
                    '& > div > div > div': {
                      borderRadius: 0,
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={8}>
              {selectedDeviceIdx !== null && (
                <Box>
                  <Typography
                    variant='h4'
                    sx={{ fontWeight: 500, lineHeight: '30px', color: 'grey.900' }}
                  >
                    {item.devices[selectedDeviceIdx].name}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}>
                    {typeof selectedDeviceSensors !== 'undefined' &&
                      (selectedDeviceSensors || []).length > 0 &&
                      selectedDeviceSensors?.map((sensor, idx) => {
                        const value = sensor?.value
                        const label = sensor?.label
                        const isOccupancySensor =
                          sensor.name === 'Occupancy Sensor'
                        const sensorStatusinfo = getWashroomDeviceStatusInfo(sensor.status || '')
                        return (
                          <Box
                            key={`sensor-item-${idx}`}
                            sx={{
                              border: '1px solid #E4E6EF',
                              pt: 1.5,
                              px: 1.25,
                              pb: 1.5,
                              minWidth: '130px',
                              mr: '-1px',
                              mb: '-1px',
                            }}
                          >
                            <Typography
                              variant='h4'
                              sx={{
                                fontSize: 25,
                                fontWeight: 700,
                                lineHeight: '29px',
                                textAlign: 'center',
                                color: sensorStatusinfo.color,
                              }}
                            >
                              {typeof value === 'undefined'
                                ? '-'
                                : isOccupancySensor
                                ? 'Occupied'
                                : `${value}${item.devices[selectedDeviceIdx].isPercent ? '%' : ''}`}
                            </Typography>
                            <Typography
                              variant='h6'
                              sx={{
                                fontWeight: 600,
                                color: 'grey.300',
                                textAlign: 'center',
                                mt: 0.5,
                              }}
                            >
                              {typeof label === 'undefined' ? `Sensor ${idx + 1}` : label}
                            </Typography>
                          </Box>
                        )
                      })}
                  </Box>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 600,
                      color: 'grey.300',
                      mt: 1,
                    }}
                  >
                    {item.devices[selectedDeviceIdx].name === 'People Counter' &&
                      `*Sensor detected ${item.devices[selectedDeviceIdx].value} people been in the washroom in the past 1 hour`}
                    {item.devices[selectedDeviceIdx].name === 'Smoke Sensor' &&
                      ((item.devices[selectedDeviceIdx].value ?? 0) > 0
                        ? `*Sensor detected ${item.devices[selectedDeviceIdx].value} smoke been in the washroom in the past 1 hour`
                        : `*No smoke detected`)}
                    {item.devices[selectedDeviceIdx].name === 'Emergency Button' &&
                      ((item.devices[selectedDeviceIdx].value ?? 0) > 0
                        ? `*Sensor detected ${item.devices[selectedDeviceIdx].value} emergency buttons been pressed in the washroom in the past 1 hour`
                        : `*No buttons are being pressed`)}
                    {item.devices[selectedDeviceIdx].name === 'Wet Floor Sensor' &&
                      ((item.devices[selectedDeviceIdx].value ?? 0) > 0
                        ? `*Sensor detected ${item.devices[selectedDeviceIdx].value} wet floors been pressed in the washroom in the past 1 hour`
                        : `*No wet floor detected`)}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: (theme) => theme.palette.grey[800],
              '&:hover': {
                color: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={handleChangeShowMore}
          >
            <Typography variant='h6' sx={{ lineHeight: '22px', color: 'inherit' }}>
              {showMore ? 'View Less' : 'View More'}
            </Typography>
            <ChevronUpDuotoneIcon sx={{ fontSize: 20, rotate: showMore ? 0 : '180deg' }} />
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default WashroomOverviewListItem
