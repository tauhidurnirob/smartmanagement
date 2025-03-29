import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Box, Typography, Button } from '@mui/material'

import { IRatingTemplate } from '../../../types/audit'
import SearchField from '../../common/SearchField'
import EnhancedTable from '../../common/EnhancedTable'
import { ROW_PER_PAGE_OPTIONS } from '../../../constants/common'
import {
  ITableHeadCell,
  OrderDirection,
  TableData,
  TableDataFieldName,
} from '../../../types/common'
import AuditRatingStyleDialog from './AuditRatingStyleDialog'
import Api from '../../../api'
import useDebounce from '../../../hooks/useDebounce'
import DeleteDialog from '../../common/DeleteDialog'
import { AUDIT_RATING_STYLES } from '../../../helpers/constants'

const handleSearchWithStyle = (search: string) => {
  const style = AUDIT_RATING_STYLES.find((f) => f.label.toLowerCase() === search.toLowerCase())
  if (style) {
    return style.value
  }
  return search
}

const AuditRatingTemplateList: FC = ({}) => {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [page, setPage] = useState(1)
  const [orderDir, setOrderDir] = useState<OrderDirection>('desc')
  const [orderBy, setOrderBy] = useState('createdAt')
  const [selected, setSelected] = useState<number[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogData, setDialogData] = useState<IRatingTemplate | undefined>()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading, refetch } = Api.useGetAuditRatingTemplateListQuery({
    page,
    limit,
    orderBy,
    orderDir,
    text: handleSearchWithStyle(debouncedSearch) as string,
  })
  const [deleteMultiple, { isLoading: deleteMultipleLoading }] =
    Api.useDeleteMultipleAuditRatingTemplateMutation()
  const [deleteRating, { isLoading: deleteLoading }] =
    Api.useDeleteAuditRatingTemplateByIdMutation()

  const handleOpenDeleteTemplate = () => {
    setOpenDeleteDialog(true)
  }

  const handleAddNewTemplate = () => {
    navigate('/audit/audit-form-template/rating-template/create')
  }

  const handleView = (data: IRatingTemplate) => {
    // TODO: edit rating template
    setDialogData(data)
    setOpenDialog(true)
  }

  const handleDelete = (data: IRatingTemplate) => {
    deleteRating(data?.id as number)
      .then(() => {
        toast.success('Deleted successfully')
        refetch()
        setOpenDeleteDialog(false)
        setSelected([])
      })
      .catch((err) => {
        console.log('Failed to delete: ', err)
        toast.error('Failed to delete')
      })
  }
  const handleDeleteMultiple = () => {
    deleteMultiple(selected)
      .then(() => {
        toast.success('Deleted successfully')
        refetch()
        setOpenDeleteDialog(false)
        setSelected([])
      })
      .catch((err) => {
        console.log('Failed to delete: ', err)
        toast.error('Failed to delete')
      })
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as keyof IRatingTemplate)
  }

  const handleSelect = (selected: number[]) => {
    setSelected(selected)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const headCells: ITableHeadCell[] = [
    {
      id: 'inspectionUnit',
      name: 'Rating Inspection Unit',
      render: (item: TableData) => {
        const { inspectionUnit } = item as IRatingTemplate
        return inspectionUnit
      },
    },
    // {
    //   id: 'numberOfRating',
    //   name: 'Number of rating',
    //   render: (item: TableData) => {
    //     const { numberOfRating, style, ratingStart, ratingEnd } = item as IRatingTemplate
    //     return style === AUDIT_RATING_STYLES[0].value ? ((ratingEnd as number) - (ratingStart as number) + 1) : numberOfRating
    //   },
    // },
    {
      id: 'style',
      name: 'Rating Style',
      render: (item: TableData) => {
        const { style } = item as IRatingTemplate
        return AUDIT_RATING_STYLES.find((f) => f.value === style)?.label ?? ''
        // return style
      },
    },
    {
      id: '',
      name: 'Rating Start',
      render: (item: TableData) => {
        const { ratingStart, style, mapping } = item as IRatingTemplate
        return style === AUDIT_RATING_STYLES[0].value ? ratingStart : mapping?.[0].label || '_'
      },
    },
    {
      id: '',
      name: 'Rating End',
      render: (item: TableData) => {
        const { ratingEnd, style, mapping } = item as IRatingTemplate
        return style === AUDIT_RATING_STYLES[0].value
          ? ratingEnd
          : mapping?.[mapping.length - 1].label || '_'
      },
    },
    {
      id: 'remarks',
      name: 'Remarks',
      render: (item: TableData) => {
        const { remark } = item as IRatingTemplate
        return remark
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IRatingTemplate
        return (
          <Button
            variant='contained'
            sx={{
              background: (theme) => theme.palette.grey[100],
              color: (theme) => theme.palette.grey[700],
              '&:hover': { background: (theme) => theme.palette.grey[200] },
            }}
            disableElevation
            onClick={() => handleView(data)}
          >
            View
          </Button>
        )
      },
    },
  ]

  return (
    <Box sx={{ borderRadius: 1.5, pt: 4.5, pb: 3.75, px: 3.75, bgcolor: '#ffffff' }}>
      <Box
        sx={{
          background: '#ffffff',
          borderRadius: 1.5,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 2,
          width: '100%',
        }}
      >
        <Box display={'flex'} alignItems={'flex-end'}>
          <Box display={'flex'} sx={{ mt: 0 }} alignItems={'center'}>
            <Typography
              typography='h4'
              sx={{ fontWeight: 500, mr: 1, color: (theme) => theme.palette.grey[600] }}
            >
              Search
            </Typography>
            <SearchField
              placeholder='Search by Keyword'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                background: (theme) => theme.palette.grey[100],
                minWidth: 0,
                height: '40px',
                justifyContent: 'center',
              }}
            />
          </Box>
        </Box>
        <Box display={'flex'} gap={1.75} sx={{ py: 0 }}>
          {selected?.length > 0 && (
            <Button variant='contained' color='error' onClick={handleOpenDeleteTemplate}>
              Delete Template
            </Button>
          )}
          <Button variant='contained' color='primary' onClick={handleAddNewTemplate}>
            Add New Rating Template
          </Button>
        </Box>
      </Box>

      <Box mt={3.5}>
        <EnhancedTable
          loading={isLoading}
          totalCount={data?.count || 0}
          data={data?.rows || []}
          page={page}
          rowsPerPage={limit}
          onPageChange={(p) => setPage(p)}
          onRowsPerPageChange={(l) => setLimit(l)}
          order={orderDir}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          hasCheckbox={true}
          selected={selected}
          onSelect={handleSelect}
          onSelectIdFieldName={'id'}
        />
      </Box>
      <AuditRatingStyleDialog open={openDialog} onClose={handleCloseDialog} data={dialogData} />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        heading={'Are you sure you want to delete?'}
        onDelete={() => handleDeleteMultiple()}
        onGoBack={() => setOpenDeleteDialog(false)}
        loading={deleteMultipleLoading}
      />
    </Box>
  )
}

export default AuditRatingTemplateList
