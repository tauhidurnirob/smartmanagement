import { FC, useMemo, useState, useEffect } from 'react'
import {
  Box,
  Card,
  Divider,
  Grid,
  Typography,
  useTheme,
  Button,
  Stack,
  IconButton,
} from '@mui/material'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'

import { ISelectItem, IUnitPoint } from '../../types/common'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'
import { EDeviceMapType } from '../../helpers/constants'
import DeviceFloorMap from '../device/DeviceFloorMap'
import { Plus } from '../../assets/icons/plus'
import StyledTextField from '../common/StyledTextField'
import LocationDetailAddMoreInfoDialog from './LocationDetailAddMoreInfoDialog'
import { ILevel, IUnit } from '../../api/models'
import useDebounce from '../../hooks/useDebounce'
import Api from '../../api'
import { TrashDuotoneIcon } from '../../assets/icons/trash-duotone'
import DeleteDialog from '../common/DeleteDialog'

interface IProps {
  locationId?: number
}

const LocationDetail: FC<IProps> = ({ locationId }) => {
  const theme = useTheme()

  const [updateBuildingById] = Api.useUpdateBuildingMutation()
  const [updateLevelById] = Api.useUpdateLevelMutation()
  const [updateAreaById] = Api.useUpdateAreaMutation()
  const [updateUnitById, { isLoading: isUpdatingUnit }] = Api.useUpdateUnitMutation()
  const [deleteBuildingById, { isLoading: isDeletingBuilding }] =
    Api.useDeleteBuildingByIdMutation()
  const [deleteLevelById, { isLoading: isDeletingLevel }] = Api.useDeleteLevelByIdMutation()
  const [deleteAreaById, { isLoading: isDeletingArea }] = Api.useDeleteAreaByIdMutation()
  const [deleteUnitById, { isLoading: isDeletingUnit }] = Api.useDeleteUnitByIdMutation()

  const [filters, setFilters] = useState<{
    building: ISelectItem[]
    level: ISelectItem[]
    area: ISelectItem[]
    unit: ISelectItem[]
  }>({
    building: [],
    level: [],
    area: [],
    unit: [],
  })
  const [unitPoints, setUnitPoints] = useState<IUnitPoint[]>([])
  const [isEditHotspots, setIsEditHotspots] = useState<boolean>(false)
  const [openMoreInfo, setOpenMoreInfo] = useState<boolean>(false)
  const [deleteItemType, setDeleteItemType] = useState<
    'building' | 'level' | 'area' | 'unit' | null
  >(null)

  const locationIds = useMemo(() => {
    if (typeof locationId === 'number') {
      return [locationId]
    } else {
      return []
    }
  }, [locationId])

  const buildingIds = useMemo(() => {
    return filters.building.map((b) => b.value as number)
  }, [filters.building])

  const levelIds = useMemo(() => {
    return filters.level.map((b) => b.value as number)
  }, [filters.level])

  const areaIds = useMemo(() => {
    return filters.area.map((b) => b.value as number)
  }, [filters.area])

  const { floorImgUrl } = useMemo(() => {
    const level = filters.level[0]?.item as ILevel

    let floorImgUrl = ''

    if (level) {
      floorImgUrl = level.floorPlanImgUrl || ''
    }

    return { floorImgUrl }
  }, [filters])

  const debouncedBuildingName = useDebounce((filters.building[0]?.label || '') as string, 300)
  const debouncedLevelName = useDebounce((filters.level[0]?.label || '') as string, 300)
  const debouncedAreaName = useDebounce((filters.area[0]?.label || '') as string, 300)
  const debouncedUnitName = useDebounce((filters.unit[0]?.label || '') as string, 300)

  const handleChangeBuilding = (buildings: ISelectItem[]) => {
    setFilters({ building: buildings, level: [], area: [], unit: [] })
  }

  const handleChangeLevel = (levels: ISelectItem[]) => {
    setFilters({ ...filters, level: levels, area: [], unit: [] })
  }

  const handleChangeArea = (areas: ISelectItem[]) => {
    setFilters({ ...filters, area: areas, unit: [] })
  }

  const handleChangeUnit = (units: ISelectItem[]) => {
    if (filters.unit[0]?.value !== units[0]?.value) {
      setIsEditHotspots(false)
    }
    setFilters({ ...filters, unit: units })
  }

  const handleChangeBuildingName = (name: string) => {
    const newBuilding = filters.building[0]
    if (newBuilding) {
      newBuilding.label = name
      setFilters({ ...filters, building: [newBuilding] })
    }
  }

  const handleChangeLevelName = (name: string) => {
    const newLevel = filters.level[0]
    if (newLevel) {
      newLevel.label = name
      setFilters({ ...filters, level: [newLevel] })
    }
  }

  const handleChangeAreaName = (name: string) => {
    const newArea = filters.area[0]
    if (newArea) {
      newArea.label = name
      setFilters({ ...filters, area: [newArea] })
    }
  }

  const handleChangeUnitName = (name: string) => {
    const newUnit = filters.unit[0]
    if (newUnit) {
      newUnit.label = name
      setFilters({ ...filters, unit: [newUnit] })
    }
  }

  const handleChangeUnitPoints = (units: IUnitPoint[]) => {
    setUnitPoints([...units])
  }

  const handleChangeEditableHotspots = (isEdit: boolean) => {
    setIsEditHotspots(isEdit)
  }

  const handleAddMoreInfo = () => {
    setOpenMoreInfo(true)
  }

  const handleCloseMoreInfo = () => {
    setOpenMoreInfo(false)
  }

  const handleDiscard = () => {
    setIsEditHotspots(false)
    setUnitPoints((filters.unit[0]?.item as IUnit)?.points || [])
  }

  const updateBuilding = (buildingName: string) => {
    const building = filters.building[0]
    const buildingId = building?.value

    if (building && typeof buildingId === 'number') {
      updateBuildingById({
        id: buildingId,
        name: buildingName,
      })
        .unwrap()
        .catch((err) => {
          console.log('Failed to update building name: ', err)
        })
    }
  }

  const updateLevel = (levelName: string) => {
    const level = filters.level[0]
    const levelId = level?.value

    if (level && typeof levelId === 'number') {
      updateLevelById({
        id: levelId,
        name: levelName,
      })
        .unwrap()
        .catch((err) => {
          console.log('Failed to update level name: ', err)
        })
    }
  }

  const updateArea = (areaName: string) => {
    const area = filters.area[0]
    const areaId = area?.value

    if (area && typeof areaId === 'number') {
      updateAreaById({
        id: areaId,
        name: areaName,
      })
        .unwrap()
        .catch((err) => {
          console.log('Failed to update area name: ', err)
        })
    }
  }

  const updateUnit = (unitName: string) => {
    const unit = filters.unit[0]
    const unitId = unit?.value

    if (unit && typeof unitId === 'number') {
      updateUnitById({
        id: unitId,
        name: unitName,
      })
        .unwrap()
        .catch((err) => {
          console.log('Failed to update unit name: ', err)
        })
    }
  }

  const handleSave = () => {
    const unit = filters.unit[0]
    const unitId = unit?.value

    if (unit && typeof unitId === 'number') {
      updateUnitById({
        id: unitId,
        points: unitPoints,
      })
        .unwrap()
        .then(() => {
          toast.success('Update points in unit')
          setIsEditHotspots(false)
        })
        .catch((err) => {
          console.log('Failed to update unit points: ', err)
        })
    }
  }

  const handleRemoveBuilding = () => {
    setDeleteItemType('building')
  }

  const handleRemoveLevel = () => {
    setDeleteItemType('level')
  }

  const handleRemoveArea = () => {
    setDeleteItemType('area')
  }

  const handleRemoveUnit = () => {
    setDeleteItemType('unit')
  }

  const handleDeleteItem = () => {
    if (deleteItemType === 'building') {
      const buildingId = filters.building[0]?.value
      if (typeof buildingId === 'number') {
        deleteBuildingById(buildingId)
          .unwrap()
          .then(() => {
            toast.success('Deleted the building')
            setDeleteItemType(null)
            setFilters({
              building: [],
              level: [],
              area: [],
              unit: [],
            })
          })
          .catch((err) => {
            console.error('Failed to delete the building: ', err)
            toast.error('Failed to delete the building')
          })
      }
    }

    if (deleteItemType === 'level') {
      const levelId = filters.level[0]?.value
      if (typeof levelId === 'number') {
        deleteLevelById(levelId)
          .unwrap()
          .then(() => {
            toast.success('Deleted the level')
            setDeleteItemType(null)
            setFilters({
              ...filters,
              level: [],
              area: [],
              unit: [],
            })
          })
          .catch((err) => {
            console.error('Failed to delete the level: ', err)
            toast.error('Failed to delete the level')
          })
      }
    }

    if (deleteItemType === 'area') {
      const areaId = filters.area[0]?.value
      if (typeof areaId === 'number') {
        deleteAreaById(areaId)
          .unwrap()
          .then(() => {
            toast.success('Deleted the area')
            setDeleteItemType(null)
            setFilters({
              ...filters,
              area: [],
              unit: [],
            })
          })
          .catch((err) => {
            console.error('Failed to delete the area: ', err)
            toast.error('Failed to delete the area')
          })
      }
    }

    if (deleteItemType === 'unit') {
      const unitId = filters.unit[0]?.value
      if (typeof unitId === 'number') {
        deleteUnitById(unitId)
          .unwrap()
          .then(() => {
            toast.success('Deleted the unit')
            setDeleteItemType(null)
            setFilters({
              ...filters,
              unit: [],
            })
          })
          .catch((err) => {
            console.error('Failed to delete the unit: ', err)
            toast.error('Failed to delete the unit')
          })
      }
    }
  }

  useEffect(() => {
    setFilters({
      building: [],
      level: [],
      area: [],
      unit: [],
    })
  }, [locationId])

  useEffect(() => {
    const unit = filters.unit[0]
    const points = (unit?.item as IUnit)?.points || []

    setUnitPoints(points)
  }, [filters.unit])

  useEffect(() => {
    updateBuilding(debouncedBuildingName)
  }, [debouncedBuildingName])

  useEffect(() => {
    updateLevel(debouncedLevelName)
  }, [debouncedLevelName])

  useEffect(() => {
    updateArea(debouncedAreaName)
  }, [debouncedAreaName])

  useEffect(() => {
    updateUnit(debouncedUnitName)
  }, [debouncedUnitName])

  return (
    <Box>
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: 3.75 }}>
        <Box sx={{ pl: 3.75, pr: 3, pt: 3.75, pb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h3'>{'Location Info '}</Typography>

            {isEditHotspots ? (
              <Box>
                <LoadingButton
                  variant='text'
                  color='inherit'
                  loading={isUpdatingUnit}
                  onClick={handleDiscard}
                  sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  variant='contained'
                  color='primary'
                  loading={isUpdatingUnit}
                  onClick={() => handleSave()}
                  sx={{ ml: 3 }}
                >
                  Save
                </LoadingButton>
              </Box>
            ) : (
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleAddMoreInfo()}
                startIcon={<Plus sx={{ fontSize: 14 }} />}
              >
                Add More Info
              </Button>
            )}
          </Box>
        </Box>
        <Divider light />
        <Box sx={{ pl: 3.75, pr: 3, pt: 3, pb: 5 }}>
          <Grid container spacing={3}>
            <Grid item lg={4} xs={12}>
              <Grid container direction={'column'} rowSpacing={6.75}>
                <Grid item>
                  <Grid container direction={'column'} rowSpacing={2.5}>
                    <Grid item>
                      <BuildingSelect
                        hiddenLabel={true}
                        selected={filters.building}
                        onChange={handleChangeBuilding}
                        isSingleSelect={true}
                        disableAllSelect={true}
                        textColor={theme.palette.grey[800]}
                        locationIds={locationIds}
                        disabled={locationIds.length < 1}
                      />
                    </Grid>
                    <Grid item>
                      <LevelSelect
                        hiddenLabel={true}
                        selected={filters.level as ISelectItem[]}
                        onChange={handleChangeLevel}
                        isSingleSelect={true}
                        disableAllSelect={true}
                        textColor={theme.palette.grey[800]}
                        locationIds={locationIds}
                        buildingIds={buildingIds}
                        disabled={filters.building.length < 1}
                      />
                    </Grid>
                    <Grid item>
                      <AreaSelect
                        hiddenLabel={true}
                        selected={filters.area as ISelectItem[]}
                        onChange={handleChangeArea}
                        isSingleSelect={true}
                        disableAllSelect={true}
                        textColor={theme.palette.grey[800]}
                        locationIds={locationIds}
                        buildingIds={buildingIds}
                        levelIds={levelIds}
                        disabled={filters.level.length < 1}
                      />
                    </Grid>
                    <Grid item>
                      <UnitSelect
                        hiddenLabel={true}
                        selected={filters.unit as ISelectItem[]}
                        onChange={handleChangeUnit}
                        isSingleSelect={true}
                        disableAllSelect={true}
                        textColor={theme.palette.grey[800]}
                        locationIds={locationIds}
                        buildingIds={buildingIds}
                        levelIds={levelIds}
                        areaIds={areaIds}
                        disabled={filters.area.length < 1}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction={'column'}
                    rowSpacing={2.5}
                    sx={{
                      '.text-input': {
                        width: '100%',
                        borderRadius: 1.5,
                        border: '1px solid #707070',
                        '.MuiInputBase-input': { px: 2, py: 1.5, fontSiz: 14, color: 'grey.600' },
                      },
                    }}
                  >
                    <Grid item>
                      <Typography
                        typography={'h5'}
                        sx={{ fontWeight: 500, color: 'grey.800', mb: 1 }}
                      >
                        Building
                      </Typography>
                      <Stack direction={'row'} gap={0.5} alignItems={'center'}>
                        <StyledTextField
                          className='text-input'
                          value={filters.building[0]?.label || ''}
                          disabled={filters.building.length < 1}
                          onChange={(e) => handleChangeBuildingName(e.target.value)}
                          sx={{ flex: 1 }}
                        />
                        <IconButton
                          sx={{ p: 1 }}
                          disabled={filters.building.length < 1 || isDeletingBuilding}
                          onClick={handleRemoveBuilding}
                        >
                          <TrashDuotoneIcon sx={{ color: 'grey.400' }} />
                        </IconButton>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Typography
                        typography={'h5'}
                        sx={{ fontWeight: 500, color: 'grey.800', mb: 1 }}
                      >
                        Level
                      </Typography>
                      <Stack direction={'row'} gap={0.5} alignItems={'center'}>
                        <StyledTextField
                          className='text-input'
                          value={filters.level[0]?.label || ''}
                          disabled={filters.level.length < 1}
                          onChange={(e) => handleChangeLevelName(e.target.value)}
                        />
                        <IconButton
                          sx={{ p: 1 }}
                          disabled={filters.level.length < 1 || isDeletingLevel}
                          onClick={handleRemoveLevel}
                        >
                          <TrashDuotoneIcon sx={{ color: 'grey.400' }} />
                        </IconButton>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Typography
                        typography={'h5'}
                        sx={{ fontWeight: 500, color: 'grey.800', mb: 1 }}
                      >
                        Area
                      </Typography>
                      <Stack direction={'row'} gap={0.5} alignItems={'center'}>
                        <StyledTextField
                          className='text-input'
                          value={filters.area[0]?.label || ''}
                          disabled={filters.area.length < 1}
                          onChange={(e) => handleChangeAreaName(e.target.value)}
                        />
                        <IconButton
                          sx={{ p: 1 }}
                          disabled={filters.area.length < 1 || isDeletingArea}
                          onClick={handleRemoveArea}
                        >
                          <TrashDuotoneIcon sx={{ color: 'grey.400' }} />
                        </IconButton>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Typography
                        typography={'h5'}
                        sx={{ fontWeight: 500, color: 'grey.800', mb: 1 }}
                      >
                        Unit
                      </Typography>
                      <Stack direction={'row'} gap={0.5} alignItems={'center'}>
                        <StyledTextField
                          className='text-input'
                          value={filters.unit[0]?.label || ''}
                          disabled={filters.unit.length < 1}
                          onChange={(e) => handleChangeUnitName(e.target.value)}
                        />
                        <IconButton
                          sx={{ p: 1 }}
                          disabled={filters.unit.length < 1 || isDeletingUnit}
                          onClick={handleRemoveUnit}
                        >
                          <TrashDuotoneIcon sx={{ color: 'grey.400' }} />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Box sx={{ width: '100%', height: '100%', minHeight: '434px' }}>
                <DeviceFloorMap
                  src={floorImgUrl}
                  hotspots={[]}
                  unitPoints={unitPoints}
                  onChangeUnitPoints={handleChangeUnitPoints}
                  editType={
                    filters.unit.length > 0
                      ? EDeviceMapType.EditableUnitNodes
                      : EDeviceMapType.OnlyView
                  }
                  editableUnitHotspot={isEditHotspots}
                  onEditableHotspot={handleChangeEditableHotspots}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <LocationDetailAddMoreInfoDialog
        open={openMoreInfo}
        onClose={handleCloseMoreInfo}
        locationId={locationId}
      />
      <DeleteDialog
        open={!!deleteItemType}
        onClose={() => setDeleteItemType(null)}
        heading={
          <span style={{ letterSpacing: '-0.48px' }}>
            Are you sure you want to delete the {deleteItemType || ''} name?
          </span>
        }
        subHeading={
          <span>
            This action cannot be undone, <br />
            so please be sure before proceeding.
          </span>
        }
        onDelete={() => handleDeleteItem()}
        onGoBack={() => setDeleteItemType(null)}
        loading={false}
      />
    </Box>
  )
}

export default LocationDetail
