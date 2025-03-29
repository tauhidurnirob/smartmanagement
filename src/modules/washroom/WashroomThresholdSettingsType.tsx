import { FC, useMemo, useState } from 'react'
import { Card, Grid, Stack, Box } from '@mui/material'

import WashroomParentThresholdCard from './WashroomParentThresholdCard'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import LocationSelect from '../location/LocationSelect'
import { ISelectItem } from '../../types/common'
import { MoreFilters } from '../../assets/icons/more-filters'
import FilterLabel from '../common/FilterLabel'
import { tmpAreaThresholdList } from './dummy'
import WashroomUnitThresholdCard from './WashroomUnitThresholdCard'
import WashroomAmmoniaSensorThresholdListMoreFilterModal from './WashroomAmmoniaSensorThresholdListMoreFilterModal'
import { IWashroomAmmoniaSensorThresholdListFilters } from '../../types/washroom'
import { IAlertData } from '../../api/models/alert'
import Api from '../../api'

interface IProps {
  selectedType: {
    id: number;
    locationThresholds: [any];
  },
  refetchTypeWithLocation: ()=> void;
}

const WashroomThresholdSettingsType: FC<IProps> = ({ selectedType, refetchTypeWithLocation }) => {
  const [openMoreFilters, setOpenMoreFilters] = useState(false)
  const [filters, setFilters] = useState<IWashroomAmmoniaSensorThresholdListFilters>({
    projects: [],
    locations: [],
    buildings: [],
    levels: [],
    areas: [],
    units: [],
  })

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const { data, isLoading, refetch, isUninitialized } = Api.useGetUnitListQuery({
    page: 1,
    limit: 500
  });

  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    setFilters({ ...filters, projects: items })
  }

  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    setFilters({ ...filters, locations: items })
  }

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleMoreFilters = (inFilters: IWashroomAmmoniaSensorThresholdListFilters) => {
    setFilters({ ...inFilters })
    setOpenMoreFilters(false)
  }

  const handleCloseMoreFilters = () => {
    setOpenMoreFilters(false)
  }

  return (
    <Stack direction={'column'} rowGap={4}>
      <Grid container spacing={2.75}>
        <Grid item lg={5} xs={12}>
          <WashroomParentThresholdCard deviceTypeId={selectedType && selectedType.id} refetch={refetchTypeWithLocation} />
        </Grid>
        <Grid item lg={7} xs={12}>
          <Card
            sx={{
              p: 5,
              boxShadow: 'none',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 4,
              rowGap: 2,
              alignItems: { lg: 'center', xs: 'flex-start' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Grid container spacing={4}>
                <Grid item lg={6} xs={12}>
                  <ProjectSelect
                    selected={filters.projects}
                    onChange={handleChangeSelectedProjects}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LocationSelect
                    selected={filters.locations}
                    onChange={handleChangeSelectedLocations}
                    projectIds={projectIds}
                  />
                </Grid>
              </Grid>
            </Box>
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
          </Card>
        </Grid>
      </Grid>
      <Grid container columnSpacing={1.5} rowSpacing={2}>
        {data && data.rows && data.rows.map((item, idx) => {
          const locationThresholdValue = selectedType?.locationThresholds.find(threshold => threshold?.locationId === item?.id);
          return (
            <Grid key={`area-item-threshold-${idx}`} item lg={4} xs={12}>
              <WashroomUnitThresholdCard deviceTypeId={selectedType?.id} locationData={item} locationThresholdValue={locationThresholdValue}  />
            </Grid>
          )
        })}
      </Grid>
      <WashroomAmmoniaSensorThresholdListMoreFilterModal
        open={openMoreFilters}
        filters={filters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
    </Stack>
  )
}

export default WashroomThresholdSettingsType
