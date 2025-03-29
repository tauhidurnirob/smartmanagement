import { LEAVE_TYPE_LIST } from './constants'

export default function getTaskStaffLeaveTypeInfo(status: number) {
  return LEAVE_TYPE_LIST.find((s) => s.value === status)
}
