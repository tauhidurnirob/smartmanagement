import { FC, useState, useMemo } from 'react'
import { Card, Grid, Stack, Box } from '@mui/material'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { MoreFilters } from '../../assets/icons/more-filters'
import { ISelectItem } from '../../types/common'
import { IDeviceLinkageListFilters } from '../../types/device'
import LocationSelect from '../location/LocationSelect'
import DeviceLinkageListMoreFilterModal from './DeviceLinkageListMoreFilterModal'

interface IProps {
  filters: IDeviceLinkageListFilters
  onChange: (filters: IDeviceLinkageListFilters) => void
}

const DeviceLinkageListFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const [openMoreFilters, setOpenMoreFilters] = useState(false)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleMoreFilters = (inFilters: IDeviceLinkageListFilters) => {
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

  return (
    <Card sx={{ pt: 3.5, px: 3.75, pb: 3.75 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 3, xs: 1 }}
        rowGap={{ lg: 0, xs: 2 }}
      >
        <Grid
          container
          columnSpacing={{ lg: 2.5, xs: 1 }}
          rowSpacing={{ lg: 0, xs: 2 }}
          flexGrow={1}
          alignItems={'flex-start'}
          sx={{ flex: 1 }}
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

        <Box>
          <FilterLabel text='More' />
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              bgcolor: (theme) => theme.palette.grey[200],
              p: 1.15,
              borderRadius: 1.5,
            }}
            onClick={handleOpenMoreFilters}
          >
            <MoreFilters sx={{ fontSize: 23, color: (theme) => theme.palette.primary.main }} />
          </Box>
        </Box>
      </Stack>

      <DeviceLinkageListMoreFilterModal
        open={openMoreFilters}
        filters={filters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
    </Card>
  )
}

export default DeviceLinkageListFilterbar
