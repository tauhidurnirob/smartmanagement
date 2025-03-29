import { FC } from 'react'
import { Dayjs } from 'dayjs'
import { Card, Stack, Grid } from '@mui/material'

import FilterLabel from '../common/FilterLabel'
import LocationSelect from '../location/LocationSelect'
import { ISelectItem } from '../../types/common'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import SelectDate from '../common/SelectDate'
import { IPredictiveAnalysisFilters } from '../../types/predictive-analysis'

interface IProps {
  filters: IPredictiveAnalysisFilters
  onChange: (filters: IPredictiveAnalysisFilters) => void
}

const PredictiveAnalysisFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const handleChangeLocations = (locations: ISelectItem[]) => {
    onChange({ ...filters, locations })
  }

  const handleChangeBuildings = (buildings: ISelectItem[]) => {
    onChange({ ...filters, buildings })
  }

  const handleChangeLevels = (levels: ISelectItem[]) => {
    onChange({ ...filters, levels })
  }

  const handleChangeDate = (date: Dayjs | null) => {
    onChange({ ...filters, date })
  }

  return (
    <Card sx={{ mt: 3, pt: 3, px: 3.5, pb: 3 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 3, xs: 1 }}
        rowGap={{ lg: 0, xs: 2 }}
      >
        <Grid
          container
          columnSpacing={{ lg: 4.5, xs: 2 }}
          rowSpacing={{ lg: 0, xs: 2 }}
          flexGrow={1}
          alignItems={'flex-start'}
        >
          <Grid item md={3} xs={12}>
            <FilterLabel text='Date' />
            <SelectDate value={filters.date} onAccept={handleChangeDate} placeholder='Date' />
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
            <FilterLabel text='Building' />
            <BuildingSelect
              hiddenLabel={true}
              selected={filters.buildings}
              onChange={handleChangeBuildings}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Level' />
            <LevelSelect
              hiddenLabel={true}
              selected={filters.levels}
              onChange={handleChangeLevels}
            />
          </Grid>
        </Grid>
      </Stack>
    </Card>
  )
}

export default PredictiveAnalysisFilterbar
