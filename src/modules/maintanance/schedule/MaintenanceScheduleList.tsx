import { Box } from '@mui/material'
import { useState } from 'react'
import {
  ITableHeadCell,
  OrderDirection,
  TableData,
  TableDataFieldName,
} from '../../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../../helpers/constants'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../../constants/common'
import EnhancedTable from '../../common/EnhancedTable'
import { IMaintenance, IMaintenanceListFilters } from '../../../types/maintenance'
import { useNavigate } from 'react-router-dom'
import MaintenanceScheduleListFilterbar from './MaintenanceScheduleListFilterBar'
import { tmpMaintenances } from '../overview/dummy'
import ListOptionButton from '../../common/ListOptionButton'

const MaintenanceScheduleList = () => {
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
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IMaintenance
        return project?.name
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IMaintenance
        return location?.name
      },
    },
    {
      id: '',
      name: 'From',
      render: (item: TableData) => {
        const { triggeredAt } = item as IMaintenance
        return dayjs(triggeredAt).format(DATE_FORMAT)
      },
    },
    {
      id: '',
      name: 'To',
      render: (item: TableData) => {
        const { endAt } = item as IMaintenance
        return dayjs(endAt).format(DATE_FORMAT)
      },
    },
    {
      id: '',
      name: 'Frequency',
      render: (item: TableData) => {
        const { frequency } = item as IMaintenance
        return frequency
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IMaintenance
        return (
          <ListOptionButton
            list={[
              { title: 'View', onClick: () => navigate(`${data.id}`) },
              { title: 'Delete', onClick: () => null },
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box>
      <Box mt={3.5}>
        <MaintenanceScheduleListFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box mt={3.5}>
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

export default MaintenanceScheduleList
