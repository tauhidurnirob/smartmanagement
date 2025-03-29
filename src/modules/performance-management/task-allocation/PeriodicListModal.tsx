import { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { ITaskAllocationPeriodicListFilters } from '../../../types/performance'
import DialogWrapper from '../../common/DialogWrapper'
import PremiseCategorySelect from './PremiseCategorySelect'
import { ISelectItem } from '../../../types/common'
import TaskActivitySelect from './TaskActivitySelect'
import SimpleSelect from '../../common/SimpleSelect'
import { generateYearOptions } from '../../../helpers/generateYearOptions'
import DatePickerWithText from '../../common/DatePickerWithText'
import dayjs, { Dayjs } from 'dayjs'
import TimePickerWithText from '../../common/TimePickerWithText'

interface IProps {
  open: boolean
  filters: ITaskAllocationPeriodicListFilters
  onClose: () => void
  onApply: (filters: ITaskAllocationPeriodicListFilters) => void
}

const PeriodicListFilterModal: FC<IProps> = ({
  open,
  filters: inFilters,
  onClose,
  onApply,
}) => {
  const [filters, setFilters] = useState<ITaskAllocationPeriodicListFilters>({
    search: '',
    projects: [],
    locations: [],
    month: null,
    year: null,
    premises: [],
    activity: [],
    startDate: null,
    startTime: null
  })

  const handleDiscard = () => {
    initValues()
  }

  const handleFilter = () => {
    onApply(filters)
  }

  const handleChangePremises = (premises: ISelectItem[]) => {
    setFilters({ ...filters, premises })
  }
  const handleChangeActivity = (activity: ISelectItem[]) => {
    setFilters({ ...filters, activity })
  }
  const handleChangeYear = (year: ISelectItem) => {
    setFilters({ ...filters, year })
  }
  const handleChangeStartDate = (date: Dayjs | null) => {
    setFilters({ ...filters, startDate: date || dayjs() })
  }
  const handleChangeStartTime = (time: Dayjs | null) => {
    setFilters({ ...filters, startTime: time || dayjs() })
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
            Premise Category
            </Typography>
            <PremiseCategorySelect
              hiddenLabel={true}
              selected={filters.premises}
              onChange={handleChangePremises}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
            Task Activity
            </Typography>
            <TaskActivitySelect
              hiddenLabel={true}
              selected={filters.activity}
              onChange={handleChangeActivity}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
            Year
            </Typography>
            <SimpleSelect
              width={'100%'}
              value={filters.year}
              options={generateYearOptions()}
              onChange={handleChangeYear}
            />
          </Box>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
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
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
                  Start Time
                </Typography>
                <TimePickerWithText
                  required={true}
                  hiddenLabel
                  label='Start Time'
                  date={filters.startTime}
                  onChange={handleChangeStartTime}
                  placeholder='Start Time'
                />
              </Box>
            </Grid>
          </Grid>
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

export default PeriodicListFilterModal
