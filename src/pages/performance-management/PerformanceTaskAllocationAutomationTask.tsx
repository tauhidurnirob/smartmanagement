import { Box, Typography, Stack, Button, Paper, Grid } from '@mui/material'
import { Plus } from '../../assets/icons/plus'
import { WEEK_DATE_LIST,ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import EnhancedTable from '../../modules/common/EnhancedTable'
import { useDispatch } from 'react-redux'
import { _getTaskAllocationSLAList } from '../../store/_selectors'
import { IInHouseSopTrainingItem } from '../../types/performance-management'
import _actions from '../../store/_actions'
import Api from '../../api'
import { ETaskType, IReqTaskList } from '../../types/task'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { ITaskAllocationSLAListFilters } from '../../types/performance'
import useDebounce from '../../hooks/useDebounce'

const PerformanceTaskAllocationAutomationTask = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addAutomationTask)) {
      setIsCreatable(true);
    }else{
      setIsCreatable(false);
    }
  
  }, []);
  const [isCreatable, setIsCreatable] = useState(true);
    
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.editAutomationTask)) {
      setIsEditable(true);
    }else{
      setIsEditable(false);
    }
  
  }, []);
  const [isEditable, setIsEditable] = useState(true);

  const { pagination, filters } = _getTaskAllocationSLAList()

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const debouncedSearch = useDebounce(filters.search, 500)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const { data, error, isLoading } = Api.useGetTaskListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderBy: pagination.orderBy,
    orderDir: pagination.orderDir,
    taskTypes: ETaskType.automation,
    projectIds,
    locationIds,
    text: debouncedSearch
  })
  
  const handleChangeFilters = (newFilters: ITaskAllocationSLAListFilters) => {
    dispatch(
      _actions.performanceManagements.taskAllocation.setFiltersForSLAList({
        ...filters,
        ...newFilters,
      })
    )
  }

  const handleChangeSelectedLocations = (locations: ISelectItem[]) => {
    const tempArr = locations.map((item: any) => {
      return item.value
    })
    handleChangeFilters({ ...filters, locations })
  }

  const handleChangeSelectedProjects = (projects: ISelectItem[]) => {
    const tempArr = projects.map((item: any) => {
      return item.value
    })
    handleChangeFilters({ ...filters, projects, locations: [] })
  }

  const handleAdd = () => {
    if(isCreatable){
      navigate('/performance-management/task-allocation/automation-task/create')
    }else{
      toast.error('You do not have access to create!')
    }
  }
  const handleEdit = (id: number) => {
    if(isEditable){
      navigate('/performance-management/task-allocation/automation-task/detail', {
        state: { id },
      })
    }else{
      toast.error('You do not have access to edit!')
    }
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.performanceManagements.taskAllocation.setLimitForSLAList(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.performanceManagements.taskAllocation.setPageForSLAList(page))
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChangeFilters({ ...filters, search: e.target.value, locations: [] })
  }
  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(
      _actions.performanceManagements.taskAllocation.setOrderDirForSLAList(isAsc ? 'desc' : 'asc')
    )
    dispatch(
      _actions.performanceManagements.taskAllocation.setOrderByForSLAList(
        property as keyof IInHouseSopTrainingItem
      )
    )
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Task Activity',
      render: (item) => {
        const { taskActivity } = item as unknown as IReqTaskList
        return taskActivity?.length ? taskActivity?.[0]?.name : '-'
      },
    },
    {
      id: '',
      name: 'Premise Category',
      render: (item) => {
        const { premiseCategory } = item as unknown as IReqTaskList
        return premiseCategory ? premiseCategory.name : '-'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item) => {
        const { project } = item as unknown as IReqTaskList
        return project ? project.name : '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item) => {
        const { location } = item as unknown as IReqTaskList
        return location ? location.name : '-'
      },
    },
    {
      id: '',
      name: 'Building',
      render: (item) => {
        const { building } = item as unknown as IReqTaskList
        return building ? building.name : '-'
      },
    },
    {
      id: '',
      name: 'Level',
      render: (item) => {
        const { level } = item as unknown as IReqTaskList
        return level ? level.name : '-'
      },
    },
    {
      id: '',
      name: 'Area',
      render: (item) => {
        const { area } = item as unknown as IReqTaskList
        return area ? area.name : '-'
      },
    },
    {
      id: '',
      name: 'Unit',
      render: (item) => {
        const { unit } = item as unknown as IReqTaskList
        return unit ? unit.name : '-'
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item) => {
        const data = item as unknown as IReqTaskList
        return (
          <Button
            variant='contained'
            sx={{
              bgcolor: 'grey.100',
              color: 'grey.700',
              '&:hover': { bgcolor: 'grey.200' },
            }}
            disableElevation
            onClick={() => handleEdit(data.id)}
          >
            Edit
          </Button>
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
        <Typography variant='h3' mr={1.5}>
          Automation Task
        </Typography>
        <Button variant='contained' onClick={handleAdd}>
          <Plus sx={{ fontSize: '12px', mr: 1 }} />
          Add Automation Task
        </Button>
      </Stack>

      <Paper elevation={0} sx={{ pt: 3.3, pl: 2.63, pr: 2.63, pb: 3, mt: 4 }}>
        <Stack
          direction={{ lg: 'row', xs: 'column' }}
          alignItems='flex-start'
          justifyContent='space-between'
          columnGap={{ lg: 1.5, xs: 1 }}
          rowGap={2.5}
        >
          <Grid container columnSpacing={{ lg: 1.25, xs: 1 }} rowSpacing={{ lg: 1.25, xs: 2.5 }}>
            <Grid item md={4} sm={12}>
              <Box>
                <FilterLabel text='Search' />
                <SearchField
                  placeholder='Search by Keyword'
                  sx={{
                    backgroundColor: 'grey.100',
                    minWidth: 0,
                    height: '40px',
                    justifyContent: 'center',
                  }}
                  // value={state.search}
                  // onChange={(e) => {}}
                  onChange={(e) => handleSearch(e)}
                />
              </Box>
            </Grid>
            <Grid item md={4} sm={12}>
              <ProjectSelect selected={filters.projects} onChange={handleChangeSelectedProjects} />
            </Grid>
            <Grid item md={4} sm={12}>
              <LocationSelect
                selected={filters.locations}
                onChange={handleChangeSelectedLocations}
                projectIds={projectIds}
              />
            </Grid>
          </Grid>
        </Stack>
      </Paper>
      <Box mt={3} className='tableArrow'>
        <EnhancedTable
          loading={false}
          showFigmaBtn={true}
          totalCount={data?.count as number}
          data={data ? (data.rows as any) : []}
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
  )
}

export default PerformanceTaskAllocationAutomationTask
