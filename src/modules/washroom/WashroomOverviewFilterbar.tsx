import { FC, useState } from 'react'
import { Card, Grid, Stack, Box } from '@mui/material'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { MoreFilters } from '../../assets/icons/more-filters'
import { ISelectItem } from '../../types/common'
import MultipleSelect from '../common/MultipleSelect'
import { WASHROOM_STATUS_LIST } from '../../helpers/constants'
import { IWashroomOverviewFilters } from '../../types/washroom'
import LocationSelect from '../location/LocationSelect'
import WashroomOverviewMoreFilterModal from './WashroomOverviewMoreFilterModal'

interface IProps {
  filters: IWashroomOverviewFilters
  onChange: (filters: IWashroomOverviewFilters) => void
}

const WashroomOverviewFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const [openMoreFilters, setOpenMoreFilters] = useState(false)

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleMoreFilters = (inFilters: IWashroomOverviewFilters) => {
    onChange({ ...inFilters })
    setOpenMoreFilters(false)
  }

  const handleCloseMoreFilters = () => {
    setOpenMoreFilters(false)
  }

  const handleChangeStatuses = (statuses: ISelectItem[]) => {
    onChange({ ...filters, statuses })
  }

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
    <Card sx={{ pt: 3.5, px: 3.75, pb: 3.5 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 2, xs: 1 }}
        rowGap={{ lg: 0, xs: 2 }}
      >
        <Grid container columnSpacing={{ lg: 2, xs: 1 }} rowSpacing={{ lg: 0, xs: 2 }} flexGrow={1}>
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
            <FilterLabel text='Status' />
            <MultipleSelect
              items={WASHROOM_STATUS_LIST}
              selectedItems={filters.statuses}
              onChange={handleChangeStatuses}
              labelForAll='All Status'
            />
          </Grid>
        </Grid>
        <Box>
          <FilterLabel text='More' />
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              bgcolor: (theme) => theme.palette.grey[200],
              p: 1,
              borderRadius: 1.5,
            }}
            onClick={handleOpenMoreFilters}
          >
            <MoreFilters sx={{ fontSize: 23, color: (theme) => theme.palette.primary.main }} />
          </Box>
        </Box>
      </Stack>

      <WashroomOverviewMoreFilterModal
        open={openMoreFilters}
        filters={filters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
    </Card>
  )
}

export default WashroomOverviewFilterbar
