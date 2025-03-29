import { FC, useMemo } from 'react'
import { Card, Grid, Box } from '@mui/material'
import { Dayjs } from 'dayjs'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { ISelectItem } from '../../types/common'
import LocationSelect from '../location/LocationSelect'
import { IDashboardOverviewFilters } from '../../types/dashboard'
import SelectDate from '../common/SelectDate'

interface IProps {
  filters: IDashboardOverviewFilters
  onChange: (filters: IDashboardOverviewFilters) => void
}

const DashboardOverviewFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const projectIds = useMemo(() => {
    return filters.projects.map((p) => p.value as number)
  }, [filters])

  const handleChangeSearch = (search: string) => {
    onChange({ ...filters, search })
  }

  const handleChangeProjects = (projects: ISelectItem[]) => {
    onChange({ ...filters, projects })
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    onChange({ ...filters, locations })
  }

  const handleChangeStartDate = (startDate: Dayjs | null) => {
    onChange({ ...filters, startDate })
  }
  const handleChangeEndDate = (endDate: Dayjs | null) => {
    onChange({ ...filters, endDate })
  }

  return (
    <Card sx={{ pt: 2.5, px: 2.5, pb: 3.5 }}>
      <Grid
        container
        columnSpacing={{ lg: 1.5, xs: 1 }}
        rowSpacing={{ lg: 1.25, xs: 2.5 }}
        flexGrow={1}
      >
        <Grid item lg={3} xs={12}>
          <Box>
            <FilterLabel text='Search' />
            <SearchField
              placeholder='Search by Keyword'
              sx={{
                background: (theme) => theme.palette.grey[100],
                minWidth: 0,
                height: '40px',
                justifyContent: 'center',
              }}
              value={filters.search}
              onChange={(e) => handleChangeSearch(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item lg={3} xs={12}>
          <ProjectSelect selected={filters.projects} onChange={handleChangeProjects} />
        </Grid>
        <Grid item lg={3} xs={12}>
          <LocationSelect
            selected={filters.locations}
            onChange={handleChangeLocations}
            projectIds={projectIds}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <Grid container columnSpacing={{ lg: 1.5, xs: 1 }} rowSpacing={{ lg: 1.25, xs: 2.5 }}>
            <Grid item md={6} xs={12}>
              <FilterLabel text='Start Date' />
              <SelectDate
                value={filters.startDate}
                onAccept={(date) => handleChangeStartDate(date)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FilterLabel text='End Date' />
              <SelectDate value={filters.endDate} onAccept={(date) => handleChangeEndDate(date)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default DashboardOverviewFilterbar
