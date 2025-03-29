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

import { ISelectItem } from '../../types/common'
import DialogWrapper from '../common/DialogWrapper'
import { IStaffAttendanceMoreFilter } from '../../types/task'
import DatePickerWithText from '../common/DatePickerWithText'
import RoleSelect from '../user/RoleSelect'

interface IProps {
  open: boolean
  filters: IStaffAttendanceMoreFilter
  onClose: () => void
  onApply: (filters: IStaffAttendanceMoreFilter) => void
}

const TaskStaffAttendanceListMoreFilterModal: FC<IProps> = ({
  open,
  filters: inFilters,
  onClose,
  onApply,
}) => {
  const [filters, setFilters] = useState<IStaffAttendanceMoreFilter>({
    roles: [],
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
  })

  const handleDiscard = () => {
    initValues()
    onClose()
  }

  const handleFilter = () => {
    onApply(filters)
  }

  const handleChangeStartDate = (date: Dayjs | null) => {
    setFilters({ ...filters, startDate: date || dayjs() })
  }

  const handleChangeEndDate = (date: Dayjs | null) => {
    setFilters({ ...filters, endDate: date || dayjs() })
  }

  const handleChangeRole = (roles: ISelectItem[]) => {
    setFilters({ ...filters, roles })
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
                    date={filters.startDate || null}
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
                    date={filters.endDate || null}
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
              Role
            </Typography>
            <RoleSelect
              hiddenLabel={true}
              selected={filters.roles as ISelectItem[]}
              onChange={handleChangeRole}
              textColor={'grey.800'}
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

export default TaskStaffAttendanceListMoreFilterModal
