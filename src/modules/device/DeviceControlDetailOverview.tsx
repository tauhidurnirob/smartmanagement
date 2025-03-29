import { FC, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Divider,
  styled,
  Switch,
  Popover,
  Collapse,
  IconButton,
  Checkbox,
} from '@mui/material'

import DeviceFloorMap from './DeviceFloorMap'
import { DEVICE_STATUS_LIST, EDeviceControlAction, EDeviceMapType } from '../../helpers/constants'
import { Plus } from '../../assets/icons/plus'
import CustomChip from '../common/CustomChip'
import getDeviceStatusInfo from '../../helpers/getDeviceStatusInfo'
import getDeviceTypeIcon from '../../helpers/getDeviceTypeIcon'
import { DeviceDetailViewIcon } from '../../assets/icons/device-detail'
import { IDeviceHotspot, ISelectItem } from '../../types/common'
import deepCopy from '../../helpers/deepCopy'
import { ArrowDown } from '../../assets/icons/arrow-down'
import DeviceActivityListModal from '../../pages/device/DeviceActivityListModal'
import { IDevice, ILevel, IReqDeviceControlAction, IReqDeviceUpdate, IUnit } from '../../api/models'

import Api from '../../api'

interface IFilters {
  statuses: string[]
  turnTypes: string[]
}

interface IFilterOptionItem {
  label: string
  value: string
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 30,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    margin: '3px',
    padding: 0,
    transform: 'translateX(0px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(11px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.66992 4.5V4.96875C7.66992 5.61328 7.58594 6.19141 7.41797 6.70312C7.25 7.21484 7.00977 7.65039 6.69727 8.00977C6.38867 8.36914 6.01758 8.64453 5.58398 8.83594C5.15039 9.02344 4.66992 9.11719 4.14258 9.11719C3.61914 9.11719 3.14062 9.02344 2.70703 8.83594C2.27734 8.64453 1.9043 8.36914 1.58789 8.00977C1.27148 7.65039 1.02539 7.21484 0.849609 6.70312C0.677734 6.19141 0.591797 5.61328 0.591797 4.96875V4.5C0.591797 3.85547 0.677734 3.2793 0.849609 2.77148C1.02148 2.25977 1.26367 1.82422 1.57617 1.46484C1.89258 1.10156 2.26562 0.826172 2.69531 0.638672C3.12891 0.447266 3.60742 0.351562 4.13086 0.351562C4.6582 0.351562 5.13867 0.447266 5.57227 0.638672C6.00586 0.826172 6.37891 1.10156 6.69141 1.46484C7.00391 1.82422 7.24414 2.25977 7.41211 2.77148C7.58398 3.2793 7.66992 3.85547 7.66992 4.5ZM6.19922 4.96875V4.48828C6.19922 4.01172 6.15234 3.5918 6.05859 3.22852C5.96875 2.86133 5.83398 2.55469 5.6543 2.30859C5.47852 2.05859 5.26172 1.87109 5.00391 1.74609C4.74609 1.61719 4.45508 1.55273 4.13086 1.55273C3.80664 1.55273 3.51758 1.61719 3.26367 1.74609C3.00977 1.87109 2.79297 2.05859 2.61328 2.30859C2.4375 2.55469 2.30273 2.86133 2.20898 3.22852C2.11523 3.5918 2.06836 4.01172 2.06836 4.48828V4.96875C2.06836 5.44531 2.11523 5.86719 2.20898 6.23438C2.30273 6.60156 2.43945 6.91211 2.61914 7.16602C2.80273 7.41602 3.02148 7.60547 3.27539 7.73438C3.5293 7.85938 3.81836 7.92188 4.14258 7.92188C4.4707 7.92188 4.76172 7.85938 5.01562 7.73438C5.26953 7.60547 5.48438 7.41602 5.66016 7.16602C5.83594 6.91211 5.96875 6.60156 6.05859 6.23438C6.15234 5.86719 6.19922 5.44531 6.19922 4.96875ZM10.4004 4.01367V9H8.98828V2.66016H10.3184L10.4004 4.01367ZM10.1484 5.5957L9.69141 5.58984C9.69531 5.14062 9.75781 4.72852 9.87891 4.35352C10.0039 3.97852 10.1758 3.65625 10.3945 3.38672C10.6172 3.11719 10.8828 2.91016 11.1914 2.76562C11.5 2.61719 11.8438 2.54297 12.2227 2.54297C12.5273 2.54297 12.8027 2.58594 13.0488 2.67188C13.2988 2.75391 13.5117 2.88867 13.6875 3.07617C13.8672 3.26367 14.0039 3.50781 14.0977 3.80859C14.1914 4.10547 14.2383 4.4707 14.2383 4.9043V9H12.8203V4.89844C12.8203 4.59375 12.7754 4.35352 12.6855 4.17773C12.5996 3.99805 12.4727 3.87109 12.3047 3.79688C12.1406 3.71875 11.9355 3.67969 11.6895 3.67969C11.4473 3.67969 11.2305 3.73047 11.0391 3.83203C10.8477 3.93359 10.6855 4.07227 10.5527 4.24805C10.4238 4.42383 10.3242 4.62695 10.2539 4.85742C10.1836 5.08789 10.1484 5.33398 10.1484 5.5957Z" fill="${encodeURIComponent(
          '#3F4254'
        )}"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#00A3FF',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.66992 5.5V5.96875C7.66992 6.61328 7.58594 7.19141 7.41797 7.70312C7.25 8.21484 7.00977 8.65039 6.69727 9.00977C6.38867 9.36914 6.01758 9.64453 5.58398 9.83594C5.15039 10.0234 4.66992 10.1172 4.14258 10.1172C3.61914 10.1172 3.14062 10.0234 2.70703 9.83594C2.27734 9.64453 1.9043 9.36914 1.58789 9.00977C1.27148 8.65039 1.02539 8.21484 0.849609 7.70312C0.677734 7.19141 0.591797 6.61328 0.591797 5.96875V5.5C0.591797 4.85547 0.677734 4.2793 0.849609 3.77148C1.02148 3.25977 1.26367 2.82422 1.57617 2.46484C1.89258 2.10156 2.26562 1.82617 2.69531 1.63867C3.12891 1.44727 3.60742 1.35156 4.13086 1.35156C4.6582 1.35156 5.13867 1.44727 5.57227 1.63867C6.00586 1.82617 6.37891 2.10156 6.69141 2.46484C7.00391 2.82422 7.24414 3.25977 7.41211 3.77148C7.58398 4.2793 7.66992 4.85547 7.66992 5.5ZM6.19922 5.96875V5.48828C6.19922 5.01172 6.15234 4.5918 6.05859 4.22852C5.96875 3.86133 5.83398 3.55469 5.6543 3.30859C5.47852 3.05859 5.26172 2.87109 5.00391 2.74609C4.74609 2.61719 4.45508 2.55273 4.13086 2.55273C3.80664 2.55273 3.51758 2.61719 3.26367 2.74609C3.00977 2.87109 2.79297 3.05859 2.61328 3.30859C2.4375 3.55469 2.30273 3.86133 2.20898 4.22852C2.11523 4.5918 2.06836 5.01172 2.06836 5.48828V5.96875C2.06836 6.44531 2.11523 6.86719 2.20898 7.23438C2.30273 7.60156 2.43945 7.91211 2.61914 8.16602C2.80273 8.41602 3.02148 8.60547 3.27539 8.73438C3.5293 8.85938 3.81836 8.92188 4.14258 8.92188C4.4707 8.92188 4.76172 8.85938 5.01562 8.73438C5.26953 8.60547 5.48438 8.41602 5.66016 8.16602C5.83594 7.91211 5.96875 7.60156 6.05859 7.23438C6.15234 6.86719 6.19922 6.44531 6.19922 5.96875ZM10.9102 10H9.49805V3.05078C9.49805 2.57812 9.58594 2.18164 9.76172 1.86133C9.94141 1.53711 10.1973 1.29297 10.5293 1.12891C10.8613 0.960937 11.2539 0.876953 11.707 0.876953C11.8477 0.876953 11.9863 0.886719 12.123 0.90625C12.2598 0.921875 12.3926 0.947266 12.5215 0.982422L12.4863 2.07227C12.4082 2.05273 12.3223 2.03906 12.2285 2.03125C12.1387 2.02344 12.041 2.01953 11.9355 2.01953C11.7207 2.01953 11.5352 2.06055 11.3789 2.14258C11.2266 2.2207 11.1094 2.33594 11.0273 2.48828C10.9492 2.64062 10.9102 2.82812 10.9102 3.05078V10ZM12.2168 3.66016V4.69141H8.52539V3.66016H12.2168ZM15.1523 10H13.7402V3.05078C13.7402 2.57812 13.8281 2.18164 14.0039 1.86133C14.1836 1.53711 14.4395 1.29297 14.7715 1.12891C15.1035 0.960937 15.4961 0.876953 15.9492 0.876953C16.0898 0.876953 16.2285 0.886719 16.3652 0.90625C16.502 0.921875 16.6348 0.947266 16.7637 0.982422L16.7285 2.07227C16.6504 2.05273 16.5645 2.03906 16.4707 2.03125C16.3809 2.02344 16.2832 2.01953 16.1777 2.01953C15.9629 2.01953 15.7773 2.06055 15.6211 2.14258C15.4688 2.2207 15.3516 2.33594 15.2695 2.48828C15.1914 2.64062 15.1523 2.82812 15.1523 3.05078V10ZM16.459 3.66016V4.69141H12.7676V3.66016H16.459Z" fill="${encodeURIComponent(
        '#B5B5C3'
      )}"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#EBEDF3',
    borderRadius: '30px',
  },
  '.Mui-disabled+.MuiSwitch-track': {
    opacity: '0.3 !important',
  },
}))

const FilterItem = ({
  label,
  options,
  filters,
  onChange,
}: {
  label: string
  options: IFilterOptionItem[]
  filters: string[]
  onChange: (filters: string[]) => void
}) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleChange = (val: string) => {
    if (filters.includes(val)) {
      const newFilters = filters.filter((e) => e !== val)
      onChange(newFilters)
    } else {
      onChange([...filters, val])
    }
  }

  return (
    <Box>
      <Typography variant='h4'>{label}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 1,
          p: 1,
          backgroundColor: 'primary.light',
          borderRadius: 1,
        }}
      >
        <Typography variant='h5' sx={{ color: 'grey.700' }}>
          All
        </Typography>
        <IconButton sx={{ p: 0, mr: 2 }} onClick={handleExpandClick}>
          <ArrowDown
            sx={{
              fontSize: 12,
              color: 'grey.600',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
            }}
          />
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Box
          sx={{
            mt: 1,
            backgroundColor: 'primary.light',
            borderRadius: 1,
            py: 2.5,
            px: 3.75,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.25,
          }}
        >
          {options.map((option, idx) => {
            const { label, value } = option
            const isSelected = filters.includes(value)
            return (
              <Box
                key={`filter-item-${idx}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='h5' sx={{ color: isSelected ? 'primary.main' : 'grey.500' }}>
                  {label}
                </Typography>
                <Checkbox sx={{ p: 0 }} checked={isSelected} onChange={() => handleChange(value)} />
              </Box>
            )
          })}
        </Box>
      </Collapse>
    </Box>
  )
}

const FilterButton: FC<{ filters: IFilters; onApply: (filters: IFilters) => void }> = ({
  filters: inFilters,
  onApply,
}) => {
  const [filters, setFilters] = useState<IFilters>({ statuses: [], turnTypes: [] })
  const [anchorBtnFilter, setAnchorBtnFilter] = useState<HTMLButtonElement | null>(null)
  const openFilter = Boolean(anchorBtnFilter)

  const { optionsDeviceStatus, optionsTurn } = useMemo(() => {
    const optionsDeviceStatus = [
      {
        label: DEVICE_STATUS_LIST[0].label,
        value: DEVICE_STATUS_LIST[0].value,
      } as IFilterOptionItem,
      {
        label: DEVICE_STATUS_LIST[1].label,
        value: DEVICE_STATUS_LIST[1].value,
      } as IFilterOptionItem,
      {
        label: DEVICE_STATUS_LIST[2].label,
        value: DEVICE_STATUS_LIST[2].value,
      } as IFilterOptionItem,
      {
        label: DEVICE_STATUS_LIST[3].label,
        value: DEVICE_STATUS_LIST[3].value,
      } as IFilterOptionItem,
    ]

    const optionsTurn = [
      {
        label: 'On',
        value: 'true',
      } as IFilterOptionItem,
      {
        label: 'Off',
        value: 'false',
      },
    ]

    return {
      optionsDeviceStatus,
      optionsTurn,
    }
  }, [])

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorBtnFilter(event.currentTarget)
  }

  const handleCloseFilter = () => {
    setAnchorBtnFilter(null)
  }

  const handleChangeFilters = (val: string[], key: string) => {
    const newFilters = deepCopy<any>(filters)
    newFilters[key] = [...val]
    setFilters(newFilters)
  }

  const handleApply = () => {
    onApply(filters)
    handleCloseFilter()
  }

  const handleClear = () => {}

  useEffect(() => {
    if (anchorBtnFilter) {
      setFilters({ ...inFilters })
    } else {
      setFilters({ statuses: [], turnTypes: [] })
    }
  }, [anchorBtnFilter])

  return (
    <>
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={handleFilter}
        startIcon={<Plus sx={{ fontSize: '14px !important' }} />}
        sx={{ px: 2, py: 1.25 }}
      >
        Filter
      </Button>
      <Popover
        id={'device-control-filter'}
        open={openFilter}
        anchorEl={anchorBtnFilter}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.75,
              borderRadius: 1,
              pt: 3.25,
              pl: 3.75,
              pr: 4.5,
              pb: 2.75,
              minWidth: '346px',
            },
          },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <FilterItem
            label='Status'
            options={optionsDeviceStatus}
            filters={filters.statuses}
            onChange={(f) => handleChangeFilters(f, 'statuses')}
          />
        </Box>
        <FilterItem
          label='Device on/off'
          options={optionsTurn}
          filters={filters.turnTypes}
          onChange={(f) => handleChangeFilters(f, 'turnTypes')}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2.5 }}>
          <Button
            variant='text'
            color='inherit'
            onClick={() => handleClear()}
            sx={{ color: 'grey.300', fontWeight: 500 }}
          >
            Clear
          </Button>
          <Button variant='contained' size='large' color='primary' onClick={() => handleApply()}>
            Filter
          </Button>
        </Box>
      </Popover>
    </>
  )
}

interface IParentFilters {
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

interface IProps {
  filters: IParentFilters
  locationId: number
}

const DeviceControlDetailOverview: FC<IProps> = ({ filters: parentFilters, locationId }) => {
  const [updateDevice] = Api.useUpdateDeviceMutation()
  const [updateDeviceAction] = Api.useUpdateDeviceActionMutation()

  const [filters, setFilters] = useState<IFilters>({ statuses: [], turnTypes: [] })
  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null)

  const { floorImgUrl } = useMemo(() => {
    const level = parentFilters.levels[0]
    const unit = parentFilters.units[0]

    const floorImgUrl = (level && level.item && (level.item as ILevel).floorPlanImgUrl) || ''
    const unitPoints = (unit && unit.item && (unit.item as IUnit).points) || []

    return { floorImgUrl, unitPoints }
  }, [parentFilters])

  const buildingIds = useMemo(() => {
    return parentFilters.buildings.map((p) => Number(p.value))
  }, [parentFilters.buildings])

  const levelIds = useMemo(() => {
    return parentFilters.levels.map((p) => Number(p.value))
  }, [parentFilters.levels])

  const areaIds = useMemo(() => {
    return parentFilters.areas.map((p) => Number(p.value))
  }, [parentFilters.areas])

  const unitIds = useMemo(() => {
    return parentFilters.units.map((p) => Number(p.value))
  }, [parentFilters.units])

  const statuses = useMemo(() => {
    return filters.statuses.map((p) => p as string)
  }, [filters.statuses])

  const handleSelectDevice = (device: IDevice) => {
    setSelectedDevice(device)
  }

  const handleApply = (newFilters: IFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  const { data: deviceList, refetch } = Api.useGetDeviceListQuery({
    page: 1,
    limit: 100,
    locationIds: [locationId],
    buildingIds,
    levelIds,
    areaIds,
    unitIds,
    statuses,
    turnTypes: filters.turnTypes,
  })

  const { hotspots, devices } = useMemo(() => {
    const devices = deviceList?.rows || []
    const hotspots = devices.map((device) => {
      return {
        x: device.positionX as number,
        y: device.positionY as number,
        type: device.deviceType,
        isOn: device.isOn,
        status: device.status,
      }
    })

    return { hotspots, devices }
  }, [deviceList])

  const handleToggleTurnDevice = (device: IDevice, isOn: boolean) => {
    const newAction: IReqDeviceControlAction = {
      deviceId: device.id,
      action: isOn ? EDeviceControlAction.On : EDeviceControlAction.Off,
    }
    updateDeviceAction(newAction)
      .unwrap()
      .then(() => {
        refetch()
      })
      .catch((err) => {
        console.error('Failed to update device: ', err)
      })
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: { lg: 'row', xs: 'column' }, gap: 3.25, width: '100%' }}
    >
      <Box sx={{ flex: 1, height: '659px', minHeight: '659px' }}>
        <DeviceFloorMap
          src={floorImgUrl}
          hotspots={hotspots}
          unitPoints={[]}
          editType={EDeviceMapType.OnlyView}
          onChangeHotspots={() => {}}
        />
      </Box>
      <Box sx={{}}>
        <Card sx={{ minWidth: '365px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
              px: 3.25,
            }}
          >
            <Typography variant='h3' sx={{ color: 'grey.800' }}>
              Device Control
            </Typography>
            <FilterButton onApply={handleApply} filters={filters} />
          </Box>
          <Divider light sx={{ borderColor: 'grey.100' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '590px',
              overflowY: 'auto',
              pl: 2.75,
            }}
          >
            {devices.map((device, idx) => {
              const { status, deviceType, deviceUnit, isOn } = device
              const statusInfo = getDeviceStatusInfo(status || '')
              const TypeIcon = getDeviceTypeIcon(deviceType?.deviceType || '')
              const typeName = deviceType?.deviceType || '-'
              const unitName = deviceUnit?.unit?.name || '-'
              const isError = status === DEVICE_STATUS_LIST[3].value
              const isLowBattery = status === DEVICE_STATUS_LIST[2].value
              const isOffline = status === DEVICE_STATUS_LIST[1].value
              const disabled = isError || isOffline || isLowBattery

              return (
                <Box key={`device-item-${idx}`}>
                  {idx > 0 && <Divider light sx={{ borderColor: 'grey.100' }} />}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        py: 2,
                        pr: 1.5,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}
                      >
                        <Box
                          sx={{
                            borderRadius: 1,
                            backgroundColor: 'grey.50',
                            width: '46px',
                            height: '46px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <TypeIcon
                            sx={{
                              fontSize: 35,
                              color:
                                isError || isLowBattery
                                  ? statusInfo.color
                                  : isOffline
                                  ? 'grey.300'
                                  : isOn
                                  ? 'success.main'
                                  : 'grey.500',
                            }}
                          />
                        </Box>
                        <Box sx={{ ml: 0 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography variant='h4' sx={{ color: 'grey.800' }}>
                              {typeName}
                            </Typography>
                            <Button
                              variant='text'
                              sx={{ minWidth: 0, ml: 1, p: 0, mt: -1 }}
                              onClick={() => handleSelectDevice(device)}
                            >
                              <DeviceDetailViewIcon sx={{ fontSize: 23, color: '#000000' }} />
                            </Button>
                          </Box>
                          <Typography variant='h5' sx={{ color: 'grey.400', mt: 0.5 }}>
                            {unitName}
                          </Typography>
                        </Box>
                      </Box>
                      <CustomChip
                        type={statusInfo ? statusInfo.chipType || 'error' : 'error'}
                        text={statusInfo.label}
                      />
                    </Box>
                    <Box
                      sx={{
                        py: 2.75,
                        pr: 3.75,
                        pl: 2.25,
                        borderLeft: '1px dashed #EFF2F5',
                      }}
                    >
                      <MaterialUISwitch
                        checked={isOn}
                        disabled={disabled}
                        onChange={() => handleToggleTurnDevice(device, !isOn)}
                      />
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Card>
      </Box>
      <DeviceActivityListModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />
    </Box>
  )
}

export default DeviceControlDetailOverview
