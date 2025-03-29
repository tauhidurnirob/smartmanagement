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
}

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
          </TableCell>
        )}
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            variant='head'
            sx={{ color: 'text.primary', ...headCell.tableHeaderCellSx }}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              borderRight: '0px solid #fff',
              ...(index && index > 6 && { borderRight: '1px solid #ddd'}),
              ...(index === 7 && { borderRight: '2px solid #000' }),
            }}
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

const PeriodicTable: FC<IEnhancedTableProps> = (props) => {
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
                        <Checkbox
                          color='primary'
                          checked={selected.includes((item as any)[onSelectIdFieldName])}
                          onClick={() => {
                            handleSelect((item as any)[onSelectIdFieldName])
                          }}
                        />
                      </TableCell>
                    )}
                  {headCells.map((cell, index) => {
                    const { tableCellSx, disablePadding, render } = cell
                    return (
                      <TableCell
                        key={index}
                        padding={disablePadding ? 'none' : 'normal'}
                        sx={{ ...tableCellSx }}
                        style={{
                          borderRight: '0px solid #fff',
                          ...(index && index > 6 && { borderRight: '1px solid #ddd', padding: '4px' }),
                          ...(index === 7 && { borderRight: '2px solid #000', }),
                        }}
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

export default PeriodicTable
