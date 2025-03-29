import { DEVICE_BATTERY_STATUS_LIST } from './constants'

export default function getDeviceBatteryStatusInfo(battery?: number | null) {
  if (typeof battery === 'undefined' || battery === null) return null

  if (battery >= 60) return DEVICE_BATTERY_STATUS_LIST[0]
  if (battery >= 35) return DEVICE_BATTERY_STATUS_LIST[1]

  return DEVICE_BATTERY_STATUS_LIST[2]
}
