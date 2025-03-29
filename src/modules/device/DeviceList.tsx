import { FC, useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import EnhancedTable from '../common/EnhancedTable'
import { IDeviceListFilters } from '../../types/device'
import ListOptionButton from '../common/ListOptionButton'
import CustomChip from '../common/CustomChip'
import { BlockBox } from '../../assets/icons/block-box'
import { FileUploadLight } from '../../assets/icons/file-upload-light'
import getDeviceBatteryStatusInfo from '../../helpers/getDeviceBatteryStatusInfo'
import getDeviceStatusInfo from '../../helpers/getDeviceStatusInfo'
import DeviceListFilterbar from './DeviceListFilterbar'
import { IDevice } from '../../api/models'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { _getDeviceOverviewDeviceList } from '../../store/_selectors'
import _actions from '../../store/_actions'
import DeleteDialog from '../common/DeleteDialog'
import DeviceBatchUploadDialog from './DeviceBatchUploadDialog'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import { LoadingButton } from '@mui/lab'
import useAuth from '../../hooks/useAuth'
interface IProps {
  selectedStatus?: string | null
}

const DeviceList: FC<IProps> = ({ selectedStatus }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isAddable, setAddable] = useState(false);
  const [isDeletable, setDeletable] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [isViewable, setViewable] = useState(false);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.overview.addDevice)) {
      setAddable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.overview.viewDeviceDetails)) {
      setViewable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.overview.editDevice)) {
      setEditable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.overview.deleteDevice)) {
      setDeletable(true)
    }
  }, [])
  const [deleteDevicesByIds, { isLoading: isDeleting }] = Api.useBatchDeleteDevicesMutation()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openBatchUpload, setOpenBatchUpload] = useState(false)

  const { pagination, filters } = _getDeviceOverviewDeviceList()

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

  const handleGotoNewIncident = () => {
    if(isAddable){
      navigate('/device/overview/create')
    }else{
      toast.error('You do not have access to add!')
    } 
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.devices.control.setControlListOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.devices.control.setControlListOrderBy(property as keyof IDevice))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.devices.overview.setDeviceListLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.devices.overview.setDeviceListPage(page))
  }

  const handleEdit = (data: IDevice) => {
    if(isViewable){
      navigate(`/device/overview/${data?.id}`)
    }else{
      toast.error('You do not have access to edit!')
    }
  }

  const handleChangeFilters = (newFilters: IDeviceListFilters) => {
    dispatch(_actions.devices.overview.setDeviceListFilters({ ...filters, ...newFilters }))
  }

  const handleDelete = (data: IDevice) => {
    if(isDeletable){
      setSelectedIds([data.id])
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

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleOpenBatchUpload = () => {
    setOpenBatchUpload(true)
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

  useEffect(() => {
    const statuses = []

    if (selectedStatus) {
      const status = getDeviceStatusInfo(selectedStatus)
      statuses.push(status)
    }
    dispatch(_actions.devices.overview.setDeviceListFilters({ ...filters, statuses: statuses }))
  }, [selectedStatus])

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

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
        return deviceType
          ? deviceType.deviceType
          : '-'
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
          <ListOptionButton
            list={[
              { title: 'View', onClick: () => handleEdit(data) },
              { title: 'Delete', onClick: () => handleDelete(data) },
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box>
      <Stack
        direction={'row'}
        flexWrap={'wrap'}
        gap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant='h3'>Device List</Typography>
        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'}>
          {isDeletable && selectedIds.length > 0 && (
            <Button variant='contained' color='error' onClick={() => setOpenDeleteModal(true)}>
              Delete Selected
            </Button>
          )}
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUpload}
          >
            Batch Upload Devices
          </Button>
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<BlockBox sx={{ color: '#4DBFFF' }} />}
            onClick={handleGotoNewIncident}
          >
            Add New Device
          </Button>
        </Stack>
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
        loading={false}
      />
      <DeviceBatchUploadDialog open={openBatchUpload} onClose={handleCloseBatchUpload} />
    </Box>
  )
}

export default DeviceList
