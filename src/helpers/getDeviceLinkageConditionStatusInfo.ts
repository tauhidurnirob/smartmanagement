import { DEVICE_LINKAGE_CONDITION_STATUS_LIST } from './constants'

export default function getDeviceLinkageConditionStatusInfo(status: string) {
  return (
    DEVICE_LINKAGE_CONDITION_STATUS_LIST.find((e) => e.value === status) ||
    DEVICE_LINKAGE_CONDITION_STATUS_LIST[0]
  )
}
