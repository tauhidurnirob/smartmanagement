import { FC, useState } from 'react'
import { Box, Button, Typography, Stack } from '@mui/material'
import { ChevronLeft, ChevronRight, ArrowDropDown } from '@mui/icons-material'
import { Dayjs } from 'dayjs'

import SimpleSelect from '../common/SimpleSelect'
import { DASHBOARD_CALENDAR_TYPES } from '../../helpers/constants'
import { ISelectItem } from '../../types/common'
import { TCalendarViewType } from '../../types/dashboard'

const getHeaderTitleFormat = (calendarType: TCalendarViewType) => {
  if (calendarType === 'multiMonthYear') return 'YYYY'
  if (calendarType === 'dayGridMonth' || calendarType === 'timeGridWeek') return 'MMMM YYYY'
  return 'DD MMM YYYY'
}

interface IProps {
  type: ISelectItem
  date: Dayjs
  onChangeType: (type: ISelectItem) => void
  onChangeDirection: (directoin: 'prev' | 'next') => void
}

const DashboardCalendarHeader: FC<IProps> = ({ type, date, onChangeType, onChangeDirection }) => {
  const [selectedYear, setSelectedYear] = useState(2023)

  const handleChangePreviousYear = () => {
    onChangeDirection('prev')
  }

  const handleChangeNextYear = () => {
    onChangeDirection('next')
  }

  const handleChangeCalendarType = (type: ISelectItem) => {
    onChangeType(type)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '.btn-prev-next': {
          p: 0.5,
          minWidth: 0,
          minHeight: 0,
          height: 'fit-content',
          backgroundColor: 'grey.50',
        },
      }}
    >
      <Box component='span' flex={1}></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant='contained'
          color='inherit'
          onClick={() => handleChangePreviousYear()}
          className='btn-prev-next'
        >
          <ChevronLeft sx={{ fontSize: { xs: '1.5rem' } }} />
        </Button>
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem', lg2: '2.625rem' },
            color: 'grey.800',
            fontWeight: 700,
            mx: 2,
            textAlign: 'center',
          }}
        >
          {date.format(getHeaderTitleFormat(type.value as TCalendarViewType))}
        </Typography>
        <Button
          variant='contained'
          color='inherit'
          onClick={() => handleChangeNextYear()}
          className='btn-prev-next'
        >
          <ChevronRight sx={{ fontSize: { xs: '1.5rem' } }} />
        </Button>
      </Box>
      <Stack direction='row' justifyContent='flex-end' flex={1}>
        <SimpleSelect
          onChange={handleChangeCalendarType}
          options={DASHBOARD_CALENDAR_TYPES}
          value={type}
          height='small'
          width='7.3rem'
          color='grey.800'
          icon={ArrowDropDown}
          sx={{
            '.MuiSelect-select': {
              backgroundColor: '#ffffff',
              border: '1px solid #4B4F52',
              borderRadius: 2,
              pl: 3,
            },
            '.MuiSvgIcon-root': {
              fontSize: '2rem',
              color: '#86898B',
            },
          }}
        />
      </Stack>
    </Box>
  )
}

export default DashboardCalendarHeader
