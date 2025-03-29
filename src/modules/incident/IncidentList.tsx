import { FC, useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { Box, Button, Stack, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from '../../types/common'
import Api from '../../api'
import { DATE_FORMAT_WITHOUT_MIN, ROW_PER_PAGE_OPTIONS } from '../../constants/common'
import DeleteDialog from '../common/DeleteDialog'
import { IncidentIssueTypeIcon } from '../../assets/icons/incident-issue-type'
import EnhancedTable from '../common/EnhancedTable'
import { IIncidentListFilters } from '../../types/incident'
import ListOptionButton from '../common/ListOptionButton'
import CustomChip from '../common/CustomChip'
import getIncidentStatusInfo from '../../helpers/getIncidentStatusInfo'
import IncidentListFilterbar from './IncidentListFilterbar'
import { IIncident } from '../../api/models'
import { _getIncidentList } from '../../store/_selectors'
import useDebounce from '../../hooks/useDebounce'
import _actions from '../../store/_actions'
import useAuth from '../../hooks/useAuth'
import {
  ROLE_PERMISSION_KEYS
} from '../../helpers/constants'
interface IProps {
  isWashroom?: boolean
}

const IncidentList: FC<IProps> = ({ isWashroom }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isViewable, setViewable] = useState(false);
  const [isAddable, setAddable] = useState(false);
  const [isDeleteable, setDeleteable] = useState(false);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.washroomManagement.incident.viewWashroomIncidentDetails)) {
      setViewable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.washroomManagement.incident.addWashroomIncident)) {
      setAddable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.washroomManagement.incident.deleteWashroomIncident)) {
      setDeleteable(true)
    }
  }, [])
  const [deleteIncidentsByIds, { isLoading: isDeleting }] = Api.useBatchDeleteIncidentsMutation()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { pagination, filters } = _getIncidentList()

  const debouncedSearch = useDebounce(filters.search, 300)

  const projectIds = useMemo(() => {
    return filters?.projects?.map((p) => Number(p.value))
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
    if (isWashroom) {
      if(isAddable){
        navigate('/washroom/incident/create')
      }else{
        toast.error('You do not have access to create!')
      }
     
    } else {
      navigate('/incident/overview/create')
    }
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.incidents.incident.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.incidents.incident.setOrderBy(property as keyof IIncident))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.incidents.incident.setLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.incidents.incident.setPage(page))
  }

  const handleEdit = (data: IIncident) => {
    if (isWashroom) {
      if(isViewable){
        navigate(`/washroom/incident/${data?.id}`)
      }else{
        toast.error('You do not have access to view!')
      }
     
    } else {
      navigate(`/incident/overview/${data?.id}`)
    }
  }

  const handleChangeFilters = (newFilters: IIncidentListFilters) => {
    dispatch(_actions.incidents.incident.setFilters({ ...filters, ...newFilters }))
  }

  const handleDelete = (data: IIncident) => {
    if(isDeleteable){
      setSelectedIds([data.id])
      setOpenDeleteModal(true)
    }else{
      toast.error('You do not have access to delete!')
    }
  }

  const handleDeleteSelected = () => {
    deleteIncidentsByIds(selectedIds)
      .unwrap()
      .then(() => {
        toast.success('Incident have been deleted')
        setOpenDeleteModal(false)
        setSelectedIds([])
      })
      .catch((err) => {
        console.log('Failed to delete incidents: ', err)
        toast.error('Failed to delete incidents')
      })
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetIncidentListQuery({
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
    startDate: filters.startDate.toISOString(),
    endDate: filters.endDate.toISOString(),
    incidentTypeIds: typeIds,
  })

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IIncident
        return project?.name || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IIncident
        return location?.name || '-'
      },
    },
    {
      id: '',
      name: 'Incident Type',
      render: (item: TableData) => {
        const { incidentType } = item as IIncident
        return incidentType ? incidentType.name : '-'
      },
    },
    {
      id: '',
      name: 'Date Triggered',
      render: (item: TableData) => {
        const { triggeredAt } = item as IIncident
        return triggeredAt ? dayjs(triggeredAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'
      },
    },
    {
      id: '',
      name: 'Date End',
      render: (item: TableData) => {
        const { endedAt } = item as IIncident
        return endedAt ? dayjs(endedAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'
      },
    },
    {
      id: '',
      name: 'Assign',
      render: (item: TableData) => {
        const { recipients } = item as IIncident
        return (recipients || [])?.map((e) => e.fullName)?.join(', ') || ''
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { status } = item as IIncident
        const statusInfo = getIncidentStatusInfo(status || '')

        return (
          <CustomChip
            type={statusInfo ? statusInfo.chipType : 'error'}
            text={statusInfo ? statusInfo.label : '-'}
          />
        )
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IIncident
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
        <Typography variant='h3'>Incident List</Typography>
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
            onClick={handleGotoNewIncident}
          >
            Add New Incident
          </Button>
        </Stack>
      </Stack>
      <Box mt={3.25}>
        <IncidentListFilterbar filters={filters} onChange={handleChangeFilters} />
        <Box mt={1.5}>
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
            Are you sure you want to delete the selected incident(s)?
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

export default IncidentList
