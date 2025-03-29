import { Dayjs } from 'dayjs'
import { ISelectItem } from './common'

export type TCalendarViewType = 'multiMonthYear' | 'timeGridDay' | 'timeGridWeek' | 'dayGridMonth'

export interface IDashboardOverviewFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  startDate: Dayjs | null
  endDate: Dayjs | null
}

export interface IDashboardLocationListItem {
  id: number
  updateAt: string
  lat: number
  lng: number
  img: string
  name: string
  address: string
  avgPerformance: number
  latestSubmittedAt: string
}

export interface IDashboardEvent {
  id: string
  title: string
  start: string
  end: string
  type: string
}
