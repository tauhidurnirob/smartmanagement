import { FC } from 'react'
import { visuallyHidden } from '@mui/utils'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'

import BackDrop from '../common/BackDrop'
import { styled } from '@mui/material/styles'
import TablePagination from './TablePagination'
import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from '../../types/common'

// Optional, if checkbox exists
interface ICheckboxProps {
  hasCheckbox: boolean
  onSelectIdFieldName: TableDataFieldName
  selected: number[]
  onSelect: (v: number[]) => void
}

interface IPagination {
  totalCount: number
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
}

interface IHeader {
  headCells: ITableHeadCell[]
  order: OrderDirection
  orderBy: string
  onRequestSort: (event: React.MouseEvent<unknown>, property: TableDataFieldName) => void
}

interface IEnhancedTableProps extends Partial<ICheckboxProps>, IPagination, IHeader {
  data: TableData[]
  loading: boolean
  sx?: object
  hiddenPagination?: boolean
  showFigmaBtn?: boolean
}
const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16,22,26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#3699FF' : '#f5f8fa',
}))
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#3699FF',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  boxShadow: 'inset 0 0 0 1px rgba(54, 153, 255,.2), inset 0 -1px 0 rgba(54, 153, 255,.1)',
  'input:hover ~ &': {
    backgroundColor: '#3699FF',
  },
})
const BpIndeterminateIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 20,
  height: 20,
  backgroundColor: '#3699FF',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(54, 153, 255,.2), inset 0 -1px 0 rgba(54, 153, 255,.1)',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(54, 153, 255,.6)',
    outlineOffset: 2,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(54, 153, 255,.5)',
  },
  '&::before': {
    content: '""',
    display: 'block',
    width: '30%',
    height: 2,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '50%',
    left: '35%',
    transform: 'translateY(-50%)',
  },
}))

const EnhancedTableHead: FC<IEnhancedTableProps> = (props) => {
  const {
    data,
    selected,
    onSelectIdFieldName,
    hasCheckbox,
    order,
    orderBy,
    headCells,
    onSelect,
    onRequestSort,
    showFigmaBtn,
  } = props

  const totalCount = data?.length || 0
  const numSelected = selected?.length || 0

  const createSortHandler =
    (property: TableDataFieldName) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
      onSelect ? onSelect([]) : ''
    }

  const handleSelectAll = (selectAll: boolean) => {
    if (!onSelect || !onSelectIdFieldName) return

    if (selectAll) {
      onSelect(data.map((v) => (v as any)[onSelectIdFieldName]))
    } else {
      onSelect([])
    }
  }

  return (
    <TableHead>
      <TableRow sx={{ background: '#F5F8FA50' }}>
        {hasCheckbox && (
          <TableCell padding='checkbox'>
            {showFigmaBtn ? (
              <Checkbox
                color='primary'
                indeterminate={numSelected > 0 && numSelected < totalCount}
                indeterminateIcon={<BpIndeterminateIcon />}
                checked={totalCount > 0 && numSelected === totalCount}
                onChange={(e) => {
                  handleSelectAll(e.target.checked)
                }}
                icon={<BpIcon />}
                checkedIcon={<BpCheckedIcon />}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            ) : (
              <Checkbox
                color='primary'
                indeterminate={numSelected > 0 && numSelected < totalCount}
                checked={totalCount > 0 && numSelected === totalCount}
                onChange={(e) => {
                  handleSelectAll(e.target.checked)
                }}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            )}
          </TableCell>
        )}
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            variant='head'
            sx={{ color: 'text.primary', ...headCell.tableHeaderCellSx }}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id as any)}
                IconComponent={ExpandMoreIcon}
                sx={{
                  width: '100%',
                  display: 'flex',
                }}
              >
                {headCell.name}
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
            {!headCell.id && headCell.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const EnhancedTable: FC<IEnhancedTableProps> = (props) => {
  const {
    data,
    totalCount,
    loading,
    headCells,
    page,
    rowsPerPage,
    sx,
    hasCheckbox,
    selected,
    onSelectIdFieldName,
    onSelect,
    onPageChange,
    onRowsPerPageChange,
    hiddenPagination,
    showFigmaBtn,
  } = props

  const handleSelect = (id: number) => {
    if (!onSelect) return
    if (selected?.includes(id)) {
      onSelect(selected?.filter((itemId) => itemId !== id) || [])
    } else {
      onSelect([id, ...(selected || [])])
    }
  }

  return (
    <Box position='relative' sx={{ ...(sx || {}) }}>
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '12px' }}>
        <Table>
          <EnhancedTableHead {...props} />
          <TableBody>
            {data?.map((item, index) => {
              return (
                <TableRow key={index}>
                  {hasCheckbox &&
                    onSelectIdFieldName &&
                    onSelect !== undefined &&
                    selected && (
                      <TableCell padding='checkbox'>
                        {showFigmaBtn ? (
                          <Checkbox
                            color='primary'
                            checked={selected.includes((item as any)[onSelectIdFieldName])}
                            onClick={() => {
                              handleSelect((item as any)[onSelectIdFieldName])
                            }}
                            icon={<BpIcon />}
                            checkedIcon={<BpCheckedIcon />}
                          />
                        ) : (
                          <Checkbox
                            color='primary'
                            checked={selected.includes((item as any)[onSelectIdFieldName])}
                            onClick={() => {
                              handleSelect((item as any)[onSelectIdFieldName])
                            }}
                          />
                        )}
                      </TableCell>
                    )}
                  {headCells.map((cell, index) => {
                    const { tableCellSx, disablePadding, render } = cell
                    return (
                      <TableCell
                        key={index}
                        padding={disablePadding ? 'none' : 'normal'}
                        sx={{ ...tableCellSx }}
                      >
                        {render ? (
                          render(item)
                        ) : (
                          <Typography variant='caption' color='textSecondary'>
                            -
                          </Typography>
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {loading ? (
          <Box sx={{ position: 'relative', height: '60px' }}>
            <BackDrop />
          </Box>
        ) : !data?.length ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Typography color='textSecondary' variant='h6'>
              No Available Records
            </Typography>
          </Box>
        ) : null}
      </TableContainer>
      {!hiddenPagination && (
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          count={totalCount}
          onPageChange={(v) => {
            onPageChange(v)
            onSelect ? onSelect([]) : ''
          }}
          onRowsPerPageChange={(v) => {
            onRowsPerPageChange(v)
            onSelect ? onSelect([]) : ''
          }}
          sx={{ mt: 3 }}
        />
      )}
    </Box>
  )
}

export default EnhancedTable
