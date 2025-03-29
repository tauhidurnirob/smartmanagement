import { Box, Pagination, Typography } from "@mui/material"
import { FC, useMemo } from "react"

interface IProps {
  count: number
  rowsPerPage: number
  page: number
  onPageChange: (page: number) => void
}
const FeedbackInboxPagination:FC<IProps> = ({
  count,
  rowsPerPage,
  page,
  onPageChange
}) => {
  const { startIndex, endIndex, totalPageCount } = useMemo(() => {
    const startIndex = count > 0 ?  rowsPerPage * Math.max(page - 1, 0) + 1 : 0;
    const endIndex = Math.min(rowsPerPage * page, count)
    const totalPageCount = Math.ceil(count / (rowsPerPage || 1))

    return {
      startIndex,
      endIndex,
      totalPageCount,
    }
  }, [page, rowsPerPage, count])

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page)
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant='h4' color={'grey.500'} >
        {startIndex} to {endIndex} of {count}
      </Typography>
      <Pagination
        count={totalPageCount}
        shape='rounded'
        color='primary'
        size='small'
        sx={{"& .Mui-selected": {color: "#ffffff !important"}}}
        page={page}
        onChange={handleChangePage}
      />
    </Box>
  )
}

export default FeedbackInboxPagination