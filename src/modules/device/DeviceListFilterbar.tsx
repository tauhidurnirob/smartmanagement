import { FC, useState, useMemo } from 'react'
import { Card, Grid, Stack, Box } from '@mui/material'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { MoreFilters } from '../../assets/icons/more-filters'
import { ISelectItem } from '../../types/common'
import MultipleSelect from '../common/MultipleSelect'
import { DEVICE_STATUS_LIST } from '../../helpers/constants'
import { IDeviceListFilters } from '../../types/device'
import LocationSelect from '../location/LocationSelect'
import DeviceListMoreFilterModal from './DeviceListMoreFilterModal'

interface IProps {
  filters: IDeviceListFilters
  onChange: (filters: IDeviceListFilters) => void
}

const DeviceListFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const [openMoreFilters, setOpenMoreFilters] = useState(false)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleMoreFilters = (inFilters: IDeviceListFilters) => {
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
    onChange({
      ...filters,
      projects,
      locations: [],
      buildings: [],
      levels: [],
      areas: [],
      units: [],
    })
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    onChange({ ...filters, locations, buildings: [], levels: [], areas: [], units: [] })
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
              projectIds={projectIds}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' },
                gap: 2,
                mt: '-2px',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <FilterLabel text='Status' />
                <MultipleSelect
                  items={DEVICE_STATUS_LIST}
                  selectedItems={filters.statuses}
                  onChange={handleChangeStatuses}
                  labelForAll='All Status'
                />
              </Box>
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
                  <MoreFilters
                    sx={{ fontSize: 23, color: (theme) => theme.palette.primary.main }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack>

      <DeviceListMoreFilterModal
        open={openMoreFilters}
        filters={filters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
    </Card>
  )
}

export default DeviceListFilterbar
