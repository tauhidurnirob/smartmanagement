import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import {
  ITableHeadCell,
  OrderDirection,
  TableData,
  TableDataFieldName,
} from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../helpers/constants'
import { DATE_FORMAT } from '../../../constants/common'
import CustomChip from '../../common/CustomChip'
import EnhancedTable from '../../common/EnhancedTable'
import { IMaintenance, IMaintenanceListFilters } from '../../../types/maintenance'
import { tmpMaintenances } from './dummy'
import { getMaintenanceStatusInfo } from './MaintenanceDetail'
import MaintenanceListByLocationFilterbar from './MaintenanceListByLocationFilterbar'

const MaintenanceListByLocation = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [filters, setFilters] = useState<IMaintenanceListFilters>({
    search: '',
    statuses: [],
    projects: [],
    locations: [],
    buildings: [],
    levels: [],
    areas: [],
    units: [],
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
    startTime: dayjs().startOf('day'),
    endTime: dayjs(),
  })

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as any)
  }

  const handleChangeFilters = (newFilters: IMaintenanceListFilters) => {
    setFilters((filters) => ({ ...filters, ...newFilters }))
  }

  const headCells: ITableHeadCell[] = [
    {
      id: 'name',
      name: 'Maintenance Name',
      render: (item: TableData) => {
        const { name } = item as IMaintenance
        return name
      },
    },
    {
      id: '',
      name: 'Date Triggered',
      render: (item: TableData) => {
        const { triggeredAt } = item as IMaintenance
        return dayjs(triggeredAt).format(DATE_FORMAT)
      },
    },
    {
      id: '',
      name: 'Date End',
      render: (item: TableData) => {
        const { endAt } = item as IMaintenance
        return dayjs(endAt).format(DATE_FORMAT)
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { status } = item as IMaintenance
        const statusInfo = getMaintenanceStatusInfo(status)
        return <CustomChip text={statusInfo?.label || '_'} type={statusInfo?.chipType || 'error'} />
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const { id } = item as IMaintenance
        return (
          <Button
            variant='contained'
            color='inherit'
            sx={{
              backgroundColor: (theme) => theme.palette.grey[200],
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={() => navigate(`/maintenance/overview/${id}`)}
          >
            View
          </Button>
        )
      },
    },
  ]

  return (
    <Box>
      <Box mt={0}>
        <MaintenanceListByLocationFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box mt={2.5}>
        <EnhancedTable
          loading={false}
          totalCount={tmpMaintenances?.length || 0}
          data={tmpMaintenances as any}
          page={page}
          rowsPerPage={limit}
          onPageChange={(p) => setPage(p)}
          onRowsPerPageChange={(l) => setLimit(l)}
          order={orderDir}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          hasCheckbox={false}
        />
      </Box>
    </Box>
  )
}

export default MaintenanceListByLocation
