import { ISelectItem } from '../../types/common'
import { ETaskType } from '../../types/task'

export const OJT_CREATED_AT_FORMAT = 'DD MMMM YYYY, HH:mm a'

export const PERFORMANCE_SLA_TYPE_LIST: ISelectItem[] = [
  { label: 'Periodic', value: 'periodic' },
  { label: 'Ad-hoc', value: 'ad-hoc' },
  { label: 'Automation', value: 'automation' },
]

export const PERFORMANCE_SLA_DATE_LIST: ISelectItem[] = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Bi-Monthly', value: 'bi-monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Half Yearly', value: 'half-yearly' },
  { label: 'Yearly', value: 'yearly' },
]

export const TASK_TYPE_LIST: ISelectItem[] = [
  { label: 'Periodic', value: ETaskType.periodic },
  { label: 'Routine', value: ETaskType.routine },
  { label: 'Ad-Hoc - Urgent', value: ETaskType.adHocUrgent },
  { label: 'Ad-Hoc - Non Urgent', value: ETaskType.adHocNonUrgent },
  { label: 'Automation', value: ETaskType.automation },
]

export const OJT_DURATIONS: ISelectItem[] = [
  { label: '7 Days', value: '7-days' },
  { label: '14 Days', value: '14-days' },
  { label: '1 Month', value: '1-month' },
  { label: '3 Months', value: '3-Months' },
  { label: '6 Months', value: '6-months' },
  { label: '1 Year', value: '1-year' },
]

export const OJT_FREQUENCIES: ISelectItem[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'One Time Schedule', value: 'one-time-schedule' },
]

export const TASK_FREQUENCIES: ISelectItem[] = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Bi-Monthly', value: 'bi-monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Half-yearly', value: 'half-yearly' },
  { label: 'Yearly', value: 'yearly' },
]

export const MAN_DAYS: ISelectItem[] = [
  { label: '1 Day', value: '1 Day' },
  { label: '2 Days', value: '2 Day' },
  { label: '3 Days', value: '3 Day' },
  { label: '4 Days', value: '4 Day' },
  { label: '5 Days', value: '5 Day' },
  { label: '6 Days', value: '6 Day' },
  { label: '7 Days', value: '7 Day' },
  { label: '7 Days +', value: '7 Day +' },
]
