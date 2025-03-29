import { useMemo, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { ITaskStaffAttendanceListFilters } from '../../types/task'
import CustomChip from '../../modules/common/CustomChip'
import EnhancedTable from '../../modules/common/EnhancedTable'
import TaskStaffAttendanceListFilterbar from '../../modules/task-management/TaskStaffAttendanceListFilterbar'
import { DATE_FORMAT_ONLY_TIME, DATE_FORMAT_WITHOUT_TIME } from '../../constants/common'
import getTaskStaffAttendanceStatusInfo from '../../helpers/getTaskStaffAttendanceStatusInfo'

import Api from '../../api'
import { _getAttendanceFilters } from '../../store/_selectors'
import useDebounce from '../../hooks/useDebounce'
import { actions as performanceActions } from '../../store/slices/performanceManagements'
import { useDispatch } from 'react-redux'
import { IUser } from '../../api/models'
import { IStaffAttendances } from '../../api/models/staff'

const TaskStaffAttendance = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const dispatch = useDispatch()
  const { attendanceFilter } = performanceActions

  const {
    limit,
    orderBy,
    orderDir,
    page,
    search,
    selectedLocations,
    selectedProjects,
    selectedRoles,
    selectedStatuses,
    endDate,
    startDate,
  } = _getAttendanceFilters()

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    dispatch(attendanceFilter.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(attendanceFilter.setOrderBy(property as keyof IUser))
  }

  const onTextChange = (payload: string) => {
    dispatch(attendanceFilter.setSearch(payload))
  }

  const onLocationChange = (payload: ISelectItem[]) => {
    dispatch(attendanceFilter.setSelectedLocations(payload))
  }

  const onProjectChange = (payload: ISelectItem[]) => {
    dispatch(attendanceFilter.setSelectedProjects(payload))
  }

  const onRoleChange = (payload: ISelectItem[]) => {
    dispatch(attendanceFilter.setSelectedRoles(payload))
  }

  const onStatusChange = (payload: ISelectItem[]) => {
    dispatch(attendanceFilter.setSelectedStatuses(payload))
  }

  const onStartDateChange = (payload: Dayjs) => {
    dispatch(attendanceFilter.setStartDate(payload))
  }

  const onEndDateChange = (payload: Dayjs) => {
    dispatch(attendanceFilter.setEndDate(payload))
  }

  const debouncedSearch = useDebounce(search, 500)

  const projectIds = useMemo(() => {
    return selectedProjects.map((p) => Number(p.value))
  }, [selectedProjects])

  const locationIds = useMemo(() => {
    return selectedLocations.map((p) => Number(p.value))
  }, [selectedLocations])

  const roleIds = useMemo(() => {
    return selectedRoles.map((p) => Number(p.value))
  }, [selectedRoles])

  const statuses = useMemo(() => {
    return selectedStatuses.map((p) => Number(p.value))
  }, [selectedStatuses])

  const { data } = Api.useGetStaffAttendancesQuery({
    limit,
    page,
    orderBy,
    orderDir,
    projectIds,
    locationIds,
    roleIds,
    startDate: startDate && dayjs(startDate).startOf('day').toISOString(),
    endDate: endDate && dayjs(endDate).endOf('day').toISOString(),
    statuses,
    text: debouncedSearch,
  })

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Date',
      render: (item: TableData) => {
        const { createdAt } = item as IStaffAttendances
        return createdAt ? dayjs(createdAt).format(DATE_FORMAT_WITHOUT_TIME) : '-'
      },
    },
    {
      id: '',
      name: 'Name',
      render: (item: TableData) => {
        const { staff } = item as IStaffAttendances
        return staff?.fullName || '-'
      },
    },
    {
      id: '',
      name: 'Role',
      render: (item: TableData) => {
        const { staff } = item as IStaffAttendances
        return staff?.role?.name || '-'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { location } = item as IStaffAttendances
        return location?.locationCategory?.project?.name
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IStaffAttendances
        return location?.name
      },
    },
    {
      id: '',
      name: 'Clocked in Time',
      render: (item: TableData) => {
        const { inTime } = item as IStaffAttendances
        return inTime ? dayjs(inTime, DATE_FORMAT_ONLY_TIME).format(DATE_FORMAT_ONLY_TIME) : '-'
      },
    },
    {
      id: '',
      name: 'Clocked out Time',
      render: (item: TableData) => {
        const { outTime } = item as IStaffAttendances
        return outTime ? dayjs(outTime, DATE_FORMAT_ONLY_TIME).format(DATE_FORMAT_ONLY_TIME) : '-'
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { status } = item as IStaffAttendances
        const statusInfo = getTaskStaffAttendanceStatusInfo(status)
        return <CustomChip text={statusInfo?.label || '_'} type={statusInfo?.chipType || 'error'} />
      },
    },
  ]

  const filters: ITaskStaffAttendanceListFilters = {
    search,
    projects: selectedProjects,
    locations: selectedLocations,
    roles: selectedRoles,
    statuses: selectedStatuses,
    startDate,
    endDate,
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
        <Typography variant='h3'>Staff Attendance</Typography>
      </Stack>
      <Box sx={{ mt: 2.25 }}>
        <TaskStaffAttendanceListFilterbar
          filters={filters}
          onEndDateChange={onEndDateChange}
          onLocationChange={onLocationChange}
          onProjectChange={onProjectChange}
          onRoleChange={onRoleChange}
          onStatusChange={onStatusChange}
          onStartDateChange={onStartDateChange}
          onTextChange={onTextChange}
        />
      </Box>
      <Box mt={2.75}>
        <EnhancedTable
          loading={false}
          totalCount={data?.count || 0}
          data={data?.rows || []}
          page={page}
          rowsPerPage={limit}
          onPageChange={(p) => dispatch(attendanceFilter.setPage(p))}
          onRowsPerPageChange={(l) => dispatch(attendanceFilter.setLimit(l))}
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
    </Box>
  )
}

export default TaskStaffAttendance
