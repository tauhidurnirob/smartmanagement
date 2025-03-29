import { Box, Button, Stack, Typography } from '@mui/material'
import { PaperPencilIcon } from '../../assets/icons/PaperPencil'
import FormTemplateListFilterbar from '../../modules/feedback/form-template/FormTemplateListFilterbar'
import { useState } from 'react'
import { IFeedbackFormTemplate, IFeedbackFormTemplateListFilters } from '../../types/feedback'
import ListOptionButton from '../../modules/common/ListOptionButton'
import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from '../../types/common'
import EnhancedTable from '../../modules/common/EnhancedTable'
import { ROW_PER_PAGE_OPTIONS } from '../../helpers/constants'
import { tmpFeedbackFormTemplates } from '../../modules/feedback/overview/dummy'
import { useNavigate } from 'react-router-dom'

const FeedbackFormTemplate = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [filters, setFilters] = useState<IFeedbackFormTemplateListFilters>({
    search: '',
    projects: [],
    locations: [],
    types: [],
  })

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as any)
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Name',
      render: (item: TableData) => {
        const { name } = item as IFeedbackFormTemplate
        return name
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IFeedbackFormTemplate
        return project.name
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IFeedbackFormTemplate
        return location.name
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IFeedbackFormTemplate
        return location.name
      },
    },
    {
      id: '',
      name: 'Type',
      render: (item: TableData) => {
        const { type } = item as IFeedbackFormTemplate
        return type
      },
    },
    {
      id: '',
      name: 'Feedback Response Rate',
      render: (item: TableData) => {
        const { responseRate } = item as IFeedbackFormTemplate
        return responseRate
      },
    },
    {
      id: '',
      name: 'Updated At',
      render: (item: TableData) => {
        const { updatedAt } = item as IFeedbackFormTemplate
        return updatedAt
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IFeedbackFormTemplate
        return (
          <ListOptionButton
            list={[
              { title: 'View & Edit', onClick: () => navigate(`${data.id}`) },
              { title: 'Duplicate Form', onClick: () => null },
              { title: 'Download', onClick: () => null },
              // { title: 'Delete', onClick: () => handleDelete(data) },
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        overflow='wrap'
        gap={2}
        mb={4}
      >
        <Stack direction='row' alignItems='center' gap={2} overflow='wrap'>
          <Typography variant='h3'>Feedback Form Template</Typography>
          <Button variant='contained' color='green' onClick={() => navigate('rating-view')}>
            View All Rating Template
          </Button>
        </Stack>
        <Stack direction='row' alignItems='center' gap={2} flexWrap='wrap'>
          {/* {selected.length > 0 && (
            <Button variant='contained' color='error' onClick={() => setDeleteDialog(true)}>
              Delete Selected
            </Button>
          )} */}
          <Button
            variant='contained'
            color='primary'
            sx={{ fontWeight: '700' }}
            startIcon={<PaperPencilIcon fontSize='small' />}
            onClick={() => navigate('create')}
          >
            Add New Feedback Template
          </Button>
        </Stack>
      </Stack>
      <FormTemplateListFilterbar filters={filters} onChange={(val) => setFilters(val)} />
      <Box mt={3.5}>
        <EnhancedTable
          loading={false}
          totalCount={tmpFeedbackFormTemplates?.length || 0}
          data={tmpFeedbackFormTemplates as any}
          page={page}
          rowsPerPage={limit}
          onPageChange={(p) => setPage(p)}
          onRowsPerPageChange={(l) => setLimit(l)}
          order={orderDir}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          hasCheckbox={false}
        />
      </Box>
    </Box>
  )
}

export default FeedbackFormTemplate
