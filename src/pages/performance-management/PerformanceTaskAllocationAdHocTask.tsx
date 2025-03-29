import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Box, Typography, Stack, Button, Paper, Grid } from '@mui/material'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'
import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import EnhancedTable from '../../modules/common/EnhancedTable'
import { IAdhocTask } from '../../types/performance-management'
import TaskBatchUploadDialog from './TaskBatchUploadDialog'
import { _getTaskAllocationAdhockList } from '../../store/_selectors'
import _actions from '../../store/_actions'
import Api from '../../api'
import DeleteDialog from '../../modules/common/DeleteDialog'
import { toast } from 'react-toastify'
import { ITaskAllocationSLAListFilters } from '../../types/performance'
import useDebounce from '../../hooks/useDebounce'
import { ITask } from '../../types/task'
import { Plus } from '../../assets/icons/plus'
import useAuth from '../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'

const PerformanceTaskAllocationAdHocTask = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addAdHocTask)) {
      setIsCreatable(true);
    }else{
      setIsCreatable(false);
    }
  
  }, []);
  const [isCreatable, setIsCreatable] = useState(true);
  
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewEditAdHocTask)) {
      setIsEditable(true);
    }else{
      setIsEditable(false);
    }
  
  }, []);
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deleteAdHocTask)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  
  }, []);
  const [isDeletable, setIsDeletable] = useState(true);
  const [selected, setSelected] = useState<number[]>([])
  const [openBatchUpload, setOpenBatchUpload] = useState(false)
  const [openMultidelete, setOpenMultiDelete] = useState(false)

  const { pagination, filters } = _getTaskAllocationAdhockList()

  const debouncedSearch = useDebounce(filters.search, 500)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const handleChangeFilters = (newFilters: ITaskAllocationSLAListFilters) => {
    dispatch(
      _actions.performanceManagements.taskAllocation.setFiltersForAdhockList({
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

  const { data, isLoading } = Api.useGetAdHocTaskListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderDir: pagination.orderDir,
    text: debouncedSearch,
    projectIds,
    locationIds,
  })

  const dataForTable: IAdhocTask[] = data?.rows
    ? data.rows.map((d: any) => {
        return {
          id: d.id,
          activity: d.taskTypes,
          category: d.premiseCategory?.name || '',
          frequency: d.frequency || '',
          location: d.remark || '',
          user: d.remark || '',
          project: d.assignArea || '',
          startDate: d.startDate || '',
        }
      })
    : []

  const handleSelect = (selected: number[]) => {
    setSelected(selected)
  }

  const handleEdit = (data: IAdhocTask) => {
    if(isEditable){
      navigate(`/performance-management/task-allocation/ad-hoc-task/${data.id}`)
    }else{
      toast.error('You do not have access to edit!')
    }
 
  }

  const handleDelete = (data: IAdhocTask) => {
    // setDeleteScheduleId(data.id)
  }
  
  const handleCreate = () => {
    if(isCreatable){
      navigate('create')
    }else{
      toast.error('You do not have access to create!')
    } 
  }
  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(
      _actions.performanceManagements.taskAllocation.setOrderDirForAdhockList(isAsc ? 'desc' : 'asc')
    )
    dispatch(
      _actions.performanceManagements.taskAllocation.setOrderByForAdhockList(
        property as keyof ITask
      )
    )
  }

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleOpenBatchUpload = () => {
    setOpenBatchUpload(true)
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.performanceManagements.taskAllocation.setPageForSLAList(page))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.performanceManagements.taskAllocation.setLimitForSLAList(limit))
  }

  const [batchDeleteTasks, { isLoading: isLoadingDelete }] = Api.useBatchDeleteTasksMutation()

  const setDeleteMultipleModalOn = () => {
    if(isDeletable){
      setOpenMultiDelete(true)
    }else{
      toast.error('You do not have access to delete!')
    } 
    
  }
  const handleBatchDelete = () => {
    batchDeleteTasks(selected)
    .then(() => {
      toast.success('Tasks have been deleted')
      setOpenMultiDelete(false)
    })
    .catch((err) => {
      console.log('Failed to delete tasks: ', err)
      toast.error('Failed to delete tasks')
    })
  }

  const headCells: ITableHeadCell[] = [
    {
      id: 'taskAcitivity',
      name: 'Task Activity',
      render: (item: TableData) => {
        const { activity } = item as IAdhocTask
        return activity
      },
    },
    {
      id: 'premiseCategory',
      name: 'Premise Category',
      render: (item: TableData) => {
        const { category } = item as IAdhocTask
        return category
      },
    },
    {
      id: '',
      name: 'Frequency',
      render: (item: TableData) => {
        const { frequency } = item as IAdhocTask
        return frequency || '_'
      },
    },
    {
      id: '',
      name: 'StartDate',
      render: (item: TableData) => {
        const { startDate } = item as IAdhocTask
        return startDate || '_'
      },
    },
    // {
    //   id: '',
    //   name: 'Assigned User',
    //   render: (item: TableData) => {
    //     const { user } = item as IAdhocTask
    //     return user
    //   },
    // },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IAdhocTask
        return (
          <Button
            variant='contained'
            sx={{
              bgcolor: 'grey.100',
              color: 'grey.700',
              '&:hover': { bgcolor: 'grey.200' },
            }}
            disableElevation
            onClick={() => handleEdit(data)}
          >
            View/Edit
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
        <Stack direction={'row'} flexWrap={'wrap'} gap={1.5} alignItems={'center'}>
          <Typography variant='h3' mr={1.5}>
            Ad-Hoc Task{' '}
          </Typography>
          {/* {data && data?.count > 0 && (
            <ButtonDownload
              options={DOWNLOAD_FILE_TYPES}
              onClick={(file) => handleDownload(file.value as TDownloadFileFormat)}
              isLoading={downloadLoading}
            >
              <DownloadLight sx={{ fontSize: 15, mr: 1.25 }} />
              {!selected.length ? 'Download All' : 'Download Selected'}
            </ButtonDownload>
          )} */}
          {!!selected?.length && (
            <Button variant='contained' color='error' onClick={() => setDeleteMultipleModalOn()}>
              Delete Selected
            </Button>
          )}
        </Stack>
        <Stack direction={'row'} gap={1.5}>
          {/* <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUpload}
          >
            Batch Upload Ad-Hoc Task
          </Button> */}
          <Button
            color='primary'
            variant='contained'
            onClick={handleCreate}
          >
            <Plus sx={{ fontSize: '12px', mr: 1 }} />
            Add Ad-Hoc Task
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
                  onChange={(e) => handleChangeSearch(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={4} sm={12}>
              <ProjectSelect selected={filters.projects} onChange={handleChangeProjects} />
            </Grid>
            <Grid item md={4} sm={12}>
              <LocationSelect
                selected={filters.locations}
                onChange={handleChangeLocations}
                projectIds={projectIds}
              />
            </Grid>
          </Grid>
        </Stack>
      </Paper>
      <Box mt={3.5}>
        <EnhancedTable
          loading={isLoading}
          totalCount={dataForTable?.length || 0}
          data={dataForTable || []}
          page={pagination.page}
          rowsPerPage={pagination.limit}
          onPageChange={(p) => handleChangePage(p)}
          onRowsPerPageChange={(l) => handleChangeLimit(l)}
          order={pagination.orderDir}
          orderBy={pagination.orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          hasCheckbox={true}
          selected={selected}
          onSelect={handleSelect}
          onSelectIdFieldName={'id'}
        />
      </Box>
      <TaskBatchUploadDialog open={openBatchUpload} onClose={handleCloseBatchUpload} />
      <DeleteDialog
        open={openMultidelete}
        onClose={() => setOpenMultiDelete(false)}
        heading={'Are you sure you want to delete?'}
        subHeading={''}
        onDelete={handleBatchDelete}
        onGoBack={() => setOpenMultiDelete(false)}
        loading={isLoadingDelete}
      />
    </Box>
  )
}

export default PerformanceTaskAllocationAdHocTask
