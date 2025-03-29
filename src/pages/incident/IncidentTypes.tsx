import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Stack, Button } from '@mui/material'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { IncidentIssueTypeIcon } from '../../assets/icons/incident-issue-type'
import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { IIncidentTypeListFilters } from '../../types/incident'
import IncidentTypeListFilterbar from '../../modules/incident/IncidentTypeListFilterbar'
import EnhancedTable from '../../modules/common/EnhancedTable'
import ListOptionButton from '../../modules/common/ListOptionButton'
import DeleteDialog from '../../modules/common/DeleteDialog'
import Api from '../../api'
import { IIncidentType } from '../../api/models'
import _actions from '../../store/_actions'
import useDebounce from '../../hooks/useDebounce'
import { _getIncidentTypeList } from '../../store/_selectors'

const IncidentTypes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [deleteIncidentTypesByIds, { isLoading: isDeleting }] =
    Api.useBatchDeleteIncidentTypesMutation()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { pagination, filters } = _getIncidentTypeList()

  const debouncedSearch = useDebounce(filters.search, 300)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const handleGotoNewIncidentType = () => {
    navigate('/incident/incident-type/create')
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleChangeFilters = (newFilters: IIncidentTypeListFilters) => {
    dispatch(_actions.incidents.type.setFilters({ ...filters, ...newFilters }))
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.incidents.type.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.incidents.type.setOrderBy(property as keyof IIncidentType))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.incidents.type.setLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.incidents.type.setPage(page))
  }

  const handleEdit = (data: IIncidentType) => {
    navigate(`/incident/incident-type/${data?.id}`)
  }

  const handleDelete = (data: IIncidentType) => {
    setSelectedIds([data.id])
    setOpenDeleteModal(true)
  }

  const handleDeleteSelected = () => {
    deleteIncidentTypesByIds(selectedIds)
      .then(() => {
        toast.success('Incident Types have been deleted')
        setOpenDeleteModal(false)
      })
      .catch((err) => {
        console.log('Failed to delete incident types: ', err)
        toast.error('Failed to delete incident types')
      })
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetIncidentTypeListQuery({
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

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Incident Type',
      render: (item: TableData) => {
        const { name } = item as IIncidentType
        return name || '-'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IIncidentType
        return project?.name || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IIncidentType
        return location?.name || '-'
      },
    },
    {
      id: '',
      name: 'Recipient',
      render: (item: TableData) => {
        const { recipients } = item as IIncidentType
        const recipientNames =
          recipients && recipients?.length > 0
            ? recipients.map((r) => r.recipient?.fullName || '').join(', ')
            : '-'
        return recipientNames
      },
    },

    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IIncidentType
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
        <Typography variant='h3'>Incident Type</Typography>
        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'}>
          {selectedIds.length > 0 && (
            <Button variant='contained' color='error' onClick={() => setOpenDeleteModal(true)}>
              Delete Selected
            </Button>
          )}
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<IncidentIssueTypeIcon sx={{ color: '#4DBFFF' }} />}
            onClick={handleGotoNewIncidentType}
          >
            Add New Incident Type
          </Button>
        </Stack>
      </Stack>
      <Box mt={3.25}>
        <IncidentTypeListFilterbar filters={filters} onChange={handleChangeFilters} />
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
            Are you sure you want to delete the selected incident type(s)?
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

export default IncidentTypes
