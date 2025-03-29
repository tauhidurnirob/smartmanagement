import { FC, useState } from 'react'
import { Card, Grid, Stack, Box } from '@mui/material'
import { Dayjs } from 'dayjs'

import PerformanceOverviewMoreFilterModal from './PerformanceOverviewMoreFilterModal'
import { IPerformanceOverviewFilters } from '../../../types/performance-management'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SearchField from '../../common/SearchField'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import SelectDate from '../../common/SelectDate'
import { MoreFilters } from '../../../assets/icons/more-filters'

interface IProps {
  filters: IPerformanceOverviewFilters
  onChange: (filters: IPerformanceOverviewFilters) => void
}

const PerformanceOverviewFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const [openMoreFilters, setOpenMoreFilters] = useState(false)

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleMoreFilters = (inFilters: IPerformanceOverviewFilters) => {
    onChange({ ...inFilters })
    setOpenMoreFilters(false)
  }

  const handleCloseMoreFilters = () => {
    setOpenMoreFilters(false)
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

  const handleChangeStartDate = (startDate: Dayjs | null) => {
    onChange({ ...filters, startDate })
  }
  const handleChangeEndDate = (endDate: Dayjs | null) => {
    onChange({ ...filters, endDate })
  }

  return (
    <Card sx={{ pt: 3.5, px: 3.75, pb: 3.75 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 1.25, xs: 1 }}
        rowGap={{ lg: 0, xs: 1.25 }}
      >
        <Grid
          container
          columnSpacing={{ lg: 1.25, xs: 1 }}
          rowSpacing={{ lg: 0, xs: 1.25 }}
          flexGrow={1}
          alignItems={'flex-start'}
        >
          <Grid item md={3} xs={12}>
            <FilterLabel text='Search' sx={{ mb: 1.25 }} />
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
            <FilterLabel text='Project' sx={{ mb: 1.25 }} />
            <ProjectSelect
              hiddenLabel={true}
              selected={filters.projects}
              onChange={handleChangeProjects}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Location' sx={{ mb: 1.25 }} />
            <LocationSelect
              hiddenLabel={true}
              selected={filters.locations}
              onChange={handleChangeLocations}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Grid container columnSpacing={{ lg: 1.25, xs: 1 }} rowSpacing={{ lg: 0, xs: 1.25 }}>
              <Grid item md={6} xs={12}>
                <FilterLabel text='Start Date' sx={{ mb: 1.25 }} />
                <SelectDate
                  value={filters.startDate}
                  onAccept={(date) => handleChangeStartDate(date)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FilterLabel text='End Date' sx={{ mb: 1.25 }} />
                <SelectDate
                  value={filters.endDate}
                  onAccept={(date) => handleChangeEndDate(date)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <FilterLabel text='More' sx={{ mb: 1.25 }} />
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              bgcolor: 'grey.200',
              px: 1.25,
              py: 1.05,
              borderRadius: 1.5,
            }}
            onClick={handleOpenMoreFilters}
          >
            <MoreFilters sx={{ fontSize: 23, color: 'primary.main' }} />
          </Box>
        </Box>
      </Stack>

      <PerformanceOverviewMoreFilterModal
        open={openMoreFilters}
        filters={filters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
    </Card>
  )
}

export default PerformanceOverviewFilterbar
