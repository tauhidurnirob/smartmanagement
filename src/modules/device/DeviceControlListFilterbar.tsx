import { FC, useMemo } from 'react'
import { Card, Grid } from '@mui/material'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { ISelectItem } from '../../types/common'
import { IDeviceControlListFilters } from '../../types/device'
import LocationSelect from '../location/LocationSelect'

interface IProps {
  filters: IDeviceControlListFilters
  onChange: (filters: IDeviceControlListFilters) => void
}

const DeviceControlListFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const handleChangeSearch = (search: string) => {
    onChange({ ...filters, search })
  }

  const handleChangeProjects = (projects: ISelectItem[]) => {
    onChange({ ...filters, projects, locations: [] })
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    onChange({ ...filters, locations })
  }

  return (
    <Card sx={{ pt: 3.25, pl: 3, pr: 5, pb: 3.25 }}>
      <Grid
        container
        columnSpacing={{ lg: 6.75, xs: 2 }}
        rowSpacing={{ lg: 0, xs: 2 }}
        flexGrow={1}
        alignItems={'flex-start'}
      >
        <Grid item md={4} xs={12}>
          <FilterLabel text='Search' />
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
          <FilterLabel text='Project' />
          <ProjectSelect
            hiddenLabel={true}
            selected={filters.projects}
            onChange={handleChangeProjects}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <FilterLabel text='Location' />
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

export default DeviceControlListFilterbar
