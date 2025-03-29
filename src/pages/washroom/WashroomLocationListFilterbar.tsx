import { FC } from 'react'
import { Card, Grid, Stack } from '@mui/material'
import { IWashroomLocationListFilters } from '../../types/washroom'
import { ISelectItem } from '../../types/common'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'

interface IProps {
  filters: IWashroomLocationListFilters
  onChange: (filters: IWashroomLocationListFilters) => void
}

const WashroomLocationListFilterbar: FC<IProps> = ({ filters, onChange }) => {
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
    <Card sx={{ pt: 5.5, px: 3.75, pb: 5 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 3, xs: 1 }}
        rowGap={{ lg: 0, xs: 2 }}
      >
        <Grid
          container
          columnSpacing={{ lg: 3.25, xs: 1 }}
          rowSpacing={{ lg: 0, xs: 2 }}
          flexGrow={1}
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
            />
          </Grid>
        </Grid>
      </Stack>
    </Card>
  )
}

export default WashroomLocationListFilterbar
