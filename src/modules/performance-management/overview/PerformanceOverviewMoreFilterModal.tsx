import { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import { IPerformanceOverviewFilters } from '../../../types/performance-management'
import { ISelectItem } from '../../../types/common'
import LevelSelect from '../../location/LevelSelect'
import BuildingSelect from '../../location/BuildingSelect'
import UnitSelect from '../../location/UnitSelect'
import AreaSelect from '../../location/AreaSelect'
import DialogWrapper from '../../common/DialogWrapper'

interface IProps {
  open: boolean
  filters: IPerformanceOverviewFilters
  onClose: () => void
  onApply: (filters: IPerformanceOverviewFilters) => void
}

const PerformanceOverviewMoreFilterModal: FC<IProps> = ({
  open,
  filters: inFilters,
  onClose,
  onApply,
}) => {
  const [filters, setFilters] = useState<IPerformanceOverviewFilters>({
    search: '',
    projects: [],
    locations: [],
    buildings: [],
    levels: [],
    areas: [],
    units: [],
    startDate: null,
    endDate: null,
  })
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

  const initValues = () => {
    setFilters({ ...inFilters })
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
          <Box sx={{ mt: 0 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Building
            </Typography>
            <BuildingSelect
              hiddenLabel={true}
              selected={filters.buildings}
              onChange={handleChangeBuildings}
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
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Area
            </Typography>
            <AreaSelect hiddenLabel={true} selected={filters.areas} onChange={handleChangeAreas} />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Unit
            </Typography>
            <UnitSelect hiddenLabel={true} selected={filters.units} onChange={handleChangeUnits} />
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

export default PerformanceOverviewMoreFilterModal
