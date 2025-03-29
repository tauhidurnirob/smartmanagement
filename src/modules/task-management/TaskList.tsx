import { useState, FC, useEffect, useMemo } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import { DATE_FORMAT_WITHOUT_TIME } from '../../constants/common'
import CustomChip from '../common/CustomChip'
import EnhancedTable from '../common/EnhancedTable'
import { IGetOneTask, ITask, ITaskListFilters } from '../../types/task'
import { FileUploadLight } from '../../assets/icons/file-upload-light'
import { TaskCreateIcon } from '../../assets/icons/task-create'
import TaskListFilterbar from './TaskListFilterbar'
import getTaskStatusStatusInfo from '../../helpers/getTaskStatusStatusInfo'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { _getTaskListOverviewState } from '../../store/_selectors'
import _actions from '../../store/_actions'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
interface IProps {
  isPerformance?: boolean
}

const TaskList: FC<IProps> = ({ isPerformance }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const { pagination,filters } = _getTaskListOverviewState()
  const debouncedSearch = useDebounce(filters.search, 300)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
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

  const statuses = useMemo(() => {
    return filters.statuses.map((p) => Number(p.value))
  }, [filters.statuses])

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openBatchUpload, setOpenBatchUpload] = useState(false)

  const handleChangeFilters = (newFilters: ITaskListFilters) => {
    dispatch(_actions.performanceManagements.taskListOverview.setTaskListFilters({ ...filters, ...newFilters }))
  }
  const handleGotoNewTask = () => {
    // navigate('/task-management/overview/create')
  }
  const handleView = (id: number) => {
    // navigate('/task-management/overview/create')
    if(isVisible){
      navigate(`task/${id}`)
    }else{
      toast.error('You do not have access to view details!')
    }
  }
  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.performanceManagements.taskListOverview.setTaskListOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.performanceManagements.taskListOverview.setTaskListOrderBy(property as keyof IGetOneTask))
  }

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleOpenBatchUpload = () => {
    setOpenBatchUpload(true)
  }

  const { data, isLoading } = Api.useGetTaskListQuery({
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
    taskStatus: statuses
    // startDate: dayjs().startOf('month'),
    // endDate: dayjs(),
    // startTime: dayjs().startOf('day'),
    // endTime: dayjs(),
  })

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as ITask
        return project?.name
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as ITask
        return location?.name
      },
    },
    {
      id: '',
      name: 'Task Type',
      render: (item: TableData) => {
        const { taskTypes } = item as ITask
        return taskTypes || '-'
      },
    },
    {
      id: '',
      name: 'Assigned User',
      render: (item: TableData) => {
        const { taskStaffs } = item as ITask
        const userNames = taskStaffs ? taskStaffs.map((u) => u.staffName || '').join(', ') : '-'
        return userNames
      },
    },
    {
      id: '',
      name: 'Date Triggered',
      render: (item: TableData) => {
        const { startDate } = item as ITask
        return startDate ? dayjs(startDate).format(DATE_FORMAT_WITHOUT_TIME) : '-'
      },
    },
    {
      id: '',
      name: 'Date Closed',
      render: (item: TableData) => {
        const { date } = item as ITask
        return '-'
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { status } = item as ITask
        const statusInfo = getTaskStatusStatusInfo(status)
        return <CustomChip text={statusInfo?.label || '_'} type={statusInfo?.chipType || 'error'} />
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const { id } = item as ITask
        return (
          <Button
            variant='contained'
            color='inherit'
            sx={{
              backgroundColor: (theme) => theme.palette.grey[200],
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={() => {handleView(id)}}
          >
            View
          </Button>
        )
      },
    },
  ]
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.overview.viewOverviewDetails)) {
      setIsVisible(true);
    }else{
      setIsVisible(false);
    }
  }, []);
  const [isVisible, setIsVisible] = useState(true);
  const handleChangePage = (page: number) => {
    dispatch(_actions.performanceManagements.taskListOverview.setTaskListPage(page))
  }
  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.performanceManagements.taskListOverview.setTaskListLimit(limit))
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
        <Typography variant='h3'>Task List</Typography>
        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'}>
          {selectedIds.length > 0 && (
            <Button
              variant='contained'
              color='error'
              size='small'
              onClick={() => setOpenDeleteModal(true)}
            >
              Delete Selected
            </Button>
          )}
          {!isPerformance && (
            <Button
              color='primary'
              variant='contained'
              size='small'
              startIcon={<FileUploadLight />}
              onClick={handleOpenBatchUpload}
            >
              Batch Upload Tasks
            </Button>
          )}
          {!isPerformance && (
            <Button
              color='primary'
              variant='contained'
              size='small'
              startIcon={<TaskCreateIcon sx={{ color: '#4DBFFF' }} />}
              onClick={handleGotoNewTask}
            >
              Add New Task
            </Button>
          )}
        </Stack>
      </Stack>
      <Box mt={2}>
        <TaskListFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box mt={3.5}>
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
      {/* <ProjectSiteBatchUploadDialog open={openBatchUpload} onClose={handleCloseBatchUpload} /> */}
    </Box>
  )
}

export default TaskList
