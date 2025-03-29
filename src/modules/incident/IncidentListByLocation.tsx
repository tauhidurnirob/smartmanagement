import { FC, useState } from 'react'
import dayjs from 'dayjs'
import { Box } from '@mui/material'

import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from '../../types/common'
import { DATE_FORMAT_WITHOUT_MIN, ROW_PER_PAGE_OPTIONS } from '../../constants/common'
import DeleteDialog from '../common/DeleteDialog'
import { useNavigate } from 'react-router-dom'
import EnhancedTable from '../common/EnhancedTable'
import { IIncidentListFilters } from '../../types/incident'
import ListOptionButton from '../common/ListOptionButton'
import CustomChip from '../common/CustomChip'
import getIncidentStatusInfo from '../../helpers/getIncidentStatusInfo'
import IncidentListByLocationFilterbar from './IncidentListByLocationFilterbar'
import { IIncident } from '../../api/models'

const IncidentListByLocation: FC = () => {
  const navigate = useNavigate()

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [filters, setFilters] = useState<IIncidentListFilters>({
    search: '',
    types: [],
    statuses: [],
    projects: [],
    locations: [],
    buildings: [],
    levels: [],
    areas: [],
    units: [],
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
  })

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('desc')
  const [orderBy, setOrderBy] = useState<keyof IIncident>('id')

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as keyof IIncident)
  }

  const handleEdit = (data: IIncident) => {
    navigate(`/incident/overview/${data?.id}`)
  }

  const handleChangeFilters = (newFilters: IIncidentListFilters) => {
    setFilters((filters) => ({ ...filters, ...newFilters }))
  }

  const handleDelete = (data: IIncident) => {
    setSelectedIds([data.id])
    setOpenDeleteModal(true)
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

  // const { data, isLoading, refetch, isUninitialized } = Api.useGetAuditLogListQuery({
  //   page,
  //   limit,
  //   orderDir,
  //   orderBy,
  //   text: debouncedSearch,
  //   projectIds: projectIds,
  //   locationIds: locationIds,
  //   performance: filters.performances,
  //   ...(fromDate ? { startDate: fromDate } : {}),
  //   ...(toDate ? { endDate: toDate } : {}),
  //   auditNumber: auditNumber,
  //   formType: selectedForm,
  // })

  // useEffect(() => {
  //   if (!isUninitialized) {
  //     refetch()
  //   }
  // }, [])

  const dataTable = {
    count: 0,
    rows: [],
  }

  const headCells: ITableHeadCell[] = [
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
      <Box mt={0}>
        <IncidentListByLocationFilterbar filters={filters} onChange={handleChangeFilters} />
        <Box mt={2.5}>
          <EnhancedTable
            loading={false}
            totalCount={dataTable?.count || 0}
            data={dataTable?.rows || []}
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
        loading={false}
      />
    </Box>
  )
}

export default IncidentListByLocation
