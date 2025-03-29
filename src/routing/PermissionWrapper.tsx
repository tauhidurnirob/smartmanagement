import { FC, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { _getAuth } from '../store/_selectors'
import { ROUTES } from '../helpers/constants'

interface IProps {
  allowedPermissions: string[]
  children: React.ReactNode
}

const PermissionWrapper: FC<IProps> = ({ allowedPermissions, children }) => {
  const location = useLocation()

  const auth = _getAuth()

  const isAllowed = useMemo(() => {
    const permissions = auth.user?.role?.permission?.permissions || []
    const isAllowed =
      !allowedPermissions ||
      allowedPermissions.length === 0 ||
      permissions.findIndex((p) => allowedPermissions.includes(p)) !== -1
    return isAllowed
  }, [auth])

  if (!isAllowed) {
    return <Navigate to={ROUTES.error403} state={{ from: location }} />
  }

  return <>{children}</>
}

export default PermissionWrapper
