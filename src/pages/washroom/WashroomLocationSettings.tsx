import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Typography, Stack, Button } from '@mui/material'
import { ROW_PER_PAGE_OPTIONS,ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from '../../types/common'
import WashroomLocationListFilterbar from './WashroomLocationListFilterbar'
import { IWashroomLocationListFilters, IWashroomTableData } from '../../types/washroom'
import { ILocation } from '../../types/location'
import EnhancedTable from '../../modules/common/EnhancedTable'
import ListOptionButton from '../../modules/common/ListOptionButton'
import { tmpLocationList } from '../../modules/washroom/dummy'
import DeleteDialog from '../../modules/common/DeleteDialog'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import Api from '../../api'

const WashroomLocationSettings = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [isViewable, setViewable] = useState(false);
  const [isDeleteable, setDeleteable] = useState(false);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.viewwashroomLocationSettingsDetails)) {
      setViewable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.deletewashroomLocationSettings)) {
      setDeleteable(true)
    }
  }, [])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('desc')
  const [orderBy, setOrderBy] = useState<keyof ILocation>('id')
  const [filters, setFilters] = useState<IWashroomLocationListFilters>({
    search: '',
    projects: [],
    locations: [],
  })

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleChangeFilters = (newFilters: IWashroomLocationListFilters) => {
    setFilters((filters) => ({ ...filters, ...newFilters }))
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as keyof ILocation)
  }

  const handleEdit = (data: ILocation) => {
    if(isViewable){
      navigate(`/washroom/location-settings/${data?.locationId}`, {state: data})
    }else{
      toast.error('You do not have access to view!')
    }
  }

  const handleDelete = (data: ILocation) => {
    if(isDeleteable){
      setSelectedIds([data.id])
      setOpenDeleteModal(true)
    }else{
      toast.error('You do not have access to delete!')
    }

    // deleteLogOne(data.id as number)
    //   .then(() => {
    //     toast.success('Log deleted successfully')
    //     refetch()
    //   })
    //   .catch((err) => {
    //     console.log('Failed to delete log: ', err)
    //     toast.error('Failed to delete log')
    //   })
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
      render: (item: any) => {
        return item.projectName || '';
      },
    },
    {
      id: '',
      name: 'Location',
      tableCellSx: { width: '25%' },
      render: (item: any) => {
        return item.locationName || '';
      },
    },
    {
      id: '',
      name: 'Washroom',
      tableCellSx: { width: '25%' },
      render: (item: any) => {
        return item.washroomName || '';
      },
    },

    {
      id: '',
      name: 'Action',
      tableCellSx: { width: '15%' },
      render: (item: TableData) => {
        const data = item as ILocation
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

  const { data, isLoading, refetch, isUninitialized } = Api.useGetProjectUnitListQuery({
    page: 1,
    limit: 100,
  })

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
          {isDeleteable && selectedIds.length > 0 && (
            <Button variant='contained' color='error' onClick={() => setOpenDeleteModal(true)}>
              Delete Selected
            </Button>
          )}
        </Stack>
      </Stack>
      <Box mt={2}>
        <WashroomLocationListFilterbar filters={filters} onChange={handleChangeFilters} />
        <Box mt={2.5}>
          <EnhancedTable
            loading={false}
            totalCount={data?.count || 0}
            data={data?.rows || []}
            page={page}
            rowsPerPage={limit}
            onPageChange={(p) => setPage(p)}
            onRowsPerPageChange={(l) => setLimit(l)}
            order={orderDir}
            orderBy={orderBy}
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

export default WashroomLocationSettings
