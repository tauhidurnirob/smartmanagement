import { FC, useMemo } from 'react'
import { Box, IconButton, Menu, Stack, Typography } from '@mui/material'
import { EventApi } from '@fullcalendar/core'
import dayjs from 'dayjs'

import { Closecross } from '../../assets/icons/close-cross'
import DashboardCalendarEventItem from './DashboardCalendarEventItem'

interface ICalendarEventMenu {
  isOpen: boolean
  anchorEl: HTMLElement | null
  onClose: () => void
  events: EventApi[]
}

const DashboardCalendarEventMenu: FC<ICalendarEventMenu> = ({
  isOpen,
  anchorEl,
  onClose,
  events,
}) => {
  const eventStartDate = useMemo(() => {
    const startEvent = events[0]?.start
    const eventStartDate = startEvent ? dayjs(startEvent) : null

    return eventStartDate
  }, [events])
  return (
    <Menu
      id='calendar-event-list'
      disableAutoFocusItem
      disableEscapeKeyDown
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      sx={{
        '.MuiList-root': {
          p: 0,
        },
        '& .MuiPaper-root': {
          width: '14rem',
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          py: 1.5,
          px: 1,
          position: 'relative',
        },
      }}
    >
      <IconButton
        size='small'
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'grey.100',
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: '0.4rem',
          '&:hover': {
            backgroundColor: 'grey.300',
          },
        }}
      >
        <Closecross sx={{ fontSize: '1rem', color: '#364152' }} />
      </IconButton>
      {events.length > 0 && (
        <Box sx={{ pt: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                fontSize: '0.625rem',
                color: 'grey.500',
                textTransform: 'uppercase',
              }}
            >
              {eventStartDate ? eventStartDate.format('dddd') : '-'}
            </Typography>
            <Typography sx={{ fontSize: '1.75rem', fontWeight: 600 }}>
              {eventStartDate ? eventStartDate.format('DD') : '-'}
            </Typography>
          </Box>
          <Stack>
            {events.map((event, idx) => (
              <DashboardCalendarEventItem event={event} key={`dashboard-calendar-item-${idx}`} />
            ))}
          </Stack>
        </Box>
      )}
    </Menu>
  )
}

export default DashboardCalendarEventMenu
