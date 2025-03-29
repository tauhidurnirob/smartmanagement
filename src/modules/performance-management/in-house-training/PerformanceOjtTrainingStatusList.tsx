import { Box, Card, Grid, Stack } from '@mui/material'
import { IOtjOverviewRes } from '../../../types/performance-management'
import FilterLabel from '../../common/FilterLabel'
import SearchField from '../../common/SearchField'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import { useDispatch } from 'react-redux'
import { _getInhouseOjtTrainingStatusList } from '../../../store/_selectors'
import { useMemo } from 'react'
import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../../types/common'
import CustomChip from '../../common/CustomChip'
import EnhancedTable from '../../common/EnhancedTable'
import { PERFORMANCE_OJT_TRAINING_STATUS } from '../../../helpers/constants'
import MultipleSelect from '../../common/MultipleSelect'
import { actions as performanceActions } from '../../../store/slices/performanceManagements'
import useDebounce from '../../../hooks/useDebounce'
import Api from '../../../api'

// const TMP_DATA: IOtjOverviewRes[] = [
//   {
//     id: 0,
//     ojt: 'Training 1',
//     name: 'Karina Clark',
//     role: 'Cleaner',
//     project: 'MOE',
//     location: 'Nanyang Junior College',
//     completed: 1,
//     inCompleted: 2,
//     status: 'incomplete',
//   },
//   {
//     id: 1,
//     ojt: 'Training 1',
//     name: 'Karina Clark',
//     role: 'Cleaner',
//     project: 'MOE',
//     location: 'Nanyang Junior College',
//     completed: 1,
//     inCompleted: 0,
//     status: 'complete',
//   },
//   {
//     id: 2,
//     ojt: 'Training 1',
//     name: 'Karina Clark',
//     role: 'Cleaner',
//     project: 'MOE',
//     location: 'Nanyang Junior College',
//     completed: 1,
//     inCompleted: 0,
//     status: 'complete',
//   },
//   {
//     id: 3,
//     ojt: 'Training 1',
//     name: 'Karina Clark',
//     role: 'Cleaner',
//     project: 'MOE',
//     location: 'Nanyang Junior College',
//     completed: 1,
//     inCompleted: 0,
//     status: 'complete',
//   },
// ]

const getTaskStatusStatusInfo = (status: string) => {
  return PERFORMANCE_OJT_TRAINING_STATUS.find((s) => s.value === status)
}

const PerformanceOjtTrainingStatusList = () => {
  const dispatch = useDispatch()
  const { inHouseOjtTrainingStatus } = performanceActions
  const { limit, locations, orderBy, orderDir, page, projects, search, status } =
    _getInhouseOjtTrainingStatusList()

  const debouncedSearch = useDebounce(search, 500)
  const projectIds = useMemo(() => {
    return projects.map((p) => Number(p.value))
  }, [projects])

  const locationIds = useMemo(() => {
    return locations.map((p) => Number(p.value))
  }, [locations])

  const _status = (status[0]?.value || '') as string

  const { data, isLoading } = Api.useGetOtjsQuery({
    limit,
    orderBy,
    orderDir,
    page,
    text: debouncedSearch,
    locationIds,
    projectIds,
    status: _status,
  })

  const onTextChange = (payload: string) => {
    dispatch(inHouseOjtTrainingStatus.setSearch(payload))
  }

  const onLocationChange = (payload: ISelectItem[]) => {
    dispatch(inHouseOjtTrainingStatus.setSelectedLocations(payload))
  }

  const onProjectChange = (payload: ISelectItem[]) => {
    dispatch(inHouseOjtTrainingStatus.setSelectedProjects(payload))
  }

  const onStatusChange = (payload: ISelectItem[]) => {
    dispatch(inHouseOjtTrainingStatus.setStatus(payload))
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    dispatch(inHouseOjtTrainingStatus.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(inHouseOjtTrainingStatus.setOrderBy(property as keyof IOtjOverviewRes))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(inHouseOjtTrainingStatus.setLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(inHouseOjtTrainingStatus.setPage(page))
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'OJT',
      render: (item: TableData) => {
        const { id } = item as IOtjOverviewRes
        return id || '-'
      },
    },
    {
      id: '',
      name: 'Name',
      render: (item: TableData) => {
        const { ojtName } = item as IOtjOverviewRes
        return ojtName || '-'
      },
    },
    {
      id: '',
      name: 'Role',
      render: (item: TableData) => {
        const { roleName } = item as IOtjOverviewRes
        return roleName || '-'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { projectName } = item as IOtjOverviewRes
        return projectName || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { locationName } = item as IOtjOverviewRes
        return locationName || '-'
      },
    },
    {
      id: '',
      name: 'Total Completed Module',
      render: (item: TableData) => {
        // const {  } = item as IOtjOverviewRes
        return '-'
      },
    },
    {
      id: '',
      name: 'Total Incompleted Module',
      render: (item: TableData) => {
        // const {  } = item as IOtjOverviewRes
        return '-'
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { status } = item as IOtjOverviewRes
        const statusInfo = getTaskStatusStatusInfo(status)
        return <CustomChip text={statusInfo?.label || '_'} type={statusInfo?.chipType || 'error'} />
      },
    },
  ]

  return (
    <Box mt={3}>
      <Card sx={{ boxShadow: 'none', height: '100%', p: 3 }}>
        <Grid container columnSpacing={{ lg: 2, xs: 1 }} rowSpacing={{ lg: 0, xs: 2 }} flexGrow={1}>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Search' sx={{ color: 'grey.600' }} />
            <SearchField
              placeholder='Search by Keyword'
              sx={{
                backgroundColor: 'grey.100',
                minWidth: 0,
                height: '40px',
                justifyContent: 'center',
              }}
              value={search}
              onChange={(e) => onTextChange(e.target.value)}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Project' sx={{ color: 'grey.600' }} />
            <ProjectSelect hiddenLabel={true} selected={projects} onChange={onProjectChange} />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Location' sx={{ color: 'grey.600' }} />
            <LocationSelect hiddenLabel={true} selected={locations} onChange={onLocationChange} />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Status' sx={{ color: 'grey.600' }} />
            <MultipleSelect
              items={PERFORMANCE_OJT_TRAINING_STATUS}
              selectedItems={status}
              onChange={onStatusChange}
              labelForAll='All Status'
              isSingleSelect
              sx={{ '& >div > div > p': { lineHeight: 1.143 } }}
            />
          </Grid>
        </Grid>
      </Card>
      <Box mt={3}>
        <EnhancedTable
          loading={false}
          totalCount={data?.count || 0}
          data={data?.rows || []}
          page={page}
          rowsPerPage={limit}
          onPageChange={(p) => handleChangePage(p)}
          onRowsPerPageChange={(l) => handleChangeLimit(l)}
          order={orderDir}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          hasCheckbox={false}
          onSelectIdFieldName={'id'}
        />
      </Box>
    </Box>
  )
}

export default PerformanceOjtTrainingStatusList
