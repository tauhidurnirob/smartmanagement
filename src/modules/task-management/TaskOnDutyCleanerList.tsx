import { useState } from 'react'
import { Box, Stack, Typography, Avatar } from '@mui/material'
import dayjs from 'dayjs'

import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from '../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../helpers/constants'
import CustomChip from '../common/CustomChip'
import EnhancedTable from '../common/EnhancedTable'
import { ITaskOnDutyCleanderListItem, ITaskOnDutyCleanderListFilters } from '../../types/task'
import getTaskStatusStatusInfo from '../../helpers/getTaskStatusStatusInfo'
import TaskOnDutyCleanderListFilterbar from './TaskOnDutyCleanderListFilterbar'
import getColorFromString from '../../helpers/getColorFromString'
import getAvatarNameFromString from '../../helpers/getAvatarNameFromString'

const TaskOnDutyCleanerList = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [filters, setFilters] = useState<ITaskOnDutyCleanderListFilters>({
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

  const handleChangeFilters = (newFilters: ITaskOnDutyCleanderListFilters) => {
    setFilters((filters) => ({ ...filters, ...newFilters }))
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    // setOrderBy(property as keyof IDevice)
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

  const dataTable = { count: 0, rows: [] }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Name',
      render: (item: TableData) => {
        const { staff } = item as ITaskOnDutyCleanderListItem
        const userName = staff?.fullName || '-'
        const aName = getAvatarNameFromString(userName, true)
        const bgColor = getColorFromString(userName)
        return (
          <Stack direction={'row'} gap={2.5} alignItems={'center'}>
            <Avatar
              sx={{
                color: '#ffffff',
                bgcolor: bgColor,
                width: '36px',
                height: '36px',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              {aName}
            </Avatar>
            <Typography typography={'h4'} fontSize={15} fontWeight={700} color='grey.800'>
              {userName}
            </Typography>
          </Stack>
        )
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { task } = item as ITaskOnDutyCleanderListItem
        const project = task?.project
        return project?.name
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { task } = item as ITaskOnDutyCleanderListItem
        const location = task?.location
        return location?.name
      },
    },
    {
      id: '',
      name: 'Building',
      render: (item: TableData) => {
        const { task } = item as ITaskOnDutyCleanderListItem
        const building = task?.building
        return building?.name
      },
    },
    {
      id: '',
      name: 'Level',
      render: (item: TableData) => {
        const { task } = item as ITaskOnDutyCleanderListItem
        const level = task?.level
        return level?.name
      },
    },
    {
      id: '',
      name: 'Area',
      render: (item: TableData) => {
        const { task } = item as ITaskOnDutyCleanderListItem
        const area = task?.area
        return area?.name
      },
    },
    {
      id: '',
      name: 'Unit',
      render: (item: TableData) => {
        const { task } = item as ITaskOnDutyCleanderListItem
        const unit = task?.unit
        return unit?.name
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { task } = item as ITaskOnDutyCleanderListItem
        const statusInfo = getTaskStatusStatusInfo(task?.status || 0)
        return <CustomChip text={statusInfo?.label || '_'} type={statusInfo?.chipType || 'error'} />
      },
    },
  ]

  return (
    <Box>
      <Box>
        <TaskOnDutyCleanderListFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box mt={3}>
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
          hasCheckbox={false}
          selected={selectedIds}
          onSelect={handleSelect}
          onSelectIdFieldName={'id'}
          sx={{
            '.MuiPaper-root': { px: 3.75, py: 1 },
            '.MuiTableHead-root': {
              '.MuiTableRow-root': { bgcolor: '#fff', '.MuiTableCell-root': { color: 'grey.400' } },
            },
            '.MuiTableBody-root': {
              '.MuiTableRow-root:last-child': {
                '.MuiTableCell-root': {
                  borderBottom: 'none',
                },
              },
            },
          }}
        />
      </Box>
      {/* <DeleteDialog
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
      /> */}
    </Box>
  )
}

export default TaskOnDutyCleanerList
