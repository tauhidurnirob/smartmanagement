import { Box, Button, Stack, Typography } from "@mui/material"
import SearchField from "../../modules/common/SearchField"
import { useState } from "react"
import { ProcedureCreateIcon } from "../../assets/icons/procedure-create"
import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from "../../types/common"
import { IMaintenanceProcedure } from "../../types/maintenance"
import { useNavigate } from "react-router-dom"
import EnhancedTable from "../../modules/common/EnhancedTable"
import { tmpMaintenanceProcedures } from "../../modules/maintanance/overview/dummy"
import { ROW_PER_PAGE_OPTIONS } from "../../constants/common"


const MaintenanceProcedures = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [search, setSearch] = useState('')

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as any)
  }

  const headCells: ITableHeadCell[] = [
    {
      id: 'name',
      name: 'Procedure Type',
      render: (item: TableData) => {
        const { name } = item as IMaintenanceProcedure
        return name
      },
    },
    {
      id: '',
      name: 'Remark',
      render: (item: TableData) => {
        const { remark } = item as IMaintenanceProcedure
        return remark
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const { id } = item as IMaintenanceProcedure
        return (
          <Button
            variant='contained'
            color='inherit'
            sx={{
              backgroundColor: (theme) => theme.palette.grey[200],
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={() => navigate(`${id}`)}
          >
            View
          </Button>
        )
      },
    },
  ]

  return (
    <Box>
      <Typography typography={'h3'}>Procedures List</Typography>
      <Stack mt={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
        <SearchField
          placeholder='Search by Keyword'
          sx={{
            background: '#ffffff',
            minWidth: 0,
            height: '34px',
            width: '294px',
            justifyContent: 'center',
            mb: 1.75,
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<ProcedureCreateIcon sx={{color: '#4DBFFF', fontSize: '24px', position: 'relative', top: '2px' }} />}
          onClick={() => navigate('create')}
        >
          Add New Procedure
        </Button>
      </Stack>

      <Box mt={3.5}>
        <EnhancedTable
          loading={false}
          totalCount={tmpMaintenanceProcedures?.length || 0}
          data={tmpMaintenanceProcedures as any}
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

export default MaintenanceProcedures