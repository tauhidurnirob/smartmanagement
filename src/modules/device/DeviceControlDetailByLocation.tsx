import { useState, FC, useMemo } from 'react'
import { Box, Typography, Card, Tabs, Tab, Grid } from '@mui/material'

import { ISelectItem } from '../../types/common'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'
import DeviceControlDetailActivityList from './DeviceControlDetailActivityList'
import DeviceControlDetailOverview from './DeviceControlDetailOverview'
import { ILevel, IUnit } from '../../api/models'
import Api from '../../api'

const TAB_LIST = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity-log', label: 'Activity Log' },
]

interface IFilters {
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

interface IProps {
  locationId: number
  hiddenTab?: boolean
}

const DeviceControlDetailByLocation: FC<IProps> = ({ locationId, hiddenTab }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [filters, setFilters] = useState<IFilters>({
    buildings: [],
    levels: [],
    areas: [],
    units: [],
  })

  const buildingIds = useMemo(() => {
    return filters.buildings.map((p) => Number(p.value))
  }, [filters.buildings])

  const levelIds = useMemo(() => {
    return filters.levels.map((p) => Number(p.value))
  }, [filters.levels])

  const areaIds = useMemo(() => {
    return filters.areas.map((p) => Number(p.value))
  }, [filters.areas])

  const unitIds = useMemo(() => {
    return filters.units.map((p) => Number(p.value))
  }, [filters.units])

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleChangeBuildings = (buildings: ISelectItem[]) => {
    setFilters({ ...filters, buildings })
  }

  const handleChangeLevels = (levels: ISelectItem[]) => {
    setFilters({ ...filters, levels })
  }

  const handleChangeAreas = (areas: ISelectItem[]) => {
    setFilters({ ...filters, areas })
  }

  const handleChangeUnits = (units: ISelectItem[]) => {
    setFilters({ ...filters, units })
  }

  return (
    <Box>
      <Card sx={{ pt: 3, pb: hiddenTab ? 3 : 0, px: 2.5 }}>
        <Box>
          <Grid container direction={'row'} columnSpacing={2.5} rowSpacing={2}>
            <Grid item lg={3} xs={12}>
              <Typography typography='h4' sx={{ color: 'grey.600', mb: 1.5 }}>
                Building
              </Typography>
              <BuildingSelect
                hiddenLabel={true}
                selected={filters.buildings}
                onChange={handleChangeBuildings}
                locationIds={[locationId]}
                isSingleSelect
                disableAllSelect
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
                locationIds={[locationId]}
                buildingIds={buildingIds}
                isSingleSelect
                disableAllSelect
              />
            </Grid>
            <Grid item lg={3} xs={12}>
              <Typography typography='h4' sx={{ color: 'grey.600', mb: 1.5 }}>
                Area
              </Typography>
              <AreaSelect
                hiddenLabel={true}
                selected={filters.areas}
                onChange={handleChangeAreas}
                locationIds={[locationId]}
                buildingIds={buildingIds}
                levelIds={levelIds}
                isSingleSelect
                disableAllSelect
              />
            </Grid>
            <Grid item lg={3} xs={12}>
              <Typography typography='h4' sx={{ color: 'grey.600', mb: 1.5 }}>
                Unit
              </Typography>
              <UnitSelect
                hiddenLabel={true}
                selected={filters.units}
                onChange={handleChangeUnits}
                locationIds={[locationId]}
                buildingIds={buildingIds}
                areaIds={areaIds}
                isSingleSelect
                disableAllSelect
              />
            </Grid>
          </Grid>
        </Box>
        {!hiddenTab && (
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label='audit recycle bin'
            sx={{ overflowX: 'auto', mt: 1.75, '.MuiTabs-flexContainer': { gap: 3 } }}
            variant='scrollable'
            scrollButtons='auto'
          >
            {TAB_LIST.map((tab) => {
              return (
                <Tab
                  key={tab.id}
                  label={tab.label}
                  id={tab.id}
                  aria-controls={`audit-form-template-panel-${tab.id}`}
                  sx={{ px: 1, py: 2, minWidth: 0 }}
                />
              )
            })}
          </Tabs>
        )}
      </Card>
      <Box sx={{ mt: 2.5 }}>
        {selectedTab === 0 && (
          <DeviceControlDetailOverview filters={filters} locationId={locationId} />
        )}
        {selectedTab === 1 && (
          <DeviceControlDetailActivityList locationId={locationId} filters={filters} />
        )}
      </Box>
    </Box>
  )
}

export default DeviceControlDetailByLocation
