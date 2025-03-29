import { FC, useState } from 'react'
import { Card, Grid, Stack, Box } from '@mui/material'
import { Dayjs } from 'dayjs'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { MoreFilters } from '../../assets/icons/more-filters'
import { ISelectItem } from '../../types/common'
import LocationSelect from '../location/LocationSelect'
import SelectDate from '../common/SelectDate'
import {
  ENotificationMoreFilterKeys,
  INotificationListByProjectFilters,
  INotificationListMoreFilters,
} from '../../types/notification'
import NotificationListByProjectMoreFilterModal from './NotificationListByProjectMoreFilterModal'
import { useDispatch } from 'react-redux'
import notificationSlice from '../../store/slices/notification'

interface IProps {
  filters: INotificationListByProjectFilters
  // onChange: (filters: INotificationListByProjectFilters) => void
}

const NotificationListByProjectFilterbar: FC<IProps> = ({ filters /* onChange */ }) => {
  const [openMoreFilters, setOpenMoreFilters] = useState(false)
  const actions = notificationSlice.actions
  const dispatch = useDispatch()

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleMoreFilters = (inFilters: INotificationListMoreFilters) => {
    Object.entries(inFilters).forEach(([key, value]) => {
      if (key === ENotificationMoreFilterKeys.areas) {
        dispatch(actions.setArea(value as ISelectItem[]))
      } else if (key === ENotificationMoreFilterKeys.buildings) {
        dispatch(actions.setBuilding(value as ISelectItem[]))
      } else if (key === ENotificationMoreFilterKeys.levels) {
        dispatch(actions.setLevel(value as ISelectItem[]))
      } else if (key === ENotificationMoreFilterKeys.units) {
        dispatch(actions.setUnit(value as ISelectItem[]))
      }
    })

    setOpenMoreFilters(false)
  }

  const handleCloseMoreFilters = () => {
    setOpenMoreFilters(false)
  }

  const handleChangeSearch = (search: string) => {
    dispatch(actions.setText(search))
  }

  const handleChangeProjects = (projects: ISelectItem[]) => {
    dispatch(actions.setProject(projects))
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    dispatch(actions.setLocation(locations))
  }

  const handleChangeStartDate = (startDate: Dayjs | null) => {
    dispatch(actions.setStartDate(startDate))
  }
  const handleChangeEndDate = (endDate: Dayjs | null) => {
    dispatch(actions.setEndDate(endDate))
  }

  return (
    <Card sx={{ pt: 3.5, px: 3.75, pb: 3.75 }}>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems='flex-start'
        justifyContent='space-between'
        columnGap={{ lg: 1.25, xs: 1 }}
        rowGap={{ lg: 0, xs: 1.25 }}
      >
        <Grid
          container
          columnSpacing={{ lg: 1.25, xs: 1 }}
          rowSpacing={{ lg: 0, xs: 1.25 }}
          flexGrow={1}
          alignItems={'flex-start'}
        >
          <Grid item md={3} xs={12}>
            <FilterLabel text='Search' sx={{ mb: 1.25 }} />
            <SearchField
              placeholder='Search by Keyword'
              value={filters.text}
              onChange={(e) => handleChangeSearch(e.target.value)}
              sx={{
                background: (theme) => theme.palette.grey[100],
                minWidth: 0,
                height: '40px',
                justifyContent: 'center',
              }}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Project' sx={{ mb: 1.25 }} />
            <ProjectSelect
              hiddenLabel={true}
              selected={filters.projects}
              onChange={handleChangeProjects}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FilterLabel text='Location' sx={{ mb: 1.25 }} />
            <LocationSelect
              hiddenLabel={true}
              selected={filters.locations}
              onChange={handleChangeLocations}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Grid container columnSpacing={{ lg: 1.25, xs: 1 }} rowSpacing={{ lg: 0, xs: 1.25 }}>
              <Grid item md={6} xs={12}>
                <FilterLabel text='Start Date' sx={{ mb: 1.25 }} />
                <SelectDate
                  value={filters.startDate}
                  onAccept={(date) => handleChangeStartDate(date)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FilterLabel text='End Date' sx={{ mb: 1.25 }} />
                <SelectDate
                  value={filters.endDate}
                  onAccept={(date) => handleChangeEndDate(date)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <FilterLabel text='More' sx={{ mb: 1.25 }} />
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              bgcolor: 'grey.200',
              px: 1.25,
              py: 1.05,
              borderRadius: 1.5,
            }}
            onClick={handleOpenMoreFilters}
          >
            <MoreFilters sx={{ fontSize: 23, color: 'primary.main' }} />
          </Box>
        </Box>
      </Stack>

      <NotificationListByProjectMoreFilterModal
        open={openMoreFilters}
        filters={filters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
    </Card>
  )
}

export default NotificationListByProjectFilterbar
