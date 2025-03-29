import { Box, Button, Card, Grid, Typography } from "@mui/material"
import FilterLabel from "../../modules/common/FilterLabel"
import SearchField from "../../modules/common/SearchField"
import { useMemo, useState } from "react"
import ProjectSelect from "../../modules/audit/project-sites/ProjectSelect"
import { ISelectItem, ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from "../../types/common"
import LocationSelect from "../../modules/location/LocationSelect"
import { IFeedbackLocation } from "../../types/feedback"
import EnhancedTable from "../../modules/common/EnhancedTable"
import { tmpFeedbackLocations } from "../../modules/feedback/overview/dummy"
import { ROW_PER_PAGE_OPTIONS } from "../../constants/common"
import { useNavigate } from "react-router-dom"


const FeedbackLocation = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [projects, setProjects] = useState<ISelectItem[]>([])
  const [locations, setLocations] = useState<ISelectItem[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('asc')
  const [orderBy, setOrderBy] = useState('id')

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as any)
  }

  const projectIds = useMemo(
    () => projects.map((i) => i.value as number),
    [projects]
  )

  const handleChangeProjects = (projects: ISelectItem[]) => {
    setProjects(projects)
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    setLocations(locations)
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IFeedbackLocation
        return project?.name
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IFeedbackLocation
        return location?.name
      },
    },
    {
      id: '',
      name: 'Total Feedback Received',
      render: (item: TableData) => {
        const { feedbackReceived } = item as IFeedbackLocation
        return feedbackReceived
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const { id } = item as IFeedbackLocation
        return (
          <Button
            variant='contained'
            color='inherit'
            sx={{
              backgroundColor: (theme) => theme.palette.grey[100],
              color: (theme) => theme.palette.grey[700],
              '&:hover': { background: (theme) => theme.palette.grey[200] },
            }}
            onClick={() => navigate(`/feedback/form-template/${id}`)}
          >
            View
          </Button>
        )
      },
    },
  ]

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography typography={'h3'}>Location Data</Typography>
      </Box>
      <Card
        sx={{
          mt: 2.5,
          p: 3,
          pr: 5,
        }}
      >
        <Grid container columnSpacing={7} rowSpacing={3}>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Search' />
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
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Project' />
            <ProjectSelect
              hiddenLabel={true}
              selected={projects}
              onChange={handleChangeProjects}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Location' />
            <LocationSelect
              hiddenLabel={true}
              selected={locations}
              onChange={handleChangeLocations}
              projectIds={projectIds}
            />
          </Grid>
        </Grid>
      </Card>
      <Box mt={5.5}>
        <EnhancedTable
          loading={false}
          totalCount={tmpFeedbackLocations?.length || 0}
          data={tmpFeedbackLocations as any}
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

export default FeedbackLocation