import { DASHBOARD_CALENDAR_EVENT_TYPES } from '../../helpers/constants'
import { IDashboardEvent } from '../../types/dashboard'

export const events: IDashboardEvent[] = [
  // TEST
  {
    id: '15',
    title: 'Cleaning Beacon Pri1...',
    start: '2023-07-18 20:00',
    end: '2023-07-18 22:30',
    type: DASHBOARD_CALENDAR_EVENT_TYPES[0].value as string,
  },
  {
    id: '16',
    title: 'Cleaning Beacon Pri2...',
    start: '2023-07-18 14:00',
    end: '2023-07-18 17:50',
    type: DASHBOARD_CALENDAR_EVENT_TYPES[0].value as string,
  },
  {
    id: '17',
    title: 'Cleaning Beacon Pri3...',
    start: '2023-07-18 14:10',
    end: '2023-07-18 17:20',
    type: DASHBOARD_CALENDAR_EVENT_TYPES[2].value as string,
  },
  {
    id: '18',
    title: 'Sensor Maintenan...',
    start: '2023-07-18 17:20',
    end: '2023-07-18 18:30',
    type: DASHBOARD_CALENDAR_EVENT_TYPES[3].value as string,
  },
  {
    id: '19',
    title: 'Sensor Maintenan...',
    start: '2023-07-18 17:30',
    end: '2023-07-18 19:40',
    type: DASHBOARD_CALENDAR_EVENT_TYPES[1].value as string,
  },
  {
    id: '20',
    title: 'Cleaning Beacon Pri...',
    start: '2023-07-18 15:40',
    end: '2023-07-18 18:50',
    type: DASHBOARD_CALENDAR_EVENT_TYPES[0].value as string,
  },
]
