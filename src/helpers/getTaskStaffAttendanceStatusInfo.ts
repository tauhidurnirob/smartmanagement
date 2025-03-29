import { TASK_STAFF_ATTENDANCE_STATUS_LIST } from './constants'

export default function getTaskStaffAttendanceStatusInfo(status: number) {
  return TASK_STAFF_ATTENDANCE_STATUS_LIST.find((s) => s.value === status)
}
