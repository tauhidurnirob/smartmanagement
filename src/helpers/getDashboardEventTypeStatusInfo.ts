import { DASHBOARD_CALENDAR_EVENT_TYPES } from './constants'

export default function getDashboardEventTypeStatusInfo(status: string) {
  return (
    DASHBOARD_CALENDAR_EVENT_TYPES.find((e) => e.value === status) ||
    DASHBOARD_CALENDAR_EVENT_TYPES[0]
  )
}
