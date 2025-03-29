import { FC, useState } from 'react'
import { Card, Grid, Stack, Box } from '@mui/material'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { MoreFilters } from '../../assets/icons/more-filters'
import { ISelectItem } from '../../types/common'
import MultipleSelect from '../common/MultipleSelect'
import { TASK_STAFF_LEAVE_STATUS_LIST } from '../../helpers/constants'
import {
  IAttendanceMoreFilterKeys,
  IStaffAttendanceMoreFilter,
  ITaskStaffAttendanceListFilters,
} from '../../types/task'
import TaskStaffLeaveListMoreFilterModal from './TaskStaffLeaveListMoreFilterModal'
import LocationSelect from '../location/LocationSelect'
import TaskStaffAttendanceListMoreFilterModal from './TaskStaffAttendanceListMoreFilterModal'
import { Dayjs } from 'dayjs'
import { el } from '@fullcalendar/core/internal-common'

interface IProps {
  filters: ITaskStaffAttendanceListFilters
  onTextChange: (payload: string) => void
  onLocationChange: (payload: ISelectItem[]) => void
  onProjectChange: (payload: ISelectItem[]) => void
  onRoleChange: (payload: ISelectItem[]) => void
  onStatusChange: (payload: ISelectItem[]) => void
  onStartDateChange: (payload: Dayjs) => void
  onEndDateChange: (payload: Dayjs) => void
}

const TaskStaffAttendanceListFilterbar: FC<IProps> = ({
  filters,
  onEndDateChange,
  onLocationChange,
  onProjectChange,
  onRoleChange,
  onStartDateChange,
  onStatusChange,
  onTextChange,
}) => {
  const [openMoreFilters, setOpenMoreFilters] = useState<boolean>(false)

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleMoreFilters = (inFilters: IStaffAttendanceMoreFilter) => {
    Object.entries(inFilters).forEach(([key, value]) => {
      if (key === IAttendanceMoreFilterKeys.roles) {
        onRoleChange(value as ISelectItem[])
      } else if (key === IAttendanceMoreFilterKeys.startDate) {
        onStartDateChange(value as Dayjs)
      } else if (key === IAttendanceMoreFilterKeys.endDate) {
        onEndDateChange(value as Dayjs)
      }
    })

    setOpenMoreFilters(false)
  }

  const handleCloseMoreFilters = () => {
    setOpenMoreFilters(false)
  }

  const moreFilters: IStaffAttendanceMoreFilter = {
    roles: filters.roles,
    startDate: filters.startDate,
    endDate: filters.endDate,
  }

  return (
    <Card sx={{ py: 3.5, px: 3.75 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 2, xs: 1 }}
        rowGap={{ lg: 0, xs: 2 }}
      >
        <Grid container columnSpacing={{ lg: 2, xs: 1 }} rowSpacing={{ lg: 0, xs: 2 }} flexGrow={1}>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Search' sx={{ color: 'grey.600' }} />
            <SearchField
              placeholder='Search by Keyword'
              value={filters.search}
              onChange={(e) => onTextChange(e.target.value)}
              sx={{
                background: (theme) => theme.palette.grey[100],
                minWidth: 0,
                height: '40px',
                justifyContent: 'center',
              }}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Project' sx={{ color: 'grey.600' }} />
            <ProjectSelect
              hiddenLabel={true}
              selected={filters.projects}
              onChange={onProjectChange}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Location' sx={{ color: 'grey.600' }} />
            <LocationSelect
              hiddenLabel={true}
              selected={filters.locations}
              onChange={onLocationChange}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Status' sx={{ color: 'grey.600' }} />
            <MultipleSelect
              items={TASK_STAFF_LEAVE_STATUS_LIST}
              selectedItems={filters.statuses}
              onChange={onStatusChange}
              labelForAll='All Status'
              sx={{ '& >div > div > p': { lineHeight: 1.143 } }}
            />
          </Grid>
        </Grid>
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
      </Stack>

      <TaskStaffAttendanceListMoreFilterModal
        open={openMoreFilters}
        filters={moreFilters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
    </Card>
  )
}

export default TaskStaffAttendanceListFilterbar
