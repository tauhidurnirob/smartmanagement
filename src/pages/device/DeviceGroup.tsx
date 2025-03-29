import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'

import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { IDeviceGroupListFilters } from '../../types/device'
import ListOptionButton from '../../modules/common/ListOptionButton'
import EnhancedTable from '../../modules/common/EnhancedTable'
import { CalendarSchedule } from '../../assets/icons/calendar-schedule'
import DeviceGroupListFilterbar from '../../modules/device/DeviceGroupListFilterbar'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { _getDeviceGroupList } from '../../store/_selectors'
import _actions from '../../store/_actions'
import { IDeviceGroup } from '../../api/models'
import DeleteDialog from '../../modules/common/DeleteDialog'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'

const DeviceGroup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isAddable, setAddable] = useState(false);
  const [isDeletable, setDeletable] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [isViewable, setViewable] = useState(false);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceGroup.addDeviceGroup)) {
      setAddable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceGroup.editDeviceGroup)) {
      setEditable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceGroup.viewDetailsDeviceGroup)) {
      setViewable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceGroup.deleteDeviceGroup)) {
      setDeletable(true)
    }
  }, [])
  const [deleteDeviceGroupsByIds, { isLoading: isDeleting }] =
    Api.useBatchDeleteDeviceGroupsMutation()

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { pagination, filters } = _getDeviceGroupList()
  const debouncedSearch = useDebounce(filters.search, 500)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const handleGotoNewDeviceGroup = () => {
    if(isAddable){
      navigate('/device/group/create')
    }else{
      toast.error('You do not have access to create!')
    } 
  }
  const checkDelete = () => {
    if(isDeletable){
      setOpenDeleteModal(true)
    }else{
      toast.error('You do not have access to delete!')
    } 
  }
  
  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.devices.group.setDeviceGroupListOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.devices.group.setDeviceGroupListOrderBy(property as keyof IDeviceGroup))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.devices.group.setDeviceGroupListLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.devices.group.setDeviceGroupListPage(page))
  }

  const handleEdit = (data: IDeviceGroup) => {
    if(isViewable){
      navigate(`/device/group/${data?.id}`)
    }else{
      toast.error('You do not have access to view!')
    } 
  }

  const handleChangeFilters = (newFilters: IDeviceGroupListFilters) => {
    dispatch(_actions.devices.group.setDeviceGroupListFilters({ ...filters, ...newFilters }))
  }

  const handleDelete = (data: IDeviceGroup) => {
    if(isDeletable){
      setSelectedIds([data.id])
      setOpenDeleteModal(true)
    }else{
      toast.error('You do not have access to delete!')
    } 
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetDeviceGroupListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderDir: pagination.orderDir,
    orderBy: pagination.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
  })

  const handleDeleteSelected = () => {
    deleteDeviceGroupsByIds(selectedIds)
      .then(() => {
        toast.success('Device Groups have been deleted')
        setOpenDeleteModal(false)
        // refetch()
      })
      .catch((err) => {
        console.log('Failed to delete device groups: ', err)
        toast.error('Failed to delete device groups')
      })
  }

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Group Name',
      render: (item: TableData) => {
        const { groupName } = item as IDeviceGroup
        return groupName || '-'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IDeviceGroup
        return project?.name || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IDeviceGroup
        return location?.name || '-'
      },
    },
    {
      id: '',
      name: 'Building',
      render: (item: TableData) => {
        const { building } = item as IDeviceGroup
        return building?.name || '-'
      },
    },
    {
      id: '',
      name: 'Level',
      render: (item: TableData) => {
        const { level } = item as IDeviceGroup
        return level?.name || '-'
      },
    },
    {
      id: '',
      name: 'Area',
      render: (item: TableData) => {
        const { area } = item as IDeviceGroup
        return area?.name || '-'
      },
    },
    {
      id: '',
      name: 'Room',
      render: (item: TableData) => {
        const { unit } = item as IDeviceGroup
        return unit?.name || '-'
      },
    },
    {
      id: '',
      name: 'Device Type',
      render: (item: TableData) => {
        const { deviceGroupMaps } = item as IDeviceGroup
        const deviceTypes = deviceGroupMaps.map((e) => e.deviceType?.deviceType || '').join(', ')
        return deviceTypes || '-'
      },
    },
    {
      id: '',
      name: 'Device List',
      render: (item: TableData) => {
        const { deviceGroupMaps } = item as IDeviceGroup
        const deviceTypes = deviceGroupMaps
          .map((e) => {
            const typeName = e.deviceType?.deviceType || '-'
            const isAll = e.isAll
            const deviceNames = isAll
              ? `All ${typeName}`
              : (e.deviceGroupDetails || []).map((d) => d.device?.identificationNo || '-').join(',')
            if (isAll) {
              return deviceNames
            }
            return `${typeName} ${deviceNames}`
          })
          .join(', ')
        return deviceTypes || '-'
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IDeviceGroup
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
          {selectedIds.length > 0 && (
            <LoadingButton
              variant='contained'
              color='error'
              loading={isDeleting}
              onClick={() => checkDelete()}
            >
              Delete Selected
            </LoadingButton>
          )}
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<CalendarSchedule sx={{ color: '#4DBFFF' }} />}
            onClick={handleGotoNewDeviceGroup}
          >
            Add New Group
          </Button>
        </Stack>
      </Stack>
      <Box mt={3.25}>
        <DeviceGroupListFilterbar filters={filters} onChange={handleChangeFilters} />
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
            Are you sure you want to delete the selected device group(s)?
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

export default DeviceGroup
