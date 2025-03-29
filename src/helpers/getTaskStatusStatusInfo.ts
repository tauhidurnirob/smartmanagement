import { TASK_STATUS_LIST } from './constants'

export default function getTaskStatusStatusInfo(status: number) {
  return TASK_STATUS_LIST.find((s) => s.value === status)
}
