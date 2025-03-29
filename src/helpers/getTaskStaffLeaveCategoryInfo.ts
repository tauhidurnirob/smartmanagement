import { LEAVE_CATEGORY_LIST } from './constants'

export default function getTaskStaffLeaveCategoryInfo(status: string) {
  return LEAVE_CATEGORY_LIST.find((s) => s.value === status)
}
