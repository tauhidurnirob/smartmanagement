import { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
  Grid,
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { ISelectItem } from '../../../types/common'
import DialogWrapper from '../../common/DialogWrapper'
import DatePickerWithText from '../../common/DatePickerWithText'
import BuildingSelect from '../../location/BuildingSelect'
import LevelSelect from '../../location/LevelSelect'
import AreaSelect from '../../location/AreaSelect'
import UnitSelect from '../../location/UnitSelect'
import { IFeedbackListFilters } from '../../../types/feedback'


interface IProps {
  open: boolean
  filters: IFeedbackListFilters
  onClose: () => void
  onApply: (filters: IFeedbackListFilters) => void
}

const FeedbackListMoreFilterModal: FC<IProps> = ({
  open,
  filters: inFilters,
  onClose,
  onApply,
}) => {
  const [filters, setFilters] = useState<IFeedbackListFilters>({
    search: '',
    statuses: [],
    projects: [],
    locations: [],
    buildings: [],
    levels: [],
    areas: [],
    units: [],
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
    feedbackTypes: []
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

  const handleChangeStartDate = (date: Dayjs | null) => {
    setFilters({ ...filters, startDate: date || dayjs() })
  }

  const handleChangeEndDate = (date: Dayjs | null) => {
    setFilters({ ...filters, endDate: date || dayjs() })
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
          <Box>
            <Grid container spacing={2.5}>
              <Grid item lg={6} xs={12}>
                <Box>
                  <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
                    Start Date
                  </Typography>
                  <DatePickerWithText
                    date={filters.startDate}
                    onChange={handleChangeStartDate}
                    label={''}
                    placeholder='Start Date'
                    sxBtn={{ minWidth: { xs: '100%' } }}
                    maxDate={filters.endDate}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box>
                  <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
                    End Date
                  </Typography>
                  <DatePickerWithText
                    date={filters.endDate}
                    onChange={handleChangeEndDate}
                    label={''}
                    placeholder='End Date'
                    sxBtn={{ minWidth: { xs: '100%' } }}
                    minDate={filters.startDate}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
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

export default FeedbackListMoreFilterModal
