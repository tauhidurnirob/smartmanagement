import { DEVICE_SCHEDULE_STATUS_LIST } from './constants'

export default function getDeviceScheduleStatusInfo(status: string) {
  return (
    DEVICE_SCHEDULE_STATUS_LIST.find((e) => e.value === status) || DEVICE_SCHEDULE_STATUS_LIST[0]
  )
}
