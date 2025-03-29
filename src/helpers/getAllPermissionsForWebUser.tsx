import { ROLE_PERMISSION_LIST } from './constants'
import getAllPermissionsForStaff from './getAllPermissionsForStaff'

const getAllPermissionsForWebUser = (): string[] => {
  const newPermissions = []

  const permissionKeysForStaff = getAllPermissionsForStaff()

  // Get all permissions for web
  for (const mainPermission of ROLE_PERMISSION_LIST) {
    if (permissionKeysForStaff.includes(mainPermission.key)) {
      continue
    }

    newPermissions.push(mainPermission.key)
    for (const item of mainPermission.items || []) {
      newPermissions.push(item.key)
    }

    for (const subPermission of mainPermission.subPermissions || []) {
      newPermissions.push(subPermission.key)
      for (const subItem of subPermission.items || []) {
        newPermissions.push(subItem.key)
      }
    }
  }

  return newPermissions
}

export default getAllPermissionsForWebUser
