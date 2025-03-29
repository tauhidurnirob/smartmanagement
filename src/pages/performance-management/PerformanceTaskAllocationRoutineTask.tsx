import { useMemo, useState, useEffect } from 'react'
import { Box, Grid, Paper, Stack, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ISelectItem } from '../../types/common'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'
import RoleSelect from '../../modules/user/RoleSelect'
import WeekDateSelect from '../../modules/performance-management/task-allocation/WeekDateSelect'
import RoutineList from '../../modules/performance-management/task-allocation/RoutineList'
import ProjectRoutineBatchUploadDialog from '../../modules/performance-management/task-allocation/ProjectRoutineBatchUploadDialog'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { _getAuditLogsState, _getTaskAllocationRoutineList } from '../../store/_selectors'
import _actions from '../../store/_actions'
import { ITaskAllocationRoutineListFilters } from '../../types/performance'
import TablePagination from '../../modules/common/TablePagination'
import { Plus } from '../../assets/icons/plus'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'

const PerformanceTaskAllocationRoutineTask = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addRoutineTask)) {
      setIsCreatable(true);
    }else{
      setIsCreatable(false);
    }
  
  }, []);
  const [isCreatable, setIsCreatable] = useState(true);
  const { pagination, filters } = _getTaskAllocationRoutineList()

  const [openBatchUpload, setOpenBatchUpload] = useState(false)

  const debouncedSearch = useDebounce(filters.search, 500)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const roleIds = useMemo(() => {
    return filters.roles.map((p) => Number(p.value))
  }, [filters.roles])

  const handleChangeFilters = (newFilters: ITaskAllocationRoutineListFilters) => {
    dispatch(
      _actions.performanceManagements.taskAllocation.setFiltersForRoutineList({
        ...filters,
        ...newFilters,
      })
    )
  }

  const handleChangeDate = (frequency: string) => {
    handleChangeFilters({ ...filters, frequency })
  }

  const handleChangeSearch = (search: string) => {
    handleChangeFilters({ ...filters, search })
  }

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleChangeSelectedLocations = (locations: ISelectItem[]) => {
    handleChangeFilters({ ...filters, locations })
  }

  const handleChangeSelectedProjects = (projects: ISelectItem[]) => {
    handleChangeFilters({ ...filters, projects, locations: [] })
  }

  const handleChangeRole = (roles: ISelectItem[]) => {
    handleChangeFilters({ ...filters, roles })
  }

  const handleGotoNew = () => {
    if(isCreatable){
      navigate('/performance-management/task-allocation/routine-task/create')
    }else{
      toast.error('You do not have access to create!')
    }
  }

  const { data, isLoading } = Api.useGetTaskListRoutineQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderBy: pagination.orderBy,
    orderDir: pagination.orderDir,
    text: debouncedSearch,
    projectIds,
    locationIds,
    roleIds,
    frequency: filters.frequency
  })

  return (
    <Box>
      <Stack
        direction={'row'}
        flexWrap={'wrap'}
        gap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} flexWrap={'wrap'} gap={1.5} alignItems={'center'}>
          <Typography variant='h3' mr={1.5}>
            Routine Task{' '}
          </Typography>
        </Stack>
        <Stack direction={'row'} gap={1.5}>
          {/* <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUpload}
          >
            Batch Upload Routine Task
          </Button> */}
          <Button
            color='primary'
            variant='contained'
            onClick={handleGotoNew}
          >
            <Plus sx={{ fontSize: '12px', mr: 1 }} />
            Add Routine Task
          </Button>
        </Stack>
      </Stack>
      <Paper elevation={0} sx={{ p: 2, mt: 4 }}>
        <Stack
          direction={{ lg: 'row', xs: 'column' }}
          alignItems='flex-start'
          justifyContent='space-between'
          columnGap={{ lg: 1.5, xs: 1 }}
          rowGap={2.5}
        >
          <Grid container columnSpacing={{ lg: 1.25, xs: 1 }} rowSpacing={{ lg: 1.25, xs: 2.5 }}>
            <Grid item md={3} sm={12}>
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
                value={filters.search}
                onChange={(e) => handleChangeSearch(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={3} sm={12}>
              <ProjectSelect selected={filters.projects} onChange={handleChangeSelectedProjects} />
            </Grid>
            <Grid item md={3} sm={12}>
              <LocationSelect
                selected={filters.locations}
                onChange={handleChangeSelectedLocations}
                projectIds={projectIds}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <FilterLabel text='Role' />
              <RoleSelect
                hiddenLabel={true}
                selected={filters.roles as ISelectItem[]}
                onChange={handleChangeRole}
                textColor={'grey.800'}
              />
            </Grid>
          </Grid>
        </Stack>
      </Paper>
      <Stack direction='row' justifyContent={'flex-end'} mt={3}>
        <WeekDateSelect selected={filters.frequency} onChange={handleChangeDate} />
      </Stack>

      <Box mt={4}>
        <RoutineList
          data={data}
          isLoading={isLoading}
        />
        <Box>
          <TablePagination
            count={data?.count || 0}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onPageChange={(v) => {
              dispatch(_actions.performanceManagements.taskAllocation.setPageForRoutineList(v))
            }}
            onRowsPerPageChange={(v) => {
              dispatch(_actions.performanceManagements.taskAllocation.setLimitForRoutineList(v))
            }}
          />
        </Box>
      </Box>
      <ProjectRoutineBatchUploadDialog open={openBatchUpload} onClose={handleCloseBatchUpload} />
    </Box>

  )
}

export default PerformanceTaskAllocationRoutineTask

