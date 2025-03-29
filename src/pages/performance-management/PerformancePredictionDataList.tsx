import { Box, Button, Card, Stack, Typography } from '@mui/material'
import EnhancedTable from '../../modules/common/EnhancedTable'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { _getPredictionDataList } from '../../store/_selectors'
import { useMemo, useState } from 'react'
import _actions from '../../store/_actions'
import { IPredictionDataListFilters } from '../../types/performance'
import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { IPredictionDataItem } from '../../types/performance-management'

const PREDICTION_ITEM: IPredictionDataItem[] = [
  {
    id: 0,
    project: "TP",
    location: "Temasek Polytechnic",
    cleaners: 10,
    robots: 20
  }
]

const PerformancePredictionDataList = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { pagination, filters } = _getPredictionDataList()

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const handleChangeFilters = (newFilters: IPredictionDataListFilters) => {
    dispatch(
      _actions.performanceManagements.predictionData.setFilters({
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
      _actions.performanceManagements.predictionData.setOrderDir(isAsc ? 'desc' : 'asc')
    )
    dispatch(
      _actions.performanceManagements.predictionData.setOrderBy(
        property as keyof IPredictionDataListFilters
      )
    )
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.performanceManagements.predictionData.setLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.performanceManagements.predictionData.setPage(page))
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IPredictionDataItem
        return project || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IPredictionDataItem
        return location || '-'
      },
    },
    {
      id: '',
      name: 'Predicted No. of Cleaner(s) Required',
      render: (item: TableData) => {
        const { cleaners } = item as IPredictionDataItem
        return cleaners || '-'
      },
    },
    {
      id: '',
      name: 'Predicted No. of Robot(s) Required',
      render: (item: TableData) => {
        const { robots } = item as IPredictionDataItem
        return robots || '-'
      },
    },
    // {
    //   id: '',
    //   name: 'Action',
    //   render: (item: TableData) => {
    //     const data = item as IPredictionDataItem
    //     return (
    //       <Button
    //         variant='contained'
    //         sx={{
    //           bgcolor: 'grey.100',
    //           color: 'grey.700',
    //           '&:hover': { bgcolor: 'grey.200' },
    //         }}
    //         disableElevation
    //         onClick={() => navigate(`${data.id}`)}
    //       >
    //         View
    //       </Button>
    //     )
    //   },
    // },
  ]

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} >
        <Typography typography={'h3'} mb={3}>
        Prediction Data List
        </Typography>
      </Stack>
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
                  onChange={(e) => handleChangeFilters({...filters, search: e.target.value})}
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
            <Box flex={1}>
              <Box minWidth={'200px'}>
                <LocationSelect
                  selected={filters.locations}
                  onChange={handleChangeSelectedLocations}
                  projectIds={projectIds}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Card>
      <Box mt={3}>
        <EnhancedTable
          loading={false}
          totalCount={PREDICTION_ITEM.length}
          data={PREDICTION_ITEM}
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

export default PerformancePredictionDataList
