import { FC, useState } from 'react'
import { Card, Grid, Stack, Box } from '@mui/material'
import { IFeedbackFormTemplateListFilters } from '../../../types/feedback'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SearchField from '../../common/SearchField'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'


interface IProps {
  filters: IFeedbackFormTemplateListFilters
  onChange: (filters: IFeedbackFormTemplateListFilters) => void
}

const FormTemplateListFilterbar: FC<IProps> = ({ filters, onChange }) => {

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
    <Card sx={{ pt: 3.5, px: 3.75, pb: 3.75 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 3.5, xs: 1 }}
        rowGap={{ lg: 0, xs: 2 }}
      >
        <Grid
          container
          columnSpacing={{ lg: 3.5, xs: 1 }}
          rowSpacing={{ lg: 0, xs: 2 }}
          flexGrow={1}
          alignItems={'flex-start'}
        >
          <Grid item md={3} xs={12}>
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
          <Grid item md={3} xs={12}>
            <FilterLabel text='Project' />
            <ProjectSelect
              hiddenLabel={true}
              selected={filters.projects}
              onChange={handleChangeProjects}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Location' />
            <LocationSelect
              hiddenLabel={true}
              selected={filters.locations}
              onChange={handleChangeLocations}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Form Type' />
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

export default FormTemplateListFilterbar
