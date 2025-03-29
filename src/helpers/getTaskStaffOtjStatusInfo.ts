import { TASK_STAFF_OTJ_STATUS_LIST } from './constants'

export default function getTaskStaffOtjStatusInfo(status: number) {
  return TASK_STAFF_OTJ_STATUS_LIST.find((s) => s.value === status)
}
