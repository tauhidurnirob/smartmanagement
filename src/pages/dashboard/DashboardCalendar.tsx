import { createRoot } from 'react-dom/client'
import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Card,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
  Stack,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventApi } from '@fullcalendar/core'
import dayjs, { Dayjs } from 'dayjs'

import DashboardCalendarHeader from '../../modules/dashboard/DashboardCalendarHeader'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import { ISelectItem } from '../../types/common'
import LocationSelect from '../../modules/location/LocationSelect'
import FilterLabel from '../../modules/common/FilterLabel'
import { DASHBOARD_CALENDAR_EVENT_TYPES, DASHBOARD_CALENDAR_TYPES } from '../../helpers/constants'
import { events } from './dummy'
import asyncQuerySelector from '../../helpers/asyncQuerySelector'
import getDashboardEventTypeStatusInfo from '../../helpers/getDashboardEventTypeStatusInfo'
import DashboardCalendarEventMenu from '../../modules/dashboard/DashboardCalendarEventMenu'

const moreLinkClickEventHandler = (date: Date) => {
  asyncQuerySelector('.fc-popover-title', (element) => {
    const popOverTitle = (
      <Box>
        <Typography
          sx={{
            fontSize: '0.625rem',
            letterSpacing: '1px',
            color: '#A9A7BC',
            textTransform: 'uppercase',
          }}
        >
          {dayjs(date).format('dddd')}
        </Typography>
        <Typography sx={{ fontSize: '1.75rem', fontWeight: 600 }}>
          {dayjs(date).format('DD')}
        </Typography>
      </Box>
    )

    createRoot(element).render(popOverTitle)
  })
}

const DashboardCalendar = () => {
  const calendarRef = useRef<FullCalendar>(null)

  const [eventListAnchorEl, setEventListAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProjects, setSelectedProjects] = useState<ISelectItem[]>([])
  const [selectedLocations, setSelectedLocations] = useState<ISelectItem[]>([])
  const [selectedCalendarType, setSelectedCalendarType] = useState<ISelectItem>(
    DASHBOARD_CALENDAR_TYPES[2]
  )
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const [selectedEvents, setSelectedEvents] = useState<EventApi[]>([])

  const isEventListOpen = Boolean(eventListAnchorEl)
  const getcalendarApi = () => {
    return calendarRef.current?.getApi()
  }

  const handleChangeProjects = (proj: ISelectItem[]) => {
    setSelectedProjects(proj)
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    setSelectedLocations(locations)
  }

  const handleChangeCalendarType = (type: ISelectItem) => {
    setSelectedCalendarType(type)

    const calendarApi = getcalendarApi()
    if (calendarApi) {
      calendarApi.changeView(type.value as string)
    }
  }

  const handleChangeCalendarDirection = (direction: 'prev' | 'next') => {
    const calendarApi = getcalendarApi()
    if (calendarApi) {
      if (direction === 'prev') {
        calendarApi.prev()
      } else if (direction === 'next') {
        calendarApi.next()
      }

      setSelectedDate(dayjs(calendarApi.getDate()))
    }
  }

  const handleChangeDate = (value: Dayjs | null) => {
    if (value) {
      setSelectedDate(value)

      const calendarApi = getcalendarApi()
      calendarApi?.gotoDate(value.toDate())
    }
  }

  const handleCloseEventMenu = () => {
    setEventListAnchorEl(null)
  }

  useEffect(() => {
    const calendarApi = getcalendarApi()
    if (calendarApi && selectedCalendarType) {
      calendarApi.changeView(selectedCalendarType.value as string)
      setSelectedDate(dayjs(calendarApi.getDate()))
    }
  }, [])

  return (
    <Box>
      <Typography variant='h3'>Calendar</Typography>
      <Card sx={{ mt: 2.25, pl: 1, pr: 2, py: 1.5 }}>
        <DashboardCalendarHeader
          type={selectedCalendarType}
          date={selectedDate}
          onChangeType={handleChangeCalendarType}
          onChangeDirection={handleChangeCalendarDirection}
        />
        <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 2.5 }}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                showDaysOutsideCurrentMonth
                views={['day']}
                onChange={handleChangeDate}
                sx={{
                  width: '269px',
                  '.MuiPickersCalendarHeader-label': { fontSize: '1rem', fontWeight: 700 },
                  '.MuiPickersArrowSwitcher-button': { color: 'grey.800' },
                  '.MuiDayCalendar-weekDayLabel': { color: 'grey.800' },
                  '.MuiPickersDay-root.Mui-selected': { backgroundColor: '#1E76E8' },
                  '.MuiDayCalendar-weekContainer': { justifyContent: 'space-between' },
                  '.MuiDayCalendar-header': { justifyContent: 'space-between' },
                  '.MuiPickersCalendarHeader-root': { pl: '14px', pr: 0 },
                }}
              />
            </LocalizationProvider>
            <Box sx={{ mt: 3, pl: 1.25 }}>
              <ProjectSelect
                selected={selectedProjects}
                onChange={handleChangeProjects}
                sx={{ '.label': { mb: 1, color: 'grey.600' } }}
              />
              <LocationSelect
                selected={selectedLocations}
                onChange={handleChangeLocations}
                sx={{ '.label': { mb: 1, color: 'grey.600' }, mt: 2 }}
              />
              <Box sx={{ mt: 2 }}>
                <FilterLabel text='Event' sx={{ mb: 1.5, color: 'grey.600' }} />
                <FormGroup sx={{ gap: 1.5 }}>
                  {DASHBOARD_CALENDAR_EVENT_TYPES.map((eventType, idx) => {
                    const { label, color } = eventType
                    return (
                      <FormControlLabel
                        key={`dashboar-calendar-event-type-item-${idx}`}
                        control={<Checkbox sx={{ p: 0, '.MuiSvgIcon-root': { color: color } }} />}
                        label={
                          <Typography variant='h5' sx={{ ml: 2, mt: 0.25 }}>
                            {label}
                          </Typography>
                        }
                        sx={{
                          m: 0,
                        }}
                      />
                    )
                  })}
                </FormGroup>
              </Box>
            </Box>
          </Box>
          <Box maxWidth='100%' overflow='auto'>
            <DashboardCalendarEventMenu
              anchorEl={eventListAnchorEl}
              isOpen={isEventListOpen}
              onClose={handleCloseEventMenu}
              events={selectedEvents}
            />
            <FullCalendar
              height='auto'
              ref={calendarRef}
              plugins={[dayGridPlugin, multiMonthPlugin, timeGridPlugin]}
              initialView='dayGridMonth'
              headerToolbar={false}
              moreLinkClick={({ date }) => moreLinkClickEventHandler(date)}
              dayHeaderClassNames='calendar-day-header'
              dayCellClassNames='calendar-cell'
              dayPopoverFormat={{ weekday: 'long', day: 'numeric' }}
              events={events}
              editable={true}
              eventClick={() => {}}
              eventContent={({ event }) => {
                const { extendedProps } = event
                const { type } = extendedProps
                const typeInfo = getDashboardEventTypeStatusInfo(type)
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.2rem 0.5rem 0.2rem 0.6rem',
                    }}
                  >
                    <Box borderRadius='50%' height='10px' width='10px' bgcolor={typeInfo.color} />
                    <Typography
                      variant='h6'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        fontWeight: 400,
                        maxWidth: '100%',
                        color: 'grey.800',
                        lineHeight: 'normal',
                        mt: 0.25,
                      }}
                    >
                      {event.title}
                    </Typography>
                  </Box>
                )
              }}
              views={{
                dayGrid: {
                  dayMaxEvents: 3,
                  dayHeaderFormat: { weekday: 'long' },
                  dayHeaderContent: ({ date }) => {
                    return (
                      <Box p={2}>
                        <Typography fontSize='1rem' fontWeight='500' color='#3f4254'>
                          {dayjs(date).format('dddd')}
                        </Typography>
                      </Box>
                    )
                  },
                  dayCellContent: ({ date }) => {},
                  moreLinkContent: ({ num }) => (
                    <Typography
                      variant='h5'
                      sx={{
                        display: 'flex',
                        width: '100%',
                        padding: '0.2rem 0.4rem',
                        color: 'primary.main',
                        fontWeight: 400,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {num} more appointment
                    </Typography>
                  ),
                },
                multiMonth: {
                  dayHeaderFormat: { weekday: 'narrow' },
                  multiMonthTitleFormat: { month: 'long', year: 'numeric' },
                  multiMonthMinWidth: 200,
                  multiMonthMaxColumns: 4,
                  moreLinkClassNames: 'multiMonthMoreLink',
                  dayCellContent: ({ date, view, isToday }) => {
                    const dayCellClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
                      const strFormat = 'DD/MM/YYYY'
                      const strDate = dayjs(date).format(strFormat)
                      const selectedDayEvents = view.calendar
                        .getEvents()
                        .filter((event) => dayjs(event.start).format(strFormat) === strDate)
                      if (selectedDayEvents.length > 0) {
                        setSelectedEvents(selectedDayEvents)
                        setEventListAnchorEl(event.currentTarget)
                      }
                    }

                    return (
                      <IconButton
                        sx={{
                          width: '2rem',
                          height: '2rem',
                          backgroundColor: (theme) =>
                            isToday ? theme.palette.primary.main : '#fff',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              isToday ? theme.palette.primary.main : '#EDF6FF',
                          },
                        }}
                        onClick={dayCellClickHandler}
                      >
                        <Typography
                          fontSize='1rem'
                          fontWeight='500'
                          color={isToday ? '#fff' : '#3f4254'}
                        >
                          {dayjs(date).format('D')}
                        </Typography>
                      </IconButton>
                    )
                  },
                },
                timeGridDay: {
                  headerToolbar: { start: 'title' },
                  eventContent: ({ event }) => {
                    const { extendedProps, start, end } = event
                    const { type } = extendedProps
                    const typeInfo = getDashboardEventTypeStatusInfo(type)

                    const format = 'h:mm A'
                    const strStart = dayjs(start).format(format)
                    const strEnd = dayjs(end).format(format)

                    return (
                      <Box
                        sx={{
                          height: '100%',
                          width: '100%',
                          backgroundColor: typeInfo.color,
                          borderRadius: 1,
                          pt: 2,
                          pb: 1,
                          px: 1.25,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: '100%',
                            overflow: 'hidden',
                          }}
                        >
                          <Typography
                            variant='h6'
                            color='#fff'
                            sx={{
                              overflow: 'hidden',
                              whiteSpace: 'wrap',
                            }}
                          >
                            {event.title}
                            <br />
                            {strStart} ~ {strEnd}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  },
                },
                timeGrid: {
                  dayHeaderContent: ({ date }) => {
                    return (
                      <Stack justifyContent='center' alignItems='center'>
                        <Typography
                          variant='h6'
                          sx={{
                            color: 'grey.500',
                            fontWeight: 400,
                            textTransform: 'uppercase',
                          }}
                        >
                          {dayjs(date).format('ddd')}
                        </Typography>
                        <Typography sx={{ fontSize: '1.75rem', fontWeight: 600, mt: 0.5 }}>
                          {dayjs(date).format('D')}
                        </Typography>
                      </Stack>
                    )
                  },
                  eventContent: ({ event }) => {
                    const { extendedProps } = event
                    const { type } = extendedProps
                    const typeInfo = getDashboardEventTypeStatusInfo(type)
                    return (
                      <Box
                        sx={{
                          height: '100%',
                          width: '100%',
                          backgroundColor: typeInfo.color,
                          borderRadius: 1,
                          pt: 2,
                          pb: 1,
                          px: 1,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: '100%',
                            overflow: 'hidden',
                          }}
                        >
                          <Typography
                            variant='h6'
                            color='#fff'
                            sx={{
                              overflow: 'hidden',
                              whiteSpace: 'wrap',
                            }}
                          >
                            {event.title}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  },
                  allDayText: '',
                  slotLabelClassNames: 'timeGridSlotLabel',
                  slotEventOverlap: true,
                  slotLabelContent: ({ date, text }) => {
                    const isThirtyMinutes = text.includes(':30')
                    return (
                      <Typography
                        variant='h6'
                        sx={{
                          textTransform: 'uppercase',
                          minWidth: '52px',
                          textAlign: 'center',
                          fontWeight: 400,
                          color: 'grey.500',
                          py: 1,
                        }}
                      >
                        {dayjs(date).format(isThirtyMinutes ? 'h:mm A' : 'h A')}
                      </Typography>
                    )
                  },
                  slotMinTime: '01:00:00',
                  slotMaxTime: '23:00:00',
                  slotDuration: '01:00:00',
                },
              }}
              navLinks={false}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default DashboardCalendar
