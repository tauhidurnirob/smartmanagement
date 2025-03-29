import { FC, useMemo } from 'react'
import { Card, Grid } from '@mui/material'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { ISelectItem } from '../../types/common'
import LocationSelect from '../location/LocationSelect'
import { IProjectListFilters } from '../../types/project'

interface IProps {
  filters: IProjectListFilters
  onChange: (filters: IProjectListFilters) => void
}

const ProjectListFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const handleChangeSearch = (search: string) => {
    onChange({ ...filters, search })
  }

  const handleChangeProjects = (projects: ISelectItem[]) => {
    onChange({ ...filters, projects })
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    onChange({ ...filters, locations })
  }

  return (
    <Card sx={{ pt: 4.5, pl: 3.75, pr: 3.75, pb: 4 }}>
      <Grid
        container
        columnSpacing={{ lg: 2, xs: 1 }}
        rowSpacing={{ lg: 0, xs: 2 }}
        flexGrow={1}
        alignItems={'flex-start'}
      >
        <Grid item md={4} xs={12}>
          <FilterLabel text='Search' sx={{ mb: 1 }} />
          <SearchField
            placeholder='Search by Keyword'
            value={filters.search}
            onChange={(e) => handleChangeSearch(e.target.value)}
            sx={{
              background: (theme) => theme.palette.grey[100],
              minWidth: 0,
              height: '40px',
              justifyContent: 'center',
            }}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <FilterLabel text='Project' sx={{ mb: 1 }} />
          <ProjectSelect
            hiddenLabel={true}
            selected={filters.projects}
            onChange={handleChangeProjects}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <FilterLabel text='Location' sx={{ mb: 1 }} />
          <LocationSelect
            hiddenLabel={true}
            selected={filters.locations}
            onChange={handleChangeLocations}
            projectIds={projectIds}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProjectListFilterbar
