import { DeviceAirConIcon } from '../assets/icons/device/device-aircon'
import { DeviceLightIcon } from '../assets/icons/device/device-light'
import { DeviceWifiIcon } from '../assets/icons/device/device-wifi'

export default function getDeviceTypeIcon(type: string) {
  let icon = null
  switch (type) {
    case 'Light':
      icon = DeviceLightIcon
      break
    case 'Air Con':
      icon = DeviceAirConIcon
      break
    default:
      icon = DeviceWifiIcon
  }

  return icon
}
