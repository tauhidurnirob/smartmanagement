import { useMemo, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, Button } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { ITaskStaffLeaveListFilters } from '../../types/task'
import CustomChip from '../../modules/common/CustomChip'
import EnhancedTable from '../../modules/common/EnhancedTable'
import { DATE_FORMAT_ONLY_TIME, DATE_FORMAT_WITHOUT_TIME } from '../../constants/common'
import getTaskStaffLeaveCategoryInfo from '../../helpers/getTaskStaffLeaveCategoryInfo'
import getTaskStaffLeaveTypeInfo from '../../helpers/getTaskStaffLeaveTypeInfo'
import getTaskStaffLeaveStatusInfo from '../../helpers/getTaskStaffLeaveStatusInfo'
import getStaffLeaveDays from '../../helpers/getStaffLeaveDays'
import TaskStaffLeaveListFilterbar from '../../modules/task-management/TaskStaffLeaveListFilterbar'
import { _getLeaveApplicationFilter } from '../../store/_selectors'
import { actions as performanceActions } from '../../store/slices/performanceManagements'
import Api from '../../api'
import { IUser } from '../../api/models'
import useDebounce from '../../hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { IGetStaffLeaves } from '../../api/models/staff'
import useAuth from '../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import { toast } from 'react-toastify'

const TaskStaffLeave = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaffLeaveDetails)) {
      setIsViewable(true);
    }else{
      setIsViewable(false);
    }
  
  }, []);
  const [isViewable, setIsViewable] = useState(true);
  const { leaveApplicationFilter } = performanceActions

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const {
    selectedLeaveCategories,
    selectedLeaveTypes,
    limit,
    orderBy,
    orderDir,
    page,
    search,
    selectedLocations,
    selectedProjects,
    selectedRoles,
    selectedStatuses,
    applicationDate,
    endDate,
    startDate,
  } = _getLeaveApplicationFilter()

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    dispatch(leaveApplicationFilter.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(leaveApplicationFilter.setOrderBy(property as keyof IUser))
  }

  const onTextChange = (payload: string) => {
    dispatch(leaveApplicationFilter.setSearch(payload))
  }

  const onLocationChange = (payload: ISelectItem[]) => {
    dispatch(leaveApplicationFilter.setSelectedLocations(payload))
  }

  const onProjectChange = (payload: ISelectItem[]) => {
    dispatch(leaveApplicationFilter.setSelectedProjects(payload))
  }

  const onRoleChange = (payload: ISelectItem[]) => {
    dispatch(leaveApplicationFilter.setSelectedRoles(payload))
  }

  const onStatusChange = (payload: ISelectItem[]) => {
    dispatch(leaveApplicationFilter.setSelectedStatuses(payload))
  }

  const onSelectedLeaveCategoryChange = (payload: ISelectItem[]) => {
    dispatch(leaveApplicationFilter.setSelectedLeaveCategories(payload))
  }

  const onSelectedLeaveTypeChange = (payload: ISelectItem[]) => {
    dispatch(leaveApplicationFilter.setSelectedLeaveTypes(payload))
  }

  const onStartDateChange = (payload: Dayjs) => {
    dispatch(leaveApplicationFilter.setStartDate(payload))
  }

  const onEndDateChange = (payload: Dayjs) => {
    dispatch(leaveApplicationFilter.setEndDate(payload))
  }

  const onApplicationDateChange = (payload: Dayjs) => {
    dispatch(leaveApplicationFilter.setApplicationDate(payload))
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

  const leaveCategories = useMemo(() => {
    return selectedLeaveCategories.map((p) => Number(p.value))
  }, [selectedLeaveCategories])

  const leaveTypes = useMemo(() => {
    return selectedLeaveTypes.map((p) => Number(p.value))
  }, [selectedLeaveTypes])

  const handleGotoLeaveDetail = (leave: IGetStaffLeaves) => {
    if(isViewable){
      if (leave.id) {
        navigate(`/performance-management/staff/leave/${leave.id}`)
      }
    }else{
      toast.error('You do not have permission to view!')
    } 
  }

  const { data } = Api.useGetStaffLeavesQuery({
    limit,
    page,
    orderBy,
    orderDir,
    applicationDate: applicationDate && dayjs(applicationDate).toISOString(),
    startDate: startDate && dayjs(startDate).startOf('day').toISOString(),
    endDate: endDate && dayjs(endDate).endOf('day').toISOString(),
    leaveCategories,
    leaveTypes,
    locationIds,
    projectIds,
    roleIds,
    statuses,
    text: debouncedSearch,
  })

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Name',
      render: (item: TableData) => {
        const { staff } = item as IGetStaffLeaves
        return staff?.fullName || '-'
      },
    },
    {
      id: '',
      name: 'Role',
      render: (item: TableData) => {
        const { staff } = item as IGetStaffLeaves
        return staff?.role?.name || '-'
      },
    },
    {
      id: '',
      name: 'Application Date',
      render: (item: TableData) => {
        const { appliedAt } = item as IGetStaffLeaves
        return appliedAt
          ? dayjs(appliedAt, DATE_FORMAT_ONLY_TIME).format(DATE_FORMAT_ONLY_TIME)
          : '-'
      },
    },
    {
      id: '',
      name: 'Leave Category',
      render: (item: TableData) => {
        const { leaveCategory } = item as IGetStaffLeaves
        const info = getTaskStaffLeaveCategoryInfo(leaveCategory?.name)
        return info?.label || '-'
      },
    },
    {
      id: '',
      name: 'Leave Type',
      render: (item: TableData) => {
        const { leaveType } = item as IGetStaffLeaves
        const info = getTaskStaffLeaveTypeInfo(leaveType)
        return info?.label || '-'
      },
    },
    {
      id: '',
      name: 'Start Date',
      render: (item: TableData) => {
        const { startDate } = item as IGetStaffLeaves
        return startDate ? dayjs(startDate).format(DATE_FORMAT_WITHOUT_TIME) : '-'
      },
    },
    {
      id: '',
      name: 'End Date',
      render: (item: TableData) => {
        const { endDate } = item as IGetStaffLeaves
        return endDate ? dayjs(endDate).format(DATE_FORMAT_WITHOUT_TIME) : '-'
      },
    },
    {
      id: '',
      name: 'Day(s)',
      render: (item: TableData) => {
        return getStaffLeaveDays(item as IGetStaffLeaves)
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { status } = item as IGetStaffLeaves
        const statusInfo = getTaskStaffLeaveStatusInfo(status)
        return <CustomChip text={statusInfo?.label || '_'} type={statusInfo?.chipType || 'error'} />
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IGetStaffLeaves
        return (
          <Button
            variant='contained'
            sx={{
              bgcolor: 'grey.100',
              color: 'grey.500',
              '&:hover': { bgcolor: 'grey.200' },
            }}
            disableElevation
            onClick={() => handleGotoLeaveDetail(data)}
          >
            View
          </Button>
        )
      },
    },
  ]

  const filters: ITaskStaffLeaveListFilters = {
    search,
    projects: selectedProjects,
    locations: selectedLocations,
    roles: selectedRoles,
    statuses: selectedStatuses,
    leaveCategories: selectedLeaveCategories,
    leaveTypes: selectedLeaveTypes,
    startDate,
    endDate,
    applicationDate,
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
        <Typography variant='h3'>Staff Leave Application</Typography>
      </Stack>
      <Box sx={{ mt: 2.25 }}>
        <TaskStaffLeaveListFilterbar
          filters={filters}
          onTextChange={onTextChange}
          onLocationChange={onLocationChange}
          onProjectChange={onProjectChange}
          onRoleChange={onRoleChange}
          onStatusChange={onStatusChange}
          onSelectedLeaveCategoryChange={onSelectedLeaveCategoryChange}
          onSelectedLeaveTypeChange={onSelectedLeaveTypeChange}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onApplicationDateChange={onApplicationDateChange}
        />
      </Box>
      <Box mt={2.75}>
        <EnhancedTable
          loading={false}
          totalCount={data?.count || 0}
          data={data?.rows || []}
          page={page}
          rowsPerPage={limit}
          onPageChange={(p) => dispatch(leaveApplicationFilter.setPage(p))}
          onRowsPerPageChange={(l) => dispatch(leaveApplicationFilter.setLimit(l))}
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

export default TaskStaffLeave
