import { useMemo, useState, useEffect } from 'react'
import { Box, Typography, Button, Card, Stack } from '@mui/material'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { FileUploadLight } from '../../assets/icons/file-upload-light'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import { _getAuditProjectSiteState, _getTaskAllocationSLAList } from '../../store/_selectors'
import { _auditProjectSiteActions } from '../../store/slices/audit'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import EnhancedTable from '../../modules/common/EnhancedTable'
import _actions from '../../store/_actions'
import { IProjectSLAItem, ITaskAllocationSLAListFilters } from '../../types/performance'
import ProjectSLABatchUploadDialog from '../../modules/performance-management/task-allocation/ProjectSLABatchUploadDialog'
import useDebounce from '../../hooks/useDebounce'
import Api from '../../api'
import { ITaskActivitiesInfoByProject } from '../../types/task'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'

const PerformanceTaskAllocationInitSetting = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewEditInitialSettings)) {
      setIsEditable(true);
    }else{
      setIsEditable(false);
    }
  
  }, []);
  const [isEditable, setIsEditable] = useState(true);
  const { pagination, filters } = _getTaskAllocationSLAList()

  const [openBatchUpload, setOpenBatchUpload] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const debouncedSearch = useDebounce(filters.search, 500)


  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleOpenBatchUpload = () => {
    setOpenBatchUpload(true)
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleChangeFilters = (newFilters: ITaskAllocationSLAListFilters) => {
    dispatch(
      _actions.performanceManagements.taskAllocation.setFiltersForSLAList({
        ...filters,
        ...newFilters,
      })
    )
  }

  const handleChangeSelectedLocations = (locations: ISelectItem[]) => {
    handleChangeFilters({ ...filters, locations })
  }

  const handleChangeSelectedProjects = (projects: ISelectItem[]) => {
    handleChangeFilters({ ...filters, projects, locations: [] })
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(
      _actions.performanceManagements.taskAllocation.setOrderDirForSLAList(isAsc ? 'desc' : 'asc')
    )
    dispatch(
      _actions.performanceManagements.taskAllocation.setOrderByForSLAList(
        property as keyof IProjectSLAItem
      )
    )
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.performanceManagements.taskAllocation.setLimitForSLAList(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.performanceManagements.taskAllocation.setPageForSLAList(page))
  }

  const handleEdit = (data: IProjectSLAItem) => {
    if(isEditable){
      if (data?.projectId) {
        const url = `/performance-management/task-allocation/init-settings/${data?.projectId}`
        navigate(url)
      }
    }else{
      toast.error('You do not have access to edit!')
    }
    
  }

  const { data, isLoading } = Api.useGetTaskActivityListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderDir: pagination.orderDir,
    orderBy: pagination.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
  })


  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { projectName } = item as ITaskActivitiesInfoByProject
        return projectName || '-'
      },
    },
    {
      id: '',
      name: 'Total Task Activity',
      render: (item: TableData) => {
        const { totalTaskActivities } = item as ITaskActivitiesInfoByProject
        return totalTaskActivities
      },
    },
    {
      id: '',
      name: 'Total Routine Task',
      render: (item: TableData) => {
        const { routine } = item as ITaskActivitiesInfoByProject
        return routine
      },
    },
    {
      id: '',
      name: 'Total Periodic Task',
      render: (item: TableData) => {
        const { periodic } = item as ITaskActivitiesInfoByProject
        return periodic
      },
    },
    {
      id: '',
      name: 'Total Ad-Hoc Task',
      render: (item: TableData) => {
        const { adHocUrgent, adHocNonUrgent } = item as ITaskActivitiesInfoByProject
        return adHocUrgent + adHocNonUrgent
      },
    },
    {
      id: '',
      name: 'Total Automation Task',
      render: (item: TableData) => {
        const { automation } = item as ITaskActivitiesInfoByProject
        return automation
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IProjectSLAItem
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
            View Edit
          </Button>
        )
      },
    },
  ]

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: { sm: 'center', xs: 'flex-start' },
          flexDirection: { sm: 'row', xs: 'column' },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 5, rowGap: 2 }}
        >
          <Typography typography={'h3'}>Settings for Project Service Level Agreement</Typography>
        </Box>
        <Box
          sx={{
            marginLeft: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            width: { sm: 'auto', xs: '100%' },
            flexDirection: { sm: 'row', xs: 'column' },
            columnGap: 2,
            rowGap: 2,
          }}
        >
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUpload}
          >
            Import New Project SLA
          </Button>
        </Box>
      </Box>

      <Card sx={{ boxShadow: 'none', height: '100%', mt: 1.5 }}>
        <Box p={3}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
            flexWrap={'wrap'}
          >
            <Box flex={1}>
              <Box minWidth={'200px'}>
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
                  onChange={(e) => dispatch(_auditProjectSiteActions.setSearch(e.target.value))}
                />
              </Box>
            </Box>
            <Box flex={1}>
              <Box minWidth={'200px'}>
                <ProjectSelect
                  selected={filters.projects}
                  onChange={handleChangeSelectedProjects}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Card>

      <Box mt={3}>
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
      <ProjectSLABatchUploadDialog open={openBatchUpload} onClose={handleCloseBatchUpload} />
    </Box>
  )
}

export default PerformanceTaskAllocationInitSetting
