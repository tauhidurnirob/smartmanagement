import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

import EnhancedTable from '../../modules/common/EnhancedTable'
import DeviceControlListFilterbar from '../../modules/device/DeviceControlListFilterbar'
import { IDeviceControlListFilters } from '../../types/device'
import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import Api from '../../api'
import { _getDeviceControlList } from '../../store/_selectors'
import _actions from '../../store/_actions'
import useDebounce from '../../hooks/useDebounce'
import { ILocation } from '../../types/location'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'

const DeviceControl = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isViewable, setViewable] = useState(false);
 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceControl.viewDeviceControlDetails)) {
      setViewable(true)
    }
  }, [])

  const { pagination, filters } = _getDeviceControlList()

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const debouncedSearch = useDebounce(filters.search, 500)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const handleChangeFilters = (newFilters: IDeviceControlListFilters) => {
    dispatch(_actions.devices.control.setControlListFilters({ ...filters, ...newFilters }))
  }

  const handleGotoDeviceControl = (ctrl: ILocation) => {
    if(isViewable){
      const { id } = ctrl
      navigate(`/device/control/${id}`)
    }else{
      toast.error('You do not have access to view!') 
    }
  }
  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.devices.control.setControlListOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.devices.control.setControlListOrderBy(property as keyof ILocation))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.devices.control.setControlListLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.devices.control.setControlListPage(page))
  }

  const { data, isLoading } = Api.useGetLocationListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderDir: pagination.orderDir,
    orderBy: pagination.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
  })

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { locationCategory } = item as ILocation
        const project = locationCategory?.project
        return project?.name || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { name } = item as ILocation
        return name || '-'
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as ILocation
        return (
          <Button
            variant='contained'
            sx={{
              bgcolor: 'grey.100',
              color: 'grey.700',
              '&:hover': { bgcolor: 'grey.200' },
            }}
            disableElevation
            onClick={() => handleGotoDeviceControl(data)}
          >
            Device Control
          </Button>
        )
      },
    },
  ]

  return (
    <Box>
      <Typography variant='h3'>Device Control</Typography>
      <Box mt={2.5}>
        <DeviceControlListFilterbar filters={filters} onChange={handleChangeFilters} />
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
    </Box>
  )
}

export default DeviceControl
