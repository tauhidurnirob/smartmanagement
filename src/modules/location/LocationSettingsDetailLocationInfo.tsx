import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, Divider, Grid, Typography, Stack, IconButton } from '@mui/material'
import { toast } from 'react-toastify'

import { Plus } from '../../assets/icons/plus'
import BuildingSelect from './BuildingSelect'
import LevelSelect from './LevelSelect'
import AreaSelect from './AreaSelect'
import UnitSelect from './UnitSelect'
import { IDeviceHotspot, ISelectItem } from '../../types/common'
import { Closecross } from '../../assets/icons/close-cross'
import DeviceFloorMap from '../device/DeviceFloorMap'
import { EDeviceMapType } from '../../helpers/constants'
import { IDevice, ILevel, IReqDeviceUpdate, IUnit } from '../../api/models'
import Api from '../../api'
import DeleteDialog from '../common/DeleteDialog'

interface IProps {
  locationId: number
}

const LocationSettingsDetailLocationInfo: FC<IProps> = ({ locationId }) => {
  const [deleteDevicesByIds, { isLoading: isDeleting }] = Api.useBatchDeleteDevicesMutation()
  const [updateDevicesBatch] = Api.useBatchUpdateDevicesMutation()

  const [selectedBuildings, setSelectedBuildings] = useState<ISelectItem[]>([])
  const [selectedLevels, setSelectedLevels] = useState<ISelectItem[]>([])
  const [selectedAreas, setSelectedAreas] = useState<ISelectItem[]>([])
  const [selectedUnits, setSelectedUnits] = useState<ISelectItem[]>([])
  const [selectedDeleteDevice, setSelectedDeleteDevice] = useState<IDevice | null>(null)
  const [selectedDevices, setSelectedDevices] = useState<IDevice[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [hotspots, setHotspots] = useState<IDeviceHotspot[]>([])

  const buildingIds = useMemo(() => {
    return selectedBuildings.map((p) => Number(p.value))
  }, [selectedBuildings])

  const levelIds = useMemo(() => {
    return selectedLevels.map((p) => Number(p.value))
  }, [selectedLevels])

  const areaIds = useMemo(() => {
    return selectedAreas.map((p) => Number(p.value))
  }, [selectedAreas])

  const unitIds = useMemo(() => {
    return selectedUnits.map((p) => Number(p.value))
  }, [selectedUnits])

  const selectedDeviceIds = useMemo(() => {
    return selectedDevices.map((p) => p.id)
  }, [selectedDevices])

  const { unitPoints, floorImgUrl } = useMemo(() => {
    const level = selectedLevels[0]
    const unit = selectedUnits[0]
    const floorImgUrl = (level?.item as ILevel)?.floorPlanImgUrl || ''
    const unitPoints = (unit?.item as IUnit)?.points || []
    return {
      floorImgUrl,
      unitPoints,
    }
  }, [selectedUnits, selectedLevels])

  const { data: deviceList } = Api.useGetDeviceListQuery({
    page: 1,
    limit: 100,
    orderBy: 'identificationNo',
    orderDir: 'asc',
    locationIds: [locationId],
    buildingIds: buildingIds,
    levelIds: levelIds,
    areaIds: areaIds,
    unitIds: unitIds,
  })

  const devices = useMemo(() => {
    return deviceList?.rows || []
  }, [deviceList])

  const handleChangeBuildings = (buildings: ISelectItem[]) => {
    setSelectedBuildings(buildings)
    setSelectedLevels([])
    setSelectedAreas([])
    setSelectedUnits([])
  }

  const handleChangeLevels = (levels: ISelectItem[]) => {
    setSelectedLevels(levels)
    setSelectedAreas([])
    setSelectedUnits([])
  }

  const handleChangeAreas = (areas: ISelectItem[]) => {
    setSelectedAreas(areas)
    setSelectedUnits([])
  }

  const handleChangeUnits = (units: ISelectItem[]) => {
    setSelectedUnits(units)
  }

  const handleChangeHotspots = (spots: IDeviceHotspot[]) => {
    const newSpots: IDeviceHotspot[] = []
    for (let i = 0; i < spots.length; i++) {
      if (spots[i].x !== hotspots[i].x || spots[i].y !== hotspots[i].y) {
        newSpots.push(spots[i])
      }
    }
    console.log('newSpots: ', newSpots)
    setHotspots([...spots])

    // Update device position
    const newDevices: IReqDeviceUpdate[] = []
    for (let i = 0; i < newSpots.length; i++) {
      const spot = newSpots[i]
      if (spot.deviceId) {
        newDevices.push({
          id: spot.deviceId,
          positionX: spot.x,
          positionY: spot.y,
        })
      }
    }

    if (newDevices.length > 0) {
      updateDevicesBatch(newDevices)
        .unwrap()
        .then()
        .catch((err) => {
          console.log('Failed to update devices: ', err)
          toast.error('Faied to update devices')
        })
    }
  }

  const handleSelectDevice = (data: IDevice) => {
    const idx = selectedDevices.findIndex((d) => d.id === data.id)
    const newDevices = [...selectedDevices]
    if (idx === -1) {
      newDevices.push(data)
    } else {
      newDevices.splice(idx, 1)
    }
    setSelectedDevices([...newDevices])
  }

  const handleSelectHotspot = (hotspot: IDeviceHotspot) => {
    const device = devices.find((d) => d.id === hotspot.deviceId)

    if (device) {
      handleSelectDevice(device)
    }
  }

  const handleRemoveDevice = (data: IDevice) => {
    setSelectedDeleteDevice(data)
    setOpenDeleteModal(true)
  }

  const handleDeleteSelected = () => {
    if (!selectedDeleteDevice) return

    const selectedIds = selectedDeleteDevice ? [selectedDeleteDevice.id] : []
    deleteDevicesByIds(selectedIds)
      .unwrap()
      .then(() => {
        toast.success('Device have been deleted')
        setOpenDeleteModal(false)
        handleSelectDevice(selectedDeleteDevice)
      })
      .catch((err) => {
        console.log('Failed to delete device: ', err)
        toast.error('Failed to delete device')
      })
  }

  useEffect(() => {
    const hotspots: IDeviceHotspot[] = devices
      .filter((e) => typeof e.positionX === 'number' && typeof e.positionY === 'number')
      .map((device) => {
        return {
          x: device.positionX || 0,
          y: device.positionY || 0,
          deviceId: device.id,
        }
      })
    setHotspots([...hotspots])
  }, [devices])

  return (
    <Box>
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            px: 4,
            pt: 4.25,
            pb: 3.25,
            display: 'flex',
            flex: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3' sx={{ color: 'grey.800' }}>
            Location Info
          </Typography>
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ p: 3.75, pt: 2.25 }}>
          <Grid container spacing={4.25}>
            <Grid item xs={12} container spacing={2}>
              <Grid item lg={3} xs={12}>
                <BuildingSelect
                  hiddenLabel={true}
                  selected={selectedBuildings}
                  onChange={handleChangeBuildings}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  locationIds={[locationId]}
                />
              </Grid>
              <Grid item lg={3} xs={12}>
                <LevelSelect
                  hiddenLabel={true}
                  selected={selectedLevels}
                  onChange={handleChangeLevels}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  locationIds={[locationId]}
                  buildingIds={buildingIds}
                />
              </Grid>
              <Grid item lg={3} xs={12}>
                <AreaSelect
                  hiddenLabel={true}
                  selected={selectedAreas}
                  onChange={handleChangeAreas}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  locationIds={[locationId]}
                  buildingIds={buildingIds}
                  levelIds={levelIds}
                />
              </Grid>
              <Grid item lg={3} xs={12}>
                <UnitSelect
                  hiddenLabel={true}
                  selected={selectedUnits}
                  onChange={handleChangeUnits}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  locationIds={[locationId]}
                  buildingIds={buildingIds}
                  levelIds={levelIds}
                  areaIds={areaIds}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2.75}>
                <Grid item lg={4} xs={12}>
                  <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: 1.5 }}>
                    <Typography variant='h5' sx={{ fontSize: '1.125rem', color: 'grey.800' }}>
                      Device List
                    </Typography>
                    <Stack sx={{ display: 'flex', flexDirection: 'column', rowGap: 2.25 }}>
                      {devices.map((device, idx) => {
                        const typeName = device.deviceType?.deviceType || '-'
                        const identificationNo = device.identificationNo || '-'
                        const isSelectedDevice =
                          selectedDevices.findIndex((d) => d.id === device.id) !== -1
                        return (
                          <Box
                            key={`device-item-${idx}`}
                            sx={{
                              py: 1.5,
                              px: 2,
                              display: 'flex',
                              justifyContent: 'space-between',
                              border: '1px solid',
                              borderColor: isSelectedDevice ? 'primary.main' : '#707070',
                              borderRadius: 1.5,
                              alignItems: 'center',
                              cursor: 'pointer',
                              '&:hover': {
                                borderColor: 'primary.main',
                              },
                            }}
                            onClick={() => handleSelectDevice(device)}
                          >
                            <Box>
                              <Typography
                                variant='h5'
                                sx={{ color: (theme) => theme.palette.grey[600] }}
                              >
                                {typeName}
                              </Typography>
                              <Typography
                                variant='h5'
                                sx={{ color: (theme) => theme.palette.grey[600] }}
                              >
                                {identificationNo}
                              </Typography>
                            </Box>
                            <IconButton
                              onClick={() => handleRemoveDevice(device)}
                              size='small'
                              sx={{
                                color: (theme) => theme.palette.grey[600],
                              }}
                            >
                              <Closecross sx={{ fontSize: 28 }} />
                            </IconButton>
                          </Box>
                        )
                      })}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <Box sx={{ width: '100%', height: '100%', minHeight: '732px' }}>
                    <DeviceFloorMap
                      src={floorImgUrl}
                      hotspots={hotspots}
                      unitPoints={unitPoints}
                      onChangeHotspots={handleChangeHotspots}
                      editType={EDeviceMapType.EditableDevice}
                      selectedDeviceIds={selectedDeviceIds}
                      onSelectHotspot={handleSelectHotspot}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        heading={
          <span style={{ letterSpacing: '-0.055em' }}>
            Are you sure you want to delete the selected device?
          </span>
        }
        subHeading={
          <span>
            This action cannot be undone, <br />
            so please be sure before proceeding.
          </span>
        }
        onDelete={() => handleDeleteSelected()}
        onGoBack={() => setOpenDeleteModal(false)}
        loading={isDeleting}
      />
    </Box>
  )
}

export default LocationSettingsDetailLocationInfo
