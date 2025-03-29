import dayjs from 'dayjs'
import { LEAVE_TYPE_LIST } from './constants'
import { IGetStaffLeaves } from '../api/models/staff'

export default function getStaffLeaveDays(leave: IGetStaffLeaves) {
  const { startDate, endDate, leaveType } = leave
  if (!startDate || !endDate) return '-'

  if (leaveType !== (LEAVE_TYPE_LIST[0].value as number)) {
    return '1/2 day'
  }
  const diffDays = dayjs(endDate).diff(dayjs(startDate), 'day') + 1
  return diffDays < 2 ? `${diffDays} day` : `${diffDays} days`
}
