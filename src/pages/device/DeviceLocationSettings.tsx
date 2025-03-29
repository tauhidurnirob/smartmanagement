import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Stack, Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import EnhancedTable from '../../modules/common/EnhancedTable'
import ListOptionButton from '../../modules/common/ListOptionButton'
import DeleteDialog from '../../modules/common/DeleteDialog'
import { IDeviceLocationListFilters } from '../../types/device'
import DeviceLocationListFilterbar from './DeviceLocationListFilterbar'
import { IDeviceLocation } from '../../api/models'
import Api from '../../api'
import { ILocation } from '../../types/location'
import { _getDeviceLocationList } from '../../store/_selectors'
import useDebounce from '../../hooks/useDebounce'
import _actions from '../../store/_actions'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
const DeviceLocationSettings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isDeletable, setDeletable] = useState(false);
  const [isEditable, setEditable] = useState(false);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.locationSettings.deleteDeviceLocationSettings)) {
      setDeletable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.locationSettings.viewEditDeviceLocationSettings)) {
      setEditable(true)
    }
  }, [])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { pagination, filters } = _getDeviceLocationList()

  const debouncedSearch = useDebounce(filters.search, 300)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const handleChangeFilters = (newFilters: IDeviceLocationListFilters) => {
    dispatch(_actions.devices.location.setFilters({ ...filters, ...newFilters }))
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.devices.location.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.devices.location.setOrderBy(property as keyof ILocation))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.devices.overview.setDeviceListLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.devices.overview.setDeviceListPage(page))
  }

  const handleEdit = (data: IDeviceLocation) => {
    if(isEditable){
      if (data?.location) {
        const locationId = data.location.id
        navigate(`/device/location-settings/${locationId}`)
      }
    }else{
      toast.error('You do not have access to edit!')
    }
    
  }

  const handleDelete = (data: IDeviceLocation) => {
    setSelectedIds([data.location.id])
    setOpenDeleteModal(true)
  }

  const handleDeleteSelected = () => {
    // DeleteMultiple(selectedIds)
    //   .then(() => {
    //     toast.success('Audit logs have been deleted')
    //     setOpenDeleteModal(false)
    //     // refetch()
    //   })
    //   .catch((err) => {
    //     console.log('Failed to delete logs: ', err)
    //     toast.error('Failed to delete logs')
    //   })
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      tableCellSx: { width: '25%' },
      render: (item: TableData) => {
        const { location } = item as IDeviceLocation
        const project = location.locationCategory?.project
        return project?.name || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      tableCellSx: { width: '50%' },
      render: (item: TableData) => {
        const { location } = item as IDeviceLocation
        return location.name || '-'
      },
    },
    {
      id: '',
      name: 'Total Device',
      tableCellSx: { width: '15%' },
      render: (item: TableData) => {
        const { deviceCounts } = item as IDeviceLocation
        return deviceCounts ?? '-'
      },
    },
    {
      id: '',
      name: 'Action',
      tableCellSx: { width: '10%' },
      render: (item: TableData) => {
        const data = item as IDeviceLocation
        return (
          <ListOptionButton
            list={[
              { title: 'View & Edit', onClick: () => handleEdit(data) },
              // { title: 'Delete', onClick: () => handleDelete(data) },
            ]}
          />
        )
      },
    },
  ]

  const { data, isLoading, refetch, isUninitialized } = Api.useGetDeviceLocationListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderDir: pagination.orderDir,
    orderBy: pagination.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
  })

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])
  
  const checkDelete = () => {
    if(isDeletable){
      setOpenDeleteModal(true)
    }else{
      toast.error('You do not have access to delete!')
    } 
  }
  return (
    <Box>
      <Stack
        direction={'row'}
        flexWrap={'wrap'}
        gap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant='h3'>Location Settings</Typography>
        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'}>
          {selectedIds.length > 0 && (
            <Button variant='contained' color='error' onClick={() => checkDelete()}>
              Delete Selected
            </Button>
          )}
        </Stack>
      </Stack>
      <Box mt={2.5}>
        <DeviceLocationListFilterbar filters={filters} onChange={handleChangeFilters} />
        <Box mt={4}>
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
            hasCheckbox={false}
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
            Are you sure you want to delete the selected location(s)?
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
    </Box>
  )
}

export default DeviceLocationSettings
