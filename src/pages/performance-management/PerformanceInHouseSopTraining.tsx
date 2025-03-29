import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { Plus } from '../../assets/icons/plus'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import { useDispatch } from 'react-redux'
import { _getInHouseSopTrainingList, _inHouseSopTrainingList } from '../../store/_selectors'
import { useState, useEffect } from 'react'
import _actions from '../../store/_actions'
import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { IInHouseSopTrainingItem, ISopTraining } from '../../types/performance-management'
import EnhancedTable from '../../modules/common/EnhancedTable'
import { useNavigate } from 'react-router-dom'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import useAuth from '../../hooks/useAuth';
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants';
import { toast } from 'react-toastify';

const PerformanceInHouseSopTraining = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { user } = useAuth(); 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.addSOPCleaningProcesses)) {
      setIsCreatable(true);
    }else{
      setIsCreatable(false);
    }
  
  }, []);
  const [isCreatable, setIsCreatable] = useState(true);

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.editSOPCleaningProcesses)) {
      setIsEditable(true);
    }else{
      setIsEditable(false);
    }
  
  }, []);
  const [isEditable, setIsEditable] = useState(true);
  const { limit, orderBy, orderDir, page, search } = _getInHouseSopTrainingList()

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const debouncedSearch = useDebounce(search, 500)

  const { data } = Api.useGetSopsQuery({
    limit,
    page,
    orderBy,
    orderDir,
    text: debouncedSearch,
  })

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    dispatch(_actions.performanceManagements.inHouseSopTraining.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(
      _actions.performanceManagements.inHouseSopTraining.setOrderBy(
        property as keyof IInHouseSopTrainingItem
      )
    )
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.performanceManagements.inHouseSopTraining.setLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.performanceManagements.inHouseSopTraining.setPage(page))
  }

  const handleChangeSearch = (search: string) => {
    dispatch(_actions.performanceManagements.inHouseSopTraining.setSearch(search))
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }
  const handleCreate = () => {
    if(isCreatable){
      navigate('create')
    }else{
      toast.error('You do not have access to create!')
    }
  }
  
  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'SOP Name',

      render: (item: TableData) => {
        const { sopName } = item as ISopTraining
        return sopName || '-'
      },
    },
    {
      id: '',
      name: 'Content Description',

      render: (item: TableData) => {
        const { remark } = item as ISopTraining
        return remark || '-'
      },
    },
    {
      id: '',
      name: 'Estimated Learning Duration',

      render: (item: TableData) => {
        const { timeTakenSop } = item as ISopTraining
        return timeTakenSop || '-'
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as ISopTraining
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
            View/Edit
          </Button>
        )
      },
    },
  ]
  const handleEdit = (id: number) => {
    if(isEditable){
      navigate(`${id}`)
    }else{
      toast.error('You do not have access to edit!')
    }
  }
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography typography={'h3'} mb={3}>
          SOP (Cleaning Processes)
        </Typography>
        <Box>
          <Button variant='contained' color='primary' onClick={handleCreate}>
            <Plus sx={{ fontSize: '12px', mr: 1 }} />
            Add New SOP
          </Button>
        </Box>
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
                  value={search}
                  onChange={(e) => handleChangeSearch(e.target.value)}
                />
              </Box>
            </Box>
            {/* <Box flex={1}>
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
            </Box> */}
          </Stack>
        </Box>
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
          hasCheckbox={true}
          selected={selectedIds}
          onSelect={handleSelect}
          onSelectIdFieldName={'id'}
        />
      </Box>
    </Box>
  )
}

export default PerformanceInHouseSopTraining
