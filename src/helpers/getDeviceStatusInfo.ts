import { DEVICE_STATUS_LIST } from './constants'

export default function getDeviceStatusInfo(status: string) {
  return DEVICE_STATUS_LIST.find((e) => e.value === status) || DEVICE_STATUS_LIST[0]
}
