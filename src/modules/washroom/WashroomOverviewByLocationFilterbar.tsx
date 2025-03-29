import { FC } from 'react'
import { Card, Grid, Stack, Typography } from '@mui/material'

import { ISelectItem } from '../../types/common'
import { IWashroomOverviewFilters } from '../../types/washroom'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'

interface IProps {
  filters: IWashroomOverviewFilters
  onChange: (filters: IWashroomOverviewFilters) => void
}

const WashroomOverviewByLocationFilterbar: FC<IProps> = ({ filters, onChange }) => {
  const handleChangeBuildings = (buildings: ISelectItem[]) => {
    onChange({ ...filters, buildings })
  }

  const handleChangeLevels = (levels: ISelectItem[]) => {
    onChange({ ...filters, levels })
  }

  const handleChangeAreas = (areas: ISelectItem[]) => {
    onChange({ ...filters, areas })
  }

  const handleChangeUnits = (units: ISelectItem[]) => {
    onChange({ ...filters, units })
  }

  return (
    <Card sx={{ pt: 3, px: 2.5, pb: 3 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 2, xs: 1 }}
        rowGap={{ lg: 0, xs: 2 }}
      >
        <Grid container direction={'row'} columnSpacing={2.5} rowSpacing={2}>
          <Grid item lg={3} xs={12}>
            <Typography typography='h4' sx={{ color: 'grey.600', mb: 1.5 }}>
              Building
            </Typography>
            <BuildingSelect
              hiddenLabel={true}
              selected={filters.buildings}
              onChange={handleChangeBuildings}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Typography typography='h4' sx={{ color: 'grey.600', mb: 1.5 }}>
              Level
            </Typography>
            <LevelSelect
              hiddenLabel={true}
              selected={filters.levels}
              onChange={handleChangeLevels}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Typography typography='h4' sx={{ color: 'grey.600', mb: 1.5 }}>
              Area
            </Typography>
            <AreaSelect hiddenLabel={true} selected={filters.areas} onChange={handleChangeAreas} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Typography typography='h4' sx={{ color: 'grey.600', mb: 1.5 }}>
              Unit
            </Typography>
            <UnitSelect hiddenLabel={true} selected={filters.units} onChange={handleChangeUnits} />
          </Grid>
        </Grid>
      </Stack>
    </Card>
  )
}

export default WashroomOverviewByLocationFilterbar
