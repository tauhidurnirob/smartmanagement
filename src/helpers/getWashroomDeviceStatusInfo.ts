import { WASHROOM_STATUS_LIST } from './constants'

export default function getWashroomDeviceStatusInfo(status: string) {
  return WASHROOM_STATUS_LIST.find((e) => e.value === status) || WASHROOM_STATUS_LIST[2]
}
