import { FC, useMemo } from 'react'
import { Box, Pagination, Typography, SelectChangeEvent, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CommonSelect from './CommonSelect'
import { ROW_PER_PAGE_OPTIONS } from '../../constants/common'

/**
 * Common pagination used in Table
 *
 * @param count: number, count of total entries in table
 * @param rowsPerPage: number, from ROW_PER_PAGE_OPTIONS
 * @param page: number, start at 1
 * @param sx: object,
 * @param onPageChange: function
 * @param onRowsPerPageChange: function
 * @returns
 */
const TablePagination: FC<{
  count: number
  rowsPerPage: number
  rowsPerPageOptions?: number[]
  page: number
  sx?: object
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}> = ({ count, rowsPerPage, page, sx, onPageChange, onRowsPerPageChange, rowsPerPageOptions }) => {
  const { startIndex, endIndex, totalPageCount } = useMemo(() => {
    const startIndex = count > 0 ? rowsPerPage * Math.max(page - 1, 0) + 1 : 0
    const endIndex = Math.min(rowsPerPage * page, count)
    const totalPageCount = Math.ceil(count / (rowsPerPage || 1))

    return {
      startIndex,
      endIndex,
      totalPageCount,
    }
  }, [page, rowsPerPage, count])

  const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
    onRowsPerPageChange(Number(event.target.value))
  }

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page)
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: { sm: 'space-between', xs: 'center' },
        alignItems: 'center',
        ...(sx || {}),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='subtitle2' sx={{ color: '#5E6278' }}>
          Showing {startIndex} to {endIndex} of {count} entries
        </Typography>
        <CommonSelect
          value={rowsPerPage.toString()}
          onChange={handleChangeRowsPerPage}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          size='small'
          sx={{
            ml: 1.25,
            '& .MuiSelect-select': {
              backgroundColor: (theme) => theme.palette.common.white,
              fontWeight: '700',
              fontSize: 12,
              color: '#A1A5B7',
              padding: '8px 37px 8px 14px',
              border: 'none',
              minHeight: 'fit-content',
              pr: '37px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-icon': {
              fontSize: 14,
            },
          }}
          IconComponent={KeyboardArrowDownIcon}
        >
          {(rowsPerPageOptions || ROW_PER_PAGE_OPTIONS)?.map((rows) => {
            return (
              <MenuItem key={rows} value={rows}>
                {rows}
              </MenuItem>
            )
          })}
        </CommonSelect>
      </Box>
      <Pagination
        count={totalPageCount}
        shape='rounded'
        color='primary'
        size='small'
        sx={{ '& .Mui-selected': { color: '#ffffff !important' } }}
        page={page}
        onChange={handleChangePage}
      />
    </Box>
  )
}

export default TablePagination
