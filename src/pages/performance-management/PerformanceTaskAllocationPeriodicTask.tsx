import React, { useMemo, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import PeriodicList from '../../modules/performance-management/task-allocation/PeriodicList';
import DeleteDialog from '../../modules/common/DeleteDialog';
import ProjectPeriodicBatchUploadDialog from '../../modules/performance-management/task-allocation/ProjectPeriodicBatchUploadDialog'
import { useNavigate } from 'react-router-dom'
import { _getAuditLogsState, _getTaskAllocationPeriodicList } from '../../store/_selectors'
import { ISelectItem } from '../../types/common'
import FilterLabel from '../../modules/common/FilterLabel';
import SearchField from '../../modules/common/SearchField';
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect';
import LocationSelect from '../../modules/location/LocationSelect';
import SimpleSelect from '../../modules/common/SimpleSelect';
import { useDispatch } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { ITaskAllocationPeriodicListFilters } from '../../types/performance';
import _actions from '../../store/_actions';
import { MONTHS, ROLE_PERMISSION_KEYS } from '../../helpers/constants';
import { MoreFilters } from '../../assets/icons/more-filters';
import PeriodicListMoreFilterModal from '../../modules/performance-management/task-allocation/PeriodicListModal';
import Api from '../../api';
import { toast } from 'react-toastify';
import { Plus } from '../../assets/icons/plus';
import useAuth from '../../hooks/useAuth';


const PerformanceTaskAllocationPeriodicTask = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addPeriodicTask)) {
      setIsCreatable(true);
    }else{
      setIsCreatable(false);
    }
  
  }, []);
  const [isCreatable, setIsCreatable] = useState(true);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deletePeriodicTask)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  
  }, []);
  const [isDeletable, setIsDeletable] = useState(true);
  const actions = _actions.performanceManagements.taskAllocation
  const { pagination, filters } = _getTaskAllocationPeriodicList()

  const [openBatchUpload, setOpenBatchUpload] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openMoreFilters, setOpenMoreFilters] = useState(false)

  const debouncedSearch = useDebounce(filters.search, 500)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const taskActivityIds = useMemo(() => {
    return filters.activity.map((p) => Number(p.value))
  }, [filters.activity])

  const premiseCategoryIds = useMemo(() => {
    return filters.premises.map((p) => Number(p.value))
  }, [filters.premises])

  const handleChangeFilters = (newFilters: ITaskAllocationPeriodicListFilters) => {
    dispatch(
      actions.setFiltersForPeriodicList({
        ...filters,
        ...newFilters,
      })
    )
  }
  const handleChangeSearch = (search: string) => {
    handleChangeFilters({ ...filters, search })
  }
  const handleChangeLocations = (locations: ISelectItem[]) => {
    handleChangeFilters({ ...filters, locations })
  }
  const handleChangeProjects = (projects: ISelectItem[]) => {
    handleChangeFilters({ ...filters, projects, locations: [] })
  }
  const handleChangeMonth = (month: ISelectItem) => {
    handleChangeFilters({ ...filters, month })
  }

  const handleMoreFilters = (inFilters: ITaskAllocationPeriodicListFilters) => {
    handleChangeFilters({ ...inFilters })
    setOpenMoreFilters(false)
  }

  const handleGotoNew = () => {
    if(isCreatable){
      navigate('/performance-management/task-allocation/periodic-task/create')
    }else{
      toast.error('You do not have access to create!')
    }
  
  };

  const [batchDeleteTasks, { isLoading: isLoadingDelete }] = Api.useBatchDeleteTasksMutation()

  const {data, isLoading} = Api.useGetTaskListPeriodicQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderBy: pagination.orderBy,
    orderDir: pagination.orderDir,
    text: debouncedSearch,
    projectIds,
    locationIds,
    premiseCategoryId: premiseCategoryIds,
    taskActivityIds,
    year: Number(filters.year?.value),
    month: Number(filters.month?.value),
    ...(filters.startDate
      ? { startDate: dayjs(filters.startDate).startOf('day').toISOString() }
      : {}),
    ...(filters.startTime
      ? { startTime: dayjs(filters.startTime).format('HH:MM')}
      : {}),
  })

  const handleBatchDelete = () => {
    console.log("handleBatchDelete")
    if(isDeletable){
        batchDeleteTasks(selectedIds)
            .then(() => {
              toast.success('Tasks have been deleted')
              setOpenDeleteModal(false)
            })
            .catch((err) => {
              console.log('Failed to delete taska: ', err)
              toast.error('Failed to delete tasks')
            })
    }else{
      toast.error('You do not have access to delete!')
    }
   
  }

  return (
    <Box>
      <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center" justifyContent="space-between">
        <Stack direction="row" flexWrap="wrap" gap={3} alignItems="center">
          <Typography variant="h3">Periodic List</Typography>
          {/* {selectedIds.length > 0 && (
            <ButtonDownload
              options={[{ label: 'PDF', value: 'pdf' }, { label: 'Excel', value: 'excel' }]}
              onClick={(file) => handleDownload(file.value)}
              isLoading={false}
            >
              <DownloadLight sx={{ fontSize: 15, mr: 1.25 }} />
              {selectedIds.length ? 'Download Selected' : 'Download All'}
            </ButtonDownload>
          )} */}
          {selectedIds.length > 0 && (
            <Button variant="contained" color="error" onClick={() => setOpenDeleteModal(true)}>
              Delete Selected
            </Button>
          )}
        </Stack>
        <Stack direction="row" gap={1.5}>
          {/* <Button
            color="primary"
            variant="contained"
            size="small"
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUpload}
          >
            Batch Upload Routine Task
          </Button> */}
          <Button
            color="primary"
            variant="contained"
            onClick={handleGotoNew}
          >
            <Plus sx={{ fontSize: '12px', mr: 1 }} />
            Add Periodic Task
          </Button>
        </Stack>
      </Stack>
      <Box sx={{ borderRadius: 1.5, pt: 4.5, pb: 3.75, px: 3.75, bgcolor: '#ffffff', mt: 4 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Grid container columnSpacing={1.25} rowSpacing={1.25} flexGrow={1}>
            <Grid item xs={12} md={3}>
              <FilterLabel text='Search' />
              <SearchField
                placeholder='Search by Keyword'
                value={filters.search}
                onChange={(e) => handleChangeSearch(e.target.value)}
                sx={{
                  background: (theme) => theme.palette.grey[100],
                  minWidth: 0,
                  height: '40px',
                  justifyContent: 'center',
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FilterLabel text='Project' />
              <ProjectSelect
                hiddenLabel={true}
                selected={filters.projects}
                onChange={handleChangeProjects}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FilterLabel text='Location' />
              <LocationSelect
                hiddenLabel={true}
                selected={filters.locations}
                onChange={handleChangeLocations}
                projectIds={projectIds}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FilterLabel text='Month' />
              <SimpleSelect
                width={'100%'}
                value={filters.month}
                options={MONTHS}
                onChange={handleChangeMonth}
              />
            </Grid>
          </Grid>
          <Box>
            <FilterLabel text='More' />
            <Box
              sx={{
                display: 'flex',
                cursor: 'pointer',
                bgcolor: (theme) => theme.palette.grey[200],
                p: 1,
                borderRadius: 1.5,
              }}
              onClick={() => setOpenMoreFilters(true)}
            >
              <MoreFilters sx={{ fontSize: 23, color: (theme) => theme.palette.primary.main }} />
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box mt={4}>
        <PeriodicList
          data={data}
          loading={isLoading}
          page= {pagination.page}
          setPage= {(page) => actions.setPageForPeriodicList(page)}
          limit= {pagination.limit}
          setLimit= {(limit) => actions.setLimitForPeriodicList(limit)}
          orderBy= {pagination.orderBy}
          setOrderBy= {(orderBy) => actions.setOrderByForPeriodicList(orderBy)}
          orderDir= {pagination.orderDir}
          setOrderDir= {(orderDir) => actions.setOrderDirForPeriodicList(orderDir)}
          selected={selectedIds}
          setSelected={(ids) => setSelectedIds(ids)}
          selectedYear={filters.year ? Number(filters.year?.value) : 2024}
          selectedMonth={filters.month ? Number(filters.month?.value) : 1}
        />
      </Box>
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        heading={'Are you sure you want to delete the selected task(s)?'}
        onDelete={handleBatchDelete}
        onGoBack={() => setOpenDeleteModal(false)}
        loading={isLoadingDelete}
      />
      {/* Mockup of the batch upload dialog */}
      <div style={{ display: openBatchUpload ? 'block' : 'none' }}>Batch Upload Dialog</div>
      <ProjectPeriodicBatchUploadDialog open={openBatchUpload} onClose={() => setOpenBatchUpload(false)} />
      <PeriodicListMoreFilterModal
        open={openMoreFilters}
        filters={filters}
        onApply={handleMoreFilters}
        onClose={() => setOpenMoreFilters(false)}
      />
    </Box>
  );
};

export default PerformanceTaskAllocationPeriodicTask;
