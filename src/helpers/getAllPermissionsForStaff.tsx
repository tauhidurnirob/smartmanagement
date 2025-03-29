import { ROLE_MOBILE_KEYS } from './constants'

const getAllPermissionsForStaff = (): string[] => {
  return Object.values(ROLE_MOBILE_KEYS)
}

export default getAllPermissionsForStaff
