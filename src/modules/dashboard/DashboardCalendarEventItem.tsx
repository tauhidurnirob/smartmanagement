import { FC, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { EventApi } from '@fullcalendar/core'

import getDashboardEventTypeStatusInfo from '../../helpers/getDashboardEventTypeStatusInfo'

interface ICalendarEventItemProps {
  event: EventApi
}

const DashboardCalendarEventItem: FC<ICalendarEventItemProps> = ({ event }) => {
  const { typeInfo } = useMemo(() => {
    const { extendedProps } = event
    const { type } = extendedProps
    const typeInfo = getDashboardEventTypeStatusInfo(type)

    return { typeInfo }
  }, [event])

  const calendarEventItemClickHandler = () => {}

  return (
    <Box
      onClick={calendarEventItemClickHandler}
      sx={{
        border: 'none',
        outline: 'none',
        background: '#fff',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 1,
        pl: 1,
        py: 0.5,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.grey[200],
        },
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
}

export default DashboardCalendarEventItem
