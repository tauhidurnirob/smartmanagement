import { TASK_STAFF_LEAVE_STATUS_LIST } from './constants'

export default function getTaskStaffLeaveStatusInfo(status: number) {
  return TASK_STAFF_LEAVE_STATUS_LIST.find((s) => s.value === status)
}
