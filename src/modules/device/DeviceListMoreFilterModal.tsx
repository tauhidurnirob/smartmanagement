import { FC, useEffect, useState, useMemo } from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import { ISelectItem } from '../../types/common'
import DialogWrapper from '../common/DialogWrapper'
import { IDeviceListFilters } from '../../types/device'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'
import DeviceTypeSelect from './DeviceTypeSelect'

interface IProps {
  open: boolean
  filters: IDeviceListFilters
  onClose: () => void
  onApply: (filters: IDeviceListFilters) => void
}

const DeviceListMoreFilterModal: FC<IProps> = ({ open, filters: inFilters, onClose, onApply }) => {
  const [filters, setFilters] = useState<IDeviceListFilters>({
    search: '',
    types: [],
    statuses: [],
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

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const buildingIds = useMemo(() => {
    return filters.buildings.map((p) => Number(p.value))
  }, [filters.buildings])

  const levelIds = useMemo(() => {
    return filters.levels.map((p) => Number(p.value))
  }, [filters.levels])

  const areaIds = useMemo(() => {
    return filters.areas.map((p) => Number(p.value))
  }, [filters.areas])

  const initValues = () => {
    setFilters({ ...inFilters })
  }

  const handleDiscard = () => {
    initValues()
    onClose()
  }

  const handleFilter = () => {
    onApply(filters)
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

  const handleChangeTypes = (types: ISelectItem[]) => {
    setFilters({ ...filters, types })
  }

  useEffect(() => {
    if (open) {
      initValues()
    }
  }, [open, inFilters])

  return (
    <>
      <DialogWrapper maxWidth='689px' label={'More Filter'} open={open} onClose={() => onClose()}>
        <DialogContent sx={{ p: 4, pb: 5.5 }}>
          <Box sx={{}}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Device Type
            </Typography>
            <DeviceTypeSelect
              hiddenLabel={true}
              selected={filters.types}
              onChange={handleChangeTypes}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Building
            </Typography>
            <BuildingSelect
              hiddenLabel={true}
              selected={filters.buildings}
              onChange={handleChangeBuildings}
              projectIds={projectIds}
              locationIds={locationIds}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Level
            </Typography>
            <LevelSelect
              hiddenLabel={true}
              selected={filters.levels}
              onChange={handleChangeLevels}
              projectIds={projectIds}
              locationIds={locationIds}
              buildingIds={buildingIds}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Area
            </Typography>
            <AreaSelect
              hiddenLabel={true}
              selected={filters.areas}
              onChange={handleChangeAreas}
              projectIds={projectIds}
              locationIds={locationIds}
              buildingIds={buildingIds}
              levelIds={levelIds}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Unit
            </Typography>
            <UnitSelect
              hiddenLabel={true}
              selected={filters.units}
              onChange={handleChangeUnits}
              projectIds={projectIds}
              locationIds={locationIds}
              buildingIds={buildingIds}
              levelIds={levelIds}
              areaIds={areaIds}
            />
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack direction='row' justifyContent='flex-end' px={4} py={2} gap={2}>
            <Button
              variant='text'
              color='inherit'
              onClick={handleDiscard}
              sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
            >
              Cancel
            </Button>
            <Button variant='contained' size='large' color='primary' onClick={() => handleFilter()}>
              Apply Filter
            </Button>
          </Stack>
        </DialogActions>
      </DialogWrapper>
    </>
  )
}

export default DeviceListMoreFilterModal
