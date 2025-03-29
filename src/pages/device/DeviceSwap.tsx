import { useMemo, useState, useEffect } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { IDeviceListFilters } from '../../types/device'
import getDeviceBatteryStatusInfo from '../../helpers/getDeviceBatteryStatusInfo'
import getDeviceStatusInfo from '../../helpers/getDeviceStatusInfo'
import CustomChip from '../../modules/common/CustomChip'
import DeviceListFilterbar from '../../modules/device/DeviceListFilterbar'
import EnhancedTable from '../../modules/common/EnhancedTable'
import DeviceSwapModal from '../../modules/device/DeviceSwapModal'
import { IDevice } from '../../api/models'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { _getDeviceOverviewDeviceList, _getDeviceSwapDeviceList } from '../../store/_selectors'
import { useDispatch } from 'react-redux'
import _actions from '../../store/_actions'
import DeleteDialog from '../../modules/common/DeleteDialog'
import { toast } from 'react-toastify'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'

const DeviceSwap = () => {
  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isSwapable, setSwapable] = useState(false);
  const [isDeleteable, setDeletable] = useState(false);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceSwap.swapDevice)) {
      setSwapable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceSwap.deleteDeviceSwap)) {
      setDeletable(true)
    }
  }, [])
  const [deleteDevicesByIds, { isLoading: isDeleting }] = Api.useBatchDeleteDevicesMutation()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { pagination, filters } = _getDeviceSwapDeviceList()

  const debouncedSearch = useDebounce(filters.search, 300)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const buildingIds = useMemo(() => {
    return filters.buildings.map((p) => Number(p.value))
  }, [filters.buildings])

  const levelIds = useMemo(() => {
    return filters.levels.map((p) => Number(p.value))
  }, [filters.levels])

  const areaIds = useMemo(() => {
    return filters.areas.map((p) => Number(p.value))
  }, [filters.areas])

  const unitIds = useMemo(() => {
    return filters.units.map((p) => Number(p.value))
  }, [filters.units])

  const typeIds = useMemo(() => {
    return filters.types.map((p) => Number(p.value))
  }, [filters.types])

  const statuses = useMemo(() => {
    return filters.statuses.map((p) => p.value as string)
  }, [filters.statuses])

  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null)

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.devices.swap.setDeviceListOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.devices.swap.setDeviceListOrderBy(property as keyof IDevice))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.devices.swap.setDeviceListLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.devices.swap.setDeviceListPage(page))
  }

  const handleChangeFilters = (newFilters: IDeviceListFilters) => {
    dispatch(_actions.devices.swap.setDeviceListFilters({ ...filters, ...newFilters }))
  }

  const handleDeviceSwap = (device: IDevice) => {
    if(isSwapable){
      setSelectedDevice(device)
    }else{
      toast.error('You do not have access to swap!')
    } 
  }
  const checkDelete = () => {
    if(isDeleteable){
      setOpenDeleteModal(true)
    }else{
      toast.error('You do not have access to delete!')
    } 
  }

  const handleDeleteSelected = () => {
    deleteDevicesByIds(selectedIds)
      .unwrap()
      .then(() => {
        toast.success('Devices have been deleted')
        setOpenDeleteModal(false)
      })
      .catch((err) => {
        console.log('Failed to delete devices: ', err)
        toast.error('Failed to delete devices')
      })
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetDeviceListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderDir: pagination.orderDir,
    orderBy: pagination.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
    buildingIds: buildingIds,
    levelIds: levelIds,
    areaIds: areaIds,
    unitIds: unitIds,
    statuses: statuses,
    deviceTypeIds: typeIds,
  })

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Identification No.',
      render: (item: TableData) => {
        const { identificationNo } = item as IDevice
        return identificationNo || '-'
      },
    },
    {
      id: '',
      name: 'Type',
      render: (item: TableData) => {
        const { deviceType, deviceCategory } = item as IDevice
        return deviceType ? `${deviceCategory?.deviceCategory} - ${deviceType.deviceType}` : '-'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { deviceUnit } = item as IDevice
        const project = deviceUnit?.project
        return project?.name || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { deviceUnit } = item as IDevice
        return deviceUnit?.location?.name || '-'
      },
    },
    {
      id: '',
      name: 'Building',
      render: (item: TableData) => {
        const { deviceUnit } = item as IDevice
        return deviceUnit?.building?.name || '-'
      },
    },
    {
      id: '',
      name: 'Level',
      render: (item: TableData) => {
        const { deviceUnit } = item as IDevice
        return deviceUnit?.level?.name || '-'
      },
    },
    {
      id: '',
      name: 'Area',
      render: (item: TableData) => {
        const { deviceUnit } = item as IDevice
        return deviceUnit?.area?.name || '-'
      },
    },
    {
      id: '',
      name: 'Unit',
      render: (item: TableData) => {
        const { deviceUnit } = item as IDevice
        return deviceUnit?.unit?.name || '-'
      },
    },
    {
      id: '',
      name: 'Battery',
      render: (item: TableData) => {
        const { batteryPercent } = item as IDevice
        const batteryInfo = getDeviceBatteryStatusInfo(batteryPercent)

        if (!batteryInfo) return '-'

        return (
          <CustomChip
            type={batteryInfo ? batteryInfo.chipType : 'error'}
            text={`${batteryPercent}%`}
          />
        )
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { status } = item as IDevice
        const statusInfo = getDeviceStatusInfo(status || '')

        if (!status) return '-'
        return (
          <CustomChip
            type={statusInfo ? statusInfo.chipType || 'error' : 'error'}
            text={statusInfo.label}
          />
        )
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IDevice
        return (
          <Button
            variant='contained'
            sx={{
              background: (theme) => theme.palette.grey[100],
              color: (theme) => theme.palette.grey[500],
              '&:hover': { background: (theme) => theme.palette.grey[200] },
            }}
            disableElevation
            onClick={() => handleDeviceSwap(data)}
          >
            Swap
          </Button>
        )
      },
    },
  ]
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant='h3'>Device Swap</Typography>
        {selectedIds.length > 0 && (
          <Button variant='contained' color='error' onClick={() => checkDelete()}>
            Delete Selected
          </Button>
        )}
      </Stack>
      <Box mt={3.25}>
        <DeviceListFilterbar filters={filters} onChange={handleChangeFilters} />
        <Box mt={3}>
        <EnhancedTable
            loading={isLoading}
            totalCount={data?.count || 0}
            data={data?.rows || []}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            onPageChange={(p) => handleChangePage(p)}
            onRowsPerPageChange={(l) => handleChangeLimit(l)}
            order={pagination.orderDir}
            orderBy={pagination.orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            hasCheckbox={true}
            selected={selectedIds}
            onSelect={handleSelect}
            onSelectIdFieldName={'id'}
          />
        </Box>
      </Box>
      <DeviceSwapModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        heading={
          <span style={{ letterSpacing: '-0.055em' }}>
            Are you sure you want to delete the selected device(s)?
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

export default DeviceSwap
